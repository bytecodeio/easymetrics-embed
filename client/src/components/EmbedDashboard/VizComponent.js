import React, { useState, useEffect } from "react";
import { sdk } from "../../helpers/CorsSessionHelper";
import { api } from "../../helpers/ApiHelper";

import { Container, Row } from "react-bootstrap";

const EmbedComponent = () => {
  const [dashboardData, setDashboardData] = useState([]);
  useEffect(async () => {
    api
      .get(`${process.env.API_HOST}/api/dashboard/789`)
      .then((values) => {
        setDashboardData(values);
      })
      .catch((err) => {});
  }, []);

  return (
    <Container>
      <Row className="row gx-xxl-5 pb50 pt50">
        {dashboardData.map((data) => {
          return (
            <div class="col-lg-4 col-sm-6 mb-40 xs-mb-30 d-flex" data-aos-delay="">
              <div class="block-style-four">
                <div class="d-flex align-items-center justify-content-center flex-column">
                  <img src={data.img} className="img-fluid" />
                  <h5>{data.title}</h5>
                  <p>{data.query}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Row>
    </Container>
  );
};

export default EmbedComponent;
