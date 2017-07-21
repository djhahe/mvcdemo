import React from 'react';
import {render} from 'react-dom';
import Login from './login/Login.jsx';
import AppDefault from './app.jsx';
import DefaultLayout from './DefaultLayout.jsx';
import EmptyLayout from './EmptyLayout.jsx';
import Authorization from './contentPages/authorization/Authorization.jsx';
import Dashboard from './contentPages/Dashboard/Dashboard.jsx';
import { BrowserRouter, Route, HashRouter,IndexRoute,Switch} from 'react-router-dom'

class App extends React.Component{
    
    render() {
        return(
            <HashRouter>
                <div>
                    
                <Route path="/login" component={Login}/>
                
                <Route path = "/Authorized" component = {AppDefault} />
                
                </div>
            </HashRouter>
         );
    }
}

render(<App/>, document.getElementById('app'));