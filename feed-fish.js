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

  // Event listener for feed button
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

// document.addEventListener("DOMContentLoaded", () => {
//   const feedButton = document.getElementById("feed-fish-btn");
//   const pondContainer = document.getElementById("pond-container");

//   // Initial ammonia level and waste-related variables
//   let ammoniaLevel = 0;
//   let fishWasteAccumulation = 0;
//   let beneficialBacteriaActivity = 0.0005; // Activity rate for ammonia reduction by bacteria

//   // Function to create food particles
//   function createFood() {
//     // Create a new food particle
//     let foodParticle = document.createElement("div");
//     foodParticle.classList.add("food");

//     // Randomize position within the pond
//     foodParticle.style.top = `${Math.random() * 80 + 10}%`;
//     foodParticle.style.left = `${Math.random() * 80 + 10}%`;

//     // Add food to the pond container
//     pondContainer.appendChild(foodParticle);

//     // Animate food particle to sink slowly
//     setTimeout(() => {
//       foodParticle.style.transform = "translateY(60px)";
//       foodParticle.style.opacity = "0";
//     }, 50);

//     // Remove food particle after 3 seconds
//     setTimeout(() => {
//       foodParticle.remove();
//     }, 3000);

//     // Log message and increase ammonia level based on feeding
//     logMessage("Fish have been fed! Ammonia level increased.", "info");
//     increaseAmmoniaLevel(0.001); // Base increase from feeding

//     // Increase fish waste and bacteria processing
//     fishWasteAccumulation += 0.001; // Accumulated waste
//     updateAmmoniaLevel();
//     animateWasteParticles();
//   }

//   // Function to update ammonia level considering waste accumulation and bacteria
//   function updateAmmoniaLevel() {
//     // Calculate additional ammonia increase based on waste accumulation
//     let totalAmmoniaIncrease = 0.001 + fishWasteAccumulation;
//     ammoniaLevel += totalAmmoniaIncrease;

//     // Reduce ammonia slightly based on bacteria activity
//     ammoniaLevel -= beneficialBacteriaActivity * ammoniaLevel;
//     logMessage(`Current ammonia level: ${ammoniaLevel.toFixed(4)}`, "info");

//     // Check if ammonia level exceeds threshold (example threshold 0.02 for warnings)
//     if (ammoniaLevel >= 0.02) {
//       logMessage("Warning: Ammonia level is high due to waste accumulation!", "warning");
//     }
//   }

//   // Function to animate waste particles gathering at the pond bottom
//   function animateWasteParticles() {
//     let wasteParticle = document.createElement("div");
//     wasteParticle.classList.add("waste");

//     // Randomize starting position in the pond
//     wasteParticle.style.top = `${Math.random() * 60 + 10}%`;
//     wasteParticle.style.left = `${Math.random() * 80 + 10}%`;

//     // Add waste to the pond
//     pondContainer.appendChild(wasteParticle);

//     // Animate waste particles gathering at the bottom
//     setTimeout(() => {
//       wasteParticle.style.transform = "translateY(250px) scale(0.8)";
//       wasteParticle.style.opacity = "1";
//     }, 100);

//     // Remove waste particles after they reach the bottom to keep pond clean
//     setTimeout(() => {
//       wasteParticle.remove();
//     }, 5000); // Adjust time as needed
//   }

//   // Function to increase ammonia level
//   function increaseAmmoniaLevel(baseIncrease) {
//     ammoniaLevel += baseIncrease;
//     updateFishHealth(); // Apply effects based on new ammonia level
//   }

//   // Event listener for feed button
//   feedButton.addEventListener("click", createFood);
// });

