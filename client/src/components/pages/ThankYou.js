import React, { Component } from "react";
import { Link } from "@reach/router";

import "../../utilities.css";
import "./ThankYou.css";

class ThankYou extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.title = "Open When";
  }

  render() {
    return (
      <>
        <h1 className="Thank-title u-textCenter">
          Thank you for using Open When! Your letter has been sent.
        </h1>
        <div className="buttonContainer">
          <button type="button" className="Thank-button Thank-description">
            <Link to="/" className="Thank-link">
              return home
            </Link>
          </button>

          <button type="button" className="Thank-button Thank-description">
            <Link to={`/writeletters/${this.props.package_id}`} className="Thank-link">
              send another letter
            </Link>
          </button>

          <button type="button" className="Thank-button Thank-description">
            <Link to="/create" className="Thank-link">
              send a new package
            </Link>
          </button>
        </div>
      </>
    );
  }
}

export default ThankYou;
