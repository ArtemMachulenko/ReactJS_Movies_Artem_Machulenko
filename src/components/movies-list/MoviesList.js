import React, {Component, PureComponent} from 'react';
import {connect} from 'react-redux';
import {getMovies} from "../../actions/moviesAction";
import {getGenres} from "../../actions/moviesAction";
import {moviesSortByVoteAveregeFromMax} from "../../actions/moviesAction";
import {moviesSortByDefault} from "../../actions/moviesAction";
import {moviesSortByTitle} from "../../actions/moviesAction";
import {moviesSortByReleaseDateFromMin} from "../../actions/moviesAction";
import {moviesSortByPopularityFromMax} from "../../actions/moviesAction";
import { DarkThemeContext } from '../../context/DarkThemeContext';
import {MovieCard} from "../movie-card/MovieCard";
import queryString from "query-string";
import {BtnPagination} from "../btn-pagination/BtnPagination";
import {btnPaginationNames} from "../../constants";
import {SelectMoviesSort} from "../select-movies-sort/SelectMoviesSort";
import {Loader} from "../loader/Loader";
import {sortingOptions} from "../../constants";
import "./MoviesList.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

class MoviesList extends PureComponent {
    constructor(props) {
        super(props);

        const { location: {search} } = this.props;
        const { page } = queryString.parse(search);

        this.state = ({
            moviesDefault: this.props.movies,
            currentSortType: sortingOptions[0],
            btnPaginationLength: 3,
            page:  page || '1',
        });
    }

    componentDidMount() {
        const {movies=[], moviesGenres=[], getMovies, getGenres} = this.props;
        const { page } = this.state;
        // if (!movies.length) {
        //     getMovies && getMovies(page);
        // }
        //
        // if (!moviesGenres.length) {
        //     getGenres && getGenres();
        // }
        getMovies(page);
        getGenres();
    }

    componentDidUpdate (prevProps, prevState) {
        if ((prevProps.movies.length !== this.props.movies.length) && this.props.movies.length) {
            this.setState({
                moviesDefault: this.props.movies
            });
        }

        const { location: {search} } = this.props;
        const { page } = queryString.parse(search);
        const { location: {search: prevSearch} } = prevProps;
        const { page: prevPage } = queryString.parse(prevSearch);

        if (page !== prevPage) {
            const { getMovies } = this.props;
            getMovies && getMovies(page);

            this.setState({
                page,
                currentSortType: sortingOptions[0]
            });
        }
    }

    onTypeSelect = (event) => {
        const selectedIndex = event.target.selectedIndex;
        const selectedOption = sortingOptions[selectedIndex];
        const [sortByDefault,
            sortByPopularityFromMax,
            sortByVoteAveregeFromMax,
            sortByTitle,
            sortByReleaseDateFromMin
        ] = sortingOptions;

        switch (selectedOption) {
            case sortByDefault: {
                const { moviesSortByDefault } = this.props;
                moviesSortByDefault && moviesSortByDefault(this.state.moviesDefault);
                this.setState({selectedOption: sortByDefault});
                break;
            }
            case sortByPopularityFromMax: {
                const { moviesSortByPopularityFromMax } =this.props;
                moviesSortByPopularityFromMax && moviesSortByPopularityFromMax();
                this.setState({selectedOption: sortByPopularityFromMax});
                break;
            }
            case sortByVoteAveregeFromMax: {
                const { moviesSortByVoteAveregeFromMax } = this.props;
                moviesSortByVoteAveregeFromMax && moviesSortByVoteAveregeFromMax();
                this.setState({selectedOption: sortByVoteAveregeFromMax});
                break;
            }
            case sortByTitle: {
                const { moviesSortByTitle } = this.props;
                moviesSortByTitle && moviesSortByTitle();
                this.setState({selectedOption: sortByTitle});
                break;
            }
            case sortByReleaseDateFromMin: {
                const { moviesSortByReleaseDateFromMin } = this.props;
                moviesSortByReleaseDateFromMin && moviesSortByReleaseDateFromMin();
                this.setState({selectedOption: sortByReleaseDateFromMin});
                break;
            }
            default: break;
        }

        this.setState({
            currentSortType: sortingOptions[selectedIndex]
        });
    };

    render() {
        // console.log('render');
        const {movies=[], isMoviesLoading, moviesGenres=[], isGenresLoading, match: {url}} = this.props;
        const { page, currentSortType } = this.state;
        return (
            <DarkThemeContext.Consumer>
                {
                    (data) => {
                        return (
                            <div className={`movies-list ${data.isDarkTheme && 'dark'}`}>
                                {
                                    isMoviesLoading && <Loader/>
                                }
                                <h2>Movies List</h2>
                                <div>
                                    {
                                        btnPaginationNames.map(item => {
                                            return (
                                                <BtnPagination
                                                    url={url}
                                                    className={`btn btn-outline-primary ${item === page && 'active'}`}
                                                    value={item}
                                                    key={item}
                                                />
                                            );
                                        })
                                    }

                                </div>
                                {
                                    <SelectMoviesSort currentSortType={currentSortType} onTypeSelect={this.onTypeSelect} />
                                }
                                <div className="card-columns">
                                    {
                                        !isMoviesLoading && !isGenresLoading && movies.map((item, index) => {
                                            const ganres = moviesGenres.filter(item => {
                                                return movies[index].genre_ids.find(genre => genre === item.id);
                                            }).map(item => item.name);

                                            return <MovieCard
                                                movie={item}
                                                genres={ganres}
                                                showBtnInfo={true}
                                                key={item.id}
                                            />
                                        })
                                    }
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
        isGenresLoading,
        moviesGenres
    };
};
const mapDispatchToProps = ({
    getMovies,
    getGenres,
    moviesSortByVoteAveregeFromMax,
    moviesSortByDefault,
    moviesSortByTitle,
    moviesSortByReleaseDateFromMin,
    moviesSortByPopularityFromMax,
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);














//==============================================
// import React, {Component, PureComponent} from 'react';
// import {connect} from 'react-redux';
// import {accessToken, usersList} from '../../constants';
// import PostCard from '../post-card/PostCard';
// import {getMovies} from "../../actions/moviesAction";
// import {getGenres} from "../../actions/moviesAction";
// //---------------------------
// import {moviesSortByVoteAveregeFromMax} from "../../actions/moviesAction";
// import {moviesSortByDefault} from "../../actions/moviesAction";
// import {moviesSortByTitle} from "../../actions/moviesAction";
// import {moviesSortByReleaseDateFromMin} from "../../actions/moviesAction";
// import {moviesSortByPopularityFromMax} from "../../actions/moviesAction";
// import {moviesGenresFilterByGanre} from "../../actions/moviesAction";
// //---------------------------
// import {MovieCard} from "../movie-card/MovieCard";
// import "./MoviesList.scss"
// import {logger} from "../../store";
// import {DropDown} from "../dropdown/DropDown";
// import uniqId from 'uniqid';
//
// const PaginationBtn = (props) => {
//     const { value, className, onBtnPaginationClick} = props;
//
//     const onBtnClick = (event) => {
//         return (event) => {
//             onBtnPaginationClick(event);
//         }
//     }
//     return(
//         <button className={className} onClick={onBtnClick()} value={value}>{value}</button>
//     );
// }
//
// const sortingOptions = [
//     'Sort by default',
//     'Sort by popularity from max',
//     'Sort by vote averege from max',
//     'Sort by title',
//     'Sort by release date from min'
// ];
//
// const btnPagination = ['1','2','3'];
//
// class MoviesList extends PureComponent {
//     constructor(props) {
//         super(props);
//
//         console.log('constructor');
//
//         this.state = ({
//             moviesDefault: [],
//             current_sort_type: sortingOptions[0],
//             btnPaginationLength: 3,
//             page: '1',
//         });
//     }
//
//
//     componentDidMount() {
//         const {movies=[], moviesGenres=[], getMovies, getGenres} = this.props;
//         const { page } = this.state;
//         if (!movies.length) {
//             getMovies && getMovies(page);
//         }
//
//         if (!moviesGenres.length) {
//             getGenres && getGenres();
//         }
//     }
//
//     componentDidUpdate (prevProps, prevState) {
//         if ((prevProps.movies.length !== this.props.movies.length) && this.props.movies.length) {
//             this.setState({
//                 moviesDefault: this.props.movies
//             });
//         }
//
//         const { page } = this.state;
//
//         if (page !== prevState.page) {
//             const { getMovies, getGenres } = this.props;
//             getMovies && getMovies(page);
//         }
//     }
//
//     onTypeSelect = (event) => {
//         const selectedIndex = event.target.selectedIndex;
//         const selectedOption = sortingOptions[selectedIndex];
//         const [sortByDefault,
//             sortByPopularityFromMax,
//             sortByVoteAveregeFromMax,
//             sortByTitle,
//             sortByReleaseDateFromMin
//         ] = sortingOptions;
//
//         switch (selectedOption) {
//             case sortByDefault: {
//                 const { moviesSortByDefault } = this.props;
//                 moviesSortByDefault && moviesSortByDefault(this.state.moviesDefault);
//                 this.setState({selectedOption: sortByDefault});
//                 break;
//             }
//             case sortByPopularityFromMax: {
//                 const { moviesSortByPopularityFromMax } =this.props;
//                 moviesSortByPopularityFromMax && moviesSortByPopularityFromMax();
//                 this.setState({selectedOption: sortByPopularityFromMax});
//                 break;
//             }
//             case sortByVoteAveregeFromMax: {
//                 const { moviesSortByVoteAveregeFromMax } = this.props;
//                 moviesSortByVoteAveregeFromMax && moviesSortByVoteAveregeFromMax();
//                 this.setState({selectedOption: sortByVoteAveregeFromMax});
//                 break;
//             }
//             case sortByTitle: {
//                 const { moviesSortByTitle } = this.props;
//                 moviesSortByTitle && moviesSortByTitle();
//                 this.setState({selectedOption: sortByTitle});
//                 break;
//             }
//             case sortByReleaseDateFromMin: {
//                 const { moviesSortByReleaseDateFromMin } = this.props;
//                 moviesSortByReleaseDateFromMin && moviesSortByReleaseDateFromMin();
//                 this.setState({selectedOption: sortByReleaseDateFromMin});
//                 break;
//             }
//
//             default: break;
//         }
//
//         this.setState({
//           current_sort_type: sortingOptions[selectedIndex]
//         });
//     };
//
//     renderSortSelect = () => {
//         const { sort_type } = this.state;
//
//         return (
//             <select value={sort_type} onChange={this.onTypeSelect}>
//                 {
//                     sortingOptions.map((item, index) => {
//                         return (
//                             <option key={index} value={item}>{item}</option>
//                         );
//                     })
//                 }
//             </select>
//         );
//     };
//
//     onBtnPaginationClick = (event) => {
//         this.setState({
//             page: event.target.value,
//             activeBtnValue: event.target.value
//         });
//     }
//
//     render() {
//         console.log('render');
//         const {movies=[], isMoviesLoading, moviesGenres=[], isGenresLoading} = this.props;
//
//         return (
//             <div className="movies-list">
//                 <h2>Movies List</h2>
//                 <div>
//                     {
//                         btnPagination.map(item => {
//                             const {page} = this.state;
//                            return (
//                                <PaginationBtn
//                                    onBtnPaginationClick={this.onBtnPaginationClick}
//                                    className={`btn btn-outline-primary ${page === item && 'active'}`}
//                                    value={item}
//                                    key={item} />
//                            )
//                         })
//                     }
//                  </div>
//                 {
//                     this.renderSortSelect()
//                 }
//
//                 <div className="card-columns">
//                     {
//                         isMoviesLoading && isGenresLoading && <div>Loading...</div>
//                     }
//                     {
//                         !isMoviesLoading && !isGenresLoading && movies.map((item, index) => {
//                             const ganres = moviesGenres.filter(item => {
//                                 return movies[index].genre_ids.find(genre => genre === item.id);
//                             }).map(item => item.name);
//
//                             return <MovieCard
//                                 movie={item}
//                                 genres={ganres}
//                                 showBtnInfo={true}
//                                 key={item.id}
//                             />
//                         })
//                     }
//                 </div>
//             </div>
//
//         );
//     }
// }
//
// const mapStateToProps = (store) => {
//     const {moviesReducer: {movies, isMoviesLoading}, moviesGenresReducer: {moviesGenres, isGenresLoading}} = store;
//     return {
//         movies,
//         isMoviesLoading,
//         isGenresLoading,
//         moviesGenres
//     };
// };
// const mapDispatchToProps = ({
//     getMovies,
//     getGenres,
//     moviesSortByVoteAveregeFromMax,
//     moviesSortByDefault,
//     moviesSortByTitle,
//     moviesSortByReleaseDateFromMin,
//     moviesSortByPopularityFromMax,
//     moviesGenresFilterByGanre,
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
//
//




//=========================
// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {accessToken, usersList} from '../../constants';
// import PostCard from '../post-card/PostCard';
// import {getMovies} from "../../actions/moviesAction";
// import {getGenres} from "../../actions/moviesAction";
// //---------------------------
// import {moviesSortByVoteAveregeFromMax} from "../../actions/moviesAction";
// import {moviesSortByDefault} from "../../actions/moviesAction";
// import {moviesSortByTitle} from "../../actions/moviesAction";
// import {moviesSortByReleaseDateFromMin} from "../../actions/moviesAction";
// import {moviesSortByPopularityFromMax} from "../../actions/moviesAction";
// //---------------------------
// import {MovieCard} from "../movie-card/MovieCard";
// import "./MoviesList.scss"
// import {logger} from "../../store";
// import {DropDown} from "../dropdown/DropDown";
//
// const sortingOptions = [
//     'Sort by default',
//     'Sort by popularity from max',
//     'Sort by vote averege from max',
//     'Sort by title',
//     'Sort by release date from min'
// ];
//
// class MoviesList extends Component {
//     state = ({
//         moviesDefault: [],
//         selectedOption: sortingOptions[0],
//     });
//
//     componentDidMount() {
//         const {movies=[], isMoviesLoading, moviesGenres=[], isGenresLoading, getMovies, getGenres} = this.props;
//         if (!movies.length) {
//             getMovies && getMovies();
//         }
//
//         if (!moviesGenres.length) {
//             getGenres && getGenres();
//         }
//     }
//
//     componentDidUpdate (prevProps, prevState) {
//         if ((prevProps.movies.length !== this.props.movies.length) && this.props.movies.length) {
//             this.setState({
//                 moviesDefault: this.props.movies
//             });
//         }
//     }
//
//     onSort = (selectedOption) => {
//         const [sortByDefault,
//             sortByPopularityFromMax,
//             sortByVoteAveregeFromMax,
//             sortByTitle,
//             sortByReleaseDateFromMin
//         ] = sortingOptions;
//
//         switch (selectedOption) {
//             case sortByDefault: {
//                 const { moviesSortByDefault } = this.props;
//                 moviesSortByDefault && moviesSortByDefault(this.state.moviesDefault);
//                 this.setState({selectedOption: sortByDefault});
//                 break;
//             }
//             case sortByPopularityFromMax: {
//                 const { moviesSortByPopularityFromMax } =this.props;
//                 moviesSortByPopularityFromMax && moviesSortByPopularityFromMax();
//                 this.setState({selectedOption: sortByPopularityFromMax});
//                 break;
//             }
//             case sortByVoteAveregeFromMax: {
//                 const { moviesSortByVoteAveregeFromMax } = this.props;
//                 moviesSortByVoteAveregeFromMax && moviesSortByVoteAveregeFromMax();
//                 this.setState({selectedOption: sortByVoteAveregeFromMax});
//                 break;
//             }
//             case sortByTitle: {
//                 const { moviesSortByTitle } = this.props;
//                 moviesSortByTitle && moviesSortByTitle();
//                 this.setState({selectedOption: sortByTitle});
//                 break;
//             }
//             case sortByReleaseDateFromMin: {
//                 const { moviesSortByReleaseDateFromMin } = this.props;
//                 moviesSortByReleaseDateFromMin && moviesSortByReleaseDateFromMin();
//                 this.setState({selectedOption: sortByReleaseDateFromMin});
//                 break;
//             }
//
//             default: break;
//         }
//     }
//
//     render() {
//         const {movies=[], isMoviesLoading, moviesGenres=[], isGenresLoading} = this.props;
//         console.log(moviesGenres);
//
//         return (
//             <div className="movies-list">
//                 <h2>Movies List</h2>
//                 <DropDown
//                     onSelect={this.onSort}
//                     options={sortingOptions}
//                     selectedOption={this.state.selectedOption}
//                 />
//
//                 <div className="card-columns">
//                     {
//                         isMoviesLoading && isGenresLoading && <div>Loading...</div>
//                     }
//                     {
//                         !isMoviesLoading && !isGenresLoading && movies.map((item, index) => {
//                             const ganres = moviesGenres.filter(item => {
//                                 return movies[index].genre_ids.find(genre => genre === item.id);
//                             }).map(item => item.name);
//
//                             return <MovieCard
//                                 movie={item}
//                                 genres={ganres}
//                                 showBtnInfo={true}
//                                 key={item.id}
//                             />
//                         })
//                     }
//                 </div>
//
//             </div>
//
//         );
//     }
// }
//
// const mapStateToProps = (store) => {
//     const {moviesReducer: {movies, isMoviesLoading}, moviesGenresReducer: {moviesGenres, isGenresLoading}} = store;
//     return {
//         movies,
//         isMoviesLoading,
//         isGenresLoading,
//         moviesGenres
//     };
// };
// const mapDispatchToProps = ({
//     getMovies,
//     getGenres,
//     moviesSortByVoteAveregeFromMax,
//     moviesSortByDefault,
//     moviesSortByTitle,
//     moviesSortByReleaseDateFromMin,
//     moviesSortByPopularityFromMax
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
//
//





//==========================
// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {accessToken, usersList} from '../../constants';
// import PostCard from '../post-card/PostCard';
// import {getMovies} from "../../actions/moviesAction";
// import {getGenres} from "../../actions/moviesAction";
// //---------------------------
// import {moviesSortByVoteAveregeFromMax} from "../../actions/moviesAction";
// import {moviesSortByDefault} from "../../actions/moviesAction";
// import {moviesSortByTitle} from "../../actions/moviesAction";
// import {moviesSortByReleaseDate} from "../../actions/moviesAction";
// import {moviesSortByPopularityFromMax} from "../../actions/moviesAction";
// //---------------------------
// import {MovieCard} from "../movie-card/MovieCard";
// import "./MoviesList.scss"
// import {logger} from "../../store";
// import {DropDown} from "../dropdown/DropDown";
//
// const sortingOptions = [
//     'moviesSortByDefault',
//     'moviesSortByPopularityFromMax',
//     'moviesSortByVoteAveregeFromMax',
//     'moviesSortByTitle',
//     'moviesSortByReleaseDate'
// ];
//
// class MoviesList extends Component {
//     state = ({
//         moviesDefault: [],
//         selectedOption: sortingOptions[0],
//     });
//
//     componentDidMount() {
//         const {movies=[], isMoviesLoading, moviesGenres=[], isGenresLoading, getMovies, getGenres} = this.props;
//         if (!movies.length) {
//             getMovies && getMovies();
//         }
//
//         if (!moviesGenres.length) {
//             getGenres && getGenres();
//         }
//     }
//
//     componentDidUpdate (prevProps, prevState) {
//         if ((prevProps.movies.length !== this.props.movies.length) && this.props.movies.length) {
//             this.setState({
//                 moviesDefault: this.props.movies
//             });
//         }
//     }
//
//     onBtnMoviesSortByVoteAveregeFromMaxClick = () => {
//         const { moviesSortByVoteAveregeFromMax } = this.props;
//         moviesSortByVoteAveregeFromMax && moviesSortByVoteAveregeFromMax();
//     }
//
//     onBtnMoviesSortByDefaultClick = () => {
//         const { moviesSortByDefault } = this.props;
//         moviesSortByDefault && moviesSortByDefault(this.state.moviesDefault);
//     }
//
//     onBtnMoviesSortByTitleClick = () => {
//         const { moviesSortByTitle } = this.props;
//         moviesSortByTitle && moviesSortByTitle();
//     }
//
//     onBtnMoviesSortByReleaseDateClick = () => {
//         const { moviesSortByReleaseDate } = this.props;
//         moviesSortByReleaseDate && moviesSortByReleaseDate();
//     }
//
//     onBtnMoviesSortByPopularityFromMaxClick = () => {
//         const { moviesSortByPopularityFromMax } =this.props;
//         moviesSortByPopularityFromMax && moviesSortByPopularityFromMax();
//     }
//
//     onSort = (selectedOption) => {
//         const [sortByDefault,
//             sortByPopularityFromMax,
//             sortByVoteAveregeFromMax,
//             sortByTitle,
//             sortByReleaseDate
//         ] = sortingOptions;
//
//         switch (selectedOption) {
//             case sortByDefault: {
//                 const { moviesSortByDefault } = this.props;
//                 moviesSortByDefault && moviesSortByDefault(this.state.moviesDefault);
//                 this.setState({selectedOption: sortByDefault});
//                 break;
//             }
//             case sortByPopularityFromMax: {
//                 const { moviesSortByPopularityFromMax } =this.props;
//                 moviesSortByPopularityFromMax && moviesSortByPopularityFromMax();
//                 this.setState({selectedOption: sortByPopularityFromMax});
//                 break;
//             }
//             case sortByVoteAveregeFromMax: {
//                 const { moviesSortByVoteAveregeFromMax } = this.props;
//                 moviesSortByVoteAveregeFromMax && moviesSortByVoteAveregeFromMax();
//                 this.setState({selectedOption: sortByVoteAveregeFromMax});
//                 break;
//             }
//             case sortByTitle: {
//                 const { moviesSortByTitle } = this.props;
//                 moviesSortByTitle && moviesSortByTitle();
//                 this.setState({selectedOption: sortByTitle});
//                 break;
//             }
//             case sortByReleaseDate: {
//                 const { moviesSortByReleaseDate } = this.props;
//                 moviesSortByReleaseDate && moviesSortByReleaseDate();
//                 this.setState({selectedOption: sortByReleaseDate});
//                 break;
//             }
//
//             default: break;
//         }
//
//
//     }
//
//     render() {
//         const {movies=[], isMoviesLoading, moviesGenres=[], isGenresLoading} = this.props;
//
//         return (
//             <div className="movies-list">
//                 <h2>Movies List</h2>
//                 <DropDown
//                     onSelect={this.onSort}
//                     options={sortingOptions}
//                     selectedOption={this.state.selectedOption}
//                 />
//                 <div>
//                     <button className="btn btn-primary" onClick={this.onBtnMoviesSortByVoteAveregeFromMaxClick}>Sort by averege</button>
//                     <button className="btn btn-primary" onClick={this.onBtnMoviesSortByDefaultClick}>Sort by default</button>
//                     <button className="btn btn-primary" onClick={this.onBtnMoviesSortByTitleClick}>Sort by title</button>
//                     <button className="btn btn-primary" onClick={this.onBtnMoviesSortByReleaseDateClick}>Sort by release date</button>
//                     <button className="btn btn-primary" onClick={this.onBtnMoviesSortByPopularityFromMaxClick}>Sort by popularity</button>
//                 </div>
//
//                 <div className="card-columns">
//                     {
//                         isMoviesLoading && isGenresLoading && <div>Loading...</div>
//                     }
//                     {
//                         !isMoviesLoading && !isGenresLoading && movies.map((item, index) => {
//                             const ganres = moviesGenres.filter(item => {
//                                 return movies[index].genre_ids.find(genre => genre === item.id);
//                             }).map(item => item.name);
//
//                             return <MovieCard
//                                 movie={item}
//                                 genres={ganres}
//                                 showBtnInfo={true}
//                                 key={item.id}
//                             />
//                         })
//                     }
//                 </div>
//
//             </div>
//
//         );
//     }
// }
//
// const mapStateToProps = (store) => {
//     const {moviesReducer: {movies, isMoviesLoading}, moviesGenresReducer: {moviesGenres, isGenresLoading}} = store;
//     return {
//         movies,
//         isMoviesLoading,
//         isGenresLoading,
//         moviesGenres
//     };
// };
// const mapDispatchToProps = ({
//     getMovies,
//     getGenres,
//     moviesSortByVoteAveregeFromMax,
//     moviesSortByDefault,
//     moviesSortByTitle,
//     moviesSortByReleaseDate,
//     moviesSortByPopularityFromMax
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(MoviesList);
