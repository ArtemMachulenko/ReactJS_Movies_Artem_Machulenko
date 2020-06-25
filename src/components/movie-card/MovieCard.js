import React from "react";
import {api_img_url} from "../../constants";
import { StarsRating } from "../stars-rating/StarsRating";
import { withRouter } from 'react-router';
import "./MovieCard.scss";
import {Link} from "react-router-dom";

const MovieCardComponent = (props) => {
    const { movie={}, genres=[], match: {url}, showBtnInfo, showOverview} = props;
    const {
        title,
        overview,
        release_date,
        popularity,
        vote_count,
        poster_path,
        vote_average,
        original_language,
        id } = movie;

    return(
        <div className="movie-card card">
            <img className="card-img-top" src={`${api_img_url}${poster_path}`} alt="movie photo" />
            <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <h6 className="card-title">Genres:</h6>
                <ul>
                    {
                        genres && genres.map(item => {
                            return <li key={item}>{item}</li>
                        })
                    }
                </ul>
                {
                    showOverview && (
                    <div>
                        <h6 className="card-title">Overview:</h6>
                        <p className="card-text">{overview}</p>
                    </div>
                    )
                }
                <h6 className="card-title">Popularity: {popularity}</h6>
                <h6 className="card-title">Language: {original_language.toUpperCase()}</h6>
                <h6 className="card-title">Vote averege: {vote_average} ({vote_count})</h6>
                <StarsRating vote_average={vote_average} />
                <h6 className="card-title">Release date: {release_date}</h6>
            </div>
            {showBtnInfo&&<Link to={`${url}/${id}`} className="btn btn-primary">Show details</Link>}
        </div>
    );
}

export const MovieCard = withRouter(MovieCardComponent);