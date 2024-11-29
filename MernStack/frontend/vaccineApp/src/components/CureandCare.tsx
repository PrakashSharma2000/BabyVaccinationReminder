import React from "react";

const CureandCare = ({curedata}:any) => {
  return (
    
      
        <div className="  bg-gray-100  px-2 py-1 rounded-lg mt-2 ">
            <p>Reaction :- <b>{curedata.reaction}</b></p>
            <br />
            <p>Cure :- <b>{curedata.cure}</b></p> 
        </div>
      
    
  );
};

export default CureandCare;
