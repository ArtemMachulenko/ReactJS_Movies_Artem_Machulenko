import {api_key} from "../constants";
import {
    MOVIES_LOADED,
    START_MOVIES_LOADING,
    STOP_MOVIES_LOADING,
    ERROR_MOVIES_LOADING,
    MOVIES_GENRES_LOADED,
    START_GENRES_LOADING,
    STOP_GENRES_LOADING,
    ERROR_MOVIES_GENRES_LOADING,
    MOVIES_SORT_BY_VOTE_AVEREGE_FROM_MAX,
    MOVIES_SORT_BY_DEFAULT,
    MOVIES_SORT_BY_TITLE,
    MOVIES_SORT_BY_RELEASE_DATE_FROM_MIN,
    MOVIES_SORT_BY_POPULARITY_FROM_MAX,
} from "../action-types";
import uniqId from "uniqid";

export const moviesSortByVoteAveregeFromMax = () => {
    return {
        type: MOVIES_SORT_BY_VOTE_AVEREGE_FROM_MAX
    }
}

export const moviesSortByDefault = (moviesDefault) => {
    return {
        type: MOVIES_SORT_BY_DEFAULT,
        payload: moviesDefault
    }
}

export const moviesSortByTitle = () => {
    return {
        type: MOVIES_SORT_BY_TITLE
    }
}

export const moviesSortByReleaseDateFromMin = () => {
    return {
        type: MOVIES_SORT_BY_RELEASE_DATE_FROM_MIN
    }
}

export const moviesSortByPopularityFromMax = () => {
    return {
        type: MOVIES_SORT_BY_POPULARITY_FROM_MAX
    }
}

export const startLoadingMovies = () => {
    return {
        type: START_MOVIES_LOADING,
    }
}

export const stopLoadingMovies = () => {
    return {
        type: STOP_MOVIES_LOADING
    }
}

export const getMovies = (page='1') => {
    return (dispatch, getState) => {
        dispatch(startLoadingMovies()); // запустить loader
        return (
            fetch( `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`)
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: MOVIES_LOADED,
                        payload: data.results
                    });
                    dispatch(stopLoadingMovies()); //остановить loader
                }).catch(err => {
                dispatch({
                    type: ERROR_MOVIES_LOADING,
                    payload: err
                })
            })
        );
    }
}

export const startLoadingGenres = () => {
    return {
        type: START_GENRES_LOADING
    }
}

export const stopLoadingGenres = () => {
    return {
        type: STOP_GENRES_LOADING
    }
}

const ALL_GANRES = {id: uniqId() ,name: 'All'};

export const getGenres = () => {
    return (dispatch, getState) => {
        dispatch(startLoadingGenres()); // запустить loader
        return (
            fetch( `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`)
                .then(response => response.json())
                .then(data => {
                    dispatch({
                        type: MOVIES_GENRES_LOADED,
                        payload: data.genres
                    });
                    dispatch(stopLoadingGenres()); //остановить loader
                }).catch(err => {
                dispatch({
                    type: ERROR_MOVIES_GENRES_LOADING,
                    payload: err
                })
            })
        );
    }
}