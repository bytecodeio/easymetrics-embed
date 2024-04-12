
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {  signOut } from "firebase/auth";
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';

import { BrowserRouter} from 'react-router-dom';
import { Routes, Route } from "react-router-dom";








import TopNav from './components/nav/TopNav.js';

import SlideOut from './components/menu/SlideOut.js';

import TopSection from './components/sections/TopSection.js';
import MiddleSection from './components/sections/MiddleSection.js';

import DataSection from './components/sections/DataSection.js';

import BottomSection from './components/sections/BottomSection.js';

import ToTopButton from './components/sections/ToTopButton.js';

import AppRouter from "./components/router/AppRouter";

import App from './App.js';

import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';



import AOS from 'aos';
import "aos/dist/aos.css"


function Data({ tier, premium }) {


return (


  <>
<TopNav changeTier={tier} premium={premium} />

<SlideOut/>


<DataSection/>


<ToTopButton/>


       </>

)

}

  export default Data;
