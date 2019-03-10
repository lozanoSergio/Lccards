import React from "react";
import { Card } from "semantic-ui-react";
import PlayerCard from "./PlayerCard";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const CardList = ({ cards, loading }) => {
  return (
    <div>
        {loading && <LoadingComponent />}
        <Card.Group itemsPerRow={8}>
          {cards &&
            cards.map(card => (
              <PlayerCard key={card.id} card={card} />
            ))}
        </Card.Group>
    </div>
  );
};

export default CardList;
