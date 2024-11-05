let fishHealth = {
  healthyFish: 0, // Start with 0 healthy fish
  unhealthyFish: 0, // Start with 0 unhealthy fish
  deadFishCount: 0, // Start with 0 dead fish
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
    logMessage("Please enter a valid number greater than 0.", 'info');
    logMessage("Please enter a valid number greater than 0 or input a number.", 'info');
    return; 
  }

  addFish(fishCount);
});

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
});

phSlider.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  userOverrides.pHLevel = value;
  updatePHDisplay(value);
});

oxygenSlider.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  userOverrides.oxygenLevel = value;
  updateOxygenDisplay(value);
});

ammoniaSlider.addEventListener("input", (event) => {
  const value = parseFloat(event.target.value);
  userOverrides.ammoniaLevel = value;
  updateAmmoniaDisplay(value);
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
  const oxygenLevel = userOverrides.oxygenLevel !== null ? userOverrides.oxygenLevel : (Math.random() * (10 - 2) + 2).toFixed(1);
  const ammoniaLevel = userOverrides.ammoniaLevel !== null ? userOverrides.ammoniaLevel : (Math.random() * (0.30 - 0.0) + 0).toFixed(2);

  // Update displayed values
  updateTemperatureDisplay(temperature);
  updatePHDisplay(pHLevel);
  updateOxygenDisplay(oxygenLevel);
  updateAmmoniaDisplay(ammoniaLevel);

  // Update slider values to match the display
  updateSliderFromDisplay();

  document.querySelector("#temp-value").textContent = `${temperature}°C`;
  document.querySelector("#ph-value").textContent = `${pHLevel}`;
  document.querySelector("#oxygen-value").textContent = `${oxygenLevel} mg/L`;
  document.querySelector("#ammonia-value").textContent = `${ammoniaLevel} ppm`;

  // Here you can also set the slider values based on these values
  updateSliderFromDisplay();

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
// setInterval(updateWaterParameters, 10000); // Update every 10 seconds

function updateSliderFromDisplay() {
  // Get the value from the temp display (assuming it contains "25°C" or similar)
  const tempDisplayValue = document.getElementById('temp-display').textContent;
  const phDisplayValue = document.getElementById('ph-display').textContent;
  const oxygenDisplayValue = document.getElementById('oxygen-display').textContent;
  const ammoniaDisplayValue = document.getElementById('ammonia-display').textContent;


  // Extract only the numeric part of the display (removing '°C')
  const tempValue = parseFloat(tempDisplayValue.replace('°C', ''));
  const phValue = parseFloat(phDisplayValue.replace('mg/L', ''));
  const oxygenValue = parseInt(oxygenDisplayValue);
  const ammoniaValue = parseFloat(ammoniaDisplayValue.replace('ppm', ''));

  // Update the temp-slider's value
  const tempSlider = document.querySelector('#temp-slider');
  tempSlider.value = tempValue;

  const phSlider = document.querySelector('#ph-slider')
  phSlider.value = phValue;

  const oxygenSlider = document.querySelector('#oxygen-slider')
  oxygenSlider.value = oxygenValue;

  const ammoniaSlider = document.querySelector('#ammonia-slider')
  ammoniaSlider.value = ammoniaValue;

}

// Call the function to update the slider whenever necessary
updateSliderFromDisplay();
// setInterval(updateSliderFromDisplay, 10000);

const waterThresholds = {
  temp: { high: 28, critical: 35 }, 
  ph: { high: 8.0, low: 6.0 }, 
  oxygen: { high: 10, low: 2 }, 
  ammonia: { normal: 0, low: 0.1, high: 0.25 },
};

const fishEffects = {
  remove: (fishElements) => {
    fishElements.forEach(fish => {
      if (fish.dataset.health === "healthy") {
        fishHealth.healthyFish--;  // Only decrement if the fish is marked healthy
      } else if (fish.dataset.health === "unhealthy") {
        fishHealth.unhealthyFish--;  // Only decrement if the fish is marked unhealthy
      }
    
       // Increment dead fish count
    fishHealth.deadFishCount++; // Update dead fish count
    document.querySelector("#dead-fish-count").textContent = fishHealth.deadFishCount; 

      fish.style.opacity = 0;
      fish.remove();
    });
  },
  
  unhealthy: (fishElements, filter = "grayscale(80%)") => {
    fishElements.forEach(fish => {
      // Only mark the fish unhealthy if it's currently healthy
      if (fish.dataset.health === "healthy") {
        fish.style.filter = filter;
        fish.dataset.health = "unhealthy";  // Mark fish as unhealthy
        fishHealth.unhealthyFish++;
        fishHealth.healthyFish--;
      }
    });
  },
  
  healthy: (fishElements) => {
    fishElements.forEach(fish => {
      // Only mark the fish healthy if it's currently unhealthy
      if (fish.dataset.health === "unhealthy") {
        fish.style.filter = "none";
        fish.dataset.health = "healthy";  // Reset fish as healthy
        fishHealth.healthyFish++;
        fishHealth.unhealthyFish--;
      }
    });
  }
};

// Centralized logger for water conditions
function logWaterCondition(param, level, unit = '') {
  let messageType;

  // Determine the message classification based on the level
  switch (level) {
    case 'too high':
    case 'high':
    case 'out of range':
      messageType = 'error'; // Critical condition
      break;
    case 'low':
      messageType = 'warning'; // Warning condition
      break;
    case 'normal':
      messageType = 'info'; // Informational message
      break;
    default:
      messageType = 'info'; // Default to info if no specific classification
  }

  logMessage(`${param} level is ${level} ${unit}`, messageType);
}


// Helper function to determine the condition for each parameter
function getCondition(value, thresholds) {
  if (value >= thresholds.critical) return 'critical';
  if (value >= thresholds.high) return 'high';
  if (value <= thresholds.low) return 'low';
  return 'normal';
}

// For ammonia
function getAmmoniaCondition(value, thresholds) {
  const tolerance = 0.00; // Define a small tolerance for normal level

  // Dangerous if ammonia is higher than the high threshold
  if (value >= thresholds.high) {
    return 'high';
  }

  // Warning zone if ammonia is between low and high
  if (value > thresholds.low && value < thresholds.high) {
    return 'low';
  }

  // Normal if the ammonia level is approximately equal to normal
  if (Math.abs(value - thresholds.normal) <= tolerance) {
    return 'normal';
  }

  // Return 'normal' if no other condition matches
  return 'normal';
}

//Function to check water conditions and apply effects on fish
function checkWaterParameters() {
  const fishElements = document.querySelectorAll(".fish");
  const waterParameters = updateWaterParameters();
  const temperature = waterParameters.getTemperature();
  const pHLevel = waterParameters.getPHLevel();
  const oxygenLevel = waterParameters.getOxygenLevel();
  const ammoniaLevel = waterParameters.getAmmoniaLevel();

  const fishElementsToRemove = [];
  const fishElementsToUnhealthy = [];

  // Check temperature condition
  switch (getCondition(temperature, waterThresholds.temp)) {
    case 'critical':
      fishElementsToRemove.push(...fishElements);
      logWaterCondition('Temperature', 'too high', `${temperature}°C`, 'error'); // Assuming logWaterCondition handles classification
      logMessage("Fish are dying because the temperature is at a critical level!", 'error');
      break;
    case 'high':
      fishElementsToUnhealthy.push(...fishElements);
      logWaterCondition('Temperature', 'high', `${temperature}°C`, 'error');
      break;
    case 'normal':
      logWaterCondition('Temperature', 'normal', `${temperature}°C`, 'info');
      break;
  }

  // Check pH condition
  const pHCondition = getCondition(pHLevel, waterThresholds.ph);
  if (pHCondition === 'low' || pHCondition === 'high') {
    fishElementsToRemove.push(...fishElements);
    logWaterCondition('pH Level', 'abnormal', pHLevel, 'info');
    logMessage("Fish are dying due to an abnormal pH Level!", 'error');
  } else {
    logWaterCondition('pH Level', 'normal', pHLevel);
  }

  // Check oxygen condition
  const oxygenCondition = getCondition(oxygenLevel, waterThresholds.oxygen);
  if (oxygenCondition === 'low' || oxygenCondition === 'high') {
    fishElementsToRemove.push(...fishElements);
    logWaterCondition('Oxygen Level', 'abnormal', `${oxygenLevel} mg/L`, 'warning');
    logMessage("Fish are dying due to abnormal oxygen levels!", 'error');
  } else {
    logWaterCondition('Oxygen Level', 'normal', `${oxygenLevel} mg/L`);
  }

  // Check ammonia condition
  switch (getAmmoniaCondition(ammoniaLevel, waterThresholds.ammonia)) {
    case 'high':
      fishElementsToRemove.push(...fishElements);
      logWaterCondition('Ammonia Level', 'dangerously high', `${ammoniaLevel} mg/L`);
      logMessage("Fish are dying due to dangerously high ammonia levels!", 'error');
      break;

    case 'low':
      fishElementsToUnhealthy.push(...fishElements);
      logWaterCondition('Ammonia Level', 'in the warning zone', `${ammoniaLevel} mg/L`);
      break;

    case 'normal':
      logWaterCondition('Ammonia Level', 'normal', `${ammoniaLevel} mg/L`);
      break;
  }

  // Apply effects based on collected conditions
  if (fishElementsToRemove.length > 0) {
    fishEffects.remove(fishElementsToRemove);
  }
  if (fishElementsToUnhealthy.length > 0) {
    fishEffects.unhealthy(fishElementsToUnhealthy);
  }

  // If no fish were removed or marked unhealthy, apply healthy effect
  if (fishElementsToRemove.length === 0 && fishElementsToUnhealthy.length === 0) {
    fishEffects.healthy(fishElements);
    logMessage("All fish are healthy as all water parameters are normal.", 'info');
  }

  // Update the fish counter display
  updateFishCounter();
}

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
      logMessage(`${fishToAdd} fish added! Maximum of ${maxFishCount} fish reached.`);
    } else {
      logMessage(`Cannot add more fish. Maximum limit of ${maxFishCount} fish reached.`);
    }
  } else {
    // Add fish normally if the limit isn't exceeded
    for (let i = 0; i < fishCount; i++) {
      createFish();
    }
    logMessage(`${fishCount} fish added! Current fish count: ${fishHealth.healthyFish}`);
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
  document.querySelector("#dead-fish-count").textContent =
    fishHealth.deadFishCount;
}

function fishStatus() {
  if (fishHealth.healthyFish > 0) {
    fishHealth.healthyFish = Math.max(0, fishHealth.healthyFish - 1); // Ensure it doesn't go negative
    fishHealth.unhealthyFish++;
    updateFishCounter();
    logMessage("A fish became unhealthy! Current count:", fishHealth, 'error');
  }
}

// Initial call to display the fish counter when the page loads
updateFishCounter();

// remove Fish
function removeFish() {
  const pond = document.querySelector(".pond");
  const fishArray = pond.getElementsByClassName("fish");

  if (fishArray.length > 0) {
    //get the last fish
    const fishToRemove = fishArray[fishArray.length - 1];

  // check the health status of the fish to update counts
  if (fishToRemove.dataset.health === "healthy") {
    fishHealth.healthyFish = Math.max(0, fishHealth.healthyFish - 1); // Ensure it doesn't go negative
  } else {
    fishHealth.unhealthyFish = Math.max(0, fishHealth.unhealthyFish - 1); // Ensure it doesn't go negative
  }

    //remove the fish from the pond
    pond.removeChild(fishToRemove);

    //update the fish counter
    updateFishCounter();

    logMessage("Fish removed! Current fish count:", fishHealth, 'info');
  } else {
    logMessage("No fish to remove.", 'info');
  }
}

// Custom log function to display messages in HTML console v1
// function logMessage(message, type) {
//   const consoleDiv = document.getElementById("messages");
//   const newMessage = document.createElement("p");
//   newMessage.textContent = message;
//   newMessage.style.margin = "0"; // Keeps spacing consistent

//   // Assign class based on message type
//   if (type === 'info') {
//       newMessage.classList.add('info');
//   } else if (type === 'warning') {
//       newMessage.classList.add('warning');
//   } else if (type === 'error') {
//       newMessage.classList.add('error');
//   }

//   consoleDiv.appendChild(newMessage);
//   consoleDiv.scrollTop = consoleDiv.scrollHeight; // Auto-scroll to latest message
// }

// v2
function logMessage(message, type) {
  const consoleDiv = document.getElementById("messages");
  const newMessage = document.createElement("p");
  newMessage.textContent = message;
  newMessage.style.margin = "0"; // Keeps spacing consistent

  // Assign class based on message type
  newMessage.classList.add(type); // Assuming type is already a class like 'info', 'warning', 'error'
  
  consoleDiv.appendChild(newMessage);

  // Limit number of messages displayed
  if (consoleDiv.childNodes.length > 20) { // Adjust number as needed
    consoleDiv.removeChild(consoleDiv.firstChild);
  }
}


// logMessage('System initialized.', 'info'); // For info messages
// logMessage('Warning: pH level is approaching the danger zone!', 'warning'); // For warnings
// logMessage('Error: Unable to connect to the sensor!', 'error'); // For errors



// Function to handle fish health based on water parameters
function updateFishHealth(temperature, pH, oxygen, ammonia) {
  const fishElements = document.querySelectorAll(".fish");
  let fishElementsToRemove = [];
  let fishElementsToUnhealthy = [];

  // Temperature check
  switch (getCondition(temperature, waterThresholds.temp)) {
    case 'critical':
      fishElementsToRemove.push(...fishElements);
      logMessage(`Temperature too high (${temperature}°C) - Fish are dying!`, 'error');
      break;
    case 'high':
      fishElementsToUnhealthy.push(...fishElements);
      logMessage(`Temperature is high (${temperature}°C) - Fish are at risk!`, 'error');
      break;
    default:
      logMessage(`Temperature is normal (${temperature}°C).`, 'info');
      break;
  }

  // pH check
  switch (getCondition(pH, waterThresholds.ph)) {
    case 'critical':
      fishElementsToRemove.push(...fishElements);
      logMessage(`pH level critical (${pH}) - Fish are dying!`, 'error');
      break;
    case 'high':
    case 'low':
      fishElementsToUnhealthy.push(...fishElements);
      logMessage(`pH level is abnormal (${pH}) - Fish are at risk!`, 'warning');
      break;
    default:
      logMessage(`pH level is normal (${pH}).`, 'info');
      break;
  }

  // Oxygen check
  switch (getCondition(oxygen, waterThresholds.oxygen)) {
    case 'critical':
      fishElementsToRemove.push(...fishElements);
      logMessage(`Oxygen level critical (${oxygen} mg/L) - Fish are dying!`, 'error');
      break;
    case 'low':
      fishElementsToUnhealthy.push(...fishElements);
      logMessage(`Oxygen level low (${oxygen} mg/L) - Fish are at risk!`, 'warning');
      break;
    default:
      logMessage(`Oxygen level is normal (${oxygen} mg/L)...`, 'info');
      break;
  }

  // Ammonia check
  switch (getAmmoniaCondition(ammonia, waterThresholds.ammonia)) {
    case 'high':
      fishElementsToRemove.push(...fishElements);
      logMessage(`Ammonia level dangerously high (${ammonia} mg/L) - Fish are dying!`, 'error');
      break;
    case 'low':
      fishElementsToUnhealthy.push(...fishElements);
      logMessage(`Ammonia level in the warning zone (${ammonia} mg/L) - Fish are at risk!`, 'warning');
      break;
    default:
      logMessage(`Ammonia level is normal (${ammonia} mg/L).`, 'info');
      break;
  }

  // Apply effects based on collected conditions
  if (fishElementsToRemove.length > 0) {
    fishEffects.remove(fishElementsToRemove);
  }
  if (fishElementsToUnhealthy.length > 0) {
    fishEffects.unhealthy(fishElementsToUnhealthy);
  }
  
  // Update fish counter after changes
  updateFishCounter();
}

// Call the function in the main update loop
setInterval(() => {
  const waterParameters = updateWaterParameters();
  checkWaterParameters(); // This should call `updateFishHealth` internally
  updateFishHealth(waterParameters.getTemperature(), waterParameters.getPHLevel(), waterParameters.getOxygenLevel(), waterParameters.getAmmoniaLevel());
<<<<<<< HEAD
}, 10000); // Update every 10 seconds
=======
}, 30000); // Update every 30 seconds
>>>>>>> fde8bd8205d29c5eacd1d8ad1ffc2e576fb17253

// Example usage of the logMessage function for other user interactions
// function handleUserInput(fishCount) {
//   if (isNaN(fishCount) || fishCount <= 0) {
//     logMessage("Please enter a valid number greater than 0.", 'info');
//     return;
//   }
//   logMessage(`User has set the fish count to ${fishCount}.`, 'info');
//   // Additional code to initialize fish...
// }

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

//   logMessage(
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
