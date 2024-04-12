
import React, { useState, useRef, useEffect} from "react";
import { useLocation } from 'react-router-dom';

import {Link} from 'react-router-dom';


import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';




const SlideOut = ({ changeTier, props, premium }) => {


  let comment1 = `<i class="fal fa-analytics"></i>`

  let comment3 = `<i class="fal fa-tasks"></i>`

  let comment5 = `<i class="fal fa-chart-bar"></i>`
  let comment4 = `<i class="fal fa-user"></i>`





  let comment01 = `<i class="fal fa-analytics"></i><p>Analytics</p>`
  let comment03 = `<i class="fal fa-tasks"></i><p>Services</p>`

  let comment05 = `<i class="fal fa-chart-bar"></i><p>Custom Vis</p>`
  let comment04 = `<i class="fal fa-user"></i><p>Self Service</p>`




const [show, setShow] = React.useState();

var selectedCubes = [


      {
      font: <div dangerouslySetInnerHTML={{__html:comment1}} />,
      link:"/home",
      name:<div dangerouslySetInnerHTML={{__html:comment01}} />
    },


  {
    font: <div dangerouslySetInnerHTML={{__html:comment3}} />,
    link:"/services",
    name: <div dangerouslySetInnerHTML={{__html:comment03}} />
  },
  {
    font: <div dangerouslySetInnerHTML={{__html:comment5}} />,
    link:"/data",
    name: <div dangerouslySetInnerHTML={{__html:comment05}} />
  },
  {
    font: <div dangerouslySetInnerHTML={{__html:comment4}} />,
    link:"/selfservice",
    name: <div dangerouslySetInnerHTML={{__html:comment04}} />
  },



]



var cubes = [];


selectedCubes.forEach(function (selectedCube, i) {
  cubes.push(selectedCube);
});



const wrapperRef = React.useRef(null);

React.useEffect(() => {
  document.addEventListener("mouseenter", handleClickOutside, false);
  return () => {
    document.removeEventListener("mouseleave", handleClickOutside, false);

  };
}, []);

const handleClickOutside = event => {
  if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
    setShow(false);

  }
};


const location = useLocation()
location.pathname

console.log(location)
console.log(location.pathname)


  return (
  <div>




<div id="slideOut1" className={show ? "show" : ""} >
        <div className="slideOutTab1">
              <div id="one1" className="openTab bottomShadow" role="button" tabindex="0" ref={wrapperRef} onMouseEnter={() => setShow(true)}>


          {/*<div id="one1" className="openTab bottomShadow" role="button" tabindex="0">*/}

          {cubes.map((selectedCube) => (

              <a target="_parent" href={selectedCube.link} className={`${selectedCube.link === location.pathname ? 'whiteCube' : 'cube'}`}>
                      <div className="greenCube">
                         <div className="d-flex align-items-center flex-column">

                           <p className="twenty mt-0 mb-1">{selectedCube.font}</p>




                    </div>
                  </div>
                </a>




              ))}


          </div>

        </div>

        <div className="modal-content" onMouseLeave={() => setShow(false)}>

          <div className="modal-body">


          {cubes.map((selectedCube) => (

              <a target="_parent" href={selectedCube.link} className={`${selectedCube.link === location.pathname ? 'whiteCube' : 'cube'}`}>
                      <div className="greenCube">
                         <div className="d-flex align-items-center flex-column">



                           <p className="twenty mt-0 mb-1" id="inner">{selectedCube.name}</p>




                    </div>
                  </div>
                </a>




              ))}


                </div>
              </div>



              </div>


      </div>




  );

  }


  export default SlideOut;
