const GIFS = [
    {
      url: "https://media.tenor.com/f_saBHiUTz0AAAAM/cute-cat.gif",
      text: "Have a cute cat 🐱<3 to cheer you up!"
    },
    {
        url: "https://gifsec.com/wp-content/uploads/2022/11/cat-gif-37.gif",
        text: "Look at this cute cat 🐱 he is so funny!"
    },
    {
        url: "https://media.giphy.com/media/RQSuZfuylVNAY/giphy.gif",
        text: "This dog is so happy and cute 🐶, look at him!"
    },
    {
        url: "https://i.imgur.com/MqgKDJo.png",
        text: "This meme is so reletable, don't you think? 🤔"
    }
]

export function grabRandomGif() {
    return GIFS[Math.floor(Math.random() * GIFS.length)];
}
