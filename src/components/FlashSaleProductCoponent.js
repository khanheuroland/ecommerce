import React from "react";
import { useSelector } from 'react-redux';
import {multilanguage} from "redux-multilanguage";
import {connect} from "react-redux";
import FlashSaleItem from './FlashSaleItem';

function FlashSaleProductCoponent(props)
{
    const {strings, currentLanguageCode} = props;
    const bestProducts = useSelector((state)=>{
        return []//state.configReducer.popularProducts
      })

    return (
        <>
            <div className="section__main section__main-superdeal">
                    <div className="section__main-inner">
                        <div className="box__superdeal">
                            <h2 className="text__title">
                                <a href="#" className="link__title sprite__homemain">슈퍼딜</a>
                            </h2>
                            <a href="#" className="sprite__homemain--after link__more">전체보기</a>
                            <div className="box__item">
                                <ul className="list__item">
                                    {
                                        bestProducts.map((item, index)=>(
                                            <li key={item.id} className="list-item">
                                                <FlashSaleItem data={item} index={1+ index} langcode = {currentLanguageCode} translation={strings}></FlashSaleItem>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <a href="#" className="link__all-more"><span className="sprite__homemain--after">{strings["view_all"]}</span></a>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}
export default connect()(multilanguage(FlashSaleProductCoponent));