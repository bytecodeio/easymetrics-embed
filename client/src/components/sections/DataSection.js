import React, { useState, useRef, useEffect } from "react";


import EmbedSDKInit from "../common/EmbedInit";


import { Col, Container, Row } from "react-bootstrap";

import EmbedDashboard2 from "../EmbedDashboard/EmbedDashboard2";
import EmbedDashboard3 from "../EmbedDashboard/EmbedDashboard3";
import EmbedDashboard4 from "../EmbedDashboard/EmbedDashboard4";
import EmbedDashboard5 from "../EmbedDashboard/EmbedDashboard5";
import Vis from "../EmbedDashboard/VizComponent.js";

import AOS from "aos";
import "aos/dist/aos.css";

const ProcessContent = [
  {
    num: 1,
    className: "numb tran3s",
    heading: "Minim Veniam",
    desc:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    dataDelay: "",
  },
  {
    num: 2,
    className: "numb tran3s",
    heading: "Minim Veniam",
    desc:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    dataDelay: "50",
  },
  {
    num: 3,
    className: "numb tran3s",
    heading: "Minim Veniam",
    desc:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip",
    dataDelay: "100",
  },
];

function DataSection() {
  EmbedSDKInit();

  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  const [navbar, setNavbar] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState();
  const [dashboard, setDashboard] = useState();

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
      <div className="theme-inner-banner" id="services">
        <Container>
          <h2 class="intro-title text-center">Custom Visualizations</h2>
          <ul class="page-breadcrumb style-none d-flex justify-content-center"></ul>
        </Container>
        <img src="./images/shape_38.svg" alt="" class="shapes shape-one" />
        <img src="./images/shape_39.svg" alt="" class="shapes shape-two" />
      </div>

      <div className="fancy-feature-nineteen position-relative mb-5">
        <Container className="mb-5">
          <Row>
            <Col sm={12} md={12} lg={12}>
            <p>Using visualization components to build a custom visualization is appropriate when the custom visualization is intended for an embedded application or extension. If you want to make the custom visualization available to Looker users across a Looker instance, follow the instructions on the visualization documentation page. If you want to develop a custom visualization and upload it to the Looker Marketplace, follow the instructions on the Developing a custom visualization for the Looker Marketplace documentation page.</p>
            </Col>
          </Row>

          <Row>
            <div className="position-relative">


              <Col sm={12} md={12} lg={12} className="embed-responsive embed-responsive-16by9 small mb-0">


                <EmbedDashboard2
                />
                <div className="abso"></div>
              </Col>
            </div>
          </Row>

          <Row>
            <div className="position-relative">

              <Col sm={12} md={12} lg={12} className="embed-responsive embed-responsive-16by9 small">


                <EmbedDashboard3
                />
                <div className="abso"></div>
              </Col>
            </div>
          </Row>



                    <Row>
                      <div className="position-relative">

                        <Col sm={12} md={12} lg={12} className="embed-responsive embed-responsive-16by9 small">


                          <EmbedDashboard4
                          />
                          <div className="abso"></div>
                        </Col>
                      </div>
                    </Row>



          <Row>
            <div className="position-relative">

              <Col sm={12} md={12} lg={12} className="embed-responsive embed-responsive-16by9 small">


                <EmbedDashboard5
                />
                <div className="abso"></div>
              </Col>
            </div>
          </Row>
        </Container>

        <div className="shapes oval-one" />
        <div className="shapes oval-two" />
        {/*<img src="./images/shape_35.svg" alt="" className="shapes bg-shape"/>*/}
      </div>


    </Container>
  );
}

export default DataSection;
