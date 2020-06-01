'use strict';

import React, { Component } from 'react';
import { ReactiveBase, DataSearch, MultiList, ResultCard } from '@appbaseio/reactivesearch';
import './App.css'
import Button from 'react-bootstrap/Button'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import _ from 'lodash';
import SAMPLE_DOGS from './data.json'; //a sample list of clothes(model)

import firebase, { database } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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

      console.log(mainBase)
     
    } 

    if (this.state.sorted) {
      mainBase = <RandomPage />
      console.log("made it here");
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
                  <a href="#/">Home</a>
                  {/* <a href="#closet">Filter My Closet</a> */}
                  <a href="#filtering" onClick={this.handleClickFilter}>Filter My Closet</a>
                  <a href="#closeting" onClick={this.handleClickCloset}>My Whole Closet</a>
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

class RandomPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cardsArray: []
    }
  }

  componentDidMount() {
    let rootRef = firebase.database().ref();
     
    rootRef.on('value', (snapshot) => {
      let objectArray = snapshot.val();
      this.setState({cardsArray: objectArray});
    });
  }

  render() {
    let newArray = Object.keys(this.state.cardsArray);
    console.log(newArray);

    return (
      <div>
        <h1>
          What do I own? 
        </h1>

        <div>
          <DisplayList cardValue={this.state.cardsArray}/>
        </div>
        </div>
    );
  }
}

 class DisplayList extends Component {
    constructor(props) {
      super(props);

      this.state = {
         cardsArray: ""
      }
    }
   
    render() {
      let cardArray = this.props.cardValue.map((card) => {
        return(<DisplayCard cardValue={card}/>);
      })

      return(
        <div className="card-deck">
          {cardArray};
        </div>
      );
    }
 }

class DisplayCard extends Component {
render() {
      return(
          <div className="card">
              <img className="card-img-top" src={this.props.cardValue.image} />
          <div className="card-body">
          <h2 className="card-title">{this.props.cardValue.title}</h2>
          <p className="card-text">Brand: {this.props.cardValue.brand}</p>
          <p className="card-text">Color: {this.props.cardValue.color}</p>
          <p className="card-text">Type: {this.props.cardValue.type}</p>
          </div>
          </div>
      );
  }
}


class FilterBase extends Component {
  render() {
    return(
      <ReactiveBase
        app="clothes"
        credentials="EjhqnRm46:f8bcb824-c33d-49ff-a2fd-b9882162c66a"
    >
      <div className="search">
          <Search />
      </div>

      <div className="ListContainer">
        <div className="lists">
          <h2>Filters</h2>
          <h3>Brands</h3>
          <BrandList />
          <h3>Colors</h3>
          <ColorList />
          <h3>Type</h3>
          <TypesList />

          <SortCards />
        </ div>

        <div className="clothes" id="closet"> 
          <Switch>
            <Route exact path="/" component= {ClothesCard}/>
            <Route path="/item/:name" component={DetailPage}/>
          </Switch>
        </div>
      </div>
      <footer id="contact">
        <address>
          Contact us at <a aria-label="email-link" id="mailLink" href="mailto:mycloset@gmail.com">mycloset@gmail.com</a>, or at <a aria-label="phone number" id="number" href="tel:123-456-7890">(123) 456-7890</a>
        </address>
        <p>&copy; Colten  Pragyna  Tyson  Yash</p>
      </footer>
      </ReactiveBase>
    );
  }
}


class DetailPage extends Component {
  constructor(props){
    super(props);
    this.state = {pet: undefined
    };
  }

  componentDidMount(){
    let clothesName = this.props.match.params.name;
    //pretend we loaded external data    
    let clothesObj =  _.find(SAMPLE_DOGS, {title: clothesName}); //find pet in data
    this.setState({clothes: clothesObj});
  }

  render() {
    let clothes = this.state.clothes
    if(!clothes) return <h2>No clothing specified</h2> //if unspecified

    return (
      <div>
        <img src={clothes.image}/>
        <h2>{clothes.title}</h2>
        <ul>
          <li>{"Brand: " + clothes.brand}</li>
          <li>{"Color: " + clothes.color}</li>
          <li>{"Type: " + clothes.type}</li>
          </ul>
      </div>
    );
  }
}

class SortCards extends Component {

  // handleClick = (event) => {
  //   return(
  //   <div>
  //     <SortingPrice />
  //   </div>
  //   );
  // }

  render() {
    return(
      <DropdownButton id="dropdown-basic-button" title="Sort By">
        <div className="priceContainer" onClick="handleClick">
          <Dropdown.Item href="">Sort By Price</Dropdown.Item>
        </div>

        <div>
        <Dropdown.Item href="">Sort By Rating</Dropdown.Item>
        </div>

        <div>
          <Dropdown.Item href="">Sort By Name</Dropdown.Item>
        </div>
      </DropdownButton>
    )
  }
}

class Search extends Component {
  render() {
    return(
      <label className="searching">
      <DataSearch
      componentId="mainSearch"
      dataField={["title", "brand","color","type"]}
      queryFormat="and"
      placeholder="Search for clothing..."  
    />
    </label>
    );
  }

}

class BrandList extends Component {
  render() {
    return(
      <MultiList     
    componentId="brands-list"
    dataField="brand.keyword"
    className="brands-filter"
    size={40}
    queryFormat="or"
    selectAllLabel="All Brands"
    showCheckbox={true}
    showCount={true}
    showSearch={false}
    placeholder="Search for a Brand"
    react={{          
        and: [
            "mainSearch",
            "results",
            "colors-list",
            "types-list"
        ]
    }}        
    
    render={({
      loading,
      error
    }) => {

    if(loading) {
      return <div>Still Looking for Clothes</div>
    }

    if(error) {
      return (
          <div>
              Something went wrong!
              Error: {JSON.stringify(error)}
          </div>
      )
    }
    }}

    renderNoSuggestion={() => (
      <div>
          No suggestions found
      </div>
    )
    }


    showFilter={true}
    filterLabel="brand"
    URLParams={false} 
    innerClass={{ 
        label: "list-item",
        input: "list-input"
    }}
    />
  )
}
}

class ColorList extends Component {
  render() {
    return(
      <MultiList     
        componentId="colors-list"
        dataField="color.keyword"
        className="colors-filter"
        size={40}
        queryFormat="or"
        selectAllLabel="All Colors"
        showCheckbox={true}
        showCount={true}
        showSearch={false}
        placeholder="Search for a Color"
        react={{          
            and: [
                "mainSearch",
                "results",
                "types-list",
                "brands-list"
            ]
        }}         
        
        render={({
          loading,
          error
        }) => {
    
        if(loading) {
          return <div>Still Looking for Clothes</div>
        }
    
        if(error) {
          return (
              <div>
                  Something went wrong!
                  Error: {JSON.stringify(error)}
              </div>
          )
        }
        }}
    
        renderNoSuggestion={() => (
          <div>
              No suggestions found
          </div>
        )
        }


        showFilter={true}
        filterLabel="color"
        URLParams={false} 
        innerClass={{ 
            label: "list-item",
            input: "list-input"
        }}
/>
    )
  }
} 

class TypesList extends Component {
  render() {
    return(
      <MultiList     
        componentId="types-list"
        dataField="type.keyword"
        className="types-filter"
        size={40}
        queryFormat="or"
        selectAllLabel="All Product Types"
        showCheckbox={true}
        showCount={true}
        showSearch={false}
        placeholder="Search for a Product Types"
        react={{          
            and: [
                "mainSearch",
                "results",
                "colors-list",
                "brands-list"
            ]
        }}         
        
        render={({
          loading,
          error
        }) => {
    
        if(loading) {
          return <div>Still Looking for Clothes</div>
        }
    
        if(error) {
          return (
              <div>
                  Something went wrong!
                  Error: {JSON.stringify(error)}
              </div>
          )
        }
        }}
    
        renderNoSuggestion={() => (
          <div>
              No suggestions found
          </div>
        )
        }

        showFilter={true}
        filterLabel="type"
        URLParams={false} 
        innerClass={{ 
            label: "list-item",
            input: "list-input"
        }}
      />
    )
  }
}

class ClothesCard extends Component {
  render() {
    return(
      <ResultCard
      componentId="results"
      dataField="title"
      react={{
        and: ["mainSearch","brands-list","colors-list","types-list"]
      }}
  onData={function(res) {
    return {
      description: (
        <div>
          <div className="ih-item square effect6 top_to_bottom">
            <a
              target="#"
              href={"/item/" + res.title}
            >
              <div className="img">
                <img
                  src={
                    res.image
                  }
                  alt={res.title}
                  className="result-image"
                />
              </div>
              <div className="info colored">
                <h3 className="overlay-title">
                  {res.title}
                </h3>
              </div>
            </a>
          </div>
        </div>
      )
    };
  }}
/>
      
    )}}

export default App;