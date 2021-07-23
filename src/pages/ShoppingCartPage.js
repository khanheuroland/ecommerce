import React, { useEffect } from 'react';
import { useSelector, connect } from 'react-redux';
import Alert from '@material-ui/lab/Alert';
import PageHeaderComponent from '../components/PageHeaderComponent';
import ShoppingCartItem from "../components/ShoppingCartItem";
import Button from '@material-ui/core/Button';
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import FooterComponent from '../components/FooterComponent';

var data = require('../assets/dumpdata.json');

const ShoppingCartPage = (props) => {
    const cart = useSelector((state)=>{
        return state.userReducer.shoppingCart;
    })

    const userContext = useSelector((state)=>{
        return state.userReducer
    })

    const {strings, currentLanguageCode} = props;
    
    const currencyRate = useSelector((state)=>{
        return state.configReducer.currencyRate
    })
    
    const getPrice = (price, fromCurrency="won", toCurrency = strings["currencycode"],isFormat=true)=>{
        let val;
        let convertedPrice = price*currencyRate[fromCurrency+toCurrency];

        if(toCurrency=="vnd" || toCurrency=="won")
        {
            val = (Math.round(convertedPrice/100))*100;
        }
        else if(toCurrency=="usd")
        {
            val = convertedPrice.toFixed(2);
        }
        else
        {
            val = price;
        }
        if(val>999 && isFormat)
        {
            let reverted = val.toString().split('').reverse();
            let formatted=[]
            for(let i=1; i<=reverted.length; i++)
            {
                formatted.push(reverted[i-1]);
                if(i%3==0 && i!=reverted.length)
                {
                    formatted.push(strings["currency_group"]);
                }
            }
            return formatted.reverse().join('');
        }
        else
            return val;
    }

    return (
        <>
            <PageHeaderComponent/>
            <div className="section__main section__main-category">
                <div className="section__main-inner">
                    <div className="warning" style={{paddingTop: "10px", paddingBottom: "10px"}}>
                        <Alert severity="info">{strings["covid_note"]}</Alert>
                    </div>
                    <h3 className="shopping-cart-title">{strings["shopping_cart"]} ({cart.Items.length} {strings["item"]})</h3>
                    <div className="cart-container">
                        <div className="cart-item-box">
                            <ul className="list__item">
                                {
                                    cart.Items.map((item, index)=>(
                                        <li key={item.id} className="list-item">
                                            <ShoppingCartItem data={item} index={1+ index} langcode = {currentLanguageCode} translation={strings}></ShoppingCartItem>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="cart-summary-box">
                            <h4>{strings["billing_information"]}</h4>
                            <p style={{marginTop: "10px"}}>
                                <div className="col-left">{strings["total_goods"]}:</div>
                                <div className="col-right">
                                    {
                                        getPrice(cart.Total, 'won', strings["currencycode"], true)
                                    }
                                    <span style={{marginLeft: "5px"}}>{strings["currency"]}</span>
                                </div>
                                <div className="clear"/>
                            </p>
                            <p>
                                <div className="col-left">{strings["delivery_charge"]}:</div>
                                <div className="col-right">
                                    {
                                        getPrice(cart.ShipFee, strings["currencycode"], strings["currencycode"], true)
                                    }
                                    <span style={{marginLeft: "5px"}}>{strings["currency"]}</span>
                                </div>
                                <div className="clear"/>
                            </p>
                            <p style={{borderTop: "solid 1px #CCC"}}>
                                <div className="col-left"><b>{strings["total"]}</b></div>
                                <div className="col-right"><b style={{fontSize: "18px", color: "#f57224"}}>
                                    {
                                       getPrice(getPrice(cart.Total, 'won', strings["currencycode"], false) + cart.ShipFee, strings["currencycode"], strings["currencycode"], true)
                                    }
                                    <span style={{marginLeft: "5px"}}>{strings["currency"]}</span>
                                    </b></div>
                                <div className="clear"/>
                            </p>
                            {
                                userContext.profile.Address &&
                                <>
                                <h4 style={{marginTop: "30px"}}>Thông tin nhận hàng</h4>
                                <div className="address-box">
                                    <p>{userContext.profile.Address[0].Address} </p>
                                    <p>Xã/Phường: {userContext.profile.Address[0].Ward}</p>
                                    <p>Quận/Huyện: {userContext.profile.Address[0].District}</p>
                                    <p>Thành phố/Tỉnh: {userContext.profile.Address[0].Province}</p>
                                    <div style={{textAlign:"right", marginTop:"5px"}}>
                                    <Button size="small" variant="outlined" color="primary">
                                        Thay đổi
                                    </Button>
                                    </div>
                                </div>
                                </>
                            }
                            <div style={{marginTop: "20px"}}>
                                <Button variant="contained" color="primary" fullWidth>
                                    {strings["purchase"]}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FooterComponent/>
        </>
    );
};

export default connect()(multilanguage(ShoppingCartPage));