import React from "react";
import { useSelector } from 'react-redux';
import PopularProductItem from "./PopularProductItem";
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import {connect} from "react-redux";

function PopularProductComponent(props)
{
    const {strings, currentLanguageCode} = props;
    const popularProducts = useSelector((state)=>{
        return state.configReducer.popularProducts
    })

    return (
        <>
            <div className="box__item-tab">
                <div className="box__item-header">
                    <a className="link__tab" href="#">{strings["popular_tab_title"]}</a>
                </div>
                <div className="box__item-content">
                    <ul className="list__item">
                        {
                            popularProducts.map((item, index)=>(
                                <li key={item.id} className="list-item">
                                    <PopularProductItem data={item} langcode = {currentLanguageCode} translation={strings}></PopularProductItem>
                                </li>
                            ))
                        }
                    </ul>
                    <a href="#" className="link__more-bottom">
                        <span className="sprite__homemain--after">{strings["popular_see_more"]}</span>
                    </a>
                </div>
            </div>
        </>
    )
}

export default connect()(multilanguage(PopularProductComponent));