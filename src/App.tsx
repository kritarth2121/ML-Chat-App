import React, { useEffect } from "react";
import Chatting from "./components/Chatting/Chatting";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import Home from "./components/Home";

interface props {}

const App: React.FC<props> = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            dispatch(
              login({
                uid: authUser.uid,
                email: authUser.email,
                displayName: authUser.displayName,
                photo: authUser.photoURL,
              })
            );
            
          } else {
            dispatch(logout());
          }
          console.log(authUser);

        });
      }, [dispatch]);
     
    return (
        <>
            
                <Header></Header>
                <Switch>
                
                    <Route exact path="/" component={Home}></Route>
                    <Route exact path="/login" component={Login}></Route>
                </Switch>
        </>
    );
};

App.defaultProps = {};

export default React.memo(App);
