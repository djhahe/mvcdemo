import React from 'react';
import AddUserButton from './AddUserButton.jsx';
import Content from './Content.jsx';
import Modal from '../../common/Modal.jsx';
import CreateUserForm from './CreateUserForm.jsx';

const items =  [
  {id: 1, userName: 'Kenny', isActive: true, permissions:[1,2], currencies:[1,2,3] },
  {id: 2, userName: 'Kenny 1', isActive: true, permissions:[3,4],currencies:[2,3,4]},
  {id: 3, userName: 'Kenny 1', isActive: true, permissions:[1,2,3,4],currencies:[2]}
];

 class Authorization extends React.Component {
    constructor(props){
        super(props);
        this.state = { isAddUserOpen: false, items: items };
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
        var maxId = Math.max.apply(Math,this.state.items.map(function(o){return o.id;}))
        userInfo.id = ++maxId;
        userInfo.isActive = true;

        items.push(userInfo);
        this.setState({
            items: items
        });
    }

    render(){
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
    }
}

export default Authorization;