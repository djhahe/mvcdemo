import React from 'react';
import '../../../styles/header/header.scss';

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    
   
    render(){
        return (
            <div className="header" >
                <div className="pagaName">{this.props.CurrentPage}</div>
                <div className="language">
                    {this.props.User.Language}
                </div>
                <div className="loginInfo">
                    {this.props.User.Username}
                </div>
            </div>
        );
    }
}

export default Header;