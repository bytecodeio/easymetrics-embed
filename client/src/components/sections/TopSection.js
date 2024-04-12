
import React, { useState, useRef, useEffect } from 'react';


import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

import AOS from 'aos';
import "aos/dist/aos.css"


import Vis from "../EmbedDashboard/VizComponent.js";

import EmbedDashboard2 from "../EmbedDashboard/EmbedDashboard2";
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




return (


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
            <Container>
                <Row className="service-details position-relative mt-5 mb-150 lg-mb-100">

                <Col sm={12} md={12} lg={12}>
                  <div className="service-details-meta">
                      <h2>Drag and drop items from right to left</h2>

                  </div>

                  <Row>
                    <div className="position-relative">


                      <Col sm={12} md={12} lg={12} className="embed-responsive embed-responsive-16by9 small mb-0">


                        <EmbedDashboard2
                        />

                      </Col>
                    </div>
                  </Row>



               </Col>
              </Row>

            </Container>

            <div className="shapes shape-one"/>
        </div>



</Container>


)

}

  export default TopSection;
