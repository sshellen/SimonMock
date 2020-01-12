import React from 'react';



class Popup extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const {left,top} = this.props
    return (
      <div className="popup" style={{left: left, top:top }}>
        <img src="/SimonMock/png/popupArrow.png" width="22px" style={{marginBottom:'-5px',marginLeft:'29px' }} />
        <div className="outer">
          <div className="inner">
            <div className="content">
              <p>This game was inspired by the game Simon, distributed by Milton Bradley (later by Hasbro).</p>
              <p>Click the center button to start a new game and see how long of a sequence you can match  correctly.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Popup;