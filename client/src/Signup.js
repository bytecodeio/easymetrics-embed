


import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase';
import "./App.css";
import Tilt from 'react-parallax-tilt';

import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem,  Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';



import AOS from 'aos';
import "aos/dist/aos.css"


function Signup() {



  const navigate = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      navigate("/login")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });


  }

  return (

    <Container fluid className="padding-0">
    <div className="hero-banner-three">
    <div className="container">
    <div className="row">
    <div className="col-lg-7 col-md-12 col-sm-12">
    <h1 className="hero-heading strong smallerh1">Next Level Client Support with MiniByte IO.</h1>
    <p className="text-lg">MiniByte delivering blazing fast, striking Looker solution.</p>

    <form className="marginRight">


    <Form.Group className="mb-3" controlId="email-address">
    <Form.Label>Email</Form.Label>
    <Form.Control
    id="email-address"
    name="email"
    type="email"
    label="Email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    placeholder="Email address"
    />

    </Form.Group>

    <Form.Group className="mb-3" controlId="password">
    <Form.Label>Password</Form.Label>
    <Form.Control
    id="password"
    name="password"
    type="password"
    label="Create password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    placeholder="Password"
    />
    </Form.Group>


    <button className="btn-one ripple-btn"
    type="submit"
    onClick={onSubmit}
    >
    Sign Up
    </button>

    </form>


    <p className="mt-30">
    Already have an account?{' '}
    <NavLink to="/login" className="strong">
    Sign in
    </NavLink>
    </p>
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




  )

}

export default Signup;
