import {
    MOVIES_LOADED,
    START_MOVIES_LOADING,
    STOP_MOVIES_LOADING,
    MOVIES_SORT_BY_VOTE_AVEREGE_FROM_MAX,
    MOVIES_SORT_BY_DEFAULT,
    MOVIES_SORT_BY_TITLE,
    MOVIES_SORT_BY_RELEASE_DATE_FROM_MIN,
    MOVIES_SORT_BY_POPULARITY_FROM_MAX,
} from '../action-types';

const defaultValue = {
    movies: [],
    isMoviesLoading: false,
};

export const moviesReducer = (store = defaultValue, action) => {
    switch(action.type) {
        case MOVIES_LOADED: {
            return {
                ...store,
                movies: action.payload,
            }
        }
        case START_MOVIES_LOADING: {
            return {
                ...store,
                isMoviesLoading: true
            }
        }
        case STOP_MOVIES_LOADING: {
            return {
                ...store,
                isMoviesLoading: false
            }
        }
        case MOVIES_SORT_BY_VOTE_AVEREGE_FROM_MAX: {
            // console.log('MOVIES_SORT_BY_VOTE_AVEREGE_FROM_MAX');
            const { movies } = store;
            const copyMovies = [...movies];

            const sortedMovies = copyMovies.sort((m1, m2) => {
                return +m1.vote_average - +m2.vote_average;
            });

            return {
                ...store,
                movies: sortedMovies.reverse()
            }
        }

        case MOVIES_SORT_BY_DEFAULT: {
            // console.log('MOVIES_SORT_BY_DEFAULT')
            return {
                ...store,
                movies: action.payload
            }
        }

        case MOVIES_SORT_BY_TITLE: {
            // console.log('MOVIES_SORT_BY_TITLE')
            const { movies } = store;
            const copyMovies = [...movies];

            const sortedMovies = copyMovies.sort((m1, m2) => {
                if (m1.original_title > m2.original_title) {
                    return 1;
                }
                if (m1.original_title < m2.original_title) {
                    return -1;
                }
                return 0;
            });

            return {
                ...store,
                movies: sortedMovies
            }
        }

        case MOVIES_SORT_BY_RELEASE_DATE_FROM_MIN: {
            // console.log('MOVIES_SORT_BY_RELEASE_DATE_FROM_MIN')
            const { movies } = store;
            const copyMovies = [...movies];

            const sortedMovies = copyMovies.sort((m1, m2) => {
                return +new Date(m1.release_date) - +new Date(m2.release_date);
            });

            return {
                ...store,
                movies: sortedMovies
            }
        }

        case MOVIES_SORT_BY_POPULARITY_FROM_MAX: {
            // console.log('MOVIES_SORT_BY_POPULARITY_FROM_MAX')
            const { movies } = store;
            const copyMovies = [...movies];

            const sortedMovies = copyMovies.sort((m1, m2) => {
                return +m1.popularity - +m2.popularity;
            });

            return {
                ...store,
                movies: sortedMovies.reverse()
            }
        }

        default: return store;
    }
};