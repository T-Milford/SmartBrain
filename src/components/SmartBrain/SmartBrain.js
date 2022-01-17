//sign in form
// register form
// route

//other features to add:
// save collection of faces in backend
// allow user to scroll through all faces in account
// allow user to see recent info about other users: how many faces they added recently and when

// animate faces going into folder, counter ticks up with each one
// user can drag faces into other different folders?

//  https://image.shutterstock.com/image-photo/collage-portraits-ethnically-diverse-mixed-260nw-725291137.jpg

import React from "react";
import Input from "../Input/Input";
import Clarifai from "clarifai";
import Nav from "../Nav/Nav";
import Image from "../Image/Image";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Rank from "../Rank/Rank";
import "./SmartBrain.css";
import "tachyons";

const app = new Clarifai.App({
  apiKey: "5b7b2f3739094c27b6ec2a3a3781cd3d"
});

class SmartBrain extends React.Component {
  constructor() {
    super();
    this.state = {
      userInput: "",
      userHtml: "",
      boxes: [],
      loggedIn: false,
      route: 'login',
      user: {
        id:'',
        name:'',
        email: '',
        entries: 0,
        joined:''
      }
    };
  }

  // change this using spread operator.  Shouldn't need userHtml.
  updateInput = event => {
    this.setState({ userInput: event.target.value });
  };

  boxesToState = boxData => {
    this.setState({ boxes: boxData });
  };

  // shouldn't need this
  setLogin = () => {
      this.setState({ loggedIn: true })
      this.setState({ route: 'home' })
  };

  // shouldn't need this either
  setLogout = () => {
    this.setState({ loggedIn: false })
    this.setState({ route: 'login'})
  }

  setRoute = (route) => {
    this.setState({ route })
  }

  loadUser = (data) => {
    // coudl this be simplified?  is json data not already in format needed?  if not, why not?  should coordinate better with backend, right?
        this.setState({
          user:
            {
              id: data.id,
              name: data.name,
              email: data.email,
              entries: 0,
              joined:''
            }
        })
    }

  getBoxCoordinates = boxData => {
    const faces = boxData.map(face => ({
      top: face.top_row * 100,
      left: face.left_col * 100,
      bottom: (1 - face.bottom_row) * 100,
      right: (1 - face.right_col) * 100
    }));
    return faces;
  };

  getFaces = () => {
    // change below to not need both 'userInput' and 'userHtml'
    this.setState({ userHtml: this.state.userInput });
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.userInput).then(
      response => {
        const boundingBoxes = response.outputs[0].data.regions.map(
          person => person.region_info.bounding_box
        );
        this.boxesToState(this.getBoxCoordinates(boundingBoxes));
      },
      err => {
        console.log(err);
        // this.image.innerHtml = (<p>{err}.  Therefore not an image.  Try again!</p>)
        // this isn't working for some reason.  maybe use instead for an API return that doesn't have the bounding boxes.
      }
    );
  };

  render() {
    return (
      <div className="pa6">
        {/* Nav w/ toggle? */}
        {
          this.state.route === 'login' ? (
          <div>
            <h1 className="center">Welcome to SmartBrain.</h1>
            <Login
              loggedIn={this.setLogin}
              setRoute={this.setRoute} 
              loadUser={this.loadUser}/>
          </div>
        
        ) : this.state.route === 'register' ? (
          <div>
            {/* <Nav>? */}
            <h1 className="center">Register for SmartBrain.</h1>
            <Register
              // loggedIn={this.setLogin}
              setRoute={this.setRoute}
              loadUser={this.loadUser}/>
          </div>
        
        ) : this.state.route === 'home' ? (
          <div>
            {/* // Profile: name, img count */}
            {/* change setLogout to simple toggle isLoggedIn? */}
            <Nav setLogout={this.setLogout} />
            <Rank
              name={this.state.user.name}
              rank={this.state.user.entries}/>
            <Input
              updateInput={this.updateInput}
              getFaces={this.getFaces} />
            <Image
            source={this.state.userHtml}
            boxes={this.state.boxes} />
          </div>
        ) : null
        }
      </div>
    )
  }
}

export default SmartBrain;
