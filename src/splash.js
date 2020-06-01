'use strict'

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import './App.js';

class Splash extends Component {
    render() {
        return (
            <body className="splash">
                <nav className="splashnav">
                    <div id="hamburger-menu"><a href="#" aria-label="menu"><i className="fa fa-bars"></i></a></div>
                    <div id="social-links">
                        <a href="https://www.instagram.com/" aria-label="instagram"><i className="fa fa-instagram"></i></a>
                        <a href="https://twitter.com/explore" aria-label="twitter"><i className="fa fa-twitter-square"></i></a>
                        <a href="https://www.facebook.com/" aria-label="facebook"><i className="fa fa-facebook-square"></i></a>
                        <a href="https://github.com/" aria-label="github"><i className="fa fa-github"></i></a>
                    </div>
                </nav>
                <main className="box">
                    <h1>MY CLOSET</h1>
                    <h2>A clothing and sneaker collection tracking </h2>
                    <a href="App.js" className="myButton">Enter</a>
                </main>
            
                <footer className="imgfooter">
                    Background image used from <cite><a href="https://unsplash.com/photos/zFlFvx-ygTo">unsplash</a></cite>
                </footer>
            </body>
        );
    }
}

export default Splash;

export {Splash};