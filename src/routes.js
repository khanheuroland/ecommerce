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
    }
]