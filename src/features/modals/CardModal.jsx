import React from "react";
import { Modal, Grid } from "semantic-ui-react";
import { closeModal } from "./modalActions";
import { connect } from "react-redux";
import CardFlip from "../card/CardOpenings/CardFlip";

const actions = {
  closeModal
};

const CardModal = ({ closeModal }) => {
  return (
    <Modal open={true} onClose={closeModal} style={{ background: "none", width: "80%" }}>
      <Grid relaxed="very" columns={5}>
        <Grid.Column>
          <CardFlip />
        </Grid.Column>
        <Grid.Column>
        <CardFlip />
        </Grid.Column>
        <Grid.Column>
        <CardFlip />
        </Grid.Column>
        <Grid.Column>
        <CardFlip />
        </Grid.Column>
        <Grid.Column>
        <CardFlip />
        </Grid.Column>
      </Grid>
    </Modal>
  );
};

export default connect(
  null,
  actions
)(CardModal);
