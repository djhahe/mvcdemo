import axios from 'axios';
import Configuration from './Configuration.jsx'

class AuthConfiguration {

    constructor(){
        this.SetRequestHeader();
    }

    
     SetRequestHeader(){
        axios.defaults.headers.common['Token'] = this.LoadToken();
        axios.defaults.baseURL = Configuration.ApiBaseUrl;
    }

    static SaveToken(token){
        localStorage.setItem('Token', token)
    }

     LoadToken(){
        return localStorage.getItem('Token');
    }
}


export default AuthConfiguration