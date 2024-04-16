import React, { useCallback } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";

import "../../App.css";

const EmbedDashboard = ({ setDashboard, setFilters }) => {
  const [loading, setLoading] = React.useState(true);

  const makeDashboard = useCallback((el) => {

        // el.innerHTML = "";

      LookerEmbedSDK.createLookWithId(242)
      .appendTo(el)

      .on("dashboard:loaded", (e) => {
        console.log(
          "LookerEmbedSDK.createDashboardWithId()::Successfully Loaded!"
        );

        console.log("🚀 ~ file: EmbedDashboard.js:26 ~ .on ~ e:", e);

      }

    )

      .build()

      .connect()
      // the dashboard object passed here allows for sending messages/events to the embedded dashboard
      // we save this to state, and we can later use this object to send a filter update event to the dashboard
      .then((dashboard) => {
        setDashboard(dashboard);
        setLoading(false);
      })

      .catch((error) => {
        console.error("An unexpected error occurred", error);
      });
  }, []);

  return <Dashboard ref={makeDashboard}></Dashboard>;
};

// A little bit of style here for heights and widths.
const Dashboard = styled.div`
  iframe {
    width: 100%;
    height: 100%;
  }
`;
export default EmbedDashboard;
