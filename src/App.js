import React, { Component } from 'react';
import './App.css'
import FilterBase from './FilterBase.js';
import RandomPage from './RandomPage.js';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: true,
      sorted: false
    }
  }

  handleClickFilter = (event) => {
    this.setState({filter: true});
    this.setState({sorted: false});
  }

  handleClickCloset = (event) => {
    this.setState({sorted: true});
    this.setState({filter: false});
  }



  render() {
    let mainBase = '';
    if (this.state.filter) {
      mainBase = <FilterBase />;
    } 

    if (this.state.sorted) {
      mainBase = <RandomPage />
    }
    

    return (
      <div>
      <div className= 'container'>
      <header id="header" className="jumbotron jumbotron-fluid bg-info text-dark">
          <div className="view">
            <h1 className="text-center">My Closet</h1>
              <div className="typingIt">
                <p className="lead text-center">
                    A way to see your whole closet with just one click
                </p>
              </div>

            <div className="navbar-container">
              <nav className="navbar navbar-expand navbar-dark">
                <div className="navbar-nav">
                  <a href="#closet" onClick={this.handleClickFilter}>Filter My Closet</a>
                  <a href="#closet" onClick={this.handleClickCloset}>My Whole Closet</a>
                  <a href="#contact">Contact Us</a>
                </div>
              </nav>  
            </div>      
          </div>
      </header>
    </div>

    <div>
      {mainBase};
    </div>

    </div>
    );
  }
}


export default App;