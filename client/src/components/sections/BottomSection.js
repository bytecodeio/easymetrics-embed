import React, { useState, useRef, useEffect } from "react";

import {
  Accordion,
  AccordionButton,
  AccordionCollapse,
  AccordionContext,
  Alert,
  Anchor,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  ButtonToolbar,
  Card,
  CardGroup,
  CardImg,
  Carousel,
  CarouselItem,
  CloseButton,
  Col,
  Collapse,
  Container,
  Dropdown,
  DropdownButton,
  Fade,
  Figure,
  FloatingLabel,
  Form,
  FormCheck,
  FormControl,
  FormFloating,
  FormGroup,
  FormLabel,
  FormSelect,
  FormText,
  Image,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Nav,
  NavDropdown,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  OffcanvasTitle,
  Overlay,
  OverlayTrigger,
  PageItem,
  Pagination,
  Placeholder,
  PlaceholderButton,
  Popover,
  PopoverBody,
  PopoverHeader,
  ProgressBar,
  Ratio,
  Row,
  SSRProvider,
  Spinner,
  SplitButton,
  Stack,
  Tab,
  TabContainer,
  TabContent,
  TabPane,
  Table,
  Tabs,
  ThemeProvider,
  Toast,
  ToastBody,
  ToastContainer,
  ToastHeader,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "react-bootstrap";

const PriceTwoContent = [
  {
    name: "Standard",
    price: "200",
    className: "",
    features: ["Looker", "Ut enim ad minim veniam", "Ut enim ad minim veniam"],
    fade: "fade-right",
    dataDelay: "",
  },
  {
    name: "Gold",
    price: "2507.",
    price2: "99",
    className: "active",
    features: ["Looker", "Ut enim ad minim veniam", "Ut enim ad minim veniam"],
    fade: "fade-up",
    dataDelay: "100",
  },
  {
    name: "Diamond",
    price: "3509.",
    price2: "99",
    className: "",
    features: ["Looker", "Ut enim ad minim veniam", "Ut enim ad minim veniam"],
    fade: "fade-left",
    dataDelay: "",
  },
];

import AOS from "aos";
import "aos/dist/aos.css";

function BottomSection() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [navbar, setNavbar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (window.scrollY >= 68) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", toggleMenu);

  return (
    <Container fluid>
      <div className="theme-inner-banner" id="pricing">
        <Container>
          <h2 class="intro-title text-center">Pricing</h2>
          <ul class="page-breadcrumb style-none d-flex justify-content-center"></ul>
        </Container>
        <img src="./images/shape_38.svg" alt="" class="shapes shape-one" />
        <img src="./images/shape_39.svg" alt="" class="shapes shape-two" />
      </div>

      <div className="pricing-section-two position-relative mt-150 mb-180 lg-mt-80 lg-mb-80 mb-5">
        <Container>
          <Row className="row align-items-center">
            <Col sm={12} md={12} lg={12} className="m-auto">
              <div
                className="title-style-one text-center mb-20"
                data-aos="fade-up"
              >
                <div className="sc-title-five">Pricing</div>
                <h2 className="main-title strong">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </h2>
              </div>
            </Col>
          </Row>
          <div className="pricing-table-area-two mt-5">
            <Row>
              <Col sm={12} md={12} lg={10} className="m-auto">
                <Row className="justify-content-center">
                  {PriceTwoContent.map((val, i) => (
                    <Col
                      key={i}
                      xs={12}
                      sm={12}
                      md={6}
                      lg={4}
                      data-aos={val.fade}
                      data-aos-delay={100}
                    >
                      <div
                        className={`pr-table-wrapper tran3s mt-40 ${val.className}`}
                      >
                        <div className="pack-name">{val.name}</div>
                        <div className="price">
                          <sup>$</sup>
                          {val.price}
                          <sup>{val.price2}</sup>
                        </div>
                        <ul className="pr-feature style-none mb-5">
                          {val.features.map((list, i) => (
                            <li key={i}>{list}</li>
                          ))}
                        </ul>
                        <a href="#" className="btn-seven w-100 mt-5">
                          Utminim.
                        </a>
                      </div>
                      {/* /.pr-table-wrapper */}
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
            <Row className="marginTop marginBottom">
              <div className="col-xxl-5 col-xl-6 col-lg-7 m-auto">
                <p className="info mt-75 lg-mt-50 mb-5" data-aos="fade-up">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco.
                </p>
              </div>
            </Row>

    
          </div>
          {/* /.pricing-table-area-two */}
        </Container>
        <img
          src="images/shape/shape_34.svg"
          alt=""
          className="shapes shape-one"
        />
      </div>
      {/* /.pricing-section-two */}
    </Container>
  );
}

export default BottomSection;
