
import React, {useState} from 'react';

import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import "./App.css";


import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';



import AOS from 'aos';
import "aos/dist/aos.css"


function Logout() {



return (


  <>


<Container fluid className="padding-0">
  <div className="hero-banner-three">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12">
                        <h1 className="hero-heading strong smallerh1">Next Level Client Support with MiniByte IO.</h1>
                        <p className="text-lg">MiniByte delivering blazing fast, striking Looker solution.</p>


                        <Link to="/login" className="btn-one ripple-btn">
                        Return to Login!
                        </Link>

                    </div>



                    <div class="col-lg-5 col-md-12 text-lg-start  funStuff">


                    <div className="illustration-holder d-inline-block ms-xxl-5 mt-40 lg-mt-10">
                        <Tilt>
                        <img src="./images/ils_08.svg" alt="" className="transform-img-meta"/>
                        </Tilt>
                        <img src="./images/ils_08_1.svg" alt="" className="shapes oneShape"/>
                    </div>

                </div>

              </div>

                </div>

            </div> {/* /.container */}






              </Container>
          </>


)

}

  export default Logout;
