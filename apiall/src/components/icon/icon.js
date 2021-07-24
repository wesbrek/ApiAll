import React from "react";

const Icon = ({icon}) => {

    
    return icon ? (
        <i className={icon}></i>
      ) : ( <></> )
    
    

};

export default Icon;

