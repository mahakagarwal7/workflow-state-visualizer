const STORAGE_KEY = "workflow-pro-data";

const appState={
    workflow:{
        states:["Draft","Review","Approved"],
        transitions:{
           Draft:["Review"],
            Review:["Draft", "Approved"],
            Approved:[]
        }
    },
    items:[],
    history:[]
};

const columnContainers={};

                    function init(){
                        loadState();
                        setupBoard();
                        renderExistingItems();
                        renderHistory();
                    }


      function setupBoard(){
          const board=document.querySelector("#board");
          board.innerHTML="";
          
          appState.workflow.states.forEach(state=>{
              const col=document.createElement("div");
              col.className="column";
              col.innerHTML=`<h2>${state}</h2><div class="card-list" id="list-${state}"></div>`;
              board.appendChild(col);
              
            
              columnContainers[state]=col.querySelector(".card-list");
          });
      }


function moveItemUI(itemId,nextState) {
    const item=appState.items.find(i=>i.id===itemId);
    const oldState=item.state;

   
    if (appState.workflow.transitions[oldState].includes(nextState)) {
        item.state=nextState;
       
        appState.history.push(`${new Date().toLocaleTimeString()}:"${item.title}"→${nextState}`);
        
        
        const cardElement=document.querySelector(`[data-id="${itemId}"]`);
        columnContainers[nextState].appendChild(cardElement);
        
        
        refreshCardButtons(cardElement,nextState);
        
        renderHistory();
        saveState();
    }
}

function createCard(item){




    const card=document.createElement("div");
       card.className="item-card";
               card.dataset.id=item.id; 
       card.innerHTML=`<p>${item.title}</p><div class="actions"></div>`;
       refreshCardButtons(card, item.state);
    return card;
}


function refreshCardButtons(card,currentState){



    const actionContainer=card.querySelector(".actions");


    actionContainer.innerHTML="";
    
    appState.workflow.transitions[currentState].forEach(target=>{


                  const btn=document.createElement("button");


        btn.className="move-btn";

      
        btn.textContent=`Move to ${target}`;
        btn.onclick=()=>moveItemUI(card.dataset.id, target);
        actionContainer.appendChild(btn);
    });
}

function renderExistingItems(){
     appState.items.forEach(item=>{
        const card=createCard(item);
        columnContainers[item.state].appendChild(card);
    });
}

function renderHistory(){
     const panel=document.querySelector("#history-panel");
    panel.innerHTML=appState.history.map(h =>`<div class="history-item">${h}</div>`).reverse().join('');
}


document.querySelector("#item-form").onsubmit=(e)=>{
      e.preventDefault();
      
      const input=document.querySelector("#item-input");
    
    
      const val=input.value.trim();
    
    
      if(!val){
      return;
    }

    const newItem={ id:"ID-"+Date.now(),title: val,state:"Draft"};
    appState.items.push(newItem);
    
   
    columnContainers["Draft"].appendChild(createCard(newItem));
    
    input.value="";
    saveState();
};

function saveState(){ 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
 }
function loadState(){
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved){
      Object.assign(appState, JSON.parse(saved))
    };
}

init();