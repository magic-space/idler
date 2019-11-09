function ReloadAvailableActions() {
  let actionList = document.getElementById("ActionList");
  actionList.innerHTML = "";

  for(let action of DataPacks.actions) {
    if(action.requiredFlag && !Account.getFlag(action.requiredFlag))
      continue;

    if(action.blockingFlag && Account.getFlag(action.blockingFlag))
      continue;

    let btn = document.createElement("BUTTON");
    btn.classList.add("btn");
    btn.innerHTML = action.buttonTitle;
    btn.onclick = () => {
      new TimedAction(Object.assign({}, action.details)).start();
    };
    actionList.appendChild(btn);
  }
}

ReloadAvailableActions();
