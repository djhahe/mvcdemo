import React from 'react';
import UserServices from '../../services/UserServices.jsx';

const authorizations = [
    {id: 1, name: 'Super Administrator'},
    {id: 2, name: 'ICE officers'},
    {id: 3, name: 'Vendor'},
    {id: 4, name: 'Administrator'}
]

class AuthorizationEditForm extends React.Component {
    constructor(props){
        super(props);
        this.state= {user: '', isLoaded:false};
    } 

    //=====================================================================================================================
	// React life cycle functions
	//=====================================================================================================================
    componentDidMount(){
        this.getSelectedUser(this.props.user.id);
    }

    render(){
        if(this.state.isLoaded){
            return (
                <div className="modal-content" >
                    {authorizations.map((item) =>
                        
                        <div key={item.id}>
                            <input
                                name="isActive"
                                type="checkbox"
                                checked={(this.state.user.Permissions.findIndex(x => x== item.id) != -1)} 
                                onChange={(e) => this.handlePermissionCheck(item.id)}/>
                            {item.name}
                        </div>
                    )}
                    <div className="footer">
                        <a className='button' onClick={this.props.onClose}>
                            Cancle
                        </a>
                        <p className='button-add' onClick={(e) => this.handleSubmit(e)}>Submit</p>
                    </div>
                </div>
            );
        }else{
            return(
                <div>Loading</div>
            )
        }
    }

    //=====================================================================================================================
	// Custom functions
	//=====================================================================================================================
    handlePermissionCheck(id){
        var permissionIndex = this.state.user.Permissions.findIndex (x => x == id);
        if(permissionIndex != -1){
            this.state.user.Permissions.splice(permissionIndex,1);
        } else{
            this.state.user.Permissions.push(id);
        }

        this.setState({user : this.state.user});
    }

    handleSubmit(){
        var component = this;
        UserServices.UpdateUser(this.state.user,(response)=>{
            component.props.handleSubmitAuthorization();
        });
    }

    getSelectedUser(id){
        var component = this;
         UserServices.GetUser(id).then((response)=>{
            response.data.Permissions = response.data.Permissions.split(",");
            response.data.Currencies = response.data.Currencies.split(",");
            component.setSelectedUser(response.data);
        })
    }

    setSelectedUser(user){
        this.setState({user: user, isLoaded:true});
    }

}

export default AuthorizationEditForm;