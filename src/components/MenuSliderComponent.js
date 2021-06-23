import React from "react";
import { Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, Navigation, Pagination, EffectFade} from 'swiper';
import {multilanguage, changeLanguage, loadLanguages} from "redux-multilanguage";
import {connect} from "react-redux";
import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"


class MenuSliderComponent extends React.Component{
    
    render(){
        SwiperCore.use([Autoplay, Navigation, Pagination, EffectFade]);

        const {strings, currentLanguageCode} = this.props;

        return(
            <div className="section__main section__main-top">
                <div className="section__main-inner">
                    <div className="box__category">
                        <div>
                            <div id="box__category-all-layer" className="box__category-all-layer js-ussr-component">
                                <ul className="list__category-all">
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_skinCare"]}</span>
                                    </li>
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_perfume"]}</span>
                                    </li>
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_beautyAccessories"]}</span>
                                    </li>
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_nailCare"]}</span>
                                    </li>
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_colorMakeup"]}</span>
                                    </li>
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_cleansingPeeling"]}</span>
                                    </li>
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_mask"]}</span>
                                    </li>
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_menCosmetics"]}</span>
                                    </li>
                                    <li className="list-item__1depth">
                                        <span className="link__1depth-item">{strings["menu_sunCare"]}</span>
                                    </li>
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
}

export default connect()(multilanguage(MenuSliderComponent));