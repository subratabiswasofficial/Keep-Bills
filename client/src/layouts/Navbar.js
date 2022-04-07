import React from 'react';
import Logo from '../styles/logo';
import { v4 as uuid } from 'uuid';
import { useLocation, Link } from 'react-router-dom';
import { connect } from 'react-redux';

const navMenu = {
    general: [
        {
            title: 'LOGIN',
            path: '/login'
        }
    ],
    student: [
        {
            title: 'PROFILE',
            path: '/profile'
        },
        {
            title: 'BILLS',
            path: '/bills'
        },
        {
            title: 'LOGOUT',
            path: '/logout'
        }
    ],
    admin: [
        {
            title: 'DASHBOARD',
            path: '/dashboard'
        },
        {
            title: 'LOGOUT',
            path: '/logout'
        }
    ]
};

const Navbar = ({ user_type, is_authenticated }) => {
    const loaction = useLocation();
    const menu = navMenu[is_authenticated && user_type ? user_type : 'general'];
    return (
        <header>
            <div className="content">
                <nav>
                    <div className="logo">
                        <Logo />
                    </div>
                    <ul>
                        {menu.map(({ title, path }) => (
                            <Link to={path} key={uuid()}>
                                <li className={loaction.pathname === path ? 'active-link' : ''}>{title}</li>
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => ({
    user_type: state.auth.user_type,
    is_authenticated: state.auth.is_authenticated
});

export default connect(mapStateToProps, null)(Navbar);
