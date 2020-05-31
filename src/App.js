import React, { Component } from 'react';
import { ReactiveBase, DataSearch, MultiList, ResultCard } from '@appbaseio/reactivesearch';
import './App.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Route, Link, Switch, Redirect, NavLink } from 'react-router-dom';
import _ from 'lodash';
import SAMPLE_DOGS from './data.json'; //a sample list of dogs (model)

class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="clothes"
        credentials="EjhqnRm46:f8bcb824-c33d-49ff-a2fd-b9882162c66a"
      >

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
                <nav className="navbar navbar-expand">
                  <div className="navbar-nav">
                    <a href="#/">Home</a>
                    <a href="#closet">My Closet</a>
                    <a href="#/">Build an Outfit</a>
                    <a href="#contact">Contact Us</a>
                  </div>
                </nav>  
              </div>      
            </div>
        </header>
      </div>
  
      <div className="search">
          <Search />
      </div>
      <div className="ListContainer">

        <div className="lists">
          <BrandList />
        
          <ColorList />

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
  render() {
    return(
      <DropdownButton id="dropdown-basic-button" title="Sort By">
        <Dropdown.Item href="">Sort By Price</Dropdown.Item>
        <Dropdown.Item href="">Sort By Rating</Dropdown.Item>
        <Dropdown.Item href="">Sort By Name</Dropdown.Item>
      </DropdownButton>
    )
  }
}

class Search extends Component {
  render() {
    return(
      <DataSearch
      componentId="mainSearch"
      dataField={["title", "brand","color","type"]}
      queryFormat="and"
      placeholder="Search for clothing..."  
    />
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