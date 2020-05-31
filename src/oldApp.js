import React, { Component } from 'react';
import { ReactiveBase, DataSearch, MultiList, ResultCard } from '@appbaseio/reactivesearch';



class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="clothes"
        credentials="EjhqnRm46:f8bcb824-c33d-49ff-a2fd-b9882162c66a">
        <DataSearch />
        <BrandList />
        <ColorList />
        <TypesList />

        <ResultCard />
        </ReactiveBase>

    );
    }
} 

class DataSearch extends Component {
    render() {
        <DataSearch 
            componentId="dataSearch"
            dataField={["title", "brand", "color", "type"]}
            placeholder="Search for your clothing Item"
            title="Search"
            value=""
        />
    }

}

class BrandList extends Component {
    render() {
      <MultiList 
        componentId="brands-list"
        dataField="brand.keyword"
        size={50}
        queryFormat="or"
        selectAllLabel="All Brands"
        showSearch={false}
        showLoadMore={true}

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

        react={{
            and: [
                "dataSearch",
                "results",
                "colors-list",
                "types-list"
            ]
        }}
        filterLabel="Brand"
        innerClass={{ 
            label: "list-item",
            input: "list-input"
        }}

      />
    }
}

class ColorList extends Component {
    render() {
    return (
        <MultiList 
        componentId="colors-list"
        dataField="color.keyword"
        size={50}
        queryFormat="or"
        selectAllLabel="All Colors"
        showSearch={false}
        showLoadMore={true}

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

        react={{
            and: [
                "dataSearch",
                "results",
                "types-list",
                "brands-list"
            ]
        }}
        filterLabel="Color"
        innerClass={{ 
            label: "list-item",
            input: "list-input"
        }}

        />
    );
    }
}

class TypesList extends Component {
    render() {
        return(
            <MultiList 
            componentId="types-list"
            dataField="type.keyword"
            size={50}
            queryFormat="or"
            selectAllLabel="All Types"
            showSearch={false}
            showLoadMore={true}
    
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
    
            react={{
                and: [
                    "dataSearch",
                    "results",
                    "colors-list",
                    "types-list"
                ]
            }}
            filterLabel="Brand"
            innerClass={{ 
                label: "list-item",
                input: "list-input"
            }}
    
            />
        )
    }
}

class ResultCard extends Component {
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
        );
}
}
export default App;




import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


class App extends Component {

  render() {
    let div = (
       <div>
         <DataSearch />
      </div>
    );
    
    return(div);
  }

}


class DataSearch extends Component {
   constructor( props ) {
    super( props );
    
		this.state = {
			query: '',
      results: {},
      loading: false,
      message: '',
		};
  }

  handleInputChange = (event) => {
    let inputQuery = event.target.value;
    this.setState({inputQuery});
    
  }
  
  render() {
    return(
      <div className="container">
        <label for="searchInput">Search</label>
        <i className="fa fa-sesarch search-icon" />
        <input type="text" id="searchInput" className="form-control" placeholder="Search..." onChange={this.handleInputChange}/>
      </div>
    );
  }

}




class BrandsList extends Component {
  
}

class ColorsList extends Component {
  
}

class TypesList extends Component {

}


class ResultCard extends Component {
  
}

class ResultList extends Component {
    
}


export default App;

