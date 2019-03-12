import React, { Component } from "react";
import { Image, Card } from "semantic-ui-react";
import styled from "styled-components";
import anime from "animejs";
import { rarityColors } from "../../../app/common/util/helpers";
import PlayerCard from "../CardList/PlayerCard";

const Container = styled.div`
  width: 300px;
  height: 360px;

  border-radius: 10px;

  perspective: 1400px;
`;

const FlipCard = styled.div`
  position: relative;

  height: 100%;

  border-radius: 10px;

  widht: 100%;
  transform-style: preserve-3d;

  .front,
  .back {
    display: flex;

    width: 100%;
    height: 100%;

    border-radius: 10px;

    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
  }

  .front {
    color: #fff;
    background-image: linear-gradient(to top right, #fe4178, #fe4e20);
  }

  .back {
    position: absolute;
    top: 0;
    left: 0;

    transform: rotateY(180deg);

    color: #2196f3;
    background: #0e0a13;
  }
`;

const textStyle = {
  color: "white",
  fontSize: "22px",
  fontWeight: "bold",
  marginRight: "14px"
};

const textStyle2 = {
  color: "white",
  fontSize: "22px",
  fontWeight: "bold"
};

class CardFlip extends Component {
  state = {
    playing: false,
    played: false
  };

  handleClick = e => {
    let playing = this.state.playing;
    let played = this.state.played;
    if (playing || played) return;

    this.setState({
      playing: true
    });

    anime({
      targets: e.currentTarget,
      scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
      easing: "easeInOutSine",
      duration: 600,
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
      <Container>
        <FlipCard onClick={event => this.handleClick(event)}>
          <div className="front">
            <Image src="/assets/lec_logo.png" />
          </div>
          <div className="back">
          <Card style={{backgroundColor: "#0e0a13", height: "100%"}}>
            <Card.Content
              textAlign="center"
              style={{
                width: "100%",
                maxHeight: "56px",
                borderBottom: `1px solid #853187`,
                background: "linear-gradient(to bottom, #853187, #55225b)",
                borderRadius: "10px"
              }}
            >
              <Card.Header content="Nickname" style={{ color: "white" }} />
            </Card.Content>
            <Image src="/assets/player_taxer.png" style={{marginTop: "20px"}}/>
            <Card.Content

              extra
              textAlign="center"
              style={{
                background: "linear-gradient(to bottom, #853187, #55225b)",
                width: "100%",
                height: "56px"
              }}
            >
              <div style={{marginTop: "5px"}}>
                <Image
                  src={"/assets/icons/swords_white.png"}
                  width={"22px"}
                  verticalAlign="bottom"
                  style={{ marginBottom: "0px" }}
                />
                <span style={textStyle}>2</span>
                <Image
                  src={"/assets/icons/death_white.png"}
                  width={"22px"}
                  verticalAlign="bottom"
                  style={{ marginBottom: "0px" }}
                />
                <span style={textStyle}>1</span>
                <Image
                  src={"/assets/icons/assists_white.png"}
                  width={"22px"}
                  verticalAlign="bottom"
                  style={{ marginBottom: "0px" }}
                />
                <span style={textStyle2}>15</span>
              </div>
            </Card.Content>
            </Card>
          </div>
        </FlipCard>
      </Container>
    );
  }
}

export default CardFlip;
