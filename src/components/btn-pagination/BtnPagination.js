import React from "react";
import {Link} from "react-router-dom";
import "./BtnPagination.scss"

export const BtnPagination = (props) => {
    const { url, className, value } = props;

    return(
        <Link to={`${url}?page=${value}`} className={className}>{value}</Link>
    );
}