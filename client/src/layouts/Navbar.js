import React from 'react';
import Logo from '../styles/logo';
import { v4 as uuid } from 'uuid';
import { useLocation, Link } from 'react-router-dom';

const Navbar = ({ menu = [] }) => {
    const loaction = useLocation();
    return (
        <header>
            <div className="content">
                <nav>
                    <div className="logo">
                        <Logo />
                    </div>
                    <ul>
                        {menu.map(({ title, path }) => (
                            <Link to={path}>
                                <li className={loaction.pathname === path ? 'active-link' : ''} key={uuid()}>
                                    {title}
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
