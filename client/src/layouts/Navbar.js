import React from 'react';
import Logo from '../styles/logo';
const Navbar = () => {
    return (
        <header>
            <div className="content">
                <nav>
                    <div className="logo">
                        <Logo />
                    </div>
                    <ul>
                        <li>LINK 1</li>
                        <li>LINK 2</li>
                        <li className="active-link">LOGIN</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
