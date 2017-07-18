import React from 'react';
import MenuItem from './MenuItem.jsx';
import '../../../styles/sidebar/sidebar.scss';

class MenuBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            visible: true,
            selectedMenuItem : 'Dashboard'
        }
    } 
    
    isSelectedItem(hash){
        return this.state.selectedMenuItem == hash;
    }

    setSelectedItem(hash){
        this.setState({selectedMenuItem : hash});
    }

    show(){
        this.setState({visible: true});
        document.addEventListener('click',(e) => this.hide(e));
    }

    hide() {
        document.addEventListener('click',(e) => this.hide(e));
        this.setState({visible: false});
    }

    render(){
        return (
            <div className="leftContent">
                <div className="title">
                    <h1>LICENSEE ADMIN</h1>
                </div>
                <div className="sidebar">
                    {this.props.items.map((item,i) =>
                        <MenuItem key={item.hash} 
                        hash={item.hash} 
                        child={item} 
                        isSelectedItem={this.isSelectedItem(item.hash)}
                        onSelectedItem={(e) => this.setSelectedItem(e,item.hash)}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default MenuBar