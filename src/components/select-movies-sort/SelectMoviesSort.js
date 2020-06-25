import React from "react";
import "./SelectMoviesSort.scss";
import {sortingOptions} from "../../constants";

export const SelectMoviesSort = (props) => {
    const { currentSortType,  onTypeSelect } = props;

    const onTypeSelectChange = (event) => {
        return (event) => {
            onTypeSelect(event)
        }
    }

    return(
        <select value={currentSortType} onChange={onTypeSelectChange()} className="select-movies">
            {
                sortingOptions.map((item, index) => {
                    return (
                        <option key={index} value={item}>{item}</option>
                    );
                })
            }
        </select>
    );
}