let forestImage = "https://get.wallhere.com/photo/forest-waterfall-video-games-rock-nature-artwork-RPG-cave-jungle-Dragon-Age-Bioware-rainforest-Dragon-Age-Inquisition-Formation-ravine-Inquisition-Terrain-1920x1080-px-landform-geographical-feature-water-feature-712853.jpg";
let witchcraftImage = "https://i.pinimg.com/originals/b5/9c/bb/b59cbb9edb48f72eeb913fde06e905e5.jpg";

function getAvatarHtml(url) {
    return `<figure class="avatar avatar-sm">
    <img src="${url}">
</figure>`;
}

let _ActionDetails = [
    {
      title: "Traveling to the totem of knowledge or something...",
      imageUrl: forestImage,
      secondsRemaining: 20,
      onCompleted: () => {
        new TimedAction(Object.assign({}, _ActionDetails[1])).start();
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