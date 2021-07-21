
import React from "react";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
import {adjustQtyShoppingCart, removeFromShoppingCart} from '../reducers/userReducer'
import store from "../store";

function ShoppingCartItem(props)
{
    const langcode = props.langcode;
    const data = props.data;
    const strings = props.translation;

    const [qty, setQty] = React.useState(data.Qty? data.Qty: 1);

    const increase=()=>{
        if(qty<100)
        {
            setQty(qty+1);
            data.Qty = qty+1;
            data.Total = (qty+1)*data.Price;
            store.dispatch(adjustQtyShoppingCart(data));
        }
            
    }

    const decrease=()=>{
        if(qty>1)
        {
            setQty(qty-1);
            data.Qty = qty-1;
            data.Total = (qty-1)*data.Price;
            store.dispatch(adjustQtyShoppingCart(data));
        }
    }

    const removeFromCart=()=>{
        store.dispatch(removeFromShoppingCart(data));
    }

    const currencyRate = useSelector((state)=>{
        return state.configReducer.currencyRate
    })

    const getPrice = (price, fromCurrency="won")=>{
        let val;
        if(langcode=="vi")
        {
            val = (Math.round(price*currencyRate[fromCurrency+strings["currencycode"]]/100))*100;
        }
        else if(langcode=="en")
        {
            val = (price*currencyRate[fromCurrency+strings["currencycode"]]).toFixed(2);
        }
        else
        {
            val = price;
        }
        if(val>999)
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
            <Link to={"/product/"+ data.ID} className="link__item">
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
                <div className="item-total">
                    <pan className="total-value">
                        {
                            getPrice(qty*data.Price)
                        }
                    </pan>
                    <span className="text text__unit">{strings["currency"]}</span>
                </div>
            </div>
            <div style={{marginTop:"15px"}}>
            <Button size="small" variant="outlined" color="primary" onClick={removeFromCart}>
                {strings["remove"]}
            </Button>
            </div>
        </>
    )
}

export default ShoppingCartItem