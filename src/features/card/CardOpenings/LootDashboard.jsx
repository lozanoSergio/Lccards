import React, { Component } from "react";
import { connect } from "react-redux";
import {Puffs} from 'arwes'
import { Grid, Segment, Image, Button, Header } from "semantic-ui-react";
import Draggable from "react-draggable";
import LootHolder from "./LootHolder";
import { openModal } from "../../modals/modalActions";

const actions = {
  openModal
}

class LootDashboard extends Component {
  constructor() {
    super();
    this.cardDropper = React.createRef();
  }

  state = {
    activeDrags: 0,
    visible: true,
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
    let obj = this.cardDropper;
    console.log(obj);

    if (position.x < 375) {
      this.setState({ controlledPosition: { x: 0, y: 0 } });
    } else {
      this.setState({ visible: false, controlledPosition: { x: 0, y: 0 } });
    }
  };

  render() {
    const { controlledPosition } = this.state;
    const { openModal } = this.props;

    return (
      <Puffs quantity={22}>
        <div style={{ width: '100%', height: '100%' }} >
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
          <Header as="h2" attached="top" textAlign="center" style={{maxWidth: '400px'}}>
              Card Packs
            </Header>
          <Segment inverted attached style={{maxWidth: '400px'}}>
            {this.state.visible && (
              <Draggable
                position={controlledPosition}
                onStop={this.onControlledDrag}
              >
                <Image
                  style={{ zIndex: 100, cursor: "pointer", marginLeft: "auto", marginRight: "auto" }}
                  src="/assets/card_back.png"
                  draggable={false}
                />
              </Draggable>
            )}
            {!this.state.visible && (
              <Image src="/assets/card_back_grey.png" draggable={false} style={{marginLeft: "auto", marginRight: "auto"}} />
            )}
            </Segment>
          </Grid.Column>
          <Grid.Column width={12}>
            <Header as="h2" attached="top" textAlign="center">
              Open Packs
            </Header>
            <Segment inverted attached>
              <LootHolder visible={this.state.visible} />
              <div style={{marginLeft: "auto", marginRight: "auto", textAlign: "center", marginTop: "1em"}}>
              <Button inverted color="brown" onClick={() => openModal("CardModal")}>
                Open
              </Button>
              </div>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
      </Puffs>
    );
  }
}

export default connect(null, actions) (LootDashboard);
