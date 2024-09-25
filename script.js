// Define fishHealth at the top of your script so all functions can access it
let fishHealth = {
  healthyFish: 0, // Start with 0 healthy fish
  unhealthyFish: 0, // Start with 0 unhealthy fish
};

// Event listener
document.querySelector("#add-fish").addEventListener("click", addFish);
document.querySelector("#remove-fish").addEventListener("click", removeFish);
document.querySelector("#clear-fish-pond").addEventListener("click", clearFishPond);
document.querySelector('#pause-start').addEventListener('click', toggleAnimation);

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
      fishHealth.healthyFish -= 1; //remove the health fish
    } else {
      fishHealth.unhealthyFish -= 1; //remove the unhealthy fish
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

  console.log('The fish pond has been cleared. Current fish count:', fishHealth);
}

// pause and resume animation
let isAnimationPaused = false; 

function toggleAnimation() {
    const allFish = document.querySelectorAll('.fish');
    
    if (isAnimationPaused) {
       
        allFish.forEach(fish => {
            fish.style.animationPlayState = 'running'; 
        });
        document.querySelector('#pause-start').textContent = 'Pause Animation'; 
    } else {
        
        allFish.forEach(fish => {
            fish.style.animationPlayState = 'paused'; 
        });
        document.querySelector('#pause-start').textContent = 'Resume Animation'; 
    }

    // Toggle the state pause/start
    isAnimationPaused = !isAnimationPaused; 
}
