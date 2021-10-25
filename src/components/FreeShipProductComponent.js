import React from "react";
import { useSelector } from 'react-redux';
import PopularProductItem from "./PopularProductItem";
import {multilanguage} from "redux-multilanguage";
import {connect} from "react-redux";

var data = require('../assets/dumpdata.json');

function FreeShipProductComponent(props)
{
    const {strings, currentLanguageCode} = props;
    const freeshipProducts = useSelector((state)=>{
        let lstProducts =  state.configReducer.freeShipProducts;
        return lstProducts;
    })

    return (
        <>
            <div className="box__item-tab">
                <div className="box__item-header">
                    <a className="link__tab" href="#">{strings["free_ship_title"]}</a>
                </div>
                <div className="box__item-content">
                    <ul className="list__item">
                        {
                            freeshipProducts.map((item, index)=>(
                                <li key={item.id} className="list-item">
                                    <PopularProductItem data={item} langcode = {currentLanguageCode} translation={strings}></PopularProductItem>
                                </li>
                            ))
                        }
                    </ul>
                    <a href="#" className="link__more-bottom">
                        <span className="sprite__homemain--after">{strings["free_ship_see_more"]}</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default connect()(multilanguage(FreeShipProductComponent));