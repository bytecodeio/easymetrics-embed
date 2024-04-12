import React, { Fragment, useEffect, useState } from "react";
import EmbedDashboard from "./components/EmbedDashboard/EmbedDashboard";
import "./App.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip } from 'react-bootstrap';
import EmbedSDKInit from "./components/common/EmbedInit";

import AOS from 'aos';
import "aos/dist/aos.css"
import TopNav from './components/nav/TopNav.js';
import TopSection from './components/sections/TopSection.js';
import MiddleSection from './components/sections/MiddleSection.js';
import BottomSection from './components/sections/BottomSection.js';
import ToTopButton from './components/sections/ToTopButton.js';
import Home from './Home.js';
import Services from './Services.js';
import SelfService from './SelfService.js';
import Data from './Data.js';
import Signup from './Signup.js';
import Login from './Login.js';
import Logout from './Logout.js';

function App() {
  const defaultPremiumValue = localStorage.getItem('premium');
  console.log('local storage value', defaultPremiumValue)
  const [premium, setPremium] = useState(defaultPremiumValue);
  console.log('premium', premium);

  const handleTier = (tier) => {
    setPremium(tier);
    localStorage.setItem('premium', tier);
    window.location.reload();
  }


  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  EmbedSDKInit();

  return (
    <div>
      <div className="main-page-wrapper">
        <Router>
          <div>
            <section>
              <Routes>
                <Route path="/home" element={<Home tier={handleTier} premium={premium} />} />
                <Route path="/services" element={<Services tier={handleTier} premium={premium}/>} />
                <Route path="/selfservice" element={<SelfService tier={handleTier} premium={premium}/>} />
                <Route path="/data" element={<Data tier={handleTier} premium={premium}/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<Signup/>}/>

              
                <Route path='*' element={<Navigate to='/signup' />} />
              </Routes>
            </section>
          </div>
        </Router>


      </div>
    </div>

  );
}

export default App;
