// document.addEventListener("DOMContentLoaded", () => {
//   const feedButton = document.getElementById("feed-fish-btn");
//   const pondContainer = document.getElementById("pond-container");

//   // Function to create food particles
//   function createFood() {
//     // Create a new food particle
//     let foodParticle = document.createElement("div");
//     foodParticle.classList.add("food");

//     // Randomize position within the pond
//     foodParticle.style.top = `${Math.random() * 80 + 10}%`; // Ensures it's within the pond area
//     foodParticle.style.left = `${Math.random() * 80 + 10}%`;

//     // Add food to the pond container
//     pondContainer.appendChild(foodParticle);

//     // Animate food particles to move slightly downward (sinking slowly effect)
//     setTimeout(() => {
//       foodParticle.style.transform = "translateY(60px)"; // Moves downward
//       foodParticle.style.opacity = "0"; // Fades out over time
//     }, 50); // Delay before animation starts

//     // Remove food particles after animation to keep the pond clean
//     setTimeout(() => {
//       foodParticle.remove();
//     }, 3000); // Remove after 3 seconds (animation time)
//   }

//   // Event listener for feed button
//   feedButton.addEventListener("click", createFood);
// });

document.addEventListener("DOMContentLoaded", () => {
  const feedButton = document.getElementById("feed-fish-btn");
  const pondContainer = document.getElementById("pond-container");

  // Function to create food particles
  function createFood() {
    // Create a new food particle
    let foodParticle = document.createElement("div");
    foodParticle.classList.add("food");

    // Randomize position within the pond
    foodParticle.style.top = `${Math.random() * 80 + 10}%`; // Ensures it's within the pond area
    foodParticle.style.left = `${Math.random() * 80 + 10}%`;

    // Add food to the pond container
    pondContainer.appendChild(foodParticle);

    // Animate food particles to move slightly downward (sinking slowly effect)
    setTimeout(() => {
      foodParticle.style.transform = "translateY(60px)"; // Moves downward
      foodParticle.style.opacity = "0"; // Fades out over time
    }, 50); // Delay before animation starts

    // Remove food particles after animation to keep the pond clean
    setTimeout(() => {
      foodParticle.remove();
    }, 3000); // Remove after 3 seconds (animation time)

    // Log message that the fish have been fed
    logMessage("Fish have been fed! Ammonia level increased.", "info");

    // Update ammonia level (increase after feeding)
    updateAmmoniaLevel();
  }

  // Event listener for feed button
  feedButton.addEventListener("click", createFood);
});

// Function to update the ammonia level after feeding
function updateAmmoniaLevel() {
  const ammoniaLevelElement = document.getElementById("ammonia-value"); // Assuming you have a display element for ammonia
  const currentAmmonia = parseFloat(ammoniaLevelElement.textContent) || 0;
  const newAmmonia = Math.min(currentAmmonia + 0.5, 10); // Increases ammonia by 0.5, max limit of 10

  // Update the ammonia level display
  ammoniaLevelElement.textContent = newAmmonia.toFixed(1); // Update with 1 decimal place

  // Optionally, log the ammonia level
  logMessage(`Ammonia level increased to ${newAmmonia} mg/L.`, "info");
}

