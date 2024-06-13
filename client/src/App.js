import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import EmbedSDKInit from "./components/common/EmbedInit";

import AOS from 'aos';
import "aos/dist/aos.css"
import Home from './Home.js';

function App() {
  const defaultPremiumValue = localStorage.getItem('premium');
  console.log('local storage value', defaultPremiumValue)
  const [premium, setPremium] = useState(defaultPremiumValue);
  console.log('premium', premium);

  const handleTier = (tier) => {
    setPremium(tier);
    localStorage.setItem('premium', tier);
    window.location.reload();
  }


  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  EmbedSDKInit();

  return (
    <div>
      <div className="main-page-wrapper">
        <Router>
          <div>
            <section>
              <Routes>
                <Route path="/home" element={<Home tier={handleTier} premium={premium} />} />
                <Route path="/" element={<Home tier={handleTier} premium={premium} /> } />
              </Routes>
            </section>
          </div>
        </Router>


      </div>
    </div>

  );
}

export default App;
