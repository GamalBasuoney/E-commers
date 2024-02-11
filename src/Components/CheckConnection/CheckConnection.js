import React from "react";
import icon from "./Icons.png";
import { Detector } from "react-detect-offline";


function CheckConnection(props) {

  return (
    <>
      <Detector render={({ online }) => online ? (props.children) : (
        
            <div style={{ paddingTop: "10px", textAlign: "center" }}>
              <img src={icon} />
              <h1 style={{ marginBottom: "5px" }}>No Connection</h1>
              <h4 style={{ margin: "0" }}></h4>
            </div>
          )
        }
      />
    </>
  );
};
export default CheckConnection;
