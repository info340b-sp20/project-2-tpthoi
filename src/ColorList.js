import React, { Component } from 'react';
import { MultiList} from '@appbaseio/reactivesearch';
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
  export default ColorList