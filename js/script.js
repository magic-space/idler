const linkObjects = [
    {
        code: "KeyT",
        url: "https://trello.com/"
    },
    {
        code: "KeyG",
        url: "https://github.com/"
    },
    {
        code: "KeyL",
        url: "https://www.reddit.com/r/linuxmemes/"
    },
    {
        code: "KeyU",
        url: "//https://www.reddit.com/r/unixporn/"
    },
    {
        code: "KeyD",
        url: "https://www.reddit.com/r/desktops/"
    },
    {
        code: "KeyS",
        url: "https://soundcloud.com/"
    }
];

document.onkeypress = (evt) => {
    evt = evt || window.event;
    let responder = linkObjects.find((item) => item.code === evt.code);
    if(typeof responder === "undefined") return;
    document.location = responder.url;
};