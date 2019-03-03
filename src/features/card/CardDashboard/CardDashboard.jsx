import React, { Component } from "react";
import { Grid, Segment, Tab, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import CardList from "../CardList/CardList";
import { getCardsByRole } from "../cardActions";
import { roles, rarity } from "../../../app/common/data/common";

const panes = roles;

const mapState = state => ({
  loading: state.async.loading,
  cards: state.cards
});

const actions = {
  getCardsByRole
};

class CardDashboard extends Component {
  async componentDidMount() {
    await this.props.getCardsByRole(0);
  }

  changeTab = (e, data) => {
    this.props.getCardsByRole(data.activeIndex);
  };

  render() {
    const { cards, loading } = this.props;

    return (
      <div>
        <Grid columns="equal">
          <Grid.Column>
            <Tab
              onTabChange={(e, data) => this.changeTab(e, data)}
              menu={{ inverted: true, secondary: true, pointing: true }}
              panes={panes}
            />
          </Grid.Column>
          <Grid.Column>
            <Select placeholder="Rarity" options={rarity} />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={12}>
            <CardList
              cards={cards}
              changeTab={this.changeTab}
              loading={loading}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapState,
  actions
)(CardDashboard);
