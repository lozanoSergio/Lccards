import React, { Component } from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import anime from "animejs";

const style = {
  card_container: {
    perspective: "1400px",
    width: "290px",
    height: "450px"
  },
  card: {
    position: "relative",
    height: "100%",
    widht: "100%",
    transformStyle: "preserve-3d"
  },
  front: {
    backgroundColor: '#fff',
    height: "424.16px"
  },
  back: {
    position: "absolute",
    top: "0",
    left: "0",
    transform: "rotateY(180deg)"
  }
};

class CardFlip extends Component {
  state = {
    playing: false,
    played: false
  };

  handleClick = e => {
    let playing = this.state.playing;
    let played = this.state.played
    if (playing || played) return;

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
          playing: false,
          played: true
        });
      }.bind(this)
    });
  };
  render() {
    return (
      <div style={style.card_container}>
        <div
          className="card"
          style={style.card}
          onClick={event => this.handleClick(event)}
        >
          <div style={style.front}>
            
          </div>
          <div style={style.back}>
            <Card>
              <Image src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" draggable={false} />
              <Card.Content>
                <Card.Header>Daniel</Card.Header>
                <Card.Meta>Joined in 2016</Card.Meta>
                <Card.Description>
                  Daniel is a comedian living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name="user" />
                  10 Friends
                </a>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default CardFlip;
