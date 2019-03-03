import React from "react";
import { Card, Image, Label } from "semantic-ui-react";
import { rarityColors } from '../../../app/common/util/helpers'

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
  
  let cardColors = rarityColors(card.rarity);
  let color = cardColors.color
  let cardColor = cardColors.cardColor
      
  return (
    <Card
      style={{
        backgroundColor: "#0e0a13",
        boxShadow: `0 1px 3px 0 ${color}, 0 0 0 1px ${color}`
      }}
    >
    
      <Card.Content
        textAlign="center"
        style={{
          borderBottom: `1px solid ${color}`,
          background: cardColor,
          maxHeight: "48px"
        }}
      >
      <Label color='blue' floating circular>
        +9
      </Label>
        <Card.Header content={card.nickname} style={{ color: "white" }} />
      </Card.Content>
      <Image src={card.photoURL || "/assets/player_taxer.png"} />
      <Card.Content
        extra
        textAlign="center"
        style={{ background: cardColor }}
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
