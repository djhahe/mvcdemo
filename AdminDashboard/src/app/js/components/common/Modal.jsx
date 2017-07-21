import React from 'react';

class Modal extends React.Component{
    render(){
        if(!this.props.show){
            return null;
        }
    
        // The gray background
        const backdropStyle = {
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 100
        };

        // The modal "window"
        const modalStyle = {
            backgroundColor: '#fff',
            borderRadius: 5,
            maxWidth: 300,
            margin: '0 auto',
        };
    
        return(
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={modalStyle}>
                    <div className='modalHeader'>
                        {this.props.header}
                    </div>    
                    <div className='modalbody'>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;
