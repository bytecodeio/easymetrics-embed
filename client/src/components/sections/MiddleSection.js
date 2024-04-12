import React, { useState, useRef, useEffect } from "react";


import EmbedSDKInit from "../common/EmbedInit";

import { Col, Container, Row } from "react-bootstrap";

import EmbedDashboard from "../EmbedDashboard/EmbedDashboard";
import DashboardFilters from "../EmbedDashboard/DashboardFilters";
import DashboardFilters2 from "../EmbedDashboard/DashboardFilters2";
import DashboardFilters3 from "../EmbedDashboard/DashboardFilters3";
import Vis from "../EmbedDashboard/VizComponent.js";

import AOS from "aos";
import "aos/dist/aos.css";

const ProcessContent = [
  {
    num: 1,
    className: "numb tran3s",
    heading: "Filter Gender",
    desc:
      "Filter by male of female according to icons.",
    dataDelay: "",
  },
  {
    num: 2,
    className: "numb tran3s",
    heading: "Filter Traffic Source",
    desc:
      "Filter by traffic source according to icons.",
    dataDelay: "50",
  },
  {
    num: 3,
    className: "numb tran3s",
    heading: "Filter by U.S. State",
    desc:
      "Filter by state. Select pin and you will see a list of letters that shows each state.",
    dataDelay: "100",
  },
];

function MiddleSection() {
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
          <h2 class="intro-title text-center">Services</h2>
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
                  <div className="sc-title">Looker's Embed SDK</div>
                  <h2 className="main-title strong">
                    Embedded <span>Dashboard </span> & custom filters.
                  </h2>

                </div>

                <ul className="style-none list-item">
                  {ProcessContent.map((val, i) => (
                    <li
                      key={i}
                      data-aos="fade-up"
                      data-aos-delay={val.dataDelay}
                    >
                      <div className={val.className}>{val.num}</div>
                      <h6>{val.heading}</h6>
                      <span>{val.desc}</span>
                    </li>
                  ))}
                </ul>

                <p>You can also toggle back and forth between <span className="strong">Standard User</span> and <span className="strong">Premium User</span> in the top navigation above <i class="far fa-long-arrow-up"></i> to moderate the permissions the Looker dashboard allows below <i class="far fa-long-arrow-down"></i></p>
              </div>
            </Col>
          </Row>

          <Row>


            <div className="position-relative">


                <DashboardFilters3
                  filters={filters}
                  setFilters={setFilters}
                  dashboard={dashboard}
                />



              <Col sm={12} md={12} lg={12} className="embed-responsive embed-responsive-16by9">


                <EmbedDashboard

                  setDashboard={setDashboard}
                  setFilters={setFilters}
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

      <div className="fancy-short-banner-five mt-5">
        <div className="container">
          <div className="bg-wrapper">
            <div className="row align-items-center">
              <div
                className="col-lg-6 text-center text-lg-start"
                data-aos="fade-right"
              >
                <h3 className="pe-xxl-5 md-pb-20">
                  Learn more about our Looker services.
                </h3>
              </div>
              <div
                className="col-lg-6 text-center text-lg-end"
                data-aos="fade-left"
              >
                <a to="/contact" className="msg-btn tran3s">
                  Send Us Message
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default MiddleSection;
