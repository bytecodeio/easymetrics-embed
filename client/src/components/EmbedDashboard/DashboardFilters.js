import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";

import { sdk } from "../../helpers/CorsSessionHelper";

import "../../App.css";

import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip } from 'react-bootstrap';

import { dashboard } from "@looker/sdk/lib/3.1/funcs";
import  images  from "./images.js";


const Letters = [
  {

    dataFilter: "A",
    heading: "A",

  },
  {
    dataFilter: "C",
    heading: "C",
  },
  {
    dataFilter: "D",
    heading: "D",
  },
  {

    dataFilter: "F",
    heading: "F",

  },
  {
    dataFilter: "G",
    heading: "G",
  },
  {
    dataFilter: "H",
    heading: "H",
  },


  {

    dataFilter: "I",
    heading: "I",

  },
  {
    dataFilter: "K",
    heading: "K",
  },
  {
    dataFilter: "M",
    heading: "M",
  },


    {

      dataFilter: "N",
      heading: "N",

    },
    {
      dataFilter: "O",
      heading: "O",
    },
    {
      dataFilter: "P",
      heading: "P",
    },


      {

        dataFilter: "R",
        heading: "R",

      },
      {
        dataFilter: "S",
        heading: "S",
      },
      {
        dataFilter: "T",
        heading: "T",
      },

      {

        dataFilter: "U",
        heading: "U",

      },
      {
        dataFilter: "W",
        heading: "W",
      }

];




const DashboardFilters = ({ dashboard, filters, setFilters }) => {
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
// const [clicked, setClicked] = useState(false);
// const [items, setItems] = useState([]);
const [gender, setGender] = useState(filters?.Gender);
const [usa, setUsa] = useState(filters?.State);
const [source, setSource] = useState(filters?.Traffic_Source);

const [isActive, setIsActive] = useState(false);
  const handleClick = event => {
    setIsActive(current => !current);
  };

useEffect(() => {
    if (clicked) {
      if (dashboard) {
        dashboard.send("dashboard:filters:update", { filters });
        dashboard.send("dashboard:run")

      }
      setClicked(false);
    }
  }, [dashboard, filters, clicked]);


const handleGenderChange = (e) => {
    const value = e.target.value;
    setClicked(true);
    setGender(value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      Gender: value,
    }));
    if (dashboard) {
      dashboard.send("dashboard:filters:update", { filters });
      dashboard.send("dashboard:run")
    }
  };


  const handleSourceChange = (e) => {
      const value = e.target.value;
      setClicked(true);
      setSource(value);
      setFilters((prevFilters) => ({
        ...prevFilters,
        Traffic_Source: value,
      }));
      if (dashboard) {
        dashboard.send("dashboard:filters:update", { filters });
      }
    };

    const handleUSStateChange = (e) => {
        const value = e.target.value;
        setClicked(true);
        setUsa(value);
        setFilters((prevFilters) => ({
          ...prevFilters,
          State: value,
        }));
        if (dashboard) {
          dashboard.send("dashboard:filters:update", { filters });
        }
      };


      const [clicked, setClicked] = useState(false);
      const [items, setItems] = useState([]);
      const handleLetterClick = (clickedLetter) => {
      const currentlySelected = [...items];

          if(items.includes(clickedLetter)){
            currentlySelected.splice(currentlySelected.indexOf(clickedLetter), 1);
          }
          else {
            currentlySelected.push(clickedLetter);

          }
            setItems([...currentlySelected])
            console.log(items)

        };



  return (
<div>




<Row className={isActive ? 'tiles coolclass fadeIn' : 'tiles coolclass fadeOut'}>

  <div className="filter-attr-list" id="list">

  {Letters.map((letter, i) => (
          <div
            key={i}
            className="letter"
            data-filter={letter.dataFilter}
            onClick={()=>handleLetterClick(letter.dataFilter)}
            className={items.includes(letter.dataFilter) ? 'letter activeLetter' : 'letter'}>

            <p key={i}>{letter.heading}</p>
          </div>
        ))}


</div>

<div className="showStates">
  <i className="fal fa-times closeLetters" onClick={handleClick}></i>

{items.map((item) => {

  let selected= images.filter((img) => img.dataFilter.includes(item));
  {console.log(selected)}

  return (

  selected.map((selectedItem) => {
  return (
    <Form.Group>
      <Form.Check
        type="checkbox"
        className="img-fluid"
        label=<img src={selectedItem.image} className="img-fluid"/>
        // checked={usa === item.name}
        value={selectedItem.name}
        name="usa"
        onChange={handleUSStateChange}
      />
     <p className="tiny text-center">{selectedItem.id}</p>
       {console.log(selectedItem.name)}
       {console.log(selectedItem.image)}
    </Form.Group>
    )
  })

  )
}
)}

</div>

</Row>
  <div className="dropdownMenu">
    <Row>
      <div className="cc-selector d-flex justify-content-center align-items-center">
      
      <p className="moveDown">Filter Gender:</p>
{console.log(filters)}

        <Form.Group>

          <Form.Check
            type="checkbox"
            className="lime"
            label="Female"
            name="gender"
            checked={gender === "F"}
            value="F"

            onChange={handleGenderChange}
          />


    </Form.Group>
      <Form.Group controlId="M">
          <Form.Check
            type="checkbox"
            className="red"
            label="Male"
            name="gender"
            checked={gender === "M"}
            value="M"

            onChange={handleGenderChange}
          />
      </Form.Group>


      <p className="moveDown two">Filter Traffic Source:</p>

            <Form.Group controlId="Email">

              <Form.Check
                type="checkbox"
                className="orange"
                label="Email"
                checked={source === "Email"}
                value="Email"
                name="trafficSource"
                onChange={handleSourceChange}
              />

              </Form.Group>

              <Form.Group controlId="Facebook">

                <Form.Check
                  type="checkbox"
                  className="yellow"
                  label="FB"
                  checked={source === "Facebook"}
                  value="Facebook"
                  name="trafficSource"
                  onChange={handleSourceChange}
                />

                </Form.Group>


                  <Form.Group controlId="Search">

                    <Form.Check
                      type="checkbox"
                      className="purple"
                      label="Search"
                      checked={source === "Search"}
                      value="Search"
                      name="trafficSource"
                      onChange={handleSourceChange}
                    />

                    </Form.Group>




           <p className="moveDown two">Filter States:</p>
              <Button  className="map"  onClick={handleClick}>
          <i class="fal fa-map-marker-alt"></i>

              </Button>


      </div>




    </Row>
</div>

</div>



  );
};

export default DashboardFilters;
