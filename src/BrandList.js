
import React, { Component } from 'react';
import { MultiList} from '@appbaseio/reactivesearch';

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
  
export default BrandList;