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
      <header id="header" className="jumbotron jumbotron-fluid bg-dark">
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



//  class DisplayList extends Component {
   
//     render() {

//       let objectCards = "";

//       objectCards = rootRef.on('value', (snapshot) => {
//       let objectArray = snapshot.val();
//       return objectArray; 
//     });
  

//       let cardArray = this.props.cardValue.map((card) => {
//         return(<DisplayCard cardValue={card}/>);
//       })

//       return(
//         <div className="card-deck">
//           {cardArray};
//         </div>
//       );
//     }
//  }

// class DisplayCard extends Component {
// render() {

 
//   console.log(this.props.cardValue);

//       return(
//           <div className="card">
//               <img className="card-img-top" src={this.props.cardValue.image} />
//           <div className="card-body">
//           <h2 className="card-title"></h2>
//           </div>
//           </div>
//       );
//   }
// }








export default App;