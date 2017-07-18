import React from 'react';
import Modal from '../../common/Modal.jsx';
import AuthorizationEditForm from './AuthorizationEditForm.jsx';
import CurrencyEditForm from './CurrencyEditForm.jsx';
import '../../../../styles/contentPages/authorization/authorization.scss';

class Content extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            isAuthorizationPopupOpen: false,
            isCurrencyPopupOpen :false,
            selectedUser : '',
            userList : this.props.items
        };
    }

    handleCloseAuthorizationPopup(){
        this.setAuthorizationPopupOpenState();
    }

    handleEditAuthorizationButtonClick(e,item) {
        this.setAuthorizationPopupOpenState();
        this.setSelectedUser(item);
    }

    setAuthorizationPopupOpenState(){
        this.setState({
            isAuthorizationPopupOpen: !this.state.isAuthorizationPopupOpen
        });
    }

    handleSubmitAuthorization(permissions){
        this.setPermissions(permissions);
        this.setAuthorizationPopupOpenState();
    }

    setPermissions(permissions){
        let userList = this.state.userList;
        let userIndex = userList.findIndex(user => user.id == this.state.selectedUser.id);
        userList[userIndex].permissions = permissions;
        this.setState({userList : userList});
    }

    setSelectedUser(user){
        this.setState({
            selectedUser: user
        });
    }

    handleEditCurrencyButtonClick(e,item) {
        this.setCurrencyPopupOpenState();
        this.setSelectedUser(item);
    }

    handleCloseCurrencyPopup(){
        this.setCurrencyPopupOpenState();
    }

    setCurrencyPopupOpenState(){
        this.setState({
            isCurrencyPopupOpen: !this.state.isCurrencyPopupOpen
        });
    }

    handleSubmitCurrencies(currencies){
        this.setCurrencies(currencies);
        this.setCurrencyPopupOpenState();
    }

    setCurrencies(currencies){
        let userList = this.state.userList;
        let userIndex = userList.findIndex(user => user.id == this.state.selectedUser.id);
        userList[userIndex].currencies = currencies;
        this.setState({userList : userList});
    }

    render(){
        var component = this;
        return (
            <div>
                <div className="table" >
                    <div className="tableHeading">
                        <div className="tableHead"> UserId </div>
                        <div className="tableHead"> Username </div>
                        <div className="tableHead"> Active </div>
                        <div className="tableHead"> Authorization </div>
                        <div className="tableHead"> Curency </div>
                    </div>
                    <div className="tableBody">
                        {this.state.userList.map((item) =>
                        <div className="tableRow" key={item.id}>
                            <div className="tableCell">{item.id}</div>
                            <div className="tableCell">{item.userName}</div>
                            <div className="tableCell checkbox">
                                <input
                                    name="isActive"
                                    type="checkbox"
                                    checked={item.isActive} readOnly/>
                            </div>
                            <div className="tableCell edit">
                                <p className='button-small' onClick={(e) => component.handleEditAuthorizationButtonClick(e,item)}>Edit</p>
                            </div>
                            <div className="tableCell edit">
                                <p className='button-small' onClick={(e)=> component.handleEditCurrencyButtonClick(e,item)}>Edit</p>
                            </div>
                        </div>
                        )} 
                    </div>
                </div>
                <Modal show={this.state.isAuthorizationPopupOpen} header="AUTHORIZATION" >
                    <AuthorizationEditForm
                        permissions={this.state.selectedUser.permissions} 
                        onClose={(e) => this.handleCloseAuthorizationPopup(e)}
                        handleSubmitAuthorization={(e) =>this.handleSubmitAuthorization(e)}
                    />
                </Modal>

                <Modal show={this.state.isCurrencyPopupOpen} header="CURRENCY" >
                    <CurrencyEditForm 
                        currencies={this.state.selectedUser.currencies}
                        onClose={(e) => this.handleCloseCurrencyPopup(e)}
                        handleSubmitCurrencies={(e) =>this.handleSubmitCurrencies(e)}
                    />
                </Modal>
            </div>
        );
    }
}

export default Content;