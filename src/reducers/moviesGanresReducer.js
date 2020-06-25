import {
    MOVIES_GENRES_LOADED,
    START_GENRES_LOADING,
    STOP_GENRES_LOADING,
} from '../action-types';

const defaultValue = {
    moviesGenres: [],
    isGenresLoading: false,
};

export const moviesGenresReducer = (store = defaultValue, action) => {
    switch(action.type) {
        case MOVIES_GENRES_LOADED: {
            return {
                ...store,
                moviesGenres: action.payload,
            }
        }
        case START_GENRES_LOADING: {
            return {
                ...store,
                isGenresLoading: true
            }
        }
        case STOP_GENRES_LOADING: {
            return {
                ...store,
                isGenresLoading: false
            }
        }

        default: return store;
    }
};