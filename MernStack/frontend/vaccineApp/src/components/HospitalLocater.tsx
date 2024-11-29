import {  useState } from "react";


const HospitalLocater = () => {
  const [pincode, setPincode] = useState(String);
  

  const getNearByHospital = () => {
    if(pincode){
      window.open(`https://www.google.com/maps/search/${pincode}+childhospital`, '_blank');
    }
    window.alert("Please enter the pincode");
  }
  return (
    <div>
      Search Nearby Hospital 
      <input
        type="number"
        name=""
        id=""
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="bg-transparent w-fit p-2"
      />
      
      <button onClick={getNearByHospital} className="bg-red-300 p-2 m-1 rounded-full">GO</button>
    </div>
  );
};

export default HospitalLocater;
