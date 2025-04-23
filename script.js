// Declare necessary variables
let card = document.querySelector(".card");
let colorName = ["red", "yellow", "blue", "green", "skyblue", "orange", "pink"];
let boxcontainer = document.querySelector(".box-container");
let topColor = ""; // Global variable for top color
let refresbtn = document.querySelector(".refreshBtn");


function refrsh() {
  score.innerText = 0;
  
}

// This function count a game score!
let score = document.querySelector(".count");

function scoreCount() {
  let currentScore = parseInt(score.innerText); // ab number mil gaya
  
  currentScore++; // 1 se badha diya
  score.innerText = currentScore; // updated value HTML mein daali
  return currentScore; // optional
}

// Random color generator
function randomColor() {
  return colorName[Math.floor(Math.random() * colorName.length)];
}

// Generate game function
function generateGame() {
  // Clear previous cards
  boxcontainer.innerHTML = "";

  // Set random color for the top card
  topColor = randomColor();
  card.style.backgroundColor = topColor;

  // Create a shallow copy of colorName to avoid duplicates
  let tempColors = [...colorName];

  // Remove topColor from tempColors so we don’t add it twice
  let index = tempColors.indexOf(topColor);
  if (index !== -1) tempColors.splice(index, 1);

  // Pick 4 more random colors
  let gameColors = [topColor];
  for (let i = 0; i < 4; i++) {
    let color = tempColors[Math.floor(Math.random() * tempColors.length)];
    gameColors.push(color);

    // Remove chosen color to avoid duplicates
    tempColors.splice(tempColors.indexOf(color), 1);
  }

  // Shuffle the final colors to randomize the order
  gameColors.sort(() => Math.random() - 0.5);

  // Create bottom color boxes with the shuffled colors
  gameColors.forEach((clr) => {
    let bottomColor = document.createElement("div");
    bottomColor.className = "cards";
    bottomColor.style.backgroundColor = clr;
    boxcontainer.appendChild(bottomColor);

    // Add event listener to each bottom color box
    bottomColor.addEventListener("click", function (e) {
      let clickedColor = e.target.style.backgroundColor;

      if (clickedColor === topColor) {
        alert("🎉 You win!");
        generateGame(); // Restart game after win
        scoreCount()
        
      } else {
        alert("❌ Har gaye!");
        generateGame();
        score.innerText = 0
      }
    });
  });
}

// Add refresh button functionality at the bottom
document.getElementById("refreshBtn").addEventListener("click", generateGame);
// Start the game on initial load
generateGame();


