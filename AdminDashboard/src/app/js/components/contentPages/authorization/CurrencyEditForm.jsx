import React from 'react';

const currencies = [
    {id: 1, name: 'USD'},
    {id: 2, name: 'AUD'},
    {id: 3, name: 'VND'},
    {id: 4, name: 'SGD'},
    {id: 5, name: 'EUR'}
]

class AuthorizationEditForm extends React.Component {
    constructor(props){
        super(props);
        this.state= {currencies: this.props.currencies};
    } 
    
    handleSubmit(){
        this.props.handleSubmitCurrencies(this.state.currencies);
    }

    hasCurrency(id){
        for(let item of this.props.currencies){
            if(item == id){
                return true;
            }
        }
        return false;
    }

    handleCurrencyCheck(id){
        var currencies = this.state.currencies;
        var currencyIndex = currencies.findIndex (x => x == id);
        if(currencyIndex != -1){
            currencies.splice(currencyIndex,1);
        } else{
            currencies.push(id);
        }

        this.setState({currencies : currencies});
    }

    render(){
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
}

export default AuthorizationEditForm;