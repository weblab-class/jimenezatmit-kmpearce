import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Envelope.css";

import IndividualLetterRead from "../pages/IndividualLetterRead";


//passed letter obj info and renders it

class Envelope extends Component {
  constructor(props) {
    super(props);
  }

  //componentDidMount make the get request, store the letters somehow in a state
  render() {
    return (
        <>

      <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.12.1/css/all.css"
          crossorigin="anonymous"
        ></link>
        <div className="Envelope-centered Envelope-blue">
          <i onClick={this.props.onClick} className="far fa-envelope fa-10x"></i>
          {/* figure out how to pass in letter detail as props to render that on IndiivdualLetterRead page. 
          need conditional with date for unlock also */}
          {/* () => navigate("/letter/") */}
        </div>
        <h3 className="Envelope-prompt"> {this.props.prompt} </h3> 

        </>
    
    )
  }

}
export default Envelope;