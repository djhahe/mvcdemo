import React from 'react';
import AddUserButton from './AddUserButton.jsx';
import Content from './Content.jsx';
import Modal from '../../common/Modal.jsx';
import UserServices from '../../services/UserServices.jsx';
import CreateUserForm from './CreateUserForm.jsx';

 class Authorization extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isAddUserOpen: false, 
            items: [],
            isLoaded: false 
        };
    }
    
    componentDidMount(){
        var component = this;
         UserServices.GetAllUser().then((response) =>{
            if(response != undefined){
                var userList = []; 
                response.data.map(function(o){
                    var userInfo = { 
                        id: o.Id,
                        userName: o.UserName,
                        isActive: o.IsActive,
                        currencies: (o.Currencies).split(","),
                        permissions: (o.Permissions).split(","),
                    }
                    userList.push(userInfo);
                })
                component.setState({items : userList, isLoaded : true});
            }
         });
        
    }

    handleAddUserButtonClick() {
        this.setAddUserPopupOpenState();
    }

    setAddUserPopupOpenState(){
        var component = this;
        component.setState({
            isAddUserOpen: !component.state.isAddUserOpen
        });
    }

    handleAddUser(userInfo){
        this.addUser(userInfo);
        this.setAddUserPopupOpenState();
    }

    addUser(userInfo){
        var component = this;
        var maxId = Math.max.apply(Math,this.state.items.map(function(o){return o.id;}))
        userInfo.id = ++maxId;
        userInfo.isActive = true;
        
        UserServices.AddUser(userInfo,(userId)=>{
            userInfo.id = userId;
            this.state.items.push(userInfo);
            this.setState({
                items: items
            });
        })
    }

    render(){
        if(this.state.isLoaded){
        return (
            <div className='content'>
                <AddUserButton onClick={(e) => this.handleAddUserButtonClick(e)}/>
                <Content items={this.state.items}/>
                <Modal show={this.state.isAddUserOpen} header="Add User" >
                    <CreateUserForm 
                        handleAddUser={(e) => this.handleAddUser(e) } 
                        onClose={(e) => this.handleAddUserButtonClick(e)}
                    />
                </Modal>
            </div>
            
        );
        }else{
            return(
                <div>Loading</div>
            )
        }
    }
}

export default Authorization;