import React from 'react'

const routes= [
    {
        path: '/',
        exact: true,
        main: (match)=> <HomePage match={match}/>
    },
    {
        path: '/category',
        exact: true,
        main: (match) => <CategoryPage match={match}/>
    },
    {
        path: '/product',
        exact: true,
        main: (match)=> <DetailPage match={match}/>
    },
    {
        path: '/shoppingcart',
        exact: true,
        main: (match)=> <ShoppingCartPage match={match}/>
    }
]