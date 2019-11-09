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

class UserInterface {
  constructor() {
    this.action = new ActionModal();
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

const UI = new UserInterface();
const Account = new UserAccount();

function noop() { }

let DataPacks = {
  actions: []
};
