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

function LoadCustomDatapackCode() {
  if(document.getElementById("CustomDataPackFromFile")) {
    var file = document.getElementById("CustomDataPackFile").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            eval(evt.target.result);
            ReloadAvailableActions();
            HideFormIfRequested();
        };
    }
    return;
  }

  eval(document.getElementById("CustomDataPackCode").value);
  ReloadAvailableActions();
  HideFormIfRequested();
}

function HideFormIfRequested() {
  if(document.getElementById("CustomDataPackHideForm").checked) {
    document.getElementById("CustomDataPackForm").innerHTML = '';
  }
}

ReloadAvailableActions();
