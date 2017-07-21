import AuthConfiguration from "../common/AuthConfiguration.jsx"
import axios from 'axios';

var LoginServices = {
    authConfiguration : new AuthConfiguration(),

    Login : (userName, password, callback) => {
        var isSuccess = false;
        axios({
            method: 'POST',
            url: 'Authenticate/Authenticate', 
            auth: {
                username: userName,
                password: password
            }
        })
        .then(function (response) {
            console.log(response);
            if(response.status == 200){
                AuthConfiguration.SaveToken(response.headers.token);
                console.log("Login successfull");
                var auth = new AuthConfiguration()
                callback(true);
             
            }
            else{
                console.log("Login fail");
                callback(false);
            }
        })
        .catch(function (error) {
            console.log(error);
            callback(false);
        });
    }
    
}


export default LoginServices