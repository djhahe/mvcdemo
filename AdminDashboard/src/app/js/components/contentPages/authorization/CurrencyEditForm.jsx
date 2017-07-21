import React from 'react';
import UserServices from '../../services/UserServices.jsx';

const currencies = [
    {id: 1, name: 'USD'},
    {id: 2, name: 'AUD'},
    {id: 3, name: 'VND'},
    {id: 4, name: 'SGD'},
    {id: 5, name: 'EUR'}
]

class CurrencyEditForm extends React.Component {
    constructor(props){
        super(props);
        this.state= {user: '', isLoaded :false};
    } 
    //=====================================================================================================================
	// React life cycle functions
	//=====================================================================================================================
    componentDidMount(){
        this.getSelectedUser(this.props.user.id);
    }

    render(){
        if(this.state.isLoaded){
            return (
                <div className="modal-content" >
                    {currencies.map((item) =>
                        <div key={item.id}>
                            <input
                                name="isActive"
                                type="checkbox"
                                checked={this.hasCurrency(item.id)} 
                                onChange={(e)=> this.handleCurrencyCheck(item.id)}
                                />
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
        else{
            return(<div>Loading</div>)
        }
    }

    //=====================================================================================================================
	// Custom functions
	//=====================================================================================================================
    handleSubmit(){
        var component = this;
        UserServices.UpdateUser(this.state.user,(response)=>{
            component.props.handleSubmitCurrencies();
        });
    }

    hasCurrency(id){
        for(let item of this.state.user.Currencies){
            if(item == id){
                return true;
            }
        }
        return false;
    }

    handleCurrencyCheck(id){
        var currencyIndex = this.state.user.Currencies.findIndex (x => x == id);
        if(currencyIndex != -1){
            this.state.user.Currencies.splice(currencyIndex,1);
        } else{
            this.state.user.Currencies.push(id);
        }
        this.setState({user : this.state.user});
    }

    getSelectedUser(id){
        var component = this;
        UserServices.GetUser(id).then((response)=>{
            response.data.Permissions = response.data.Permissions.split(",");
            response.data.Currencies = response.data.Currencies.split(",");
            component.setSelectedUser(response.data);
        })
    }

    setSelectedUser(user){
        this.setState({user: user, isLoaded:true});
    }

    
}

export default CurrencyEditForm;