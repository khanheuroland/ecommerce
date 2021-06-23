import React from "react"
import { useParams } from "react-router"

function CategoryPage(props)
{
    let {catId} = useParams();

    return(
        <h1>Category Page</h1>
    )
}

export default CategoryPage