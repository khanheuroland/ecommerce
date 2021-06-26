
import React from "react";
import { useSelector } from 'react-redux';

function FlashSaleItem(props)
{
    const langcode = props.langcode;
    const data = props.data;
    const strings = props.translation;

    const [qty, setQty] = React.useState(1);

    const increase=()=>{
        if(qty<100)
            setQty(qty+1);
    }

    const decrease=()=>{
        if(qty>1)
            setQty(qty-1);
    }

    const addToCart=()=>{
        alert("Add to cart: qty="+ qty +"- id="+ data.id)
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
            <a href="#" className="link__item">
                <div className="box__image">
                    <img src={data.middleImage} alt={data.name[langcode.toUpperCase()]} className="image"/>
                </div>
                <div className="box__information">
                    <div className="box__price"><span className="text__price">{getPrice(data.price, "won")}</span><span className="text__unit">{strings["currency"]}</span></div>
                    <div className="text__name">{data.name[langcode.toUpperCase()]}</div>
                </div>
            </a>
            <div className="wrap__deal-purchase-control">
                <div className="wrap__set-deal-purchase-count">
                    <button type="button" className="button__minus-item-count button__item-count" onClick={decrease}>
                        <span className="icon__minus"></span>
                    </button>
                    <input type="text" readonly="" value={qty} className="text__added-item-count" title={strings["qty_title"]}/>
                    <button type="button" className="button__plus-item-count button__item-count" onClick={increase}>
                        <span className="icon__plus-1"></span>
                        <span className="icon__plus-2"></span>
                    </button>
                </div>
                <button type="button" className="button__add-deal-cart" onClick={addToCart}>
                </button>
            </div>
        </>
    )
}

export default FlashSaleItem