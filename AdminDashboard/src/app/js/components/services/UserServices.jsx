import Configuration from "../common/Configuration.jsx"
import AuthConfiguration from "../common/AuthConfiguration.jsx"
import axios from 'axios';

var UserServices = {
    authConfiguration : new AuthConfiguration(),

    GetAllUser : () => {
        return axios.get('user')
        .catch((error)=>{
            window.location.hash = 'login';
        });
    },

    GetUser : (id) => {
        return axios.get('user',{params:{Id : id}})
        .catch((error)=>{
            window.location.hash = 'login';
        });
    },

    TransfromUser: (user) => {
        var userInfo = {
            Id : user.id,
            UserName : user.userName,
            PassWord : user.password,
            IsActive : user.isActive,
            Email : user.email,
            Permissions: user.Permissions,
            Currencies : user.Currencies
        }

        return userInfo;
    },

    AddUser : (user,callback) => { 
        var userInfo = {
            UserName : user.userName,
            PassWord : user.password,
            IsActive : user.isActive,
            Email : user.email,
            Permissions: [],
            Currencies : []
        }
        axios.post('user',userInfo)
        .then(function (response) {
            callback(response.data); 
        })
    },

    UpdateUser : (user,callback) => {
        user.Currencies = user.Currencies.toString();
        user.Permissions = user.Permissions.toString();
         axios.put('user',user)
        .then(function (response) {
            console.log(response);
            callback(response.data); 
        })
    }

}


export default UserServices