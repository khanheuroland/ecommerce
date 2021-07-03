const initialConfigState={
    bestProducts: [
        {
            id: 1,
            name: {
                'KO': '올그린 약산성 시카 비타민 토너 500g /수량별증정행사',
                'EN': 'All green weakly acidic cica vitamin toner 500g / quantity-specific gift event',
                'VI': 'Tất cả các loại mực vitamin vitamin Cica acidical 100g / số lượng đặc biệt'
            },
            image: 'http://gdimg1.gmarket.co.kr/goods_image2/exlarge_moreimg/201/209/2012093908/2012093908_01.jpg?ver=1611153901',
            price: 17800
        },
        {
            id: 2,
            name: {
                'KO': '올그린 약산성 시카 비타민 토너 500g /수량별증정행사',
                'EN': 'All green weakly acidic cica vitamin toner 500g / quantity-specific gift event',
                'VI': 'Tất cả các loại mực vitamin vitamin Cica acidical 100g / số lượng đặc biệt'
            },
            image: 'http://gdimg.gmarket.co.kr/2011230092/still/400?ver=1611042548',
            price: 27800
        },
        {
            id: 3,
            name: {
                'KO': '올그린 약산성 시카 비타민 토너 500g /수량별증정행사',
                'EN': 'All green weakly acidic cica vitamin toner 500g / quantity-specific gift event',
                'VI': 'Tất cả các loại mực vitamin vitamin Cica acidical 100g / số lượng đặc biệt'
            },
            image: 'http://gdimg.gmarket.co.kr/1535504076/still/600?ver=1544854221',
            price: 51200
        },
        {
            id: 4,
            name: {
                'KO': '올그린 약산성 시카 비타민 토너 500g /수량별증정행사',
                'EN': 'All green weakly acidic cica vitamin toner 500g / quantity-specific gift event',
                'VI': 'Tất cả các loại mực vitamin vitamin Cica acidical 100g / số lượng đặc biệt'
            },
            image: 'http://gdimg.gmarket.co.kr/2042718669/still/600?ver=1621248100',
            price: 17800
        },
        {
            id: 5,
            name: {
                'KO': '올그린 약산성 시카 비타민 토너 500g /수량별증정행사',
                'EN': 'All green weakly acidic cica vitamin toner 500g / quantity-specific gift event',
                'VI': 'Tất cả các loại mực vitamin vitamin Cica acidical 100g / số lượng đặc biệt'
            },
            image: 'http://gdimg.gmarket.co.kr/1672823183/still/600?ver=1585200010',
            price: 39410
        }
    ],
    popularProducts: [{
        "ID": 1,
        "CatID": 1,
        "Name": {
            "KO": "로션 피지오겔로션 200ml",
            "EN": "Lotion Physiogel Lotion 200ml",
            "VI": "Lotion Physiogel Lotion 200ml"
        },
        "Image": "https://gdimg.gmarket.co.kr/1878140710/still/280?ver=1606457884",
        "LargeImage": "http://gdimg.gmarket.co.kr/1878140710/still/600?ver=1606457884",
        "Price": 34300,
        "Discount": 30,
        "Currency": "won"
    }, {
        "ID": 2,
        "CatID": 1,
        "Name": {
            "KO": "클라리피끄 브라이트닝 에멀젼 75ml 세트",
            "EN": "Clarifique Brightening Emulsion 75ml Set",
            "VI": "Clarifique Brightening Emulsion 75ml Set"
        },
        "Image": "https://gdimg.gmarket.co.kr/1984818057/still/280?ver=1612917268",
        "LargeImage": "http://gdimg.gmarket.co.kr/1984818057/still/600?ver=1612917268",
        "Price": 89250,
        "Discount": 15,
        "Currency": "won"
    }, {
        "ID": 3,
        "CatID": 1,
        "Name": {
            "KO": "에센셜 파워 에멀젼(모이스춰) 120ml/건성 스킨로션",
            "EN": "Essential Power Emulsion (Moisture) 120ml/Dry Skin Lotion",
            "VI": "Essential Power Emulsion (Moisture) 120ml/Sữa dưỡng da khô"
        },
        "Image": "https://gdimg.gmarket.co.kr/1887689290/still/280?ver=1600145530",
        "LargeImage": "http://gdimg.gmarket.co.kr/1887689290/still/600?ver=1600145530",
        "Price": 27900,
        "Discount": 0,
        "Currency": "won"
    }, {
        "ID": 4,
        "CatID": 1,
        "Name": {
            "KO": "단독 더마트러블 에멀젼 150ml/ 아이오페",
            "EN": "Sole Dermatable Emulsion 150ml / IOPE",
            "VI": "Sole Dermatable Emulsion 150ml / IOPE"
        },
        "Image": "https://gdimg.gmarket.co.kr/1142347562/still/280?ver=1625100631",
        "LargeImage": "http://gdimg.gmarket.co.kr/1142347562/still/600?ver=1625100631",
        "Price": 22400,
        "Discount": 30,
        "Currency": "won"
    }, {
        "ID": 5,
        "CatID": 1,
        "Name": {
            "KO": "단독 더마트러블 에멀젼 150ml/ 아이오페",
            "EN": "Sole Dermatable Emulsion 150ml / IOPE",
            "VI": "Sole Dermatable Emulsion 150ml / IOPE"
        },
        "Image": "https://gdimg.gmarket.co.kr/1142347562/still/280?ver=1625100631",
        "LargeImage": "http://gdimg.gmarket.co.kr/1142347562/still/600?ver=1625100631",
        "Price": 22400,
        "Discount": 0,
        "Currency": "won"
    }, {
        "ID": 6,
        "CatID": 1,
        "Name": {
            "KO": "아이오페 라이브리프트 스킨 로션 크림 선",
            "EN": "IOPE Livelift Skin Lotion Cream Sun",
            "VI": "IOPE Livelift Skin Lotion Cream Sun"
        },
        "Image": "https://gdimg.gmarket.co.kr/797522029/still/280?ver=1604042293",
        "LargeImage": "http://gdimg.gmarket.co.kr/797522029/still/600?ver=1604042293",
        "Price": 32000,
        "Discount": 0,
        "Currency": "won"
    }, {
        "ID": 7,
        "CatID": 1,
        "Name": {
            "KO": "피지오겔 DMT 바디로션 400mL",
            "EN": "Physiogel DMT Body Lotion 400mL",
            "VI": "Sữa dưỡng thể Physiogel DMT 400mL"
        },
        "Image": "https://gdimg.gmarket.co.kr/2084804835/still/280?ver=1617850044",
        "LargeImage": "http://gdimg.gmarket.co.kr/2084804835/still/600?ver=1617850044",
        "Price": 26800,
        "Discount": 0,
        "Currency": "won"
    }, {
        "ID": 8,
        "CatID": 1,
        "Name": {
            "KO": "뉴스킨 바디바 비누140g 5개패키지",
            "EN": "Nu Skin Body Bar Soap 140g 5 Packs",
            "VI": "Nu Skin Body Bar Soap 140g 5 Gói"
        },
        "Image": "https://gdimg.gmarket.co.kr/1864438334/still/280?ver=1613953139",
        "LargeImage": "http://gdimg.gmarket.co.kr/1864438334/still/600?ver=1613953139",
        "Price": 47990,
        "Discount": 0,
        "Currency": "won"
    }],
    freeshipProducts: [
        {
            "ID": 1,
            "CatID": 1,
            "Name": {
                "KO": "로션 피지오겔로션 200ml",
                "EN": "Lotion Physiogel Lotion 200ml",
                "VI": "Lotion Physiogel Lotion 200ml"
            },
            "Image": "https://gdimg.gmarket.co.kr/1878140710/still/280?ver=1606457884",
            "LargeImage": "http://gdimg.gmarket.co.kr/1878140710/still/600?ver=1606457884",
            "Price": 34300,
            "Discount": 30,
            "Currency": "won"
        }, {
            "ID": 2,
            "CatID": 1,
            "Name": {
                "KO": "클라리피끄 브라이트닝 에멀젼 75ml 세트",
                "EN": "Clarifique Brightening Emulsion 75ml Set",
                "VI": "Clarifique Brightening Emulsion 75ml Set"
            },
            "Image": "https://gdimg.gmarket.co.kr/1984818057/still/280?ver=1612917268",
            "LargeImage": "http://gdimg.gmarket.co.kr/1984818057/still/600?ver=1612917268",
            "Price": 89250,
            "Discount": 15,
            "Currency": "won"
        }, {
            "ID": 3,
            "CatID": 1,
            "Name": {
                "KO": "에센셜 파워 에멀젼(모이스춰) 120ml/건성 스킨로션",
                "EN": "Essential Power Emulsion (Moisture) 120ml/Dry Skin Lotion",
                "VI": "Essential Power Emulsion (Moisture) 120ml/Sữa dưỡng da khô"
            },
            "Image": "https://gdimg.gmarket.co.kr/1887689290/still/280?ver=1600145530",
            "LargeImage": "http://gdimg.gmarket.co.kr/1887689290/still/600?ver=1600145530",
            "Price": 27900,
            "Discount": 0,
            "Currency": "won"
        }, {
            "ID": 4,
            "CatID": 1,
            "Name": {
                "KO": "단독 더마트러블 에멀젼 150ml/ 아이오페",
                "EN": "Sole Dermatable Emulsion 150ml / IOPE",
                "VI": "Sole Dermatable Emulsion 150ml / IOPE"
            },
            "Image": "https://gdimg.gmarket.co.kr/1142347562/still/280?ver=1625100631",
            "LargeImage": "http://gdimg.gmarket.co.kr/1142347562/still/600?ver=1625100631",
            "Price": 22400,
            "Discount": 30,
            "Currency": "won"
        }, {
            "ID": 5,
            "CatID": 1,
            "Name": {
                "KO": "단독 더마트러블 에멀젼 150ml/ 아이오페",
                "EN": "Sole Dermatable Emulsion 150ml / IOPE",
                "VI": "Sole Dermatable Emulsion 150ml / IOPE"
            },
            "Image": "https://gdimg.gmarket.co.kr/1142347562/still/280?ver=1625100631",
            "LargeImage": "http://gdimg.gmarket.co.kr/1142347562/still/600?ver=1625100631",
            "Price": 22400,
            "Discount": 0,
            "Currency": "won"
        }, {
            "ID": 6,
            "CatID": 1,
            "Name": {
                "KO": "아이오페 라이브리프트 스킨 로션 크림 선",
                "EN": "IOPE Livelift Skin Lotion Cream Sun",
                "VI": "IOPE Livelift Skin Lotion Cream Sun"
            },
            "Image": "https://gdimg.gmarket.co.kr/797522029/still/280?ver=1604042293",
            "LargeImage": "http://gdimg.gmarket.co.kr/797522029/still/600?ver=1604042293",
            "Price": 32000,
            "Discount": 0,
            "Currency": "won"
        }, {
            "ID": 7,
            "CatID": 1,
            "Name": {
                "KO": "피지오겔 DMT 바디로션 400mL",
                "EN": "Physiogel DMT Body Lotion 400mL",
                "VI": "Sữa dưỡng thể Physiogel DMT 400mL"
            },
            "Image": "https://gdimg.gmarket.co.kr/2084804835/still/280?ver=1617850044",
            "LargeImage": "http://gdimg.gmarket.co.kr/2084804835/still/600?ver=1617850044",
            "Price": 26800,
            "Discount": 0,
            "Currency": "won"
        }, {
            "ID": 8,
            "CatID": 1,
            "Name": {
                "KO": "뉴스킨 바디바 비누140g 5개패키지",
                "EN": "Nu Skin Body Bar Soap 140g 5 Packs",
                "VI": "Nu Skin Body Bar Soap 140g 5 Gói"
            },
            "Image": "https://gdimg.gmarket.co.kr/1864438334/still/280?ver=1613953139",
            "LargeImage": "http://gdimg.gmarket.co.kr/1864438334/still/600?ver=1613953139",
            "Price": 47990,
            "Discount": 0,
            "Currency": "won"
        }
    ],
    currencyRate: {
        wonusd: 0.00088,
        wonvnd: 20.29,
        wonwon: 1
    },
    authStatus:{
        module: ''
    }
}

const ConfigReducer = (state=initialConfigState, action)=>{
    switch(action.type)
    {
        case "UPDATE_BEST_PRODUCT":
        {
            const newBestProduct = action.payload;
            return {
                ...state,
                bestProducts: newBestProduct
            }
        }
        default:
            return state;
    }
}

export default ConfigReducer