import React, { useState } from 'react';

function Header (props) {

  return (
    <>
      <div>
        <a href='/' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "black"}}>Login</a>
        <a href='/dashboard' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "black"}}>Rate a Movie</a>
        <a href='/movies' style={{margin:"10px 30px 10px 30px", textDecoration:'none', color: "black"}}>Browse</a>
      </div>
        <h1>Movie Rating Database</h1>
    </>
  );
}

export default Header;
