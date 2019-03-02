import React from 'react'
import { Card, Tab, Divider } from 'semantic-ui-react'
import PlayerCard from './PlayerCard'


const panes = [
  {menuItem: 'All', pane: {key: 'allEvents'}},
  {menuItem: 'Top', pane: {key: 'pastEvents'}},
  {menuItem: 'Jungle', pane: {key: 'futureEvents'}},
  {menuItem: 'Mid', pane: {key: 'hosted'}},
  {menuItem: 'Bottom', pane: {key: 'hosted'}},
  {menuItem: 'Support', pane: {key: 'hosted'}}
]

const CardList = ({cards, changeTab}) => {
    return (
      <div>
      <Tab onTabChange={(e, data) => changeTab(e, data)} menu={{ inverted: true, secondary: true, pointing: true }} panes={panes} />
      <br />
       <Card.Group itemsPerRow={4}>
       {cards && cards.map(card => (
        <PlayerCard 
            key={card.id}
            card={card}
        />
        ))}
        </Card.Group>
      </div>
    )
  }



export default CardList
