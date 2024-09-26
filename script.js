let fishHealth = {
  healthyFish: 0, // Start with 0 healthy fish
  unhealthyFish: 0, // Start with 0 unhealthy fish
};

// Event listener
document.querySelector("#add-fish").addEventListener("click", addFish);
document.querySelector("#remove-fish").addEventListener("click", removeFish);
document
  .querySelector("#clear-fish-pond")
  .addEventListener("click", clearFishPond);
document
  .querySelector("#pause-start")
  .addEventListener("click", toggleAnimation);

// Global variables for water parameters [abnormal]
// let temperature = 35; // Default temperature
// let pHLevel = 8.2;    // Default pH level
// let oxygenLevel = 10.5;   // Default oxygen level
// let ammoniaLevel = 3;  // Default ammonia level

// Global variables for water parameters [normal]
// let temperature = 25; // Default temperature
// let pHLevel = 8.0; // Default pH level
// let oxygenLevel = 5; // Default oxygen level
// let ammoniaLevel = 0; // Default ammonia level

let temperature, pHLevel, oxygenLevel, ammoniaLevel;


// initialized of water parameters

function updateWaterParameters() {
  // Randomly generate water parameters for demonstration
  const temperature = (Math.random() * (35 - 20) + 20).toFixed(1); // Random temperature between 20°C and 28°C
  const pHLevel = (Math.random() * (8.0 - 6.0) + 6).toFixed(1); // Random pH level between 6.0 and 8.0
  const oxygenLevel = (Math.random() * (10 - 2) + 3).toFixed(1); // Random oxygen level between 5 mg/L and 10 mg/L
  const ammoniaLevel = (Math.random() * (3 - 0) + 0).toFixed(2);

  document.querySelector("#temp-value").textContent = `${temperature}°C`;
  document.querySelector("#ph-value").textContent = `${pHLevel}`;
  document.querySelector("#oxygen-value").textContent = `${oxygenLevel} mg/L`;
  document.querySelector("#ammonia-value").textContent = `${ammoniaLevel} ppm`;

   // Return an object of functions (closures) for accessing each parameter
   return {
    getTemperature: function() {
      return temperature;
    },
    getPHLevel: function() {
      return pHLevel;
    },
    getOxygenLevel: function() {
      return oxygenLevel;
    },
    getAmmoniaLevel: function() {
      return ammoniaLevel;
    }
  };

}

// Call the update function initially
updateWaterParameters();

setInterval(updateWaterParameters, 10000); // Update every 10 seconds

const waterThresholds = {
  temp: { normalMin: 20, normalMax: 28, high: 28, critical: 35 },
  ph: { normalMin: 6.5, normalMax: 7.5, high: 8.0, low: 6.0 },
  oxygen: { normalMin: 5, low: 2, high: 10 }, // Dissolved oxygen too low can kill fish
  ammonia: { safe: 0, warning: 0.1, dangerous: 0.025 },
};


// Function to check water conditions and apply effects on fish
function checkWaterParameters() {
  const fishElements = document.querySelectorAll(".fish");
  const waterParameters = updateWaterParameters();


  // Check temperature
  if (temperature > waterThresholds.temp.critical) {
    // Fish die due to high temperature
    fishElements.forEach((fish) => {
      fish.style.opacity = 0; // Fish disappear
      // Remove fish from the DOM
      fish.remove();
      // Decrease the healthy fish count
      fishHealth.healthyFish--;
      console.log('The temperature is too high!', waterParameters.getTemperature(), '°C');
    });
    console.log("Temperature is the critical level! Fish are dying!");
  } else if (temperature > waterThresholds.temp.high) {
    // Fish become unhealthy due to high temperature
    fishElements.forEach((fish) => (fish.style.filter = "grayscale(80%)"));
    console.log("The temperature is high! Fish are dying!");
  } else {
    // Fish are healthy
    fishElements.forEach((fish) => (fish.style.filter = "none"));
    console.log(`The temperature is normal:`,  waterParameters.getTemperature(), '°C, for the last 10 seconds');
  }

  // Check pH level
  if (pHLevel > waterThresholds.ph.high || pHLevel < waterThresholds.ph.low) {
    fishElements.forEach((fish) => {
      fish.style.opacity = 0; // Fish disappear
      // Remove fish from the DOM
      fish.remove();
      // Decrease the healthy fish count
      fishHealth.healthyFish--;
      console.log("A fish has died due to high or low of pHLevel!"); // Log message
    });
   
  } else {
    // Fish are healthy
    fishElements.forEach((fish) => (fish.style.filter = "none"));
    console.log(`The pH Level is normal:`, waterParameters.getPHLevel(), ', for the last 10 seconds');
  }

  // Check oxygen level
  if (oxygenLevel < waterThresholds.oxygen.low) {
    // Fish die due to high temperature
    fishElements.forEach((fish) => {
      fish.style.opacity = 0; // Fish disappear
      // Remove fish from the DOM
      fish.remove();
      // Decrease the healthy fish count
      fishHealth.healthyFish--;
      console.log("Fish has die to breathe due to low oxygen levels!"); // Log message
    });
    console.log("Oxygen levels are too low! Fish are struggling to breathe!");
  } else if (oxygenLevel > waterThresholds.oxygen.high) {
    fishElements.forEach((fish) => {
      fish.style.opacity = 0; // Fish disappear
      // Remove fish from the DOM
      fish.remove();
      // Decrease the healthy fish count
      fishHealth.healthyFish--;
      console.log("Fish has die to breathe due to high oxygen levels!"); // Log message
    });
    console.log('The fish is dying because of high oxygen level');
  } else {
    // Fish are healthy
    fishElements.forEach((fish) => (fish.style.filter = "none"));
    console.log(`The Dissolve Oxygen Level is normal:`, waterParameters.getOxygenLevel(), 'mg/L, for the last 10 seconds');
  }

 

  // Update the fish counter display
  updateFishCounter();
}

// Call this function periodically to simulate the environment
setInterval(checkWaterParameters, 10000); // Every 10 seconds check the water

// Function to add a new fish
function addFish() {
  // Create a new fish element
  let newFish = document.createElement("div");
  newFish.classList.add("fish");
  newFish.dataset.health = "healthy"; // Set the fish as healthy initially

  // Randomly position the fish in the pond
  newFish.style.top = Math.random() * 80 + "%"; // Random vertical position
  newFish.style.left = Math.random() * 90 + "%"; // Random horizontal position

  // Add the new fish to the pond
  document.querySelector(".pond").appendChild(newFish);

  // Update fish health count
  fishHealth.healthyFish += 1;

  updateFishCounter();

  console.log("Fish added! Current fish count:", fishHealth.healthyFish);
  // console.log("Current fish count:", fishHealth.unhealthyFish);
}

// fish counter
function updateFishCounter() {
  document.querySelector("#healthy-fish-count").textContent =
    fishHealth.healthyFish;
  document.querySelector("#unhealthy-fish-count").textContent =
    fishHealth.unhealthyFish;
}

function fishStatus() {
  if (fishHealth.healthyFish > 0) {
    fishHealth.healthyFish -= 1;
    fishHealth.unhealthyFish += 1;
    updateFishCounter();
    console.log("A fish became unhealthy! Current count:", fishHealth);
  }
}

// Initial call to display the fish counter when the page loads
updateFishCounter();

//remove Fish
function removeFish() {
  const pond = document.querySelector(".pond");

  const fishArray = pond.getElementsByClassName("fish");

  if (fishArray.length > 0) {
    //get the last fish
    const fishToRemove = fishArray[fishArray.length - 1];

    // check the health status of the fish to update counts
    if (fishToRemove.dataset.health === "healthy") {
      fishHealth.healthyFish -= 1; //remove the healthy fish 1 by 1
    } else {
      fishHealth.unhealthyFish -= 1; //remove the unhealthy fish 1 by 1
    }

    //remove the fish from the pond
    pond.removeChild(fishToRemove);

    //update the fish counter
    updateFishCounter();

    console.log("Fish removed! Current fish count:", fishHealth);
  } else {
    console.log("No fish to remove.");
  }
}

function clearFishPond() {
  const pond = document.querySelector(".pond");

  while (pond.firstChild) {
    pond.removeChild(pond.firstChild);
  }

  //reset fish health counts
  fishHealth.healthyFish = 0;
  fishHealth.unhealthyFish = 0;

  // update the fish counter
  updateFishCounter();

  console.log(
    "The fish pond has been cleared. Current fish count:",
    fishHealth
  );
}

// pause and resume animation
let isAnimationPaused = false;

function toggleAnimation() {
  const allFish = document.querySelectorAll(".fish");

  if (isAnimationPaused) {
    allFish.forEach((fish) => {
      fish.style.animationPlayState = "running";
    });
    document.querySelector("#pause-start").textContent = "Pause Animation";
  } else {
    allFish.forEach((fish) => {
      fish.style.animationPlayState = "paused";
    });
    document.querySelector("#pause-start").textContent = "Resume Animation";
  }

  // Toggle the state pause/start
  isAnimationPaused = !isAnimationPaused;
}
