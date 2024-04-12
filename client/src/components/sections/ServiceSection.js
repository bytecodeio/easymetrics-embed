
import React, { useState, useEffect } from 'react';


import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

import ProgressCircle from './ProgressCircle';

import AOS from 'aos';
import "aos/dist/aos.css"





function ServiceSection() {



    const BlockContent15 = [
        {
            icon: 'icon_39',
            text: 'C++ Coding',
            fadeUp: 'fade-up',
            dataDelay: ''
        },
        {
            icon: 'icon_37',
            text: 'AI Technology',
            fadeUp: 'fade-up',
            dataDelay: '100',
        },
        {
            icon: 'icon_38',
            text: 'Auto Algorithm',
            fadeUp: 'fade-up',
            dataDelay: '200',
        },
    ]

return (


<div className="service-details position-relative mt-160 mb-150 lg-mt-100 lg-mb-100">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12 col-lg-12 order-lg-1">
                            <div className="service-details-meta ps-lg-5 ms-xxl-4">
                                <h2 className="main-title">Let's connect and talk about how to unlock your data</h2>
                                <p>MiniByte IO has helped hundreds of clients unlock value from their data to deliver business insights.</p>
                                <img src="images/media/img_13.jpg" alt="" className="main-img-meta"/>

                                <div>

                                </div>
                                <div className="mt-75 lg-mt-50">
                                    <div className="row gx-xxl-5">
                                        <div className="col-lg-6">
                                            <h3 className="sub-title">Our Goal</h3>
                                            <ul className="style-none list-item md-mb-40">
                                                <li>Solve complex problems.</li>
                                                <li>Share knowledge.</li>
                                                <li>Learn continuously.</li>
                                                <li>Communicate proactively.</li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-6">
                                            <h3 className="sub-title">Our Vision</h3>
                                            <p>Whether a project based implementation, a consulting engagement or a monthly contract of proactive services, we customize our solutions to fit our customer’s needs.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-60 mb-20 lg-mt-40 lg-mb-10">
                                    <div className="row gx-xxl-5">
                                        <div className="col-xl-6 col-lg-12 col-md-6">
                                            <div className="block-style-fifteen mb-30">
                                                <div className="d-flex align-items-center">
                                                    <div className="text">
                                                        <h6>Success Ratio</h6>
                                                        <p>We’re best for our success work ration.</p>
                                                        <a href="#" className="details-btn">Details</a>
                                                    </div>
                                                    {/* /.text */}
                                                    <div className="circle_percent" data-percent={86}>
                                                        <div className="circle_inners position-relative">
                                                            {/* <div className="round_per"/>
                                                             */}

                                                                   <ProgressCircle number="94"/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /.block-style-fifteen */}
                                        </div>
                                        <div className="col-xl-6 col-lg-12 col-md-6">
                                            <div className="block-style-fifteen mb-30">
                                                <div className="d-flex">
                                                    <div className="text">
                                                        <h6>Satisfaction Ratio</h6>
                                                        <p>We’re best for our satisfaction.</p>
                                                        <a href="#" className="details-btn">Details</a>
                                                    </div>
                                                    {/* /.text */}
                                                    <div className="circle_percent">
                                                        <div className="circle_inners position-relative">
                                                            {/* <div className="round_per"/> */}


                                                                      <ProgressCircle number="86"/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* /.block-style-fifteen */}
                                        </div>
                                    </div>
                                </div>
                                <p>Our team of solution architects, data engineers and Looker certified developers offer full stack services to solve the hardest data challenges. We partner with customers to bring their vision to reality.</p>
                            </div>
                            {/* /.service-details-meta */}
                        </div>
                        </div>
                </div>
                </div>


                      )


                      }

  export default ServiceSection;
