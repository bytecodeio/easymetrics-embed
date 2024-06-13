
import React, { Fragment, useState, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../../DragDrop.css";
import { Col, Row, Container, Button, Form, Modal } from 'react-bootstrap';

import AOS from 'aos';
import "aos/dist/aos.css";

import { sdk } from "../../helpers/CorsSessionHelper";
import EmbedAnyDashboard from '../EmbedDashboard/EmbedAnyDashboard.js';
import FilterPills from '../menu/FilterPills.js';
import createNewDashboard from '../../utils/createNewDashboard.js';
import updateCanvasBasedOnReport from '../../utils/updateCanvasBasedOnReport.js';

function TopSection() {
  const [navbar, setNavbar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [show5, setShow5] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [selectedButton, setSelectedButton] = useState("list")
  const [wide, setWide] = useState(false);
  const [tiles, setTiles] = useState([]);
  const [columns, setColumns] = useState({});
  const [filterSet, setFilterSet] = useState(new Set());
  const [dashboardName, setDashboardName] = useState('');
  const [newDashboardId, setNewDashboardId] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleButtonGroupClick = (v) => {
    setSelectedButton(v)
  }

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const changeIt = () => {
    setToggle(!toggle);
  }

  const toggleMenu = () => {
    if (window.scrollY >= 68) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  window.addEventListener('scroll', toggleMenu);

  const getTileStatus = (tiles) => {
    return {
      tiles: {
        name: "Tiles",
        items: tiles,

      },
      column1: {
        name: "List Style Dashboard",
        image: "",
        items: [],
      },
    }
  }

  const getTileStatus2 = (tiles) => {
    return {
      tiles: {
        name: "Tiles",
        items: tiles,
      },
      column1: {
        name: "Left Dashboard Column",
        items: [],
      },
      column2: {
        name: "Right Dashboard Column",
        items: [],
      },
    }
  };

  // This function uses the sdk directly from the frontend. This works sometimes. :)
  // It gets the filters for an individual dashboard 
  const getFiltersForTile = async (tileId) => {
    const response = await sdk.ok(sdk.dashboard(
      tileId, 'dashboard_filters'))
    return response.dashboard_filters
  }
  // This function adds filter entries to the set when a tile is added to the canvas
  const addTileFilters = async (tileId) => {
    const newFilters = await getFiltersForTile(tileId)
    let newSet = new Set(filterSet)
    newFilters.forEach((filter) => {
      newSet.add(filter.name)
    })
    setFilterSet(newSet)
  }

  // This function removes filter entries from the set when a tile is removed
  // It will not remove filters if they are still used by another tile
  // This fucntion is independent of how many 'columns' there are in the layout
  const removeFilterTiles = async (tileId) => {
    let tilesIdsToIgnore = columns.tiles.items.map(tile => tile.id)
    tilesIdsToIgnore.push(tileId)
    const selectedTileIds = tiles.filter(tile => !tilesIdsToIgnore.includes(tile.id)).map(tile => tile.id)
    let allSelectedTileFilters = []
    await selectedTileIds.forEach(async (selectedTileId) => {
      const filters = await getFiltersForTile(selectedTileId)
      allSelectedTileFilters.push(filters)
    })
    const filtersInRemovedTile = await getFiltersForTile(tileId)
    let filtersToRemove = filtersInRemovedTile.filter(filter => {
      let keep = true
      allSelectedTileFilters.forEach(tileFilters => {
        if (tileFilters.map(filter => filter.name).includes(filter.name)) {
          keep = false
        }
      })
      return keep
    })
    let newSet = new Set(filterSet)

    filtersToRemove.forEach((filter) => {
      newSet.delete(filter.name)
    })
    setFilterSet(newSet)
  }

  // This function removes the filters from the set when they are X'd out
  const removeFilters = (filterName) => {
    let newSet = new Set(filterSet)
    newSet.delete(filterName)
    setFilterSet(newSet)
  }

  // These fetches will need to pull from a predefined Folder. 
  // It's now pulling from a folder called 'Tiles'.
  const getTiles = async () => {
    let response = await sdk.ok(sdk.search_folders(
      {
        fields: 'dashboards',
        name: 'Tiles'
      }))

    // Only pull the first matching folder's dashboards
    const newTiles = response[0].dashboards.map((dashboardMetadata) => {
      const id = dashboardMetadata.id
      return { id: id, content: <EmbedAnyDashboard id={id} />, title: dashboardMetadata.title }
    })
    setTiles(newTiles)
    setColumns(getTileStatus(newTiles))
  };

  // These fetches will need to pull from a predefined Folder. 
  // It's now pulling from a folder called 'Client Dashboards'.
  const getReports = async () => {
    let response = await sdk.ok(sdk.search_folders(
      {
        fields: 'dashboards',
        name: 'Client Dashboards'
      }))

    // Only pull the first matching folder's dashboards
    const newReports = response[0].dashboards.map((dashboardMetadata) => {
      const id = dashboardMetadata.id
      return { id: id, content: <EmbedAnyDashboard id={id} />, title: dashboardMetadata.title }
    })
    setReports(newReports)
  };

  const handleReportChange = (event) => {
    const reportName = event.target.value;
    setSelectedReport(reportName);
    const report = reports.find(report => report.title === reportName);
    // Placeholder for the function that updates dashboardName, filterSet, columns, and wide
    // This function will be defined in another file and imported here
    updateCanvasBasedOnReport(report, tiles, setColumns, setDashboardName, setFilterSet, setWide);
  };

  useEffect(() => {
    getTiles()
    getReports()
  }, []);

  const changeLayout = (layout) => {
    const wide = layout !== 'grid'
    wide ? setColumns(getTileStatus(tiles)) : setColumns(getTileStatus2(tiles))
    setWide(wide)
  }

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      });
      // handle new filters
      if (destination.droppableId !== 'tiles') {
        addTileFilters(removed.id)
      } else {
        removeFilterTiles(removed.id)
      }
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      });
    }
  };

  const handleCreateDashboard = async () => {
    await createNewDashboard(columns, Array.from(filterSet), "566", dashboardName, setNewDashboardId)
    setShowModal(true); 
  }


  if (tiles.length === 0) {
    return <div>Loading tiles...</div>;
  }
  return (
    <Fragment>
      <Container fluid>

        <div className="hero-banner-five" id="home">
          <Container>
            <Row>
              <Col sm={12} md={7} lg={6}>

                <h1 className="hero-heading">Easy <span>Metrics</span></h1>
                <p className="text-lg mb-50 pt-40 pe-xl-5 md-pt-30 md-mb-40">Drive operational performance across your network. Easy Metrics empowers companies to cut waste, ID cost to serve, and create an engaged and productive workforce</p>
              </Col>
            </Row>

          </Container>
          <div className="illustration-holder move">
            <img src="https://www.easymetrics.com/wp-content/uploads/2020/08/product-concept.png" />
          </div>

          <div className="shapes oval-one" />
        </div>


        <div className="theme-inner-banner" id="about">
          <Container>
            <h2 class="intro-title text-center pb-5">&nbsp;</h2>
            <ul class="page-breadcrumb style-none d-flex justify-content-center">

            </ul>
          </Container>
          <img src="./images/shape_38.svg" alt="" class="shapes shape-one" />
          <img src="./images/shape_39.svg" alt="" class="shapes shape-two" />
        </div>

        <div className="position-relative mt-5 mb-5">
          <Container fluid>
            <Row className="service-details position-relative mt-5 mb-150 lg-mb-100">

              <Col sm={12} md={12} lg={12} className={wide === true && show5 === true && toggle === true ? "newLength" : ""} >
                <div className="service-details-meta">
                  <h2 className="text-center mb-5">Drag and drop tiles to create a dashboard</h2>
                </div>

                <Container>
                <Row className="mb-2 align-items-center">
                  <Col xs="auto">
                    <Form.Select 
                      aria-label="Start with existing report" 
                      value={selectedReport || "Select an existing report to modify"} onChange={handleReportChange}>
                      {console.log(reports)}
                      <option>Select a report</option>
                      {reports.map((report, index) => (
                        <option key={index} value={report.title}>{report.title}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>
                  <Row className="mb-2 align-items-center"> {/* Use align-items-center to vertically align items in the middle */}
                    <Col xs="auto"> {/* Use xs="auto" to only take as much space as needed */}
                      <div>Dashboard Filters:</div>
                    </Col>
                    <Col>
                      <FilterPills filters={Array.from(filterSet)} removeFilter={removeFilters} />
                    </Col>
                  </Row>
                  <Form>
                    <Row className="align-items-center">
                      <Col md={8} className="mb-2">
                      <Form.Group controlId="dashboardName">
                        <div>Dashboard Name:</div>
                        <Form.Control
                          type="text"
                          placeholder="Enter Dashboard Name"
                          value={dashboardName}
                          onChange={(e) => setDashboardName(e.target.value)}
                          style={{ borderColor: 'gray', color: 'black' }} // Existing custom styles
                        />
                      </Form.Group>

                      </Col>
                      <Col md={4} className="mb-2">
                        <Button onClick={handleCreateDashboard}>
                          Create Dashboard
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Container>
                <Row>
                  <div className="position-relative">

                    <Container fluid className="mb-5 pe-5 ps-5 position-relative">

                      <div className="d-flex justify-content-between gridOptions">
                        <div class="d-flex align-items-baseline">
                          <i
                            class={toggle ? "far fa-arrow-left back reverse" : "far fa-arrow-left back"}

                            onClick={() => { setShow5(!show5); changeIt(); }}
                          >

                          </i>
                          <p className="small">{toggle === true && wide === false ? "slide dashboard back" : "slide dashboard full width"}</p>
                        </div>
                        <div class="d-flex align-items-baseline">
                          <p className="small">pick layout</p>

                          <i onClick={() => { handleButtonGroupClick("list"); changeLayout('list') }}
                            className={selectedButton == "list" ? "far fa-bars toggled" : "far fa-bars"}
                            value={"list"}></i>
                          <i onClick={() => { handleButtonGroupClick("grid"); changeLayout('grid') }}
                            className={selectedButton == "grid" ? "fas fa-th-large toggled" : "fas fa-th-large"}
                            value={"grid"}></i>

                        </div>
                      </div>

                      <Row className="mt-3">
                        <DragDropContext
                          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                          {Object.entries(columns).map(([columnId, column], index) => {
                            return (

                              <Col xs={12} sm={6} md={6} className={selectedButton == "grid" ? "grid" : ""} key={columnId}>
                                <div className={show5 ? "fullWidth app-content" : "app-content"}>
                                  <div key={columnId} class="tiles">
                                    <div className="d-flex justify-content-start align-items-center largeMargin">
                                      <img src={column.image} className="img-responsive cute pe-3"></img>
                                      <div className="d-flex flex-column"><h4>{column.name}</h4>

                                      </div>
                                    </div>

                                    <div className="bubbles">

                                      <Droppable droppableId={columnId} key={columnId}>
                                        {(provided, snapshot) => {
                                          return (
                                            <div
                                              {...provided.droppableProps}
                                              ref={provided.innerRef}
                                              style={{
                                                background: snapshot.isDraggingOver
                                                  ? "transparent"
                                                  : "transparent",
                                                padding: 0,
                                                width: "100%",
                                                minHeight: 1800
                                              }}

                                            >
                                              {column.items.map((item, index) => {
                                                return (
                                                  <Draggable
                                                    key={item.id + index}
                                                    draggableId={item.id}
                                                    index={index}
                                                    className="drag"
                                                  >
                                                    {(provided, snapshot) => {
                                                      return (
                                                        <div
                                                          ref={provided.innerRef}
                                                          {...provided.draggableProps}
                                                          {...provided.dragHandleProps}

                                                        >
                                                          {item.content}
                                                        </div>
                                                      );
                                                    }}
                                                  </Draggable>
                                                );
                                              })}
                                              {provided.placeholder}
                                            </div>

                                          );
                                        }}
                                      </Droppable>
                                    </div>
                                  </div>

                                </div>
                              </Col>


                            );
                          })}
                        </DragDropContext>
                      </Row>
                    </Container>

                  </div>
                </Row>



              </Col>
            </Row>

          </Container>

          <div className="shapes shape-one" />
        </div>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
              <Modal.Title>Dashboard Created</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              {newDashboardId && <EmbedAnyDashboard id={newDashboardId} />}
          </Modal.Body>
      </Modal>
    </Fragment>
  )

}

export default TopSection;
