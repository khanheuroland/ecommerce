import React from "react"
import PageHeaderComponent from '../components/PageHeaderComponent';
import { useParams } from "react-router"

function CategoryPage(props)
{
    let {catId} = useParams();

    return(
        <>
        <PageHeaderComponent/>
        </>
    )
}

export default CategoryPage