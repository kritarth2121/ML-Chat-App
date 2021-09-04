import React, { useEffect } from "react";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUse, selectUser } from "./features/userSlice";
import db, { auth } from "./firebase";

import Home from "./components/Home";
import { setQuestionInfo } from "./features/questionSlice";

interface props {}

const App: React.FC<props> = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    
    useEffect(() => {
        var premi=false;
        auth.onAuthStateChanged((authUser) => {

            if (authUser) {
                var citiesRef = db.collection("premium");
                //console.log(authUser.uid in citiesRef , "checking uid in data");
                citiesRef.doc(authUser.uid).get().then((doc)=>{
                    if (!(doc.exists)){
                        citiesRef.doc(authUser.uid).set({premium:false});
                    console.log( " uid not in data");

                    }
                    else{
                        console.log( " uid  in data");
                        premi=  doc.data()?.premium;
                    }
                })
                // if (!(authUser.uid in citiesRef)){
                //     citiesRef.doc(authUser.uid).set({premium:false});
                // }
                
                
                

                dispatch(
                    login({
                        uid: authUser.uid,
                        email: authUser.email,
                        displayName: authUser.displayName,
                        photo: authUser.photoURL,
                        
                    })
                );
                
                dispatch(setQuestionInfo({premi}));
            } else {
                dispatch(logout());
            }
            //console.log(authUser);
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
