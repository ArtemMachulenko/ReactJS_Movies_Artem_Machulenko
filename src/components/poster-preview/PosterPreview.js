import React, {Component,PureComponent} from 'react';
import {connect} from 'react-redux';
import {getMovies} from "../../actions/moviesAction";
import {getGenres} from "../../actions/moviesAction";
import {MovieCard} from "../movie-card/MovieCard";
import {PosterPreviewList} from "./PosterPreviewList";
import { DarkThemeContext } from '../../context/DarkThemeContext';
import {Loader} from "../loader/Loader";
import "./PosterPreview.scss";

class PosterPreview extends PureComponent {
    constructor(props) {
        super(props);
        const { movies=[] } = this.props;

        this.state = {
            selectedMovieId: movies.length ? movies[0].id : null
        };
    }

    componentDidMount() {
        const {movies, moviesGenres} = this.props;
        if (!movies.length) {
            this.props.getMovies && this.props.getMovies();
        }
        if (!moviesGenres.length) {
            this.props.getGenres && this.props.getGenres();
        }
    }

    componentDidUpdate (prevProps, prevState) {
        // console.log('componentDidUpdate');
        if ((prevProps.movies.length !== this.props.movies.length) && this.props.movies.length) {
            this.setState({
                selectedMovieId: this.props.movies[0].id
            });
        }
    }

    onMovieSelect = (movieId) => {
        this.setState({
            selectedMovieId: movieId
        });
    };

    render() {
        const { movies=[], isMoviesLoading, moviesGenres=[], isGenresLoading } = this.props;
        const { selectedMovieId } = this.state;
        let movie = null;
        let genres = [];

        if ( movies.length && moviesGenres.length && !isMoviesLoading && !isGenresLoading ) {
            movie = movies.find(item => item.id === selectedMovieId);
            genres = moviesGenres.filter(item => {
                return movie.genre_ids.find(x => x === item.id);
            }).map(item => item.name);
        }

        return (
            <DarkThemeContext.Consumer>
                {
                    (data) => {
                        return (
                            <div className={`poster-preview ${data.isDarkTheme && !isMoviesLoading && 'dark'}`}>
                                {
                                    isMoviesLoading&& <Loader/>
                                }
                                <h2 className={`poster-preview-title ${data.isDarkTheme && !isMoviesLoading && 'dark'}`}>Poster preview</h2>
                                <div className="poster-preview-list-container">
                                    <div className="poster-preview-list">
                                        {
                                            !isMoviesLoading && !isGenresLoading &&
                                            <PosterPreviewList
                                                movies={movies}
                                                onMovieSelect={this.onMovieSelect}
                                            />
                                        }
                                    </div>
                                    <div>
                                        {
                                            !isMoviesLoading && !isGenresLoading && !!movies.length && !!moviesGenres.length &&
                                            <MovieCard
                                                movie={movie}
                                                genres={genres}
                                                showBtnInfo={false}
                                                showOverview={true} />
                                        }
                                    </div>
                                </div>
                            </div>
                        );
                    }
                }
            </DarkThemeContext.Consumer>
        );
    }
}

const mapStateToProps = (store) => {
    const {moviesReducer: {movies, isMoviesLoading}, moviesGenresReducer: {moviesGenres, isGenresLoading}} = store;
    return {
        movies,
        isMoviesLoading,
        moviesGenres,
        isGenresLoading
    };
};
const mapDispatchToProps = ({
    getMovies,
    getGenres,
});

export default connect(mapStateToProps, mapDispatchToProps)(PosterPreview);












