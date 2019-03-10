import React, { Component } from "react";
import { Grid, Segment, Image } from "semantic-ui-react";
import Draggable from "react-draggable";
import LootHolder from './LootHolder';

class LootDashboard extends Component {
  constructor(){
    super()
    this.cardDropper = React.createRef()
  }
  

  state = {
    activeDrags: 0,
    controlledPosition: {
      x: 0,
      y: 0
    }
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY
      }
    });
  };

  onControlledDrag = (e, position) => {
    if (position.x < 280) {
      this.setState({ controlledPosition: { x: 0, y: 0 } });
    } else {
      this.setState({ controlledPosition: { x: 580, y: 110 } });
    }
  };

  handleStart = (e, ui) => {
    let obj = e.currentTarget
    let rect = obj.getBoundingClientRect()

    return false
  }

  render() {
    const { controlledPosition } = this.state;
    console.log(this.cardDropper)
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Segment>
              <Draggable
                position={controlledPosition}
                onStop={this.onControlledDrag}
              >
                <Image
                  style={{ zIndex: 100, cursor: "pointer" }} src="/assets/card_back.png" draggable={false}
                />
              </Draggable>
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <Segment placeholder textAlign='center'>
              <Grid.Row verticalAlign='middle'>
                <Draggable onStart={(e, ui) => this.handleStart(e, ui)}>
                <div
                  style={{ minHeight: "400px", backgroundColor: 'white', maxWidth: '290px', marginLeft: 'auto', marginRight: 'auto'}} ref={this.cardDropper}
                ></div>
                </Draggable>
              </Grid.Row>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default LootDashboard;
