
import React, { useState, useEffect } from 'react';


import TopNav from './components/nav/TopNav.js';


import TopSection from './components/sections/TopSection.js';

import ToTopButton from './components/sections/ToTopButton.js';

import AOS from 'aos';
import "aos/dist/aos.css"


function Home( { premium, tier } ) {


return (
  <>
<TopNav changeTier={tier} premium={premium} />

<TopSection/>


<ToTopButton/>


       </>

)

}

  export default Home;
