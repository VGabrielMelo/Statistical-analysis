import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import isAuth from './utils/isAuth';
/* import Login from './pages/Login' */
import Home from './pages/Home'



function Routes(){
    const PrivateRoute = ({component: Component, ...rest})=>(
        <Route {...rest} render ={props =>(
            isAuth()?(
                <Component {...props}/>
            ):(
                <Redirect to ={{pathname:'/',state:{from: props.location}}}/>
            )
        )}/>
    )
    
    const PublicRoute = ({component: Component, ...rest})=>(
        <Route {...rest} render ={props =>(
            isAuth()?(
                <Redirect to ={{pathname:"/home",state:{from: props.location}}}/>
            ):(
                <Component {...props}/>
            )
        )}/>
    )

                
    const NotFound = () =>(<Redirect to ={{pathname:"/home"}}/>)
    return(
        <BrowserRouter>
            <Switch>
                <PublicRoute exact path="/" component={()=>(<Home/>)}/>
                <PrivateRoute exact path="/home" component={()=>(<Home/>)}/>
                <PrivateRoute path='*' component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;