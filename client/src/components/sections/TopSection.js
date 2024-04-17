
import React, { Fragment, useState, useRef, useEffect } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "../../DragDrop.css";

import { Col, Row, Container, Button} from 'react-bootstrap';

import AOS from 'aos';
import "aos/dist/aos.css";


import Vis from "../EmbedDashboard/VizComponent.js";
import EmbedDashboard from "../EmbedDashboard/EmbedDashboard";
import EmbedDashboard2 from "../EmbedDashboard/EmbedDashboard2";
import EmbedDashboard3 from "../EmbedDashboard/EmbedDashboard3";
import EmbedDashboard4 from "../EmbedDashboard/EmbedDashboard4";


function TopSection() {
  const [navbar, setNavbar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [show5, setShow5] = useState(false);

  const [toggle, setToggle] = useState(false);

  const [selectedButton, setSelectedButton] = useState("list")

  const [wide, setWide] = useState(false);

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
    { id: "10", content:  <EmbedDashboard2/>},
    { id: "12", content: <EmbedDashboard/>},
    { id: "13", content:  <EmbedDashboard3/>},
    { id: "14", content: <EmbedDashboard4/>},

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

  const taskStatus2 = {
    first: {
      name: "Looks",
      items: tasks,

    },

    requested: {
      name: "Dashboard",

      items: [],

    },
    requested2: {
       name: "hi",
      items: [],

    },

  };

  const [columns, setColumns] = useState(taskStatus);

const changeLayout = () => {
setColumns(taskStatus2)
setWide(true)
}


const changeLayout2 = () => {
setColumns(taskStatus)
setWide(false)
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

    console.log(toggle, "toggle")
    console.log(wide, "wide")
    console.log(show5, "show5")


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

        <div className="position-relative mt-5 mb-5">
            <Container fluid>
                <Row className="service-details position-relative mt-5 mb-150 lg-mb-100">

                <Col sm={12} md={12} lg={12} className={wide === true && show5 === true && toggle  === true ? "newLength" : ""}>
                  <div className="service-details-meta">
                      <h2 className="text-center mb-5">Drag and drop looks to create a dashboard</h2>

                  </div>

                  <Row>
                    <div className="position-relative">

                      <Container fluid className="mb-5 pe-5 ps-5 position-relative">

                      <div className="d-flex justify-content-between gridOptions">
                      <div class="d-flex align-items-baseline">
                       <i
                       class={toggle ? "far fa-arrow-left back reverse" : "far fa-arrow-left back"}

                       onClick={() => {setShow5(!show5);changeIt();}}
                       >

                       </i>
                        <p className="small">{toggle === true && wide === false ? "slide dashboard back" : "slide dashboard full width"}</p>
                       </div>
                       <div class="d-flex align-items-baseline">
                      <p className="small">pick layout</p>

                      <i onClick={() => {handleButtonGroupClick("list");changeLayout2()}}
                      className={selectedButton == "list" ? "far fa-bars toggled" : "far fa-bars"}
                      value={"list"}></i>
                      <i onClick={() => {handleButtonGroupClick("grid");changeLayout()}}
                      className={selectedButton == "grid" ? "fas fa-th-large toggled" : "fas fa-th-large"}
                      value={"grid"}></i>

                       </div>
                      </div>

                        <Row className="mt-3">

                          <DragDropContext
                            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                            {Object.entries(columns).map(([columnId, column], index) => {
                              return (

                             <Col xs={12} sm={6} md={6} className={selectedButton == "grid" ? "grid" : ""}>
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
