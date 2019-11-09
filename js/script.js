class UserAccount {
  constructor() {
    this.flags = {};
  }

  getFlag(name) {
    // Double negation to ensure undefined
    // is returned as false.
    return !!this.flags[name];
  }

  setFlag(name, value) {
    value = value || true;
    this.flags[name] = value;
    ReloadAvailableActions();
  }
}

class ActionModal {
  constructor() {
    this.modal = document.getElementById("ActionModal");
    this.secondsRemaining = document.getElementById("ActionSecondsRemaining");
    this.cancelButton = document.getElementById("ActionCancelButton");
    this.progress = document.getElementById("ActionProgress");
    this.title = document.getElementById("ActionTitle");
    this.image = document.getElementById("ActionImage");
  }

  open(cancelCallback) {
    this.cancelButton.onclick = cancelCallback;
    this.modal.classList.add("active");
  }

  close() {
    this.modal.classList.remove("active");
  }

  setSecondsRemaining(amount) {
    this.secondsRemaining.innerHTML = amount;
  }

  setProgress(secsLeft, secsTotal) {
    this.progress.setAttribute("value", secsTotal - secsLeft);
    this.progress.setAttribute("max", secsTotal);
  }

  setTitle(title) {
    this.title.innerHTML = title;
  }

  setImageUrl(url) {
    this.image.setAttribute("src", url);
  }
}

class SelectionModal {
  constructor() {
    this.modal = document.getElementById("SelectionModal");
    this.title = document.getElementById("SelectionModalTitle");
    this.body = document.getElementById("SelectionModalBody");
    this.choiceGroup = document.getElementById("SelectionModalChoices");
  }

  open() {
    this.modal.classList.add("active");
  }

  close() {
    this.modal.classList.remove("active");
  }
  
  setTitle(title) {
    this.title.innerHTML = title;
  }

  setBody(html) {
    this.body.innerHTML = html;
  }

  setChoices(choices) {
    this.choiceGroup.innerHTML = '';

    for(let choice of choices) {
      let btn = document.createElement("BUTTON");
      btn.classList.add("d-block", "btn");
      btn.innerHTML = choice.buttonTitle;

      let self = this;

      btn.onclick = () => {
        self.close();
        choice.onSelected();
      }

      if(choice.class) {
        btn.classList.add(choice.class);
      }

      this.choiceGroup.appendChild(btn);
    }
  }
}

class UserInterface {
  constructor() {
    this.action = new ActionModal();
    this.selection = new SelectionModal();
  }
}

class TimedAction {
  constructor(details) {
    this.details = details;
    this.maxSeconds = details.secondsRemaining;
    UI.action.setTitle(details.title);
    UI.action.setImageUrl(details.imageUrl);
  }

  start() {
    UI.action.setSecondsRemaining(this.details.secondsRemaining);
    UI.action.setProgress(this.details.secondsRemaining, this.maxSeconds);
    
    let self = this;
    UI.action.open(() => {
      self.stop();
      self.details.onCancelled();
    });

    this.interval = setInterval(this.onSecondElapsed, 1000, this);
  }

  stop() {
    UI.action.close();
    document.title = "Clicker";
    clearInterval(this.interval);
  }

  onSecondElapsed(action) {
    let seconds = --action.details.secondsRemaining;

    UI.action.setSecondsRemaining(seconds);
    UI.action.setProgress(seconds, action.maxSeconds);
    document.title = action.details.title + " (" + seconds + ")";

    if(seconds <= 0) {
      action.stop();
      action.details.onCompleted(action.details);
    }
  }
}

class UserSelection {
  constructor(details) {
    this.details = details;
  }

  start() {
    UI.selection.setTitle(this.details.title);
    UI.selection.setBody(this.details.body);
    UI.selection.setChoices(this.details.choices);
    UI.selection.open();
  }

  stop() {
    UI.selection.close();
  }
}

const UI = new UserInterface();
const Account = new UserAccount();

function noop() { }

let DataPacks = {
  actions: []
};
