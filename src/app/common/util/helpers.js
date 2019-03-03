import moment from 'moment'

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
  }
}

export const createNewCard = card => {
  card.birthday = moment(card.birthday).toDate();
  return {
    ...card,
    created: Date.now()
  }
}

export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};

export const rarityColors = rarity => {
  let color;
  let cardColor;

  switch (rarity) {
    case 'common':
      color = '#b3bcbb'
      cardColor = 'linear-gradient(to bottom, #b3bcbb, #5f6160)'
      break;
    case 'rare':
      color = '#3e87ee'
      cardColor = 'linear-gradient(to bottom, #3e87ee, #163a6c)'
      break;
    case 'epic':
      color = '#853187' 
      cardColor = 'linear-gradient(to bottom, #853187, #55225b)'
      break;
    case 'legendary':
      color = '#fcc433'
      cardColor = 'linear-gradient(to bottom, #fcc433, #733f06)'
      break;
    default:
      color = '#b3bcbb'
      cardColor = 'linear-gradient(to bottom, #b3bcbb, #5f6160)'
  }

  return {
    color: color,
    cardColor: cardColor
  }

}