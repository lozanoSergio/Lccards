import React from "react";
import { Card, Image, Label } from "semantic-ui-react";

const textStyle = {
  color: 'white', 
  fontSize: '16px', 
  fontWeight: 'bold',
  marginRight: '10px'
}

const textStyle2 = {
  color: 'white', 
  fontSize: '16px', 
  fontWeight: 'bold',
}

const PlayerCard = ({ card }) => {
  return (
    <Card
      style={{
        backgroundColor: "#0e0a13",
        boxShadow: "0 1px 3px 0 #121246, 0 0 0 1px #45454c"
      }}
    >
    
      <Card.Content
        textAlign="center"
        style={{
          borderBottom: "1px solid #492870",
          background: "linear-gradient(to bottom, #7d49c9, #534080)",
          maxHeight: "48px"
        }}
      >
      <Label color='blue' floating circular>
        22
      </Label>
        <Card.Header content={card.nickname} style={{ color: "white" }} />
      </Card.Content>
      <Image src={card.photoURL || "/assets/player_taxer.png"} />
      <Card.Content
        extra
        textAlign="center"
        style={{ background: "linear-gradient(to bottom, #7d49c9, #534080)" }}
      >
      <div>
        <Image src={'/assets/icons/swords_white.png'} width={'16px'} verticalAlign='bottom' style={{marginBottom: '5px'}}/>
        <span style={textStyle}>2</span>
        <Image src={'/assets/icons/death_white.png'} width={'16px'} verticalAlign='bottom' style={{marginBottom: '5px'}}/>
        <span style={textStyle}>1</span>
        <Image src={'/assets/icons/assists_white.png'} width={'16px'} verticalAlign='bottom' style={{marginBottom: '5px'}}/>
        <span style={textStyle2}>15</span>
        </div>
      </Card.Content>
    </Card>
  );
};

export default PlayerCard;
