import React, {  useEffect, useState } from "react";
import styled from "styled-components";
import "../../App.css";
import { api } from "../../helpers/ApiHelper";

const imageCache = {};

const EmbedImage = ({ id, title }) => {
  const [imageUrl, setImageUrl] = useState("");
  

  useEffect(() => {
    if (imageCache[id]) {
      setImageUrl(imageCache[id]);
      return;
    }
    const fetchImage = async () => {
      try {
        const response = await api.get(`${process.env.API_HOST}/api/dashboard-thumbnail/${id}`)
        const imageUrl = `data:image/svg+xml,${encodeURIComponent(response)}`;
        setImageUrl(imageUrl);
        imageCache[id] = imageUrl;
      } catch (error) { console.error("Error fetching image", error) }
    }

    fetchImage();

  }, [id]);

  return imageUrl ? <>
  <h4>{title}</h4>
  <img key={id} src={imageUrl} alt="Dashboard Thumbnail" />
  </> : <div key={id}></div>;
}

export default EmbedImage;
