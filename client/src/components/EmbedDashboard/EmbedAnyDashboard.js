import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import "../../App.css";

const EmbedAnyDashboard = (id) => {

  const [loading, setLoading] = React.useState(true);

  const makeDashboard = useCallback((el) => {
    LookerEmbedSDK.createDashboardWithId(id.id)
    .appendTo(el)
    .on("dashboard:loaded", (e) => {
      console.log("LookerEmbedSDK.createDashboardWithId()::Successfully Loaded!");
    })
    .build()
    .connect()
    .then(() => setLoading(false))
    .catch((error) => {
      console.error("An unexpected error occurred", error);
    });
  }, []);


  return (
    <Dashboard ref={makeDashboard}/>
  );
};


// A little bit of style here for heights and widths.
const Dashboard = styled.div`
    iframe {
    width: 100%;
    height: 100%;
  }
`;
export default EmbedAnyDashboard;
