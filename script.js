const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d"); // context
// console.log(ctx);
const CANVAS_WIDTH = (canvas.width = 600); // same as in style.css
const CANVAS_HEIGHT = (canvas.height = 600); // same as in style.css
// Load frames from sprite sheet
const playerImage = new Image(); // Same as img tag on html
playerImage.src = "shadow_dog.png";

// Set frames sizes
const spriteWidth = 575; // width of image file divided by number of columns (frames)
const spriteHeight = 523; // height of image file divided by number of rows (frames)
let playerState = "idle";

// Set frame speed
let gameFrame = 0;
const staggerFrames = 5;

// Store positions on sprite sheet for each frame
const spriteAnimations = [];

// Get number of frames for each state
const getAnimationStates = await fetch("animation-states.json");
const animationStates = await getAnimationStates.json();

// State dropdown
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (event) => {
  playerState = event.target.value;
});

// Create positions for each frame
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

  // Add options to html
  let option = document.createElement("option");
  option.value = state.name;
  option.text = state.name;
  console.log(option.value);
  dropdown.appendChild(option);
});
// console.log(spriteAnimations);

// Animation loop
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

  // Advance a game frame
  gameFrame++;
  requestAnimationFrame(animate); // Animation loop
}
animate();
