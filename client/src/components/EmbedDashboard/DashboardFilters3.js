import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";

import { sdk } from "../../helpers/CorsSessionHelper";

import "../../App.css";

import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip } from 'react-bootstrap';

import { dashboard } from "@looker/sdk/lib/3.1/funcs";
import images from "./images.js";


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

const genderOptions = [
  {
    value: "M",
    class: "red",
    label: "Male",
  },
  {
    value: "F",
    class: "lime",
    label: "Female",
  },
];






const trafficOptions = [
  {
    value: "Email",
    class: "orange",
    label: "Email",
  },
  {
    value: "Facebook",
    class: "yellow",
    label: "FB",
  },
  {
    value: "Search",
    class: "purple",
    label: "Search",
  },
];

const defaultSelectedFilters = {
  Gender: [],
  State: [],
  ["Traffic Source"]: []
};

const DashboardFilters3 = ({ dashboard }) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isActive, setIsActive] = useState(false);
    const handleClick = event => {
      setIsActive(current => !current);
    };



  const [selectedFilters, setSelectedFilters] = useState(
    defaultSelectedFilters
  );

  const updateFilter = (filterName, value) => {
    setSelectedFilters((prevSelectedFilters) => {
      let newFilters;
      if (prevSelectedFilters[filterName].includes(value)) {
        // the library Immer makes these kinds of immutable updates easier, but I didn't want to add an additional library for this example
        newFilters = {
          ...prevSelectedFilters,
          [filterName]: prevSelectedFilters[filterName].filter(
            (filterValue) => filterValue !== value
          ),
        };
      } else {
        newFilters = {
          ...prevSelectedFilters,
          [filterName]: [...prevSelectedFilters[filterName], value],
        };
      }
      return newFilters;
    });
  };


  console.log(selectedFilters)

  // Update embedded dashboard filters any time selectedFilters state changes
  useEffect(() => {
    if (dashboard) {
      const lookerFormattedFilters = {};
      Object.entries(selectedFilters).forEach(([filterName, value]) => {
        lookerFormattedFilters[filterName] = value.join(",");
      });
      dashboard.send("dashboard:filters:update", {
        filters: lookerFormattedFilters,
      });
      dashboard.send("dashboard:run");
    }
  }, [selectedFilters]);



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

        value={selectedItem.name}
        name="usa"

        checked={selectedFilters.State.includes(selectedItem.name)}

        onClick={() => updateFilter("State", selectedItem.name)}

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

      <Row>
        <div className="dropdownMenu">

          <div className="cc-selector d-flex justify-content-center align-items-center">
            {console.log(selectedFilters)}

            <p className="moveDown">Filter Gender:</p>

            {genderOptions.map((genderOption) => (
              <Form.Group>
                <Form.Check
                  type="checkbox"
                  className={genderOption.class}
                  label={genderOption.label}
                  name="Gender"
                  checked={selectedFilters.Gender.includes(genderOption.value)}
                  value={genderOption.value}
                  onClick={() => updateFilter("Gender", genderOption.value)}
                />
              </Form.Group>


            ))}

          <p className="moveDown two">Filter Traffic Source:</p>


          {trafficOptions.map((trafficOption) => (
            <Form.Group>
              <Form.Check
                type="checkbox"
                className={trafficOption.class}
                label={trafficOption.label}
                name="Gender"
                checked={selectedFilters["Traffic Source"].includes(trafficOption.value)}
                value={trafficOption.value}
                onClick={() => updateFilter(["Traffic Source"], trafficOption.value)}
              />
            </Form.Group>


          ))}

          <p className="moveDown two">Filter States:</p>
             <Button  className="map"  onClick={handleClick}>
         <i class="fal fa-map-marker-alt"></i>

             </Button>




          </div>
        </div>
      </Row>
    </div>
  );
};

export default DashboardFilters3;
