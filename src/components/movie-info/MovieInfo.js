import React from "react";
import {connect} from 'react-redux';
import {MovieCard} from "../movie-card/MovieCard";
import {getGenres, getMovies} from "../../actions/moviesAction";
import {Link} from "react-router-dom";
import { DarkThemeContext } from '../../context/DarkThemeContext';
import "./MovieInfo.scss";

const MovieInfo = (props) => {
    const { movies, moviesGenres, match: {params: {movieId}}} = props;
    const movie = movies.find(item => item.id === +movieId);
    const ganres = moviesGenres.filter(item => {
        return movie.genre_ids.find(x => x === item.id);
    }).map(item => item.name);

    React.useEffect(() => {
        const {movies, moviesGenres} = props;
        if (!movies.length) {
            props.getMovies && props.getMovies();
        }

        if (!moviesGenres.length) {
            props.getGenres && props.getGenres();
        }
    },[]);

    return (
    <DarkThemeContext.Consumer>
        {
            (data) => {
                return (
                    <div className={`movie-info ${data.isDarkTheme && 'dark'}`}>
                        <h2 className={`movie-info-title ${data.isDarkTheme && 'dark'}`}>MovieInfo</h2>
                        <MovieCard
                            movie={movie}
                            genres={ganres}
                            showBtnInfo={false}
                            showOverview={true}
                        />
                        <div>
                            <Link to="/home?page=1" className="btn btn-primary">Come back to movies list</Link>
                        </div>

                    </div>
                );
            }
        }
    </DarkThemeContext.Consumer>
    );
}

const mapStateToProps = (store) => {
    const {moviesReducer: {movies}, moviesGenresReducer: {moviesGenres}} = store;
    return {
        movies,
        moviesGenres
    };
};

const mapDispatchToProps = ({
    getMovies,
    getGenres,
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);







