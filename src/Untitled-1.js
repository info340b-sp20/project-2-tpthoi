import React, { Component } from 'react';
import { ReactiveBase, DataSearch, MultiList, ResultCard } from '@appbaseio/reactivesearch';


class App extends Component {
  render() {
    return (

    <header className="jumbotron jumbotron-fluid py-4">
        <div className="container">
          <h1>Adopt a Pet</h1>
        </div>
    </header>
    
      <ReactiveBase
        app="clothes"
        credentials="EjhqnRm46:f8bcb824-c33d-49ff-a2fd-b9882162c66a">
        <SearchData />
        <BrandList />
        <ColorList />
        <TypesList />

        <ResultCard
                componentId="results"
                dataField="title"
                react={{
                    and: ["dataSearch","brands-list","colors-list","types-list"]
                }}
                onData={(res) => (
                    {
                    "image": res.image,
                    "title": res.title,
                    }
                )}
        />

        <ClothingCard />
        </ReactiveBase>

    );
    }
} 

class SearchData extends Component {
    render() {

      console.log("wernt here")

      return(
        <DataSearch 
            componentId="dataSearch"
            dataField={["title", "brand", "color", "type"]}
            queryFormat="and"
            placeholder="Search for your clothing Item"
            title="Search"
            value=""
            react={{
              and:[]
            }}
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
        size={50}
        queryFormat="or"
        selectAllLabel="All Brands"
        showSearch={true}
        showLoadMore={true}

        react={{
          and: [
              "dataSearch",
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

        
        filterLabel="Brand"
        innerClass={{ 
            label: "list-item",
            input: "list-input"
        }}

      />
      );
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
            filterLabel="Types"
            innerClass={{ 
                label: "list-item",
                input: "list-input"
            }}
    
            />
        )
    }
}

class ClothingCard extends Component {
    render() {
        return(
          <ReactiveList> 
            <ResultCard
                componentId="results"
                dataField="title"
                react={{
                    and: ["dataSearch","brands-list","colors-list","types-list"]
                }}
                onData={(res) => (
                    {
                    "image": res.image,
                    "title": res.title,
                    }
                )}
            />
            </ReactiveList>
        );
}
}

export default App;
