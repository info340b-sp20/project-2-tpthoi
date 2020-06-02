
import React, { Component } from 'react';
import { ReactiveBase} from '@appbaseio/reactivesearch';
import './App.css'
import { Route, Switch } from 'react-router-dom';
import ClothesCard from './ClothesCard.js';
import DetailPage from './DetailPage.js';
import SortCards from './SortCards.js';
import BrandList from './BrandList.js';
import TypesList from './TypesList.js';
import ColorList from './ColorList.js';
import Search from './Search.js';

class FilterBase extends Component {
  render() {
    return(
      <ReactiveBase
        app="clothes"
        credentials="EjhqnRm46:f8bcb824-c33d-49ff-a2fd-b9882162c66a"
    >


      <div className="search">
          <Search />
      </div>

      <div className="ListContainer">
        <div className="lists">
          <h2>Filters</h2>
          <h3>Brands</h3>
          <BrandList />
          <h3>Colors</h3>
          <ColorList />
          <h3>Type</h3>
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
      <footer className="contactus" id="contact">
        <address>
          Contact us at <a aria-label="email-link" id="mailLink" href="mailto:mycloset@gmail.com">mycloset@gmail.com</a>, or at <a aria-label="phone number" id="number" href="tel:123-456-7890">(123) 456-7890</a>
        </address>
        <p>&copy; Colten  Pragyna  Tyson  Yash</p>
      </footer>
      </ReactiveBase>
    );
  }
}
export default FilterBase