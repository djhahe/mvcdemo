import React from 'react';
import {render} from 'react-dom';
import MenuBar from './sidebar/MenuBar.jsx';
import Header from './header/Header.jsx';
import Authorization from './contentPages/authorization/Authorization.jsx';
import '../../styles/main.scss';

const menuItems = [
    {hash:"Dashboard", name:"DASHBOARD"},
    {hash:"TotalBets", name:"TOTAL BETS"},
    {hash:"Forecast", name:"FORECAST"},
    {hash:"Reports", name:"REPORTS"},
    {hash:"CustomerManagement", name:"CUSTOMER MANAGEMENT"},
    {hash:"Finance", name:"FINANCE"},
    {hash:"Bonus", name:"BONUS"},
    {hash:"EventControl", name:"EVENT CONTROL"},
    {hash:"RiskControl", name:"RISK CONTROL"},
    {hash:"Affiliate", name:"AFFILIATE"},
    {hash:"Administration", name:"ADMINISTRATION", subItems: [
        {hash:"SystemGroupAuthority", name:"System Group Authority"},
        {hash:"Authorized", name:"Authorized"},
        {hash:"RedirectHostSetting", name:"Redirect Host Setting"},
        {hash:"IPWhiteListSetting", name:"IP White List Setting"},
        {hash:"FrontendTabLinkSetting", name:"Frontend Tab Link Setting"},
        ]},
]

const user = {Id:1, Username:'Kenny', Language:'English'};
class App extends React.Component{
    
    render() {
        return(
            <div className="container">
                <MenuBar items={menuItems}/>
                <div className="rightContent">
                    <Header User={user} CurrentPage = 'Authorized'/>
                    <Authorization/>
                </div>
            </div>
         );
    }
}

render(<App/>, document.getElementById('app'));