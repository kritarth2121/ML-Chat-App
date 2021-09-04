import React, { useEffect } from "react";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { getPremium, login, logout,  selectUser, setPremiumInfo } from "./features/userSlice";
import db, { auth } from "./firebase";

import Home from "./components/Home";

interface props {}

const App: React.FC<props> = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    var premi=useSelector(getPremium);
    useEffect(() => {
        
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
                        premi=  doc.data()?.premium;
                        console.log( " uid  in data",doc.data()?.premium,premi);
                    }
                    dispatch(setPremiumInfo(premi));
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
                console.log("BEfore Premium state",premi);
                
                console.log("After Premium state",premi);
            } else {
                dispatch(logout());
            }
            //console.log(authUser);
        });
    }, [dispatch,premi]);

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
