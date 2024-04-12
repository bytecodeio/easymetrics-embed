import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';

 function TooltipButton(copy, props) {
   const [show, setShow] = useState(false);
   const target = useRef(null);

   return (

     <>

      <p className="giveFont" ref={target} onMouseEnter={() => setShow(!show)} onMouseLeave={() => setShow(false)}></p>
       <Overlay target={target.current} show={show} placement="bottom" data-html="true">
         {({ placement, arrowProps, show: _show, ...props }) => (
           <div className="tool"
             {...props}
             style={{
          
               textAlign:'center',
               boxShadow:'0px 25px 50px rgba(0, 73, 171, 0.1)',
               background: 'white',
               padding: '3px 8px',
               color: '#0b3c6a',
               fontSize: '12px',
               borderRadius: ".5rem",
               zIndex: 99999999,
               container: "body",
               ...props.style,
             }}

           >

            <span>{copy.text}</span>

           </div>
         )}
       </Overlay>
     </>
   );
 }



export default TooltipButton;
