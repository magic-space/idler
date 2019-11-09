let forestImage = "https://get.wallhere.com/photo/forest-waterfall-video-games-rock-nature-artwork-RPG-cave-jungle-Dragon-Age-Bioware-rainforest-Dragon-Age-Inquisition-Formation-ravine-Inquisition-Terrain-1920x1080-px-landform-geographical-feature-water-feature-712853.jpg";
let witchcraftImage = "https://i.pinimg.com/originals/b5/9c/bb/b59cbb9edb48f72eeb913fde06e905e5.jpg";

function getAvatarHtml(url) {
  return `<figure class="avatar avatar-sm">
    <img src="${url}">
</figure>`;
}

let _SelectionDetails = [
  {
    title: "Pick your poison",
    body: `
<h3>What would you like to practice today?</h3>
<p>Select a skill to improve.</p>
    `,
    choices: [
      {
        buttonTitle: "Fire Magic (setting shit on fire)",
        class: "btn-primary",
        onSelected: () => {
          new TimedAction(Object.assign({}, _ActionDetails[1])).start();
        }
      },
      {
        buttonTitle: "Dark Magic (AKA Edgy magic)",
        onSelected: () => {
          alert("That is a forbidden craft!");
        }
      }
    ]
  }
];

let _ActionDetails = [
  {
    title: "Traveling to the totem of knowledge or something...",
    imageUrl: forestImage,
    secondsRemaining: 7,
    onCompleted: () => {
      new UserSelection(Object.assign({}, _SelectionDetails[0])).start();
    },
    onCancelled: noop
  },
  {
    title: "Practicing Witchcraft",
    imageUrl: witchcraftImage,
    secondsRemaining: 30,
    onCompleted: () => {
      alert("You successfuly practiced witchcraft.");
    },
    onCancelled: noop
  }
];

DataPacks.actions.push({
  buttonTitle: getAvatarHtml(witchcraftImage) + ' Practice Witchcraft',
  details: _ActionDetails[0]
});