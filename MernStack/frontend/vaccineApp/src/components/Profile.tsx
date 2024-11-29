import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ profile }: any) => {
  const navigate = useNavigate();

  const handleEvent = () => {
    try {
      axios
        .post(`http://localhost:5555/deleteUser/userid/${profile.id}`)
        .then((res) => {
          alert("Account Deleted Successfully");
          navigate("/login");
        })
        .catch((e) => alert(e.message + "Try closing the browsers"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full  h-screen m-auto  ">
        <div className="relative mt-16 mb-32 max-w-sm mx-auto mt-24 ">
          <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-400 bg-white">
            <div className="px-6 py-32 mt-2">
              <h1 className="font-bold text-3xl text-center mb-1">
                (Baby){profile.childname}
              </h1>
              <p className="text-gray-800 text-sm text-center">
                Parent Name :- {profile.parentname}
              </p>
              <p className="text-gray-800 text-sm text-center">
                Date of birth :- {profile.childdob}
              </p>
              <button
                className="w-fit p-2 mt-2 border-2 border-slate-300 rounded-3xl bg-slate-200 shadow-xl shadow-pink-200"
                onClick={handleEvent}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
