import React from 'react';
import Axios from 'axios';
import styles from '../css/simon.css';
import Popup from './Popup';


class Simon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: "",
      order: [],
      moreTop:"",
      moreLeft:""
    }
    this.initialState = {
      order: [],
      guess: [],
      message:"",
      showPopup:false
    }
    this.buttons;
    this.errorButton;
    this.sounds = {
      button1Sound: new Audio('/SimonMock/mp3/simonSound1.mp3'),
      button2Sound: new Audio('/SimonMock/mp3/simonSound2.mp3'),
      button3Sound: new Audio('/SimonMock/mp3/simonSound3.mp3'),
      button4Sound: new Audio('/SimonMock/mp3/simonSound4.mp3'),
      errorSound: new Audio('/SimonMock/mp3/error.mp3')
    }
    this.guessCount = 0;
  }

  assignNewStep = () => {
    let buttonToAdd = Math.round(Math.random() * 10/3) + 1
    this.setState({
      order: this.state.order.concat(buttonToAdd)
    },() => {this.playSequence()})

  }

  highlightButton = (count) => {
    let self = this;
    return new Promise((resolve, reject) =>{
      setTimeout(() => {
        try {
          if (typeof self.state.order[count] !== 'undefined') {
            let el = document.getElementById(`button${self.state.order[count]}`)
            let sound = this.sounds[`button${self.state.order[count]}Sound`];
            sound.play();
            el.classList.add('active')
          }
          resolve(count += 1);
        } catch (err) {
          reject(err)
        }
      }, 1000)
    })

  }

  unHighlightButtons = () => {
    let self = this;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          for(let i=0;i< this.buttons.length;i++) {
            this.buttons[i].classList.remove('active')
          }},500)
      resolve(true)
    })
  }

  handleClick = (e,val) => {
    e.preventDefault();
    let sound = this.sounds[`button${val}Sound`];
    sound.play();
    if(+this.state.order[this.guessCount] !== +val) {
        this.sounds.errorSound.play();
        this.errorButton.classList.add("error");
        this.guessCount = 0
        this.setState({
          message: this.state.order.length > 0 ? `Your highest correct sequence was ${this.state.order.length - 1}.` : this.state.message,
          order: []
        },() => {
          setTimeout(() => {
            this.errorButton.classList.remove("error")
          }, 300)
        })
        return
    } else {
        if(this.guessCount + 1 < this.state.order.length) {
          this.guessCount += 1;
        } else {
          this.guessCount = 0;
          this.assignNewStep()
        }
    }
  }

  startGame = (e) => {
    e.preventDefault();
    this.setState({...this.initialState}, () => {
      this.assignNewStep();
    })

  }

  playSequence = async(count = 0) => {
    let unhighlight = false
    count = await this.highlightButton(count)
    unhighlight = await this.unHighlightButtons();
    if(count < this.state.order.length) this.playSequence(count)
  }

  showPopup = (e) => {
    e.preventDefault();
    this.setState({showPopup: this.state.showPopup === true ? false : true})
  }

  resizeWin = () => {
    this.setState({
      moreLeft:getComputedStyle(document.getElementsByClassName("title")[0]).left,
      moreTop:getComputedStyle(document.getElementsByClassName("title")[0]).top
    })
  }

  popupListener = (e) => {
    if(e.target.id !== "moreLink") {
      this.setState({showPopup:false})
    }
  }


  componentWillUnmount() {
    this.setState({...this.initialState})

    window.removeEventListener("resize", this.resizeWin);

    document.removeEventListener("click", (e) => {this.popupListener(e)})
  }

  componentDidMount() {
    this.buttons = document.getElementsByTagName('a')
    this.errorButton = document.getElementsByClassName('center')[0]

    this.setState({
      moreLeft:getComputedStyle(document.getElementsByClassName("title")[0]).left,
      moreTop:getComputedStyle(document.getElementsByClassName("title")[0]).top
    })

    window.addEventListener("resize", this.resizeWin);

    document.addEventListener("click", (e) => {this.popupListener(e)})

  }

  render() {

    return (
      <div className="app">
      <h3 className="title"><div>Match the played sequence</div><a className="more" id="moreLink" onClick={e => this.showPopup(e)}>MORE</a></h3>
      <div className="background">
        <div className="simon">
          <div className="top">
            <a id="button1"  ontouchstart="" className="button button1"   onClick={(e) => this.handleClick(e,'1')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.34 147.6">
              <path className="simonButton" d="M49.07,44.32s29.41-30.67,72-41.62c0,0,13.61-4.58,22.32,4.79,0,0,3,2.31,3,10.06L146.11,72s1.14,8.89-14.27,15.38c0,0-32.91,7.85-43.46,46,0,0-4,14.23-24,14.88H16.21s-14.6.41-13-13.38C3.23,134.8,8.91,84.49,49.07,44.32Z" transform="translate(-2.6 -1.08)"/>
            </svg>
            </a>
             <a id="button2"  ontouchstart="" className="button button2" onClick={(e) => this.handleClick(e,'2')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.34 147.6">
                <path className="simonButton" d="M49.07,44.32s29.41-30.67,72-41.62c0,0,13.61-4.58,22.32,4.79,0,0,3,2.31,3,10.06L146.11,72s1.14,8.89-14.27,15.38c0,0-32.91,7.85-43.46,46,0,0-4,14.23-24,14.88H16.21s-14.6.41-13-13.38C3.23,134.8,8.91,84.49,49.07,44.32Z" transform="translate(-2.6 -1.08)"/>
              </svg>
            </a>
          </div>

          <div className="center">
              <div className="startNew"  onClick={e => this.startGame(e)} />
              <img src="/SimonMock/png/newGameButton.png" />
          </div>
          <div className="bottom">
            <a id="button4"  ontouchstart="" className="button button4"  onClick={(e) => this.handleClick(e,'4')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.34 147.6">
                <path className="simonButton" d="M49.07,44.32s29.41-30.67,72-41.62c0,0,13.61-4.58,22.32,4.79,0,0,3,2.31,3,10.06L146.11,72s1.14,8.89-14.27,15.38c0,0-32.91,7.85-43.46,46,0,0-4,14.23-24,14.88H16.21s-14.6.41-13-13.38C3.23,134.8,8.91,84.49,49.07,44.32Z" transform="translate(-2.6 -1.08)"/>
              </svg>
            </a>
            <a id="button3"  ontouchstart="" className="button button3" onClick={(e) => this.handleClick(e,'3')}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.34 147.6">
                <path className="simonButton" d="M49.07,44.32s29.41-30.67,72-41.62c0,0,13.61-4.58,22.32,4.79,0,0,3,2.31,3,10.06L146.11,72s1.14,8.89-14.27,15.38c0,0-32.91,7.85-43.46,46,0,0-4,14.23-24,14.88H16.21s-14.6.41-13-13.38C3.23,134.8,8.91,84.49,49.07,44.32Z" transform="translate(-2.6 -1.08)"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <p className="message">{this.state.message}</p>

      {this.state.showPopup &&
        <Popup left={this.state.moreLeft} top={this.state.moreTop}/>
      }
    </div>
    )
  }

}


export default Simon
