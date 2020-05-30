import React, { Component } from 'react';
import { ReactiveBase, DataSearch, MultiList, ResultCard } from '@appbaseio/reactivesearch';
class App extends Component {
  render() {
    return (
      <ReactiveBase
        app="clothes"
        credentials="EjhqnRm46:f8bcb824-c33d-49ff-a2fd-b9882162c66a"
      >

<DataSearch
  componentId="mainSearch"
  dataField={["title", "brand","color","type"]}
  queryFormat="and"
  placeholder="Search for clothing..."  
/>

<MultiList     
    componentId="brands-list"
    dataField="brand.keyword"
    className="brands-filter"
    size={20}
    sortBy="asc"
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
    showFilter={true}
    filterLabel="brand"
    URLParams={false} 
    innerClass={{ 
        label: "list-item",
        input: "list-input"
    }}
/>

<MultiList     
    componentId="colors-list"
    dataField="color.keyword"
    className="colors-filter"
    size={20}
    sortBy="asc"
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
    showFilter={true}
    filterLabel="color"
    URLParams={false} 
    innerClass={{ 
        label: "list-item",
        input: "list-input"
    }}
/>
<MultiList     
    componentId="types-list"
    dataField="type.keyword"
    className="types-filter"
    size={20}
    sortBy="asc"
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
    showFilter={true}
    filterLabel="type"
    URLParams={false} 
    innerClass={{ 
        label: "list-item",
        input: "list-input"
    }}
/>

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

      </ReactiveBase>
    );
  }
}
export default App;