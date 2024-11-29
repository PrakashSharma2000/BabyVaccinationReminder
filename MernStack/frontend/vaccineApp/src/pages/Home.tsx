import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import { BiInfoCircle, BiX } from "react-icons/bi";
import Profile from "../components/Profile";
import CureandCare from "../components/CureandCare";
import HospitalLocater from "../components/HospitalLocater";
import { VscVariableGroup } from "react-icons/vsc";

const Home = () => {
  var curr = new Date();
  curr.setDate(curr.getDate() + 3);
  var date = curr.toISOString();

  //fetching data as from login
  let data = useLocation();

  const [user, setUser] = useState(data.state);
  const [children, setChildren] = useState(user.child);
  const [hospital, setHospital] = useState(String);
  const [vaccinatedon, setVaccinatedon] = useState(Date);
  const [vaccineStatus, setVaccineStatus] = useState("");
  const [toggleBtnProfile, setToggleProfile] = useState(false);
  const [cureToggleBtn, setCureToggleBtn] = useState(true);

  const toggleVaccineStatus = async (childIndex: any, vaccineIndex: any) => {
    const updatedChildren = [...children];
    const child = updatedChildren[childIndex];
    const vaccine = child.vaccinations[vaccineIndex];
    vaccine.administered = !vaccine.administered;

    try {
      await axios
        .put(
          `http://localhost:5555/users/${user._id}/child/${child._id}/vaccination/${vaccine._id}`,
          {
            administered: vaccine.administered,
          }
        )
        .then((res) => {
          console.log(res.data.child);
          setUser(res.data);
        });
      console.log(user);
    } catch (error) {
      console.error("Error updating vaccine status:", error);
    }
  };

  // adding hospital name and dates
  const newHospital = async (childIndex: any, vaccineIndex: any) => {
    const updatedHospital = [...children];
    const child = updatedHospital[childIndex];
    const vaccine = child.vaccinations[vaccineIndex];
    vaccine.hospital = hospital;
    vaccine.recommendedDate = vaccinatedon;
    setChildren(updatedHospital);

    try {
      await axios
        .put(
          `http://localhost:5555/users/${user._id}/child/${child._id}/hospital/${vaccine._id}`,
          {
            hospital: vaccine.hospital,
            recommendedDate: vaccine.recommendedDate,
          }
        )
        .then((res) => {
          setUser(res.data);
          
        });
      
    } catch (error) {
      console.error("Error updating Hospital and date:", error);
    }

    
    children.map((x:any) => x.vaccinations.map((y:any) => {
      if(y.recommendedDate>vaccinatedon){

        let testdata = new Date(vaccinatedon);
        testdata.setDate(testdata.getDate()+Number(y.recommendedAge));
        console.log(testdata.toISOString().substr(0,10));
        y.recommendedDate=testdata.toISOString().substr(0,10);
        
      }
    }))

    try {
      await axios
        .get(`http://loaclhost:5555/userdata/${user._id}`)
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const showCure = (curedata: any) => {
    console.log(curedata.reaction + " " + curedata.cure);
    alert(curedata.reaction);
    setCureToggleBtn(!cureToggleBtn);
  };
  return (
    <div className="w-screen h-screen p-1 grid col-auto overflow-auto">
      <Header />
      <HospitalLocater />
      <div className=" h-fit z-10 m-auto flex w-full bg-red-200 relative">
        <button
          className={` border-2  absolute right-1  z-30  mt-2 ${
            toggleBtnProfile
              ? "p-2 rounded-full h-fit w-fit bg-red-200 shadow-lg shadow-slate-600 backdrop-blur-sm text-2xl"
              : "px-2 py-1 bg-pink-200 rounded-md w-fit"
          }`}
          onClick={() => {
            setToggleProfile(!toggleBtnProfile);
          }}
        >
          {toggleBtnProfile ? (
            <>
              <BiX />
            </>
          ) : (
            <>Profile</>
          )}
        </button>
        <div
          className={`${
            toggleBtnProfile ? "absolute z-20 w-full text-center" : "hidden"
          } overflow-hidden backdrop-blur-md `}
        >
          <Profile
            profile={{
              parentname: user.username,
              childname: user.child[0].childName,
              childdob: user.child[0].dob,
              id: user._id,
            }}
          />
        </div>
      </div>
      <div className="bg-MobileBg w-auto ">
        <div className="text-2xl">
          <div>
            Welcome! baby <b>{user.child[0].childName}</b>
          </div>
        </div>
        {children.map((x: any, childIndex: any) => (
          <div key={childIndex}>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10  w-fit m-auto h-auto">
              {x.vaccinations.map((y: any, vaccineIndex: any) => (
                <div
                  key={vaccineIndex}
                  className="w-56 h-auto p-2 text-black border-2 rounded-lg justify-center bg-pink-600/25  backdrop-blur-sm shadow-md shadow-black"
                >
                  <div className="w-fit mb-1 border-2 p-2">
                    Vaccination: <b>{y.name}</b>
                  </div>
                  <div className="flex flex-col ">
                    <div className="w-fit border-2 mb-1 py-2 px-1">
                      Recommended Vaccination Date: <b>{y.recommendedDate}</b>
                    </div>
                  </div>
                  <div>
                    <div className="w-full border-2 mb-1 py-2 px-1">
                      Hospital: <b>{y.hospital}</b>
                    </div>
                  </div>
                  <div className="flex border-2 self-center py-2 px-1">
                    Vaccination Status.
                    <button
                      className={`w-fit px-2 py-1 h-fit border-fit rounded-lg  shadow-lg grid gap -2 ${
                        y.administered
                          ? "bg-blue-400 text-black"
                          : "bg-red-400 text-white"
                      }`}
                      onClick={() =>
                        toggleVaccineStatus(childIndex, vaccineIndex)
                      }
                      id={y._id}
                    >
                      {y.administered ? "Vaccinated" : "Not Vacinated"}
                      {vaccineStatus}
                    </button>
                  </div>
                  <div className={`${y.administered ? "block" : "hidden"}`}>
                    <div>
                      HospitalName:-{" "}
                      <input
                        type="text"
                        name=""
                        defaultValue={"ghgjhgj"}
                        key={y.id}
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                      />
                    </div>
                    <div>
                      Vaccination Date:-{" "}
                      <input
                        type="Date"
                        name=""
                        key={y.id}
                        value={vaccinatedon}
                        
                        onChange={(e) => setVaccinatedon(e.target.value)}
                      />
                    </div>
                    <button
                      onClick={() => {
                        newHospital(childIndex, vaccineIndex),
                          setHospital(""),
                          setVaccinatedon("");
                      }}
                    >
                      Add
                    </button>
                  </div>
                  <div>
                    <div key={childIndex}>
                      <BiInfoCircle
                        onClick={() => {
                          showCure(y);
                        }}
                      />
                      <div key={vaccineIndex} className="relative">
                        {cureToggleBtn ? (
                          "Click info button for cure and reaction"
                        ) : (
                          <div key={vaccineIndex}>
                            <CureandCare curedata={y} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
