// import React, { useCallback } from 'react'
// import styled from "styled-components"
// import { LookerEmbedSDK } from '@looker/embed-sdk'
//
//
// const Embed = () => {
//   const LookDiv = useCallback((el) => {
//     if (el) {
//       el.innerHTML = ''
//     LookerEmbedSDK.init(
//       process.env.LOOKERSDK_EMBED_HOST,
//       { url: '/api/auth' ,headers: [{ name: 'usertoken', value: 'user1' } ]}
//       )
//
//     LookerEmbedSDK.createLookWithId(2)
//     .appendTo(el)
//     .build()
//     .connect()
//     .catch((error) => {
//       console.error('An unexpected error occurred', error)
//     })
//   }},[])
//   return (
//     <>
//     <div>Test Look</div>
//       <div className='stuff' style={{width: '100%', height: '100%'}}>
//         <Look ref={LookDiv}></Look>
//       </div>
//     </>
//   )
// }
//
// const Look = styled.div`
//   width: 100%;
//   height: 305vh;
//   & > iframe {
//     width: 100%;
//     height: 100%;
//   }
// `
//
// export default Embed
