// Define fishHealth at the top of your script so all functions can access it
let fishHealth = {
    healthyFish: 0,   // Start with 0 healthy fish
    unhealthyFish: 0  // Start with 0 unhealthy fish
};

// Event listener
document.querySelector('#add-fish').addEventListener('click', addFish);
document.querySelector('#remove-fish').addEventListener('click', removeFish);

// Function to add a new fish
function addFish() {
    // Create a new fish element
    let newFish = document.createElement('div');
    newFish.classList.add('fish');
    newFish.dataset.health = 'healthy'; // Set the fish as healthy initially

    // Randomly position the fish in the pond
    newFish.style.top = Math.random() * 80 + '%'; // Random vertical position
    newFish.style.left = Math.random() * 90 + '%'; // Random horizontal position

    // Add the new fish to the pond
    document.querySelector('.pond').appendChild(newFish);

    // Update fish health count
    fishHealth.healthyFish += 1;

     updateFishCounter();

    console.log('Fish added! Current fish count:', fishHealth.healthyFish);
}

// fish counter

function updateFishCounter() {
    document.querySelector('#healthy-fish-count').textContent = fishHealth.healthyFish;
    document.querySelector('#unhealthy-fish-count').textContent = fishHealth.unhealthyFish;
}

function fishStatus() {
    if(fishHealth.healthyFish > 0) {
        fishHealth.healthyFish -= 1;
        fishHealth.unhealthyFish += 1;
        updateFishCounter();
        console.log('A fish became unhealthy! Current count:', fishHealth);
    }
}

// Initial call to display the fish counter when the page loads
updateFishCounter();





