import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import {Header} from './components/header/Header';
import { DarkThemeContextWrapper } from './components/dark-theme-context-wrapper/DarkThemeContextWrapper';
import { CurrentUserContext} from "./context/CurrentUserContext";
import { usersList } from './constants';
import { appStore } from './store';
import MoviesPage from "./components/movies-page/MoviesPage";
import MoviesList from "./components/movies-list/MoviesList";
import MovieInfo from "./components/movie-info/MovieInfo";
import PosterPreview from "./components/poster-preview/PosterPreview";


class App extends Component {
  render() {
    return (
        <CurrentUserContext.Provider value={usersList[0]}>
          <DarkThemeContextWrapper>
              <Provider store={appStore}>
                <Router>
                  <Header />
                  <Switch>
                    <Route path="/home" component={MoviesPage} exact/>
                    <Route path="/home/:movieId"
                         render={(routerProps) => {
                             return (<MovieInfo {...routerProps} />);
                         }}
                     />
                    <Route path="/poster-preview" render={(routerProps) => {
                      return (
                          <PosterPreview {...routerProps} />
                      );
                    }} />
                    <Redirect from="/" to="/home?page=1" />
                  </Switch>
                </Router>
              </Provider>
          </DarkThemeContextWrapper>
        </CurrentUserContext.Provider>
    );
  }
}

export default App;
