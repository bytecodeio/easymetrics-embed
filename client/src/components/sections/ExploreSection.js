import React, { useState, useRef, useEffect } from "react";


import EmbedSDKInit from "../common/EmbedInit";

import { Col, Container, Row } from "react-bootstrap";

import EmbedExplore from "../EmbedDashboard/EmbedExplore.js";
import SavedDashboards from "../EmbedDashboard/SavedDashboards.js";


import AOS from "aos";
import "aos/dist/aos.css";

const ProcessContent = [
  {
    num: 1,
    className: "numb tran3s",
    heading: "Minim Veniam",
    desc:
      "Choose Explore from Here from a saved Look, or navigate to the Explore page and create the desired visualization.",
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

function ExploreSection() {
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
          <h2 class="intro-title text-center">Embedded Explore</h2>
          <ul class="page-breadcrumb style-none d-flex justify-content-center"></ul>
        </Container>
        <img src="./images/shape_38.svg" alt="" class="shapes shape-one" />
        <img src="./images/shape_39.svg" alt="" class="shapes shape-two" />
      </div>

      <div className="fancy-feature-nineteen position-relative pt-130 lg-pt-80 mb-5">
        <Container className="mb-5">
          <Row>
            <Col sm={12} md={12} lg={12}>
              <div className="block-style-thirteen" data-aos="fade-right">
                <div className="title-style-three pb-15">
                  <div className="sc-title">Embedding an Explore</div>
                  <h2 className="main-title strong">
                    Looker <span>Embed </span> SDK.
                  </h2>
                </div>

              </div>
            </Col>
          </Row>

          <Row>



            <div className="position-relative mt-50">

            <p>Explorer is a new tool designed to help you find insights faster. The Explorer streamlines the editing, viewing and data visualization experience. Apply filters quickly. Export your explorations to new or existing reports. Looker’s Embed SDK is a library of functions that you can add to the code of your browser-based web application to manage embedded dashboards, Looks, and Explores in your web app.</p>
            <p>You must select <span className="strong">Premium User</span> above <i class="far fa-long-arrow-up"></i> to see the Explore below <i class="far fa-long-arrow-down"></i></p>


              <Col sm={12} md={12} lg={12} className="embed-responsive embed-responsive-16by9 small">


                <EmbedExplore/>
                <div className="abso"></div>
              </Col>
            </div>
          </Row>






                    <Row>



                      <div className="position-relative">


                        <Col sm={12} md={12} lg={12} className="embed-responsive embed-responsive-16by9 small">



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

export default ExploreSection;
