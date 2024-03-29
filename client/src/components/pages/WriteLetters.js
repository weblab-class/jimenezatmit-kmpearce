import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import Letter from "../modules/Letter.js";
import LetterIcon from "../modules/LetterIcon.js";
import { post, get } from "../../utilities.js";

import "../../utilities.css";
import "./WriteLetters.css";

class WriteLetters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      letter_list: [], //letterObjs <Letter>
      letter_ids: [], //autogenerated id from mongo
      current_letter: "",
      show_next: false,
      current_letter_index: null,
    };
  }

  componentDidMount() {
    document.title = "Open When: Create";

    get("/api/allletters", { package_id: this.props.location.state.package_id }).then((letters) => {
      letters.map((letter) => {
        this.setState({
          letter_list: this.state.letter_list.concat([letter]),
          letter_ids: this.state.letter_ids.concat(letter._id),
        });
      });
    });

    let listLength = this.state.letter_list.length;
    if (!this.props.location.state.new_package) {
      this.setState({
        current_letter: null,
        current_letter_index: null,
        show_next: true,
      });
    }
  }

  createLetterObject = (i, letter_id = null) => {
    let sender_name = this.props.location.state.sender_name;
    let package_id = this.props.location.state.package_id;
    let recipient_email = this.props.location.state.recipient_email;

    return (
      <Letter
        package_id={package_id}
        letter_id={letter_id}
        sender_name={sender_name}
        recipient_email={recipient_email}
        complete_function={this.completeLetter}
        delete_function={this.deleteLetter}
        update_function={this.updateLetter}
        index={i}
      />
    );
  };

  completeLetter = (letter_id) => {
    console.log(letter_id);
    let listLength = this.state.letter_list.length;
    this.setState(
      {
        letter_list: this.state.letter_list.concat(this.createLetterObject(listLength, letter_id)),
        letter_ids: this.state.letter_ids.concat(letter_id),
        show_next: true,
      },
      () => console.log(this.state.letter_list),
      this.setState({ current_letter: null, current_letter_index: null })
    );
  };

  updateLetter = (letter_id, index) => {
    console.log(index);

    const newLetters = this.state.letter_list.slice(); // copy the array

    newLetters[index - 1] = this.createLetterObject(index, letter_id); //execute the manipulations

    this.setState({
      letter_list: newLetters,
      current_letter: null,
      current_letter_index: null,
      show_next: true,
    }); //set the new state
  };

  addLetter = (event) => {
    event.preventDefault();

    let listLength = this.state.letter_list.length;

    this.setState(
      {
        current_letter: "",
        current_letter_index: null,
        show_next: false,
      },
      () => console.log(this.state.current_letter)
    );
  };

  deleteLetter = (index) => {
    const newLetters = this.state.letter_list.slice(); // copy the array
    const newIds = this.state.letter_ids.slice();

    delete newLetters[index - 1];
    delete newIds[index - 1];

    this.setState({
      letter_list: newLetters,
      letter_id: newIds,
      current_letter: null,
      current_letter_index: null,
      show_next: true,
    }); //set the new state
  };

  nextPage = () => {
    // console.log(this.state.letter_list);
    navigate(`/review/`, {
      state: {
        // letter_list: this.state.letter_list,
        // letter_ids: "hello",
        sender_name: this.props.location.state.sender_name,
        recipient_email: this.props.location.state.recipient_email,
        package_id: this.props.location.state.package_id,
      },
    });
  };

  handleLetterClick = (index) => {
    console.log("IDS", this.state.letter_ids);
    console.log("INDEX", index);

    this.setState(
      {
        current_letter: this.state.letter_ids[index],
        show_next: true,
        current_letter_index: index,
      },
      () => console.log(this.state.current_letter)
    );
  };

  render() {
    let letterPile = null;
    letterPile = this.state.letter_list.map((letter, index) => (
      <LetterIcon
        index={index}
        handleClick={this.handleLetterClick}
        current_letter_index={this.state.current_letter_index}
      ></LetterIcon>
    ));

    let addAnother = null;
    if (this.state.current_letter === null) {
      addAnother = (
        <button type="button" className="WriteLetters-button" onClick={this.addLetter}>
          add another letter
        </button>
      );
    }

    let singleLetter = null;
    if (this.state.current_letter != null) {
      console.log("ABOUT TO CREATE NEW LETTER: ", this.state.current_letter);
      singleLetter = (
        <Letter
          package_id={this.props.location.state.package_id}
          letter_id={this.state.current_letter}
          sender_name={this.props.location.state.sender_name}
          recipient_email={this.props.location.state.recipient_email}
          complete_function={this.completeLetter}
          delete_function={this.deleteLetter}
          update_function={this.updateLetter}
          index={this.state.letter_list.length}
        />
      );
    }

    return (
      <>
        <h1 className="Create-title u-textCenter">Write Letters</h1>
        <div id="subHeading">
          choose a prompt, write a letter to your recipient, and choose an open when date
        </div>

        <div className="Write-container">
          <div className="u-textCenter">
            {singleLetter}
            {/* <button type="button" className="Create-button" onClick={this.completeLetter}>
              complete
            </button> */}
          </div>
          <div className="u-textCenter">
            <div className="WriteLetters-subheading">your letters</div>
            {letterPile}
            {addAnother}
          </div>
        </div>
        {this.state.show_next == true ? (
          <div className="u-textCenter">
            <button type="button" className="WriteLetters-next" onClick={this.nextPage}>
              next
            </button>
          </div>
        ) : null}
      </>
    );
  }
}

export default WriteLetters;
