import React from "react";
import Lolly from '../components/lolly';

export default function LollyPage(lolly) {

  const {location, pageContext} = lolly;
  console.log("location", location);
  console.log("page context", pageContext);
  return (
    <div>

      <h5>Share this lolly link to your friend </h5>{" "}      
      <span>
        {" "}        
        {`https://new-lolly-ashraf.netlify.app/lolly/${pageContext.link}/`}
      </span>
      <div>
        <Lolly
          top={pageContext.lollies.c1}
          middle={pageContext.lollies.c2}
          bottom={pageContext.lollies.c3}
        />

        <div>
          <h3>HI {pageContext.lollies.rec}</h3>
          <p>{pageContext.lollies.msg}</p>
          <h4>From: {pageContext.lollies.sender}</h4>
        </div>
      </div>
    </div>
  );
}