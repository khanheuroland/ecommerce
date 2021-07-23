import React from "react";
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide} from "swiper/react";
import BestProductItem from "./BestProductItem";
import {multilanguage} from "redux-multilanguage";
import {connect} from "react-redux";

var data = require('../assets/dumpdata.json');

function BestProductComponent(props)
{
    const {strings, currentLanguageCode} = props;
    const bestProducts = useSelector((state)=>{
        /*
        let viewItems =  state.userReducer.viewedItems.slice();
        return viewItems.reverse();
        */
        return data.Products.filter(c=>c.tag=='best') ;
    })

    let slide = [];
    bestProducts.map((item, index)=>(
        index%5==0?slide.push(slide.length):index
    ));

    return (
        <>
            <div className="section__main section__main-best">
                <div className="section__main-inner">
                    <div className="box__best">
                        <h2 className="text__title">
                            <a href="#" className="link__title">{strings["bestProductTitle"]}</a>
                        </h2>
                        <div className="box__item box__swiper-area">
                            <Swiper 
                                spaceBetween={30}
                                slidesPerView= {"auto"}
                                centeredSlides= {true}
                                autoplay = {{delay:10000, disableOnInteraction:true}}
                                pagination = {{type: "fraction", el: ".swiper-pagination"}}
                                navigation
                            >
                                {
                                    slide.map((s, index)=>(
                                        <SwiperSlide>
                                            <ul className="list__item" id={s}>
                                                {
                                                    bestProducts.slice(s*5, 5*(s+1)).map((item, index)=>(
                                                        <li key={item.id} className="list-item">
                                                            <BestProductItem data={item} index={1+ index} langcode = {currentLanguageCode} translation={strings}></BestProductItem>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </SwiperSlide>
                                    ))
                                }
                                
                                
                            </Swiper>
                           
                        </div>
                        <a href="" className="sprite__homemain--after link__more">{strings["viewAll"]}</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default connect()(multilanguage(BestProductComponent));