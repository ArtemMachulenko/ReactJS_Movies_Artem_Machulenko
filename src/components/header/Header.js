import React from 'react';
import { NavLink } from 'react-router-dom';
import { links } from '../../constants';
import Logo from '../../assets/the_movie_db.svg';
import { UserInfo } from '../user-info/UserInfo';
import { DarkThemeContext } from '../../context/DarkThemeContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.scss';

export const Header = (props) => {
    return (
        <DarkThemeContext.Consumer>
            {
                (value) => {
                    const {isDarkTheme,  toggleTheme} = value;
                    // debugger
                    return (
                        <div className={`may-header navbar ${isDarkTheme && 'dark'}`}>
                            <img src={Logo} className="may-header-logo" />

                            <div className="may-header-links-wrapper">
                                {
                                    links.map(item => {
                                        return (
                                            <div className="nav-item" key={item.url}>
                                                <NavLink to={item.url} activeClassName="active"
                                                         className="may-header-links-wrapper-link nav-link">{item.name}</NavLink>
                                            </div>
                                        );
                                    })
                                }
                            </div>

                            <button className={`btn btn-primary ${isDarkTheme && 'dark'}`} onClick={toggleTheme}>Dark mode: {isDarkTheme ? 'on' : 'off'}</button>
                            {/* dtodo не передавать тут пользователя как пропсу */}
                            <UserInfo />
                        </div>
                    )
                }
            }
        </DarkThemeContext.Consumer>
    );
};


// console.log('test');