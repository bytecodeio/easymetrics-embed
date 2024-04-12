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

// const EmbedComponent = (props) => {
//
//   const [queryId, updateQueryId] = useState();
//
//
//   useEffect( async () => {
//
//      var a = sdk.ok(sdk.run_query({query_id: '20388', result_format: 'json'})).then((res) => {
//
//        var values = []
//        for(var k in a){
//          values.push(a[k]);
//          console.
//        }
//       console.log("this is data", res);
//
//
//       console.log(res[0])
//
//     });
//
//
//
//
//   }, []);
//
//
// const [queryDash, setQueryId] = useState();
// useEffect( () => {
//
//  sdk.ok(sdk.dashboard('789')).then((res) => {
//     console.log(res);
//
//
//   setQueryId(res.dashboard_elements[0].title);
//
//
//     for (let result in res.dashboard_elements) {
//       let query = res.dashboard_elements[result].query.id;
//
//       let title = res.dashboard_elements[result].title;
//
//       console.log('Title ', title);
//       console.log('query ', query);
//
//
//
//     }
//   });
// }, []);

//
//
//
//
//   return (
//
//
//
//       <div>
//
//             <p>{queryDash}</p>
//
//       </div>
//
//
//   );
// };
//
// export default EmbedComponent;
