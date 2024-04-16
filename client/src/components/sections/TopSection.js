
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../../DragDrop.css";

import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

import AOS from 'aos';
import "aos/dist/aos.css";


import Vis from "../EmbedDashboard/VizComponent.js";
import EmbedDashboard from "../EmbedDashboard/EmbedDashboard";
import EmbedDashboard2 from "../EmbedDashboard/EmbedDashboard2";
import EmbedDashboard3 from "../EmbedDashboard/EmbedDashboard3";
import EmbedDashboard4 from "../EmbedDashboard/EmbedDashboard4";
function TopSection() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [navbar, setNavbar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
      setIsOpen(true);
  }
  const closeModal = () => {
      setIsOpen(!modalIsOpen);
  }

  const toggleMenu =()=>{
    if(window.scrollY >= 68) {
      setNavbar(true)
    } else{
      setNavbar(false)
    }
  }

  window.addEventListener('scroll', toggleMenu);

  const tasks = [
    { id: "1", content:  <EmbedDashboard2/>},
    { id: "2", content: <EmbedDashboard/>},
    { id: "3", content:  <EmbedDashboard3/>},
    { id: "4", content: <EmbedDashboard4/>},

  ];

  const taskStatus = {
    first: {
      name: "Looks",
      items: tasks,

    },

    requested: {
      name: "Dashboard",
      image: "",
      items: [],

    },

  };

  const [columns, setColumns] = useState(taskStatus);

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

        setColumns((prev) => ({
            ...prev,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems,
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems,
            },
          }));

      }


    };


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
          <img src="https://www.easymetrics.com/wp-content/uploads/2020/08/product-concept.png"/>
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


        <div className="fancy-feature-seventeen position-relative mt-5 mb-5">
            <Container fluid>
                <Row className="service-details position-relative mt-5 mb-150 lg-mb-100">

                <Col sm={12} md={12} lg={12}>
                  <div className="service-details-meta">
                      <h2 className="text-center">Drag and drop looks to create a dashboard</h2>

                  </div>

                  <Row>
                    <div className="position-relative">

                      <Container fluid className="mb-5 pe-5 ps-5 position-relative">

                        <Row className="marginTop">

                          <DragDropContext
                            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                            {Object.entries(columns).map(([columnId, column], index) => {
                              return (

                                 <Col xs={12} sm={6} md={6}>


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
                                                  key={item.id}
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

            <div className="shapes shape-one"/>
        </div>



</Container>



</Fragment>
)

}

  export default TopSection;
