import React, { useEffect, useState } from "react";
import "./Login.css";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { auth, provider } from "../../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import { Switch } from "@headlessui/react";

function Login() {
    const [register, setRegister] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [data, setdata] = useState({ email: "", password: "" });
    const [touched, setTouched] = useState({ email: false, password: false });
    const user = useSelector(selectUser);

    const signIn = () => {
        auth.signInWithPopup(provider).catch((e) => {
            alert(e.message);
        });
    };

    const handleSignIn = (e: any) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(data.email, data.password)
            .then((auth) => {
                console.log(auth);
            })
            .catch((e) => alert(e.message));
    };

    const registerSignIn = (e: any) => {
        e.preventDefault();

        auth.createUserWithEmailAndPassword(data.email, data.password)
            .then((auth) => {
                if (auth) {
                    console.log(auth);
                }
            })
            .catch((e) => alert(e.message));
    };

    //const [submit, setsubmit] = useState(false);
    const handlechange = (event: any) => {
        console.log("handlechange");
        const nameOfChangeInput = event.target.name;
        setdata({ ...data, [nameOfChangeInput]: event.target.value });
        console.log(data, data.email, data.password, 1111111111111111);
    };
    const handlesubmit = (event: any) => {
        event.preventDefault();

        console.log("submit");
    };
    const allow = () => {
        if (emailerror === "" && passworderror === "") {
            console.log(emailerror, passworderror, true);
            return true;
        } else {
            console.log(emailerror, passworderror, false);

            return false;
        }
    };
    function ValidateEmail(mail: string) {
        if (
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                mail
            )
        ) {
            return true;
        }

        return false;
    }
    console.log(ValidateEmail(data.email));
    const blur = (event: any) => {
        const nameOfChangeInput = event.target.name;
        setTouched({ ...touched, [nameOfChangeInput]: event.target.value });
        console.log(data);
    };
    let emailerror = "";
    let passworderror = "";
    if (!data.email) {
        emailerror = "Email adress required";
    } else if (ValidateEmail(data.email) == false) {
        emailerror = "Please enter a valid email address";
    }
    if (!data.password) {
        passworderror = "Password Required";
    } else if (data.password.length < 8) {
        passworderror = "Please use atleast 8 characters";
    }

    return (
        <>
            {user ? (
                <Redirect to="/"></Redirect>
            ) : (
                <div className="login">
                    <div className="login__container m-4  md:mt-4 mt-64">
                        <div className="login__logo"></div>
                        <div className="login__desc text-center">
                            <h1 className="text-4xl ">
                                {!register ? "Log in " : "Register in "}
                                <span className="inline text-blue-700">
                                    Website
                                </span>
                            </h1>
                            <h2 className="mt-5 text-2xl">
                                {!register ? "New Here ?  " : ""}
                                <span
                                    onClick={() => setRegister(!register)}
                                    className="underline inline text-blue-700 cursor-pointer"
                                >
                                    {!register
                                        ? "Create an account"
                                        : "Back to Login"}
                                </span>{" "}
                            </h2>
                        </div>
                        <div className="login__auth flex flex-col-reverse md:flex-row justify-evenly items-center ">
                            <div className="login__authOptions md:border-r-2">
                                <div className="login__authOption">
                                    <img
                                        className="login__googleAuth"
                                        src="https://media-public.canva.com/MADnBiAubGA/3/screen.svg"
                                        alt=""
                                    />
                                    <p onClick={signIn}>Continue With Google</p>
                                </div>

                                <div className="login__authDesc">
                                    <p>
                                        <span
                                            style={{
                                                color: "blue",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Sign Up With Email
                                        </span>
                                        . By continuing you indicate that you
                                        have read and agree to Our
                                        <span
                                            style={{
                                                color: "blue",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Terms of Service{" "}
                                        </span>
                                        and{" "}
                                        <span
                                            style={{
                                                color: "blue",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Privacy Policy
                                        </span>
                                        .
                                    </p>
                                </div>
                            </div>
                            <div className="md:hidden font-bold text-3xl my-8">OR</div> 
                            <div className=" text-left  flex flex-col  items-center ">
                                <div className="">
                                    <form
                                        className="bg-white rounded   pb-8 mb-4 mt-5"
                                        onSubmit={(event) => {
                                            console.log("horha h");

                                            if (register) {
                                                registerSignIn(event);
                                            } else {
                                                handleSignIn(event);
                                            }
                                        }}
                                    >
                                        <div className="mb-4">
                                            <div className="  border-b-2 pb-4">
                                                <i className=" text-blue-500 text-2xl pr-4 fas fa-user"></i>
                                                <input
                                                    name="email"
                                                    className="outline-none border-0 "
                                                    id="username"
                                                    type="text"
                                                    placeholder="Email"
                                                    onChange={handlechange}
                                                    onBlur={blur}
                                                />
                                            </div>
                                            <div>
                                                {touched.email && (
                                                    <div className="text-red-500">
                                                        {emailerror}{" "}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className=" border-b-2 pb-4">
                                                <i className=" text-blue-500 text-2xl pr-4 fas fa-lock"></i>

                                                <input
                                                    name="password"
                                                    className="outline-none"
                                                    id="password"
                                                    type={
                                                        enabled
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Password"
                                                    onChange={handlechange}
                                                    onBlur={blur}
                                                />
                                            </div>

                                            {touched.password && (
                                                <div className="text-red-500">
                                                    {passworderror}{" "}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center flex-row-reverse justify-between">
                                            <Button>
                                            <button
                                                className={
                                                    "hover:shadow-xl text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline " +
                                                    (allow()
                                                        ? "bg-blue-800"
                                                        : "bg-blue-200")
                                                }
                                                type="submit"
                                                value="submit"
                                                disabled={!allow()}
                                            >
                                                {register
                                                    ? "Register"
                                                    : "Login"}
                                            </button>
                                            </Button>


                                            <div className="flex items-center cursor-pointer flex-row justify-between">
                                                <div className="mr-3 text-black ">
                                                    {" "}
                                                    <div className="mt-2">
                                                        <span className="font-mono">
                                                            Show password{" "}
                                                        </span>
                                                        {/* <input
                      type="checkbox"
                      id="toggle-password"
                      className=""
                    ></input> */}

                                                        <Switch
                                                            checked={enabled}
                                                            onChange={
                                                                setEnabled
                                                            }
                                                            className={`${
                                                                enabled
                                                                    ? "bg-blue-600"
                                                                    : "bg-gray-200"
                                                            } relative inline-flex items-center h-5 rounded-full w-10 `}
                                                        >
                                                            <span className="sr-only">
                                                                Enable
                                                                notifications
                                                            </span>
                                                            <span
                                                                className={`${
                                                                    enabled
                                                                        ? "translate-x-6"
                                                                        : "translate-x-1"
                                                                } inline-block w-4 h-4 transform bg-blue-500 rounded-full`}
                                                            />
                                                        </Switch>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="text-gray-400 text-md">
                                    <input
                                        type="checkbox"
                                        id="toggleB"
                                        className="border-2"
                                    />{" "}
                                    Keep me Logged in
                                </div>
                                {/* <div className="mt-6 text-lg text-blue-800">Forgot Password?</div> */}
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Login;
