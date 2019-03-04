import React, { Component } from "react";
import anime from "animejs";

const style = {
  card_container: {
    fontSize: "120px",
    fontWeight: "bold",
    width: "400px",
    height: "250px",
    margin: "80px auto",
    borderRadius: "10px",
    perspective: "1400px"
  },
  card: {
    position: "relative",
    height: "100%",
    borderRadius: "10px",
    widht: "100%",
    transformStyle: "preserve-3d"
  },
  front: {
    color: "#fff",
    background: "#2196f3"
  },
  back: {
    position: "absolute",
    top: "0",
    left: "0",
    transform: "rotateY(180deg)",
    color: "#2196f3",
    background: "#fff"
  }
};

class CardFlip extends Component {
  state = {
    playing: false
  };

  handleClick = (e) => {
    
    let playing = this.state.playing;
    if (playing) return;

    this.setState({
      playing: true
    });

    anime({
      targets: e.currentTarget,
      scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
      easing: "easeInOutSine",
      duration: 400,
      complete: function(anim) {
        this.setState({
          playing: false
        });
      }.bind(this)
    });
  }
  render() {

    
    return (
      <div style={style.card_container} >
        <div className="card" style={style.card} onClick={(event) => this.handleClick(event)}>
          <div style={style.front}>A</div>
          <div style={style.back}>B</div>
        </div>
      </div>
    );
  }
}

export default CardFlip;
