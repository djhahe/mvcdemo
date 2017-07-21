import React from 'react';
import {render} from 'react-dom';
import LoginServices from '../services/LoginServices.jsx'
import '../../../styles/login/Login.scss';
import { BrowserRouter, Route, Redirect,Link } from 'react-router-dom'

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            userName : '',
            password : '',
            language : 'English',
            redirectToReferrer: false
        }
    }

    handleUserNameChange(e) {
        this.setState({userName: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleLanguageChange(e){
        this.setState({language: e.target.value});
    }

    handleSubmit(e){
        var component = this;

        LoginServices.Login(this.state.userName,this.state.password,function(isAuth){
            if(isAuth){
                component.setState({ redirectToReferrer: true })
            }
        });
    }

    render() {
        if (this.state.redirectToReferrer) {
            return (
                <Redirect to='/Authorized'/>
            )
        }
        return(
            <div className="login--container">
                <div className="login__form">
                    <input placeholder="User Name" value={this.state.userName} onChange={(e) => this.handleUserNameChange(e)} type='text' className="login__form__username"/>
                    <input placeholder="Password" value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} type='password' className="login__form__password"/>
                    <select value={this.state.language} className="login__form__language" onChange={(e) => this.handleLanguageChange(e)}>
                        <option  value="English">English</option>
                        <option value="Vietnamese">Vietnamese</option>
                    </select>
                    <p className='login__form__submit' onClick={(e) => this.handleSubmit(e)}>Login</p>
                </div>
            </div>
         );
    }
}

export default Login;