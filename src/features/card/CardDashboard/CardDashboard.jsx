import React, { Component } from "react";
import { Grid, Tab, Select } from "semantic-ui-react";
import { connect } from "react-redux";
import CardList from "../CardList/CardList";
import { getAllCards, getUserCards } from "../cardActions";
import { roles, rarity } from "../../../app/common/data/common";

const panes = roles;

const mapState = state => ({
  loading: state.async.loading,
  initialCards: state.cards
});

const actions = {
  getAllCards,
  getUserCards
};

class CardDashboard extends Component {
  state = {
    cards: [],
    userCards: []
  };

  async componentDidMount() {
    await this.props.getAllCards();

    let userCardsIds = await this.props.getUserCards();
    let allCards = this.props.initialCards;

    let filteredCards = allCards.filter((e) => {
      return userCardsIds.indexOf(e.id) !== -1
    })

    this.setState({
      cards: allCards,
      userCards: filteredCards
    });
  }

  changeTab = (e, data) => {
    this.props.getCardsByRole(data.activeIndex);
    this.setState({});
  };

  onChange = (e, data) => {
    let filteredCards = this.props.initialCards;
    let cardsArr = [];
    if (data.value !== "all" && filteredCards) {
      filteredCards.filter(filteredCard => {
        if (filteredCard.rarity === data.value) {
          cardsArr.push(filteredCard);
        }
        return cardsArr;
      });
      this.setState({
        cards: cardsArr
      });
    } else {
      this.setState({
        cards: this.props.initialCards
      });
    }
  };

  render() {
    const { loading } = this.props;

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
            <Select
              placeholder="Rarity"
              options={rarity}
              onChange={(e, data) => this.onChange(e, data)}
            />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={12}>
            <CardList
              cards={this.state.userCards}
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
