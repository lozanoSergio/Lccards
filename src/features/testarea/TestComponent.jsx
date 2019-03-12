import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
// import Script from 'react-load-script';
// import GoogleMapReact from 'google-map-react';
import { incrementAsync, decrementAsync, testPermission } from "./testActions";
import { openModal } from "../modals/modalActions";
import CardFlip from "../card/CardOpenings/CardFlip";

const mapState = state => ({
  data: state.test.data,
  loading: state.test.loading
});

const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
  testPermission
};

// const Marker = () => <Icon name='marker' size='big' color='red'/>

class TestComponent extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    address: "",
    scriptLoaded: false
  };


  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };

    const {
      incrementAsync,
      decrementAsync,
      data,
      openModal,
      loading,
      testPermission
    } = this.props;
    return (
      <div>
        <Button
          onClick={() => openModal("CardModal")}
          color="teal"
          content="Open Modal"
        />
        <br/>
        <CardFlip />
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(TestComponent);
