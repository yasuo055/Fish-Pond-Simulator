let fishHealth = {
  healthyFish: 0, // Start with 0 healthy fish
  unhealthyFish: 0, // Start with 0 unhealthy fish
};

// Event listener
document.querySelector("#add-fish").addEventListener("click", addFish);
document.querySelector("#remove-fish").addEventListener("click", removeFish);
// document
//   .querySelector("#clear-fish-pond")
//   .addEventListener("click", clearFishPond);
// document
//   .querySelector("#pause-start")
//   .addEventListener("click", toggleAnimation);
// Event listener for adding fish with user-defined amount
document.querySelector("#add-fish").addEventListener("click", function() {
  const fishCount = parseInt(document.querySelector("#fish-count-input").value);

  // Validation: Check if the input is empty, not a number, or less than 1
  if (isNaN(fishCount) || fishCount <= 0) {
    console.log("Please enter a valid number greater than 0.");
    alert("Please enter a valid number greater than 0 or input a number.");
    return; 
  }

  addFish(fishCount);
});

//for water parameters
let userOverrides = {
  temperature: null,
  pHLevel: null,
  oxygenLevel: null,
  ammoniaLevel: null
};

// Get DOM elements for sliders
const tempSlider = document.querySelector("#temp-slider");
const phSlider = document.querySelector("#ph-slider");
const oxygenSlider = document.querySelector("#oxygen-slider");
const ammoniaSlider = document.querySelector("#ammonia-slider");

//init for water param
let temperature, pHLevel, oxygenLevel, ammoniaLevel;
const maxFishCount = 30;

// Event listeners to capture user input and override water parameters
tempSlider.addEventListener("input", (e) => {
  const temperature = e.target.value;
  userOverrides.temperature = temperature; // Update user override
  updateTemperatureDisplay(temperature);
  updateWaterParameters(); // Update water parameters immediately
});

phSlider.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  userOverrides.pHLevel = value;
  updatePHDisplay(value);
  updateWaterParameters(); // Update water parameters immediately
});

oxygenSlider.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  userOverrides.oxygenLevel = value;
  updateOxygenDisplay(value);
  updateWaterParameters(); // Update water parameters immediately
});

ammoniaSlider.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  userOverrides.ammoniaLevel = value;
  updateAmmoniaDisplay(value);
  updateWaterParameters(); // Update water parameters immediately
});

// Function to update temperature display
function updateTemperatureDisplay(value) {
  document.getElementById("temp-display").textContent = `${value}°C`;
  document.getElementById("temp-value").textContent = `${value}°C`;
}

// Functions to update both text elements for each parameter
function updatePHDisplay(value) {
  document.querySelector("#ph-display").textContent = `${value}`;
  document.querySelector("#ph-value").textContent = `${value}`;
}

function updateOxygenDisplay(value) {
  document.querySelector("#oxygen-display").textContent = `${value} mg/L`;
  document.querySelector("#oxygen-value").textContent = `${value} mg/L`;
}

function updateAmmoniaDisplay(value) {
  document.querySelector("#ammonia-display").textContent = `${value} ppm`;
  document.querySelector("#ammonia-value").textContent = `${value} ppm`;
}

// Function to update water parameters with user overrides or random values and initialized of water parameters
function updateWaterParameters() {
  const temperature = userOverrides.temperature !== null ? userOverrides.temperature : (Math.random() * (35 - 20) + 20).toFixed(1);
  const pHLevel = userOverrides.pHLevel !== null ? userOverrides.pHLevel : (Math.random() * (8.0 - 6.0) + 6).toFixed(1);
  const oxygenLevel = userOverrides.oxygenLevel !== null ? userOverrides.oxygenLevel : (Math.random() * (10 - 2) + 3).toFixed(1);
  const ammoniaLevel = userOverrides.ammoniaLevel !== null ? userOverrides.ammoniaLevel : (Math.random() * (0.30 - 0.0) + 0).toFixed(2);

  // Update displayed values
  updateTemperatureDisplay(temperature);
  updatePHDisplay(pHLevel);
  updateOxygenDisplay(oxygenLevel);
  updateAmmoniaDisplay(ammoniaLevel);

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




// function updateWaterParameters() {
//   // Randomly generate water parameters for demonstration
//   const temperature = (Math.random() * (35 - 20) + 20).toFixed(1); // Random temperature between 20°C and 28°C
//   const pHLevel = (Math.random() * (8.0 - 6.0) + 6).toFixed(1); // Random pH level between 6.0 and 8.0
//   const oxygenLevel = (Math.random() * (10 - 2) + 3).toFixed(1); // Random oxygen level between 5 mg/L and 10 mg/L
//   const ammoniaLevel = (Math.random() * (0.30 - 0.0) + 0).toFixed(2);

//   document.querySelector("#temp-value").textContent = `${temperature}°C`;
//   document.querySelector("#ph-value").textContent = `${pHLevel}`;
//   document.querySelector("#oxygen-value").textContent = `${oxygenLevel} mg/L`;
//   document.querySelector("#ammonia-value").textContent = `${ammoniaLevel} ppm`;

//   // for slider
//   document.getElementById("temp-display").textContent = `${value}°C`;

//    // Return an object of functions (closures) for accessing each parameter
//    return {
//     getTemperature: function() {
//       return temperature;
//     },
//     getPHLevel: function() {
//       return pHLevel;
//     },
//     getOxygenLevel: function() {
//       return oxygenLevel;
//     },
//     getAmmoniaLevel: function() {
//       return ammoniaLevel;
//     }
//   };

// }

// Call the update function initially
updateWaterParameters();
setInterval(updateWaterParameters, 10000); // Update every 10 seconds

const waterThresholds = {
  temp: { high: 28, critical: 35 }, // delete normalMax
  ph: { high: 8.0, low: 6.0 },  //delete normalMax and normalMin
  oxygen: { high: 10, low: 2 }, // Dissolved oxygen too low can kill fish [delete normalMin]
  ammonia: { normal: 0, low: 0.1, high: 0.25 },
};


// Centralized fish effect handler
const fishEffects = {
  remove: (fishElements) => {
    fishElements.forEach(fish => {
      fish.style.opacity = 0;
      fish.remove();
      fishHealth.healthyFish--;
    });
  },
  unhealthy: (fishElements, filter = "grayscale(80%)") => {
    fishElements.forEach(fish => fish.style.filter = filter);
  },
  healthy: (fishElements) => {
    fishElements.forEach(fish => fish.style.filter = "none");
  }
};

// Centralized logger for water conditions
function logWaterCondition(param, level, unit = '') {
  console.log(`${param} level is ${level} ${unit}`);
}

// Helper function to determine the condition for each parameter
function getCondition(value, thresholds) {
  if (value >= thresholds.critical) return 'critical';
  if (value >= thresholds.high) return 'high';
  if (value <= thresholds.low) return 'low';
  return 'normal';
}

// For ammonia specifically:
function getAmmoniaCondition(value, thresholds) {
  if (value >= thresholds.high) return 'high';  // Dangerous
  if (value >= thresholds.low) return 'low';    // Warning zone
  if (value === thresholds.normal) return 'normal'; // Normal
}

// Function to check water conditions and apply effects on fish
function checkWaterParameters() {
  const fishElements = document.querySelectorAll(".fish");
  const waterParameters = updateWaterParameters();

  const temperature = waterParameters.getTemperature();
  const pHLevel = waterParameters.getPHLevel();
  const oxygenLevel = waterParameters.getOxygenLevel();
  const ammoniaLevel = waterParameters.getAmmoniaLevel();

  // Check temperature condition
  switch (getCondition(temperature, waterThresholds.temp)) {
    case 'critical':
      fishEffects.remove(fishElements);
      logWaterCondition('Temperature', 'too high', `${temperature}°C`);
      console.log("Fish are dying because the temperature is at a critical level!");
      break;
    case 'high':
      fishEffects.unhealthy(fishElements);
      logWaterCondition('Temperature', 'high', `${temperature}°C`);
      break;
    case 'normal':
      fishEffects.healthy(fishElements);
      logWaterCondition('Temperature', 'normal', `${temperature}°C`);
      break;
  }

  // Check pH condition
  const pHCondition = getCondition(pHLevel, waterThresholds.ph);
  if (pHCondition === 'low' || pHCondition === 'high') {
    fishEffects.remove(fishElements);
    logWaterCondition('pH Level', 'abnormal', '');
    console.log("Fish are dying due to an abnormal pH Level!");
  } else {
    fishEffects.healthy(fishElements);
    logWaterCondition('pH Level', 'normal', pHLevel);
  }

  // Check oxygen condition
  const oxygenCondition = getCondition(oxygenLevel, waterThresholds.oxygen);
  if (oxygenCondition === 'low' || oxygenCondition === 'high') {
    fishEffects.remove(fishElements);
    logWaterCondition('Oxygen Level', 'abnormal', `${oxygenLevel} mg/L`);
    console.log("Fish are dying due to abnormal oxygen levels!");
  } else {
    fishEffects.healthy(fishElements);
    logWaterCondition('Oxygen Level', 'normal', `${oxygenLevel} mg/L`);
  }

  // Check ammonia condition
  switch (getAmmoniaCondition(ammoniaLevel, waterThresholds.ammonia)) {
    case 'high':
      fishEffects.remove(fishElements);
      logWaterCondition('Ammonia Level', 'dangerously high', `${ammoniaLevel} mg/L`);
      console.log("Fish are dying due to dangerously high ammonia levels!");
      break;
    case 'low':
      logWaterCondition('Ammonia Level', 'in the warning zone', `${ammoniaLevel} mg/L`);
      break;
    case 'normal':
      fishEffects.healthy(fishElements);
      logWaterCondition('Ammonia Level', 'normal', `${ammoniaLevel} mg/L`);
      break;
  } 

  // Update the fish counter display
  updateFishCounter();
  
}


// Call this function periodically to simulate the environment
setInterval(checkWaterParameters, 10000); // Every 10 seconds check the water

// // Updated addFish function to accept a quantity parameter
// function addFish(fishCount) {
//   for (let i = 0; i < fishCount; i++) {
//     // Create a new fish element
//     let newFish = document.createElement("div");
//     newFish.classList.add("fish");
//     newFish.dataset.health = "healthy"; // Set the fish as healthy initially

//     // Randomly position the fish in the pond
//     newFish.style.top = Math.random() * 80 + "%"; // Random vertical position
//     newFish.style.left = Math.random() * 90 + "%"; // Random horizontal position

//     // Add the new fish to the pond
//     document.querySelector(".pond").appendChild(newFish);

//     // Update fish health count
//     fishHealth.healthyFish += 1;
//   }

//   updateFishCounter();

//   console.log(`${fishCount} fish added! Current fish count:`, fishHealth.healthyFish);
// }

// Updated addFish function to include a fish limit
function addFish(fishCount) {
  // Check if adding the new fish will exceed the limit
  const currentFishCount = fishHealth.healthyFish + fishHealth.unhealthyFish;
  
  if (currentFishCount + fishCount > maxFishCount) {
    const fishToAdd = maxFishCount - currentFishCount;
    if (fishToAdd > 0) {
      // Only add fish up to the limit
      for (let i = 0; i < fishToAdd; i++) {
        createFish();
      }
      alert(`${fishToAdd} fish added! Maximum of ${maxFishCount} fish reached.`);
    } else {
      alert(`Cannot add more fish. Maximum limit of ${maxFishCount} fish reached.`);
    }
  } else {
    // Add fish normally if the limit isn't exceeded
    for (let i = 0; i < fishCount; i++) {
      createFish();
    }
    alert(`${fishCount} fish added! Current fish count: ${fishHealth.healthyFish}`);
  }
  updateFishCounter();
}

// Function to create a new fish element
function createFish() {
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
}


// fish counter
function updateFishCounter() {
  document.querySelector("#healthy-fish-count").textContent =
    fishHealth.healthyFish;
  document.querySelector("#unhealthy-fish-count").textContent =
    fishHealth.unhealthyFish;
    document.querySelector("#fish-max-count").textContent =
    maxFishCount;
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

// function clearFishPond() {
//   const pond = document.querySelector(".pond");

//   while (pond.firstChild) {
//     pond.removeChild(pond.firstChild);
//   }

//   //reset fish health counts
//   fishHealth.healthyFish = 0;
//   fishHealth.unhealthyFish = 0;

//   // update the fish counter
//   updateFishCounter();

//   console.log(
//     "The fish pond has been cleared. Current fish count:",
//     fishHealth
//   );
// }

// // pause and resume animation
// let isAnimationPaused = false;

// function toggleAnimation() {
//   const allFish = document.querySelectorAll(".fish");

//   if (isAnimationPaused) {
//     allFish.forEach((fish) => {
//       fish.style.animationPlayState = "running";
//     });
//     document.querySelector("#pause-start").textContent = "Pause Animation";
//   } else {
//     allFish.forEach((fish) => {
//       fish.style.animationPlayState = "paused";
//     });
//     document.querySelector("#pause-start").textContent = "Resume Animation";
//   }

//   // Toggle the state pause/start
//   isAnimationPaused = !isAnimationPaused;
// }
