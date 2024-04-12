import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";


import { sdk } from "../../helpers/CorsSessionHelper";



import "../../App.css";





import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, NavLink, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';

const EmbedDashboard4 = () => {

const [loading, setLoading] = React.useState(true);


  const makeDashboard = useCallback((el) => {

    el.innerHTML = "";


  LookerEmbedSDK.createDashboardWithId(811)
    // LookerEmbedSDK.createDashboardWithUrl('https://bytecodeef.looker.com/embed/dashboards/751?theme=Embed1')


    .withParams({
      _theme:'{"show_filters_bar":false}'
    })
    .appendTo(el)

    .on("dashboard:loaded", (e) => {
      console.log("LookerEmbedSDK.createDashboardWithId()::Successfully Loaded!");
    })

    .build()

    .connect()
    .then(() => setLoading(false))

    .catch((error) => {
      console.error("An unexpected error occurred", error);
    });





  }, []);





  return (




    <Dashboard ref={makeDashboard}>

    </Dashboard>



  );
};


// A little bit of style here for heights and widths.
const Dashboard = styled.div`
    iframe {
    width: 100%;
    height: 100%;
  }
`;
export default EmbedDashboard4;
