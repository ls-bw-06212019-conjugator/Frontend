import React from "react";
import { connect } from "react-redux";
import { Alert, Spinner } from "reactstrap";
import { desktopHelp } from "../../img/desktop-accent-instructions.jpg";
import { mobileHelp } from "../../img/mobile-accent-instructions.png";
import { getWord } from '../../actions';

import { Stats } from "../Stats/Stats";
import "./Conjugator.scss";

const mapConjugator = state => {
  return {
    word: state.word.infinitive,
    tense: state.word.tense,
    wordInEnglish: state.word.infinitive_english,
    pronoun: state.word.form,
    gettingWord: state.gettingWord,
    answer: state.word.answer
  };
};

export const Conjugator = connect(
  mapConjugator,
  { desktopHelp, mobileHelp, getWord }
)(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isDesktop: false,
        wordInput: "",
        isWrong: false
      };

      this.updatePredicate = this.updatePredicate.bind(this);
    }

    componentWillMount() {
      
      this.props.getWord();
    }
    componentDidMount() {
      this.updatePredicate();
      window.addEventListener("resize", this.updatePredicate);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate() {
      this.setState({ isDesktop: window.innerWidth > 700 });
    }

    handleUpdateWord = async event => {
      this.state.isWrong && this.setState({
        isWrong: false
      })
      let value = Array.from(event.target.value);
      const regex = /^$|[ a-zñáéíóúü]+$/i;
      if (value.findIndex(el => el === '`') !== -1 || value.findIndex(el => el === `'`) !== -1 || value.findIndex(el => el === '~') !== -1) {
        let index = value.findIndex(el => el === '`');
        if (index === -1){
          index = value.findIndex(el => el === `'`);
        }
        if(index === -1){
          index = value.findIndex(el => el === '~');
        }

        value.splice(index, 1);

        const character = value[index - 1];

        switch (character) {
          case 'a':
            value[index - 1] = 'á';
            break;
          case 'e':
            value[index - 1] = 'é';
            break;
          case 'i':
            value[index - 1] = 'í';
            break;
          case 'o':
            value[index - 1] = 'ó';
            break;
          case 'u':
            value[index - 1] = 'ú';
            break;
          case 'n':
            value[index - 1] = 'ñ';
          default:
            break;
        }
      }

      value = value.join('');
      
      if (regex.test(value)) {
        await this.setState({ wordInput: value });
      } else {
        return;
      }
    };

    testWord = e => {
      e.preventDefault(); 
      if(this.state.wordInput === this.props.answer) {
          this.props.getWord()
          this.setState({
            wordInput: ""
          })
        } else {
          this.setState({
            isWrong: true
          })
        }
    }

    render() {
      return (
        <div className="conjugator">
          <h4 className="tense">{this.props.tense}</h4>
          {this.props.gettingWord ? 
            <Spinner color="info" /> :
            <div className="verb-container">
              <h2>{`${this.props.pronoun} _______ (${this.props.word})`}</h2>
              <p>{this.props.wordInEnglish}</p>
            </div> 
          }
          <form onSubmit={this.testWord}>
            <span>
              <b>{this.props.pronoun} </b>
            </span>
            <input
              className={this.state.isWrong ? "wrong" : null}
              value={this.state.wordInput}
              onChange={this.handleUpdateWord}
              maxLength={20}
              type="text"
              placeholder=" type answer here"
            />
            <button action="submit">Submit</button>
          </form>

          <div className="bottom-sections">
            <Stats />
            <img
              src={
                this.state.isDesktop
                  ? require("../../img/desktop-accent-instructions.jpg")
                  : require("../../img/mobile-accent-instructions.png")
              }
              alt="Accented character input help"
              className="help-img"
            />
          </div>
        </div>
      );
    }
  }
);
