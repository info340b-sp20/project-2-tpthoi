

import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class DisplayCard extends Component {
    render() {
          return(
              <div className="card">
                  <img alt={this.props.cardValue.title} className="card-img-top" src={this.props.cardValue.image} />
              <div className="card-body">
              <h2 className="card-title">{this.props.cardValue.title}</h2>
              <p className="card-text">Brand: {this.props.cardValue.brand}</p>
              <p className="card-text">Color: {this.props.cardValue.color}</p>
              <p className="card-text">Type: {this.props.cardValue.type}</p>
              </div>
              </div>
          );
      }
    }
    
class DisplayList extends Component {
    constructor(props) {
      super(props);

      this.state = {
         cardsArray: ""
      }
    }
   

    render() {
      console.log("i am here");
      console.log(this.props.cardValue);
      let cardArray = [];

      for (var key of Object.keys(this.props.cardValue)) {
        console.log(this.props.cardValue[key])
        cardArray.push(<DisplayCard cardValue={this.props.cardValue[key]} />);
      }
    
      // let cardArray = this.props.cardValue.map((card) => {
      //   return(<DisplayCard cardValue={card}/>);
      // })

      return(
        <div className="card-deck">
          {cardArray};
        </div>
      );

}
}

class RandomPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        cardArray: {},
        BrandCard: '',
        ColorCard: '',
        ImageCard: '',
        TypeCard: '', 
        TitleCard: '',
        rootRef: firebase.database().ref()
          }
    }
  
    componentDidMount() {
      //let rootRef = firebase.database().ref();
       
      this.state.rootRef.on('value', (snapshot) => {
        let objectArray = snapshot.val();
        console.log(objectArray);
        console.log("i mounted");
        this.setState({cardArray: objectArray});
      });
    }
  
   componentDidUpdate(prevProps, prevState) {
     if (prevProps.data !== this.props.data) {
     this.state.rootRef.on('value', (snapshot) => {
        let objectArray = snapshot.val();
        console.log("entered");
        this.setState({cardArray: objectArray});
        });
      }
    }
  
    addCard() {
      console.log("made it here");
      let newCard = {
        brand: this.state.BrandCard,
        color: this.state.ColorCard, 
        image: this.state.ImageCard, 
        type: this.state.TypeCard, 
        title: this.state.TitleCard
      }
  
      this.state.rootRef
      .push(newCard)
      .then(() => {
        this.setState({
          BrandCard:"",
          ColorCard:"",
          ImageCard:"",
          TypeCard:"",
          TitleCard:""
      })}).catch((d) => console.log("error " + d));
  
      this.render();
    }
  
  
  
    render() {
      let newArray = Object.keys(this.state.cardArray);
      console.log(newArray);
  
      return (
        <div>
          <h1>
            What do I own? 
          </h1>
          <div class="formContainer">
            <form>
              <div className="InputContainer">
  
                <label for="brand_input" aria-label="source Input">Brand: </label>
                <input 
                  id="brand_input" 
                  placeholder="e.g.(Nike)" 
                  type="input" name="input" 
                  aria-label="Brand Input" 
                  className= "form-control"
                  onChange= {(event) => this.setState({BrandCard: event.target.value})}
                  />
  
                <label for="brand_input" aria-label="source Input">Color:  </label>
                <input 
                  id="color_input" 
                  placeholder="e.g.(Nike)" 
                  type="input" name="input" 
                  aria-label="Brand Input" 
                  className= "form-control"
                  onChange= {(event) => this.setState({ColorCard: event.target.value})}
                  />
  
                <label for="brand_input" aria-label="source Input">Image: </label>
                <input 
                  id="image_input" 
                  placeholder="e.g.(Nike)" 
                  type="input" name="input" 
                  aria-label="Brand Input" 
                  className= "form-control"
                  onChange= {(event) => this.setState({ImageCard: event.target.value})}
                  />
  
  
                <label for="brand_input" aria-label="source Input">Title:  </label>
                <input 
                  id="title_input" 
                  placeholder="e.g.(Nike)" 
                  type="input" name="input" 
                  aria-label="Brand Input" 
                  className= "form-control"
                  onChange= {(event) => this.setState({TitleCard: event.target.value})}
                  />
  
                <label for="brand_input" aria-label="source Input">Type: </label>
                <input 
                  id="type_input" 
                  placeholder="e.g.(Nike)" 
                  type="input" name="input" 
                  aria-label="Brand Input" 
                  className= "form-control"
                  onChange= {(event) => this.setState({TypeCard: event.target.value})}
                  />
              </div>
  
              <div class="buttonContainer">
                <button className="btn btn-primary" onClick={() => this.addCard()} id="submitButton" type="submit">Add Card</button>
              </div>
            </form>
          </div>
          <div>
            <DisplayList cardValue={this.state.cardArray}/>
          </div>
          </div>
      );
    }
  }

export default RandomPage;