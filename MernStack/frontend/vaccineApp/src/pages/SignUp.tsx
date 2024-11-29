import axios from "axios";
import  { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Header from "../components/Header";

const SignUp = () => {
  let date = new Date;
  let day = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()
  let minDay = date.getDate()+"-"+date.getMonth()+"-"+(date.getFullYear()-2)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [childName, setChildname] = useState("");
  const [dob, setDob] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] =useState("");
  

  console.log(date)
  console.log(day)
  console.log(minDay)
  const child =[ {
    childName,
    dob
  }]
  
  const data = {
    username,
    password,
    email,
    child
  };

 
  const handleSignup = async (event:any) => {
    event.preventDefault();
    axios
      .post("http://localhost:5555/signup", data)
      .then((res) => {
        console.log(res.data);
        setIsSuccess(true)
      })
      .catch((e) => {
        setErrorMessage(String(e.response.data.message))
        console.log(e.message);
      });
  };

  return (
    <div className="w-screen h-screen  bg p-1 grid col-auto lg:bg-DesktopBg  bg-cover bg-right-bottom md:bg-MobileBg mobile:bg-MobileBg">
      <Header />
      <form
        action="/signup"
        method="post"
        className="w-80 h-fit  mt-1 ml-20 backdrop-blur-sm md:m-auto md:mt-0 mobile:mt-0 mobile:m-auto border-2 rounded-lg shadow-2xl shadow-black  lg:bg-gradient-to-bl  from-pink-200/75 to-blue-100/25 mobile:bg-gradient-to-bl from-slate-400/25 to-slate-600/25  p-2"
      >
        <label htmlFor="username" className=" w-full">
          {" "}
          <div>Username</div>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoComplete="true"
            className="w-full bg-transparent p-1"
          />
        </label>
        <label htmlFor="email" className="w-full">
          {" "}
          <div>E-mail</div>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="true"
            className="w-full bg-transparent p-1"
          />
        </label>
        <label htmlFor="password" className="w-full">
          {" "}
          <div>Password</div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="true"
            className="w-full bg-transparent p-1"
          />
        </label>

        <label htmlFor="childName" className="w-full">
          {" "}
          <div>Childname</div>
          <input
            type="text"
            name="ChildName"
            id="childName"
            value={childName}
            onChange={(e) => {
              setChildname(e.target.value);
            }}
            autoComplete="true"
            className="w-full bg-transparent p-1"
          />
        </label>
        <label htmlFor="dob" className="w-full">
          {" "}
          <div>Child Data of Birth</div>
          <input
            type="date"
            name="dob"
            id="dob"
            min="09-05-2024"
            value={dob}
            onChange={(e) => {
              setDob(e.target.value);
            }}
            autoComplete="true"
            className="w-full bg-transparent p-1"
          />
          
        </label>
        {isSuccess ? <Navigate to="/login" />: errorMessage}
        <button
          className="bg-red-500/25 text-gray-700 pr-4 pl-4 cursor-pointer w-full pt-2 pb-2 mt-2 font-bold rounded-md"
          onClick={handleSignup}
          type="submit"
        >
          Sign Up
        </button>

        <div className="text-center ">
          Already have an account{" "}
          <Link to="/login" className="text-slate-700 hover:text-fuchsia-400">
            <b>Login</b>
          </Link>
        </div>
      </form>

      
    </div>
  );
};

export default SignUp;
