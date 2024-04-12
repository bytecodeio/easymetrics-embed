
import React, { useCallback } from "react";
import styled from "styled-components";
import { LookerEmbedSDK } from "@looker/embed-sdk";


/**
 * First initialized the embed sdk using the endpoint in /backend/routes/api.js
 * Gets explore with ID, can be found in the url by viewing the explore via your looker instance   */

const EmbedExplore = () => {
  const [loading, setLoading] = React.useState(true);
  /*
   Step 1 Initialization of the EmbedSDK happens when the user first access the application
   See App.js for reference
  */
  const createExplore = useCallback((el) => {
    if (!el) {
      return;
    }
    el.innerHTML = "";
    /*
      Step 2 Create your Explore through a simple set of chained methods
    */
    LookerEmbedSDK.createExploreWithId(
      "sales_demo_the_look/order_items"
    )
      // adds the iframe to the DOM as a child of a specific element
      .appendTo(el)
      // this line performs the call to the auth service to get the iframe's src='' url, places it in the iframe and the client performs the request to Looker
      .build()
      // this establishes event communication between the iframe and parent page
      .connect()
      .then(() => setLoading(false))
      // catch various errors which can occur in the process (note: does not catch 404 on content)
      .catch((error) => {
        console.error("An unexpected error occurred", error);
      });
  }, []);
  return (
    <>
      <div
        className="stuff"
        style={{ width: "100%", height: "calc(100% - 45px)" }}
      >
        {/* Step 0 we have a simple container, which performs a callback to our createExplore function */}
        <Explore ref={createExplore}></Explore>
      </div>
    </>
  );
};

const Explore = styled.div`
  width: 100%;
  height: calc(100% - 30px);
  & > iframe {
    width: 100%;
    height: 100%;
  }
`;

export default EmbedExplore;
