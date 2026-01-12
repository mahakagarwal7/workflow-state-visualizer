
//memory of the app
const appState={
  workflow:{
    states:["Draft","Review","Approved"],
    transitions:{
      Draft:["Review"],
      Review:["Approved","Draft"],
      Approved:[]
    }

    
  },

  items:[],

  history:[]
};
function generateId(){
  return "item-"+Date.now(); //unique ids
}
function addItem(title){
  const newItem={
    id:generateId(),
    title:title,
    state:appState.workflow.states[0]
  };

  appState.items.push(newItem);
  return newItem;
}
function canMoveItem(currentState,nextState) {
  const allowed=appState.workflow.transitions[currentState];
  return allowed.includes(nextState);
}
function moveItem(itemId, nextState) {
  const item=appState.items.find(i=>i.id===itemId);

if(!item){
    return false;
}

  if (!canMoveItem(item.state,nextState)) {
    return false;
  }

  appState.history.push({
    itemId:item.id,
    from:item.state,
    to:nextState,
    time:new Date().toLocaleString()
  });

  item.state=nextState;
  return true;
}

