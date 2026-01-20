
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





function createColumn(stateName){
  const column = document.createElement("div");
  column.className = "column";

  const title = document.createElement("h2");
  title.textContent = stateName;

  column.appendChild(title);

  return column;
}

function renderWorkflow(){
  boardElement.innerHTML = "";

  appState.workflow.states.forEach(function(state){
    const columnElement = createColumn(state);
    boardElement.appendChild(columnElement);
  });
}


function createItemCard(item){
  const card = document.createElement("div");
  card.className = "item-card";
  card.dataset.id = item.id;

  const text =  document.createElement("p");
  text.textContent = item.title;

  card.appendChild(text);

  const actions = document.createElement("div");
  actions.className = "actions";

  const possibleMoves = appState.workflow.transitions[item.state];
  possibleMoves.forEach(function(nextState){
    const button = document.createElement("button");
    button.textContent = "Move to "+ nextState;
    button.dataset.nextState = nextState;
    button.className = "move-btn";

    actions.appendChild(button);
  });
  card.appendChild(actions);

  return card;
}

function renderItems(){
  appState.forEach(function(item){
    const column = findColumnByState(item.state);
    const card =  createItemCard(item);
    column.appendChild(card);
  });
}

function findColumnByState(stateName){
  const columns  = document.querySelectorAll(".column");

  for(let column of columns){
    const title = column.querySelector("h2");
    if(title.textContent === stateName){
      return column;
    }
  }
}

boardElement.addEventListener("click",function(event){
  if(!event.target.classList.contains("move-btn")){
    return;
  }

  const card = event.target.cloasest(".item-card");
  const itemId = card.dataset.id;
  const nextState = event.target.dataset.nextState;

  const moved = moveItem(itemId,nextState);

  if(moved){
    renderWorkflow();
    renderItems();
  }
});

formElement.addEventListener("submit",function(event){
  event.preventDefault();

  const title =  inputElement.value.trim();

  if(title===""){
    alert("Please enter a title");
    return;
  }

  addItem(title);
  inputElement.value = "";

  renderWorkflow();
  renderItems();
});
//DOM REFERENCES
const boardElement = document.querySelector("#board");
const formElement  =  document.querySelector("#item-input");



renderWorkflow();

