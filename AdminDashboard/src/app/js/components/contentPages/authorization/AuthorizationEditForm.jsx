import React from 'react';

const authorizations = [
    {id: 1, name: 'Super Administrator'},
    {id: 2, name: 'ICE officers'},
    {id: 3, name: 'Vendor'},
    {id: 4, name: 'Administrator'}
]

class AuthorizationEditForm extends React.Component {
    constructor(props){
        super(props);

        this.setState({permissions: this.props.permissions})
    } 

    isAuthorized(id) {
        for(let item of this.props.permissions){
            if(item == id){
                return true;
            }
        }
        return false;
    }

    handlePermissionCheck(id){
        var permissions = this.state.permissions;
        var permissionIndex = permissions.findIndex (x => x == id);
        if(permissionIndex != -1){
            permissions.splice(permissionIndex,1);
        } else{
            permissions.push(id);
        }

        this.setState({permissions : permissions});
    }

    handleSubmit(){
        this.props.handleSubmitAuthorization(this.state.permissions);
    }

    render(){
        return (
            <div className="modal-content" >
                {authorizations.map((item) =>
                    
                    <div key={item.id}>
                        <input
                            name="isActive"
                            type="checkbox"
                            checked={(this.props.permissions.findIndex(x => x== item.id) != -1)} 
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
    }
}

export default AuthorizationEditForm;