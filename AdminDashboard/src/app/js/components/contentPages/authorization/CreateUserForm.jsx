import React from 'react';

class CreateUserForm extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            userName : '',
            password : '',
            displayName : '',
            email : ''
        }
    }

    handleSubmit(){
        var userInfo = { 
            userName: this.state.userName,
            password: this.state.password,
            displayName: this.state.displayName,
            email: this.state.email,
        }

        this.props.handleAddUser(userInfo);
    }

    handleUserNameChange(e) {
        this.setState({userName: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    handleDisplayNameChange(e) {
        this.setState({displayName: e.target.value});
    }

    handleEmailChange(e) {
        this.setState({email: e.target.value});
    }
    
    render(){
        return (
            <div className="modal-content user" >
                <div>
                    <div>Login Username</div>
                    <input value={this.state.userName} onChange={(e) => this.handleUserNameChange(e)} type='text'/>
                </div>
                <div>
                    <div>Password</div>
                    <input value={this.state.password} onChange={(e) => this.handlePasswordChange(e)} type='text'/>
                </div>
                <div>
                    <div>Display Name</div>
                    <input value={this.state.displayName} onChange={(e) => this.handleDisplayNameChange(e)} type='text'/>
                </div>
                <div>
                    <div>Email</div>
                    <input value={this.state.email} onChange={(e) => this.handleEmailChange(e)} type='text'/>
                </div>
                
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

export default CreateUserForm;