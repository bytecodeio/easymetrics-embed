var express = require("express");
var config = require("../config");
var router = express.Router();
const { LookerNodeSDK } = require("@looker/sdk-node");
const sdk = LookerNodeSDK.init40();

var createSignedUrl = require("../auth/auth_utils");

/*****************************************
 * Authentication                        *
 *****************************************/

/**
 * Create an API auth token based on the provided embed user credentials
 */
router.get("/embed-user/token", async (req, res) => {
  const userCred = await sdk.ok(sdk.user_for_credential("embed", req.query.id));
  const embed_user_token = await sdk.login_user(userCred.id.toString());
  const u = {
    user_token: embed_user_token.value,
    token_last_refreshed: Date.now(),
  };
  res.json({ ...u });
});

/**
 * Update the embed users permissions
 */
router.post("/embed-user/:id/update", async (req, res) => {
  const userCred = await sdk.ok(sdk.user_for_credential("embed", req.params.id));
  const attrs = {
    value: "Jeans",
  };
  await sdk.set_user_attribute_user_value(userCred.id, 23, attrs);
  res.json({ status: "updated" });
});

/**
 * Create a signed URL for embedding content
 */
const host = process.env.LOOKERSDK_EMBED_HOST; // Might need to be different than API baseurl (port nums)
const secret = process.env.LOOKERSDK_EMBED_SECRET;

router.get("/auth", (req, res) => {
  const src = req.query.src;
  const user = config.authenticatedUser[req.headers.usertoken];
  console.log(config.authenticatedUser[req.headers.usertoken]);
  const url = createSignedUrl(src, user, host, secret);
  res.json({ url });
});

/**
 * Endpoint for signing an embed URL. Embed SSO parameters can be passed in as
 * part of the body
 */
router.post("/sso-url", async (req, res) => {
  const body = req.body;
  const targetUrl = body.target_url;
  const response = {
    url: createSignedUrl(targetUrl, body, host, secret),
  };
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(response);
});

/****************************************
 * Backend Data API calls               *
 ****************************************/

/**
 * Get details of the current authenticated user
 */
router.get("/me", async (req, res, next) => {
  const me = await sdk.ok(sdk.me()).catch((e) => console.log(e));
  res.send(me);
});

/**
 * Get a list of all looks the authenticated user can access
 */
router.get("/looks", async (req, res, next) => {
  const looks = await sdk
    .ok(sdk.all_looks("id,title,embed_url,query_id"))
    .catch((e) => console.log(e));
  res.send(looks);
});

/**
 * Run the query associated with a look, and return that data as a json response
 */
router.get("/looks/:id", async (req, res, next) => {
  let target_look = req.params.id;
  let query_data = await sdk.ok(sdk.look(target_look, "query")).catch((e) => console.log(e));
  delete query_data.query.client_id;

  let newQuery = await sdk.ok(sdk.create_query(query_data.query)).catch((e) => console.log(e));

  let newQueryResults = await sdk
    .ok(sdk.run_query({ query_id: Number(newQuery.id), result_format: "json" }))
    .catch((e) => {
      console.log(e);
      res.send({ error: e.message });
    });
  res.send(newQueryResults);
});

/**
 * Run the query associated with a dashboard, and return that data as a json response
 */
router.get("/dashboard/:id", async (req, res, next) => {
  const { id } = req.params;
  console.log("dashboard", id);
  sdk
    .ok(sdk.dashboard(id))
    .then((res_sdk) => {
      Promise.all(
        res_sdk.dashboard_elements.map(
          (element) =>
            new Promise((resolve, reject) => {
              sdk
                .ok(sdk.run_query({ query_id: element.query.id, result_format: "json" }))
                .then((res_query) => {
                  console.log("query-data", element.title, res_query, Object.values(res_query)[0]);

                  switch (element.title) {
                    case "Website Visit Volume vs Conversion Rate":
                      resolve({
                        title: element.title,
                        query:
                          Math.round(
                            Object.values(res_query)[0]["events.overall_conversion"] * 100
                          ).toFixed(0) + "%",
                        img: "./images/icon/icon_11.svg",
                      });
                    case "Orders To Date":
                      resolve({
                        title: element.title,
                        query: Object.values(res_query)[0]["orders.number_of_orders"],
                        img: "./images/icon/icon_08.svg",
                      });
                    case "Orders by Day and Category":
                      resolve({
                        title: element.title,
                        query:
                          Object.values(res_query)[0]["orders.number_of_orders"][
                            "products.category"
                          ]["Accessories"],
                        img: "./images/icon/icon_31.svg",
                      });
                    case "Total Sales YoY":
                      resolve({
                        title: element.title,
                        query:
                          Object.values(res_query)[0]["order_items.total_sale_price"][
                            "order_items.created_year"
                          ]["2022"].toFixed(2),
                        img: "./images/icon/icon_30.svg",
                      });
                    case "Repeat Purchase Rate":
                      resolve({
                        title: element.title,
                        query:
                          Math.round(
                            Object.values(res_query)[0][
                              "repeat_purchases.percentage_repeat_purchase"
                            ] * 100
                          ).toFixed(0) + "%",
                        img: "./images/icon/icon_29.svg",
                      });
                    case "Average Order Value":
                      resolve({
                        title: element.title,
                        query:
                          "$" +
                          Object.values(res_query)[0]["order_items.average_sale_price"].toFixed(2),
                        img: "./images/icon/icon_09.svg",
                      });
                    case "Age Profile":
                      resolve({
                        title: element.title,
                        query:
                          Object.values(res_query)[0]["orders.number_of_orders"][
                            "users.age_buckets"
                          ]["Below 35"] + " Below 35",

                        img: "./images/icon/icon_39.svg",
                      });
                    case "Number of Users":
                      resolve({
                        title: element.title,
                        query: Object.values(res_query)[0]["users.number_of_users"],
                        img: "./images/icon/icon_10.svg",
                      });
                    case "Gender Profile":
                      resolve({
                        title: element.title,
                        query: Object.values(res_query)[0]["users.gender"][0],
                        img: "./images/icon/icon_37.svg",
                      });
                    default:
                      resolve({
                        title: element.title,
                        query: 0,
                      });
                  }
                })
                .catch((err) => {
                  console.log("err", err);
                  reject();
                });
            })
        )
      ).then((values) => {
        res.send(values);
        // setDashboardData(values);
      });
    })
    .catch((e) => res.send({ error: e.message }));
});

router.get('/dashboard-filters/:id', async (req, res) => {
  try {
    // Extract the dashboard ID from the request parameters
    const dashboardId = parseInt(req.params.id, 10);

    // Call the SDK function with the dashboard ID
    const response = await sdk.ok(sdk.dashboard(dashboardId, 'dashboard_filters'));

    // Send the response back to the client
    res.json(response);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching LookML dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});

// This fetches tiles from a static folder name. 
router.get('/fetch-tiles', async (req, res) => {
  try {
    // Call the SDK function with the folder name
    let response = await sdk.ok(sdk.search_folders(
      {
        fields: 'dashboards, id',
        name: 'Tiles'
      }))
    // Send the response back to the client
    res.json(response);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching tiles:', error);
    res.status(500).send('Internal Server Error');
  }
});


// This fetches existing reports from a static folder name. In production, this will be customer-specific.
// Instead of being based on the folder name, perhaps it will be based on customer data stored elsewhere
router.get('/fetch-customer-reports', async (req, res) => {
  try {
    // Call the SDK function with the folder name
    let response = await sdk.ok(sdk.search_folders(
      {
        fields: 'dashboards, id',
        name: 'Client Dashboards'
      }))
    // Send the response back to the client
    res.json(response);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching client dashboards:', error);
    res.status(500).send('Internal Server Error');
  }
});

// This fetches existing reports from a static folder name.
// It will be a folder all customers have access to, 
// and will be used to populate the list of initial reports
router.get('/fetch-shared-reports', async (req, res) => {
  try {
    // Call the SDK function with the folder name
    let response = await sdk.ok(sdk.search_folders(
      {
        fields: 'dashboards, id',
        name: 'Shared Reports'
      }))
    // Send the response back to the client
    res.json(response);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching shared reports:', error);
    res.status(500).send('Internal Server Error');
  }
});

// This fetches lookml for a user defined dashboard
router.get('/dashboard-lookml/:id', async (req, res) => {
  try {
    // Extract the dashboard ID from the request parameters
    const dashboardId = parseInt(req.params.id, 10);

    // Call the SDK function with the dashboard ID
    const responseTest = await sdk.ok(sdk.dashboard_lookml(dashboardId));

    // Send the response back to the client
    res.json(responseTest);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching LookML dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});

// This fetches a thumbnail image for a user defined dashboard
router.get('/dashboard-thumbnail/:id', async (req, res) => {
  try {
    // Extract the dashboard ID from the request parameters
    const dashboardId = parseInt(req.params.id, 10);

    // Call the SDK function with the dashboard ID
    const responseTest = await sdk.ok(sdk.content_thumbnail({
      type:"dashboard",
      resource_id: req.params.id
    }));

    // Set the Content-Type header to image/svg+xml
    res.setHeader('Content-Type', 'image/svg+xml');

    // Send the SVG image data as the response
    res.send(responseTest);
  } catch (error) {
    // Handle any errors
    console.error('Error fetching LookML dashboard image:', error);
    res.status(500).send('Internal Server Error');
  }
});

// This creates a new dashboard from LookML
router.post('/import-dashboard', async (req, res) => {
  try {
    // Extract folder_id and lookml (newYaml) from the request body
    const { folder_id, lookml } = req.body;

    // Ensure folder_id and lookml are provided
    if (!folder_id || !lookml) {
      return res.status(400).send('Missing folder_id or lookml in request body');
    }

    // Call the SDK function with the folder_id and lookml
    let response = await sdk.ok(sdk.import_dashboard_from_lookml({
      folder_id: folder_id,
      lookml: lookml
    }));

    // Send the response back to the client
    res.json(response);
  } catch (error) {
    // Handle any errors
    console.error('Error creating dashboard from LookML:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
