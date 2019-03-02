import React, { Component } from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase'
import CardList from '../CardList/CardList'
import { getCardsByRole } from '../cardActions'


const mapState = state => ({
    loading: state.async.loading,
    cards: state.cards
  });

const actions = {
  getCardsByRole
}

class CardDashboard extends Component {

  async componentDidMount() {
    await this.props.getCardsByRole(0);
  }

  changeTab = (e, data) => {
    this.props.getCardsByRole(data.activeIndex);
  };

  render() {
      const { cards } = this.props;

    return (
    <Grid>
        <Grid.Column width={12}>
            <CardList cards={cards} changeTab={this.changeTab} />
        </Grid.Column>
    </Grid>
    )
  }
}

export default connect(mapState, actions)(CardDashboard);
