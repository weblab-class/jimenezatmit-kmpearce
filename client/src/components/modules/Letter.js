import React, { Component } from "react";
import { Link } from "@reach/router";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Letter.css";
import { post, get } from "../../utilities.js";

/**
 * Letter is a component for holding message and creator/recipient
 *
 * Proptypes (?)
 * @param {string} package_id
 */

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open_date: "",
      message: "",
      package_id: "",
      prompt: "",
      sender_name: "",
      recipient_email: "",
    };
  }

  // called whenever the user types in the recipient input field
  // updates the field that has changed
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value,
    });
  };

  // called when the user hits "send letters!" to send letters
  handleSubmit = (event) => {
    event.preventDefault();

    // fields that we would save into api
    const body = {
      open_date: this.state.open_date,
      message: this.state.message,
      package_id: this.props.package_id,
      prompt: this.state.prompt,
    };

    console.log(body);

    post("/api/letter", body)
      .then(async () => {
        const packageObj = await get("/api/package", { package_id: this.props.package_id });

        console.log(packageObj);

        this.setState({
          recipient_email: packageObj.recipient_email,
          sender_name: packageObj.sender_name,
        });
      })
      .then(() => {
        console.log(this.state.recipient_email);

        post("/api/email", {
          recipient_email: this.state.recipient_email,
          sender_name: this.state.sender_name,
          package_id: this.props.package_id,
        });

        console.log("aaaa");
        navigate(`/thankyou/${this.props.package_id}`);
      });

    this.setState({
      open_date: "",
      message: "",
      package_id: "",
      prompt: "",
      recipient_email: "",
      sender_name: "",
    });
  };

  render() {
    return (
      <>
        <div>
          <form className="u-textCenter">
            <label className="Create-description" htmlFor="prompt">
              prompt
            </label>
            <div id="smallText">start your prompt with "open when"</div>
            <textarea
              className="Create-field"
              name="prompt"
              placeholder="open when _____"
              type="text"
              id="prompt"
              onChange={this.handleChange}
              value={this.state.prompt}
            ></textarea>
            <br></br>

            <label className="Create-description" htmlFor="date">
              open when date
            </label>
            <div id="smallText">set date to 00/00/0000 for forever unlocked</div>
            <input
              className="Create-field"
              name="open_date"
              placeholder="MM/DD/YYYY"
              type="text"
              id="date"
              onChange={this.handleChange}
              value={this.state.open_date}
            ></input>
            <br></br>

            <label className="Create-description" htmlFor="message">
              message
            </label>
            <br></br>
            <textarea
              className="Create-field"
              name="message"
              placeholder="write letter here"
              type="text"
              id="message"
              onChange={this.handleChange}
              value={this.state.message}
            ></textarea>
            <br></br>
          </form>
        </div>

        <div className="u-textCenter">
          <button
            type="button"
            className="Create-button Create-subDescription"
            onClick={this.handleSubmit}
          >
            send letter!
            {/* <Link to="/thankyou" className="Create-link">
              send letter!
            </Link> */}
          </button>
        </div>

        {/* <hr /> */}
      </>
    );
  }
}

export default Letter;

// /**
//  * New Letter is a Letter component for new letters
//  *
//  * Proptypes
//  * @param {string} creatorName
//  * @param {string} letterID
//  */

// class NewLetter extends Component {
//   addLetter = (value) => {
//     const body = { parent: this.props.letterID, content: value };
//     post("/api/letter", body).then((letter) => {
//       this.props.addNewLetter(letter);
//     });
//   };

//   render() {
//     return <Letter onSubmit={this.addLetter} />;
//   }
// }

// componentDidMount() {
//   get("/api/letter", { parent: this.props._id }).then((letter) => {
//     this.setState({
//       message: letter.message,
//       open_date: letter.open_date,
//       _id: letter._id,
//       recipient_email: letter.recipient_email,
//       sender_name: letter.sender_name,
//       prompt: letter.prompt,
//     });
//   });
// }

//   // this gets called when the user pushes "Submit", so their
//   // letter gets added right away
//   addNewLetter = (letterObj) => {
//     this.setState({
//       open_date: letterObj.open_date,
//       message: letterObj.message,
//       _id: letterObj._id,
//       recipient_email: letterObj.recipient_email,
//       sender_name: letterObj.sender_name,
//       prompt: letterObj.prompt,
//     });
//   };

//export default NewLetter;
