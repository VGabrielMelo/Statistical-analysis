import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import isAuth from './utils/isAuth';
import Login from './pages/Login';
import Home from './pages/Home'
import isPrivate from './utils/isPrivate';


function Routes(){
    const PrivateRoute = ({component: Component,onlyAdmin, ...rest})=>(
        <Route {...rest} render ={props =>{
            let token = localStorage.getItem("token")
            return isAuth(token)?(
                isPrivate(onlyAdmin)?(
                    <Component {...props}/>
                ):(
                    <Redirect to ={{pathname:"/home",state:{from: props.location}}}/>
                )
            ):(
                <Redirect to ={{pathname:'/',state:{from: props.location}}}/>
            )
        }}/>
    )
    
    const PublicRoute = ({component: Component,onlyAdmin, ...rest})=>(
        <Route {...rest} render ={props =>{
            let token = localStorage.getItem("token")
            return isAuth(token)?(
                <Redirect to ={{pathname:"/home",state:{from: props.location}}}/>
            ):(
                isPrivate(onlyAdmin)?(
                    <Component {...props}/>
                ):(
                    <Redirect to ={{pathname:"/home",state:{from: props.location}}}/>
                )
            )
        }}/>
    )

                
    const NotFound = () =>(<Redirect to ={{pathname:"/home"}}/>)
    return(
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path="/" component={()=>(<Login/>)}/>
                <PrivateRoute exact path="/home" component={()=>(<Home/>)}/>
                <PrivateRoute path='*' component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;