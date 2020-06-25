import React from 'react';
import ReactStars from "react-rating-stars-component";
//https://www.npmjs.com/package/react-rating-stars-component

export const StarsRating = (props) => {
    const { vote_average } = props;

    return (
        <ReactStars
            count={10}
            value={vote_average}
            size={24}
            edit={false}
            half={true}
        />
    );

}
