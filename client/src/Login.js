
import React, {useState} from 'react';
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import { Link } from 'react-router-dom';
import "./App.css";


import { Accordion, AccordionButton, AccordionCollapse, AccordionContext, Alert, Anchor, Badge, Breadcrumb, BreadcrumbItem, Button, ButtonGroup, ButtonToolbar, Card, CardGroup, CardImg, Carousel, CarouselItem, CloseButton, Col, Collapse, Container, Dropdown, DropdownButton, Fade, Figure, FloatingLabel, Form, FormCheck, FormControl, FormFloating, FormGroup, FormLabel, FormSelect, FormText, Image, InputGroup, ListGroup, ListGroupItem, Modal, ModalBody, ModalDialog, ModalFooter, ModalHeader, ModalTitle, Nav, NavDropdown, NavItem, Navbar, NavbarBrand, Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle, Overlay, OverlayTrigger, PageItem, Pagination, Placeholder, PlaceholderButton, Popover, PopoverBody, PopoverHeader, ProgressBar, Ratio, Row, SSRProvider, Spinner, SplitButton, Stack, Tab, TabContainer, TabContent, TabPane, Table, Tabs, ThemeProvider, Toast, ToastBody, ToastContainer, ToastHeader, ToggleButton, ToggleButtonGroup, Tooltip} from 'react-bootstrap';



import AOS from 'aos';
import "aos/dist/aos.css"


function Login() {

  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/home")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });

    }


return (


  <>


<Container fluid className="padding-0">
  <div className="hero-banner-three">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <h1 className="hero-heading strong smallerh1">Please login with your credentials!</h1>


                        <div className="row">
                            <div className="col-lg-6 col-md-12 col-sm-12">

                        <form className="marginRight">


                                       <Form.Group className="mb-3" controlId="email-address">
                                           <Form.Label>Email</Form.Label>
                                           <Form.Control
                                           id="email-address"
                                           name="email"
                                           type="email"
                                           required
                                           placeholder="Email address"
                                           onChange={(e)=>setEmail(e.target.value)}
                                           />

                                       </Form.Group>

                                       <Form.Group className="mb-3" controlId="password">
                                         <Form.Label>Password</Form.Label>
                                         <Form.Control
                                         id="password"
                                         name="password"
                                         type="password"
                                         required
                                         placeholder="Password"
                                         onChange={(e)=>setPassword(e.target.value)}

                                       />
                                       </Form.Group>


                                       <button className="btn-one ripple-btn"
                                           onClick={onLogin}>
                                           Login
                                       </button>

                                       <p className="mt-30">
                                       Need an account?{' '}
                                       <NavLink to="/signup" className="strong">
                                       Sign up
                                       </NavLink>
                                       </p>

                        </form>

                        </div>
                      </div>
                    </div>








                    </div>





                </div>




            </div> {/* /.container */}






              </Container>
          </>


)

}

  export default Login;
