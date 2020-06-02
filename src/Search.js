

import React, { Component } from 'react';
import { DataSearch} from '@appbaseio/reactivesearch';
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
  export default Search
  