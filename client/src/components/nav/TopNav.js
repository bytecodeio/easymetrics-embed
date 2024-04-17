
import React, { useState, useEffect, useRef } from 'react';


import { NavLink, useNavigate } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import EmbedSDKInit from "../common/EmbedInit";


import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip } from 'react-bootstrap';

import TooltipButton from "./TooltipButton";
import SearchModal from './SearchModal';

const TopNav = ({ changeTier, props, premium }) => {

  const [activeLink, setActiveLink] = useState(false);

  const [navbar, setNavbar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
      setIsOpen(true);
  }
  const closeModal = () => {
      setIsOpen(!modalIsOpen);
  }


  const toggleMenu = () => {
    if (window.scrollY >= 68) {
      setNavbar(true)
    } else {
      setNavbar(false)
    }
  }

  window.addEventListener('scroll', toggleMenu);


  const navigate = useNavigate();

  const handleUserStandard = () => {
    changeTier(false)
  }

  const handleUserPremium = () => {
    changeTier(true);

  }


  return (
<div>
      <SearchModal isOpen={modalIsOpen} onClick={closeModal} bgColor="bg-three" />
    <header className={navbar ? "theme-main-menu sticky-menu theme-menu-four fixed" : "theme-main-menu sticky-menu theme-menu-four"}>
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#" className="logo">
      <img src="https://www.easymetrics.com/wp-content/uploads/2020/01/mobile-logo.png" alt="" class="shapes shape-one" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Nav
              className="me-auto my-2 my-lg-0"

              navbarScroll
              defaultActiveKey={activeLink}
              onClick={(selectedKey, event) => {

                setActiveLink(selectedKey);
              }}
            >
              <Nav.Link href="/home" eventKey="home">Analytics</Nav.Link>
              <Nav.Link href="/services" eventKey="services">Services</Nav.Link>
              <Nav.Link href="/data" eventKey="pricing">Custom Vis</Nav.Link>
              <Nav.Link href="/selfservice" eventKey="about">Self Service</Nav.Link>
            </Nav>
            <div className="right-widget d-flex align-items-center ms-auto order-lg-3 position-relative">


          {/*<button className="menu-search-btn tran3s"
             type="button" onClick={openModal}><i className="fal fa-search"/></button>*/}








                <button onClick={handleUserStandard} className={premium === 'true' ? 'purpleUser' : premium === 'false' ? 'purpleClick purpleUser' :  'purpleClick purpleUser'}>

                  <TooltipButton text={premium === 'true' ? 'Switch to standard user' : premium === 'false' ? 'You are a standard user' :  'You are a standard user' }/>

                </button>



                <button onClick={handleUserPremium} className={premium === 'true' ? 'purpleClick purpleUser two' : premium === 'false' ? 'purpleUser two' :  'purpleUser'}>




               <TooltipButton text={premium === 'true' ? 'You are a premium user' : premium === 'false' ? 'Switch to premium user' :  'Switch to premium user' }/>
              </button>


            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>


    </header>
    </div>
  )
}





export default TopNav;
