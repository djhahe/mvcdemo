import React from 'react';

class MenuItem extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSelected: false
        }
    }
    
    onClickHandle(hash){
        this.navigate(hash);
        this.setActive(hash);
    }

    setActive(hash){
        this.props.onSelectedItem(hash);
    }

    navigate(hash){
        window.location.hash = hash;
    }

    hasSubItems(){
        return this.props.child.subItems !== undefined &&  this.props.child.subItems.length > 0
    }

    render(){
        var component = this;
        return (
            <div>
                <div>
                    <div className={'menuItem' + (component.props.isSelectedItem ? ' active' : '')} onClick={component.onClickHandle.bind(this,component.props.hash)}>
                        <div className={component.props.hash + "Icon"}/>
                        <div>{component.props.child.name}</div>
                    </div>
                    {component.hasSubItems() ? 
                    (component.props.child.subItems.map((item) =>
                        <div className={"subMenuItem" + (component.props.isSelectedItem ? ' active' : '')} key={item.hash} onClick={component.onClickHandle.bind(this,item.hash)}>{item.name}</div>
                    )): null}
                </div>
            </div>
        );
    }
}

export default MenuItem;