import React, { useEffect, useState, useContext } from "react";
import { LookerEmbedSDK } from "@looker/embed-sdk";
import { ExtensionContext } from "@looker/extension-sdk-react";
import EmbedSDKInit from "../common/EmbedInit";
import  EmbedExplore  from "./EmbedExplore.js";

const SavedDashboards = () => {
  const sdk = useContext(ExtensionContext).core40SDK;
  

  //const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);

  // fetch folder dashboards on load
  const folderIds = [373];
  const [folderDashboards, setFolderDashboards] = useState([
    {
      folderName: "",
      dashboards: [],
    },
  ]);
  console.log(
    "this is saved folder",
    folderDashboards
  );

  const getFolderDashboards = async (folderId) => {
    const response = await sdk.ok(sdk.folder_dashboards(folderId, "id, title"));
    return response;
  };
  const getFolderName = async (folderId) => {
    const response = await sdk.ok(sdk.folder(folderId, "name"));
    return response;
  };
  const initializeFolderDashboards = async () => {
    try {
      const fetchedFolderDashboards = [];
      folderIds.forEach(async (id) => {
        const [folderNameResponse, dashboards] = await Promise.all([
          getFolderName(id),
          getFolderDashboards(id),
        ]);
        fetchedFolderDashboards.push({
          folderName: folderNameResponse.name,
          dashboards,
        });
      });
      setFolderDashboards(fetchedFolderDashboards);
    } catch (e) {
      console.error("Error fetching Looker folder dashboards: ", e);
    }
  };

  useEffect(() => {
    initializeFolderDashboards();
  }, []);

  return (
    <>

      <EmbedExplore />
    </>
  );
};

export default SavedDashboards;
