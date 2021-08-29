import React from "react";
import Chatting from "./components/Chatting/Chatting";
import Header from "./components/Header";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login/Login";

interface props {}

const App: React.FC<props> = () => {
    return (
        <>
            <BrowserRouter>
                <Header></Header>
                <Switch>
                    <Route exact path="/" component={Chatting}></Route>
                    <Route exact path="/login" component={Login}></Route>
                </Switch>
            </BrowserRouter>
        </>
    );
};

App.defaultProps = {};

export default React.memo(App);
