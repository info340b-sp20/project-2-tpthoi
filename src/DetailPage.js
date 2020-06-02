
import _ from 'lodash';
import CLOTHES from './data.json'; //a sample list of clothes(model)
import React, { Component } from 'react'; //import React Component
import ClothesCard from './ClothesCard.js';
class DetailPage extends Component {
    constructor(props){
      super(props);
      this.state = {pet: undefined
      };
    }
  
    componentDidMount(){
      let clothesName = this.props.match.params.name;
      //pretend we loaded external data    
      let clothesObj =  _.find(CLOTHES, {title: clothesName}); //find pet in data
      this.setState({clothes: clothesObj});
    }
  
    render() {
      let clothes = this.state.clothes
      if(!clothes) return <h2>No clothing specified</h2> //if unspecified
  
      return (
        <div className="ListContainer">
        <div className="SelectionContainer">
      <div className="yourItem ListContainer">
        <div className="clothescont">
        <img class="clothesimg" alt={clothes.title} src={clothes.image}/> </div>
        <div className="clothesdetails">
        <h2 class="clothesheader">{clothes.title}</h2>
        <h3 class="tagheader tagdetail">{"Categories of item"}</h3>
        <ul>
          <li class="tagdetail">{"Brand: " + clothes.brand}</li>
          <li class="tagdetail">{"Color: " + clothes.color}</li>
          <li class="tagdetail">{"Type: " + clothes.type}</li>
          </ul>
          </div>
      </div>
      <div className="yourItem">
      <h2 className="additional">{"Find an additional item"}</h2>
      <ClothesCard/>
      </div>
      </div>
      </div>
      );
    }
  }

export default DetailPage;