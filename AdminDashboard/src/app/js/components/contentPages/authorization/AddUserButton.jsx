import React from 'react';
import '../../../../styles/common/common.scss';

class AddUserButton extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <a className="button-add" onClick={this.props.onClick} >Add User</a>
        );
    }
}

export default AddUserButton;