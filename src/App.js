import React, { Component } from 'react';
import { ReactiveBase, DataSearch, MultiList, ResultCard } from '@appbaseio/reactivesearch';
import './App.css'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

class App extends Component {
  render() {
    return (

      
      <ReactiveBase
        app="clothes"
        credentials="EjhqnRm46:f8bcb824-c33d-49ff-a2fd-b9882162c66a"
      >

    <div className= 'container'>
      <header id="header" className="jumbotron jumbotron-fluid text-white bg-dark">
          <div className="view">
          <h1 className="text-center">My Closet</h1>
          <div className="typingIt">
            <p className="lead text-center">
                A way to see your whole closet with just one click
            </p>
          </div>

          <div classNAme="navbar-container">
            <nav className="navbar navbar-expand navbar-dark">
              <div className="navbar-nav">
                </ div>
            </nav>  
          </div>      
          </div>
        </header>
    </div>
  
  <div className="ListContainer">
    <div>
      <Search />
    </div>

    <div className="lists">
      <BrandList />
    
      <ColorList />

      <TypesList />
    </ div>

    <div className="sortingContainer"> 
      <SortCards />
    </ div>

    <div className="clothes"> 
      <ClothesCard />
    </div>
  </div>
      </ReactiveBase>
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
        onData={(res) => (
          {
            "image": res.image,
            "title": res.title,
          }
        )}
      />
    )
  }
}

export default App;