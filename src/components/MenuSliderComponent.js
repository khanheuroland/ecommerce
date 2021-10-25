import React from "react";
import { Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Navigation, Pagination, EffectFade} from 'swiper';
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import { Link } from 'react-router-dom';
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"
import {connect, useSelector} from "react-redux";

function MenuSliderComponent (props) {

    SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

    const {strings, currentLanguageCode} = props;

    const categories = useSelector((state)=>{
        return state.configReducer.categories;
    })

    return(
        <div className="section__main section__main-top">
            <div className="section__main-inner">
                <div className="box__category">
                    <div>
                        <div id="box__category-all-layer" className="box__category-all-layer js-ussr-component">
                            <ul className="list__category-all">
                                {
                                    categories.map((item, index)=>(
                                        <li className="list-item__1depth">
                                            <Link to={"/category/"+item.ID}>
                                                <span className="link__1depth-item">{item.Name[currentLanguageCode.toUpperCase()]}</span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="box__promotion box__swiper-area">
                    <Swiper 
                        spaceBetween={30}
                        effect={'fade'}
                        slidesPerView={'auto'}
                        centeredSlides= {true}
                        autoplay = {{delay:2500, disableOnInteraction:false}}
                    >
                        <SwiperSlide>
                            <a href="#" className="link__item">
                                <div className="box__image">
                                    <img src="https://ad-img.ebaykorea.com/ADS/Contents_/2021_05_18_04_54_48/6c06f98e75864942.JPG" 
                                        width="976" height="400" className="image js-impressionable" />
                                </div>
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="#" className="link__item">
                                <div className="box__image">
                                    <img src="https://ad-img.ebaykorea.com/ADS/Contents_/2021_05_18_05_01_21/7db7d468f067416b.JPG" 
                                        width="976" height="400" className="image js-impressionable" />
                                </div>
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="#" className="link__item">
                                <div className="box__image">
                                    <img src="https://ad-img.ebaykorea.com/ADS/Contents_/2021_05_14_01_28_47/916c67ed81334637.JPG" 
                                        width="976" height="400" className="image js-impressionable" />
                                </div>
                            </a>
                        </SwiperSlide>
                        <SwiperSlide>
                            <a href="#" className="link__item">
                                <div className="box__image">
                                    <img src="https://ad-img.ebaykorea.com/ADS/Contents_/2021_05_19_09_52_17/aa12adb3bb254552.JPG" 
                                        width="976" height="400" className="image js-impressionable" />
                                </div>
                            </a>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default connect()(multilanguage(MenuSliderComponent));