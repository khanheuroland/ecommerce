
import React from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import {addToShoppingCart, addViewItems} from '../reducers/userReducer'
import store from "../store";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {openAuthForm} from "../reducers/userReducer";
import shipService from "../services/ship.service";

function FlashSaleItem(props)
{
    const langcode = props.langcode;
    const data = props.data;
    const strings = props.translation;
    
    const userContext = useSelector((state)=>{
        return state.userReducer
    })

    const [qty, setQty] = React.useState(1);
    const [addedToCart, setAddedToCart] = React.useState(false);
    const increase=()=>{
        if(qty<100)
            setQty(qty+1);
    }

    const decrease=()=>{
        if(qty>1)
            setQty(qty-1);
    }

    const addToCart= async ()=>{
        if(userContext.profile.Token!=null)
        {
            let result = await shipService('ghtk', 
                userContext.profile.Address[0].Address, 
                userContext.profile.Address[0].Province, 
                userContext.profile.Address[0].District, data.Weight?data.Weight*1000:1000, getPrice(data.Price, "won", "vnd", false));

            data.Qty = qty;
            data.ShipFee = getPrice(getShipFee(), "won", strings["currencycode"], false) + getPrice(result.Fee, "vnd",  strings["currencycode"], false);
            store.dispatch(addToShoppingCart(data));
            setAddedToCart(true);
        }
        else
        {
            store.dispatch(openAuthForm("signin"));
        }
    }

    const closeAddedCartMessage=(event, reason)=>{
        if(reason === 'clickaway')
        {
            return;
        }
        setAddedToCart(false);
    }

    const currencyRate = useSelector((state)=>{
        return state.configReducer.currencyRate
    })

    const intenationalShipFee  =useSelector((state)=>{
        return state.configReducer.intenationalShipFee
    })

    const getShipFee=()=>{
        if(data.Weight && data.Size)
        {
            let weight = Math.ceil(data.Weight);
            let size = Math.ceil(data.Size);

            let fee = weight*intenationalShipFee.weightUnit> size*intenationalShipFee.volumeUnit?weight*intenationalShipFee.weightUnit:size*intenationalShipFee.volumeUnit;
            return fee;
        }
        return 1*intenationalShipFee.weightUnit;
    }

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

    const viewItem=()=>{
        store.dispatch(addViewItems(data));
    }

    return (
        <>
            <Link to={"/product/"+ data.ID} className="link__item" onClick={viewItem}>
                <div className="box__image">
                    <img src={data.Image} alt={data.Name[langcode.toUpperCase()]} className="image"/>
                </div>
                <div className="box__information">
                    {   data.Discount>0&&
                        <div className="box__discount">
                            <ArrowDownwardOutlinedIcon/>
                            <span className="text text__value">
                                {data.Discount}</span><span className="text text__unit">%</span>
                        </div>
                    }
                    <div className="box__price">
                        <span className="text__price">{getPrice(data.Price, "won")}</span><span className="text__unit">{strings["currency"]}</span>
                    </div>
                    {   data.Discount>0&&
                        <div className="box__price-original">
                            <span className="text text__value">{getPrice(data.Price*(1+data.Discount/100), "won")}</span>
                            <span className="text text__unit">{strings["currency"]}</span>
                        </div>
                    }
                    <div className="text__name">{data.Name[langcode.toUpperCase()]}</div>
                </div>
            </Link>
            <div className="wrap__deal-purchase-control">
                <div className="wrap__set-deal-purchase-count">
                    <button type="button" className="button__minus-item-count button__item-count" onClick={decrease}>
                        <span className="icon__minus"></span>
                    </button>
                    <input type="text" value={qty} className="text__added-item-count" title={strings["qty_title"]}/>
                    <button type="button" className="button__plus-item-count button__item-count" onClick={increase}>
                        <span className="icon__plus-1"></span>
                        <span className="icon__plus-2"></span>
                    </button>
                </div>
                <button type="button" className="button__add-deal-cart" onClick={addToCart}>
                </button>
            </div>

            <Snackbar open={addedToCart} autoHideDuration={3000} onClose={closeAddedCartMessage}>
                <Alert severity="success">
                    {strings["add_to_cart_success"] &&
                        <div dangerouslySetInnerHTML={{__html:strings["add_to_cart_success"].replace("{0}", qty).replace("{1}", data.Name[langcode.toUpperCase()])}}>
                        </div>
                    }
                </Alert>
            </Snackbar>
        </>
    )
}

export default FlashSaleItem