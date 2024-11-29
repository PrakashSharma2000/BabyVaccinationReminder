import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LoginBg from "../assets/loginPageBg.jpg"
import Header from "../components/Header";

const Login = () => {
  const [message, setMessage] = useState();

  const schema = {
    id: "",
    username: "",
    password: "",
    email: "",
    child: [
      {
        childName: "",
        dob: "",
        vaccinations: [
          {
            name: "",
            administered: "",
            recommendedAge: "",
          },
        ],
      },
    ],
  };
  const [user, setUser] = useState(schema);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isuser, setIsUser] = useState(false);

  const handleEvent = async (event: any) => {
    event.preventDefault();

    setUser(schema);
    let data: any = {
      username,
      password,
    };

    setTimeout(() => {
      axios
        .post("http://localhost:5555/login", data)
        .then((res) => {
          if (user) {
            setIsUser(true);
            setUser(res.data);
          }
          console.log(user);
        })
        .catch((error) => setMessage(error.response.data.message));
    }, 1000);

    
  };

  return (
    <>
    
    <div className="w-screen h-screen  bg p-1 grid col-auto lg:bg-DesktopBg  bg-cover bg-right-bottom md:bg-MobileBg mobile:bg-MobileBg">
    <Header />
        <form
        action="/"
        method="post"
        className="w-64 h-64 max-h-80 mt-1 ml-20 backdrop-blur-sm md:m-auto md:mt-0 mobile:mt-0 mobile:m-auto border-2 rounded-lg shadow-2xl shadow-black lg:bg-gradient-to-bl from-pink-200/75 mobile:shadow-black bg-gradient-to-bl from-blue-200/75 to-blue-400/25 p-2"
      >
        <label htmlFor="username" className="w-full text-gray-900 ">
          <div>Username</div>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="true"
            className="w-full bg-transparent p-1"
          />
        </label>
        <label htmlFor="password">
          <div>Password</div>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-transparent p-1"
          />
        </label>

        <div>
          <input
            type="submit"
            value="Login"
            onClick={handleEvent}
            className="bg-slate-600/25 text-gray-700 pr-4 pl-4 cursor-pointer w-full pt-2 mt-2 font-bold rounded-md"
          />
        </div>
        {message}
        <div className="p-2">
          Don't have an account
          <Link to="/signup" className="text-slate-500 hover:text-fuchsia-400">
            {" "}
            <b>Signup</b>
          </Link>
        </div>
      </form>

      {isuser ? (
      <>
        <Navigate state={user} to="/home" />
      </>
    ) : (
      <></>
    )}

      </div>
    </>
  );
};

export default Login;
