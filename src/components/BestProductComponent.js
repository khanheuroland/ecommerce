import React from "react";
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Navigation, Pagination} from 'swiper';
import BestProductItem from "./BestProductItem";
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import {connect} from "react-redux";

function BestProductComponent(props)
{
    const {strings, currentLanguageCode} = props;
    const bestProducts = useSelector((state)=>{
        return state.configReducer.bestProducts
      })

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
                                <SwiperSlide>
                                    <ul className="list__item">
                                        {
                                            bestProducts.map((item, index)=>(
                                                <li key={item.id} className="list-item">
                                                    <BestProductItem data={item} index={1+ index} langcode = {currentLanguageCode} translation={strings}></BestProductItem>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </SwiperSlide>
                                
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