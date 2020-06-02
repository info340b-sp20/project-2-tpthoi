
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import React, { Component } from 'react';
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
  export default SortCards