const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // context
// console.log(ctx);
const CANVAS_WIDTH = (canvas.width = 600); // same as in style.css
const CANVAS_HEIGHT = (canvas.height = 600); // same as in style.css

const playerImage = new Image(); // Same as img tag on html
playerImage.src = "shadow_dog.png";

const spriteWidth = 575; // width of image file divided by number of columns (frames)
const spriteHeight = 523; // height of image file divided by number of rows (frames)
const playerState = "run";

let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];

const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
animationStates.forEach((state, index) => {
  let frames = {
    location: [],
  };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.location.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});
// console.log(spriteAnimations);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // ctx.fillRect(50, 50, 100, 100);
  // wait staggerFrames number of animation loops to do something, used to slow
  // animation
  let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].location.length;
  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].location[position].y;

  ctx.drawImage(
    playerImage, // image
    frameX, // source x
    frameY, // source y
    spriteWidth, // source width
    spriteHeight, //source height
    // Where from the canvas the image will be drawed
    0, // destination x
    0, // destination y
    spriteWidth, // destination width
    spriteHeight // destination height
  );

  gameFrame++;
  requestAnimationFrame(animate); // Animation loop
}
animate();
