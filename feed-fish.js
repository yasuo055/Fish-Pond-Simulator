document.addEventListener("DOMContentLoaded", () => {
    const fishElements = document.querySelectorAll(".fish");
    const feedButton = document.getElementById("feed-fish-btn");
  
    // Randomize initial positions of fish
    fishElements.forEach(fish => {
      fish.style.top = `${Math.random() * 80 + 10}%`;
      fish.style.left = `${Math.random() * 80 + 10}%`;
    });
  
    // Move fish to center when feeding
    function feedFish() {
      fishElements.forEach(fish => {
        fish.style.top = "50%";
        fish.style.left = "50%";
      });
  
      // Return to random positions after eating
      setTimeout(() => {
        fishElements.forEach(fish => {
          fish.style.top = `${Math.random() * 80 + 10}%`;
          fish.style.left = `${Math.random() * 80 + 10}%`;
        });
      }, 2000); // Fish stay in the center for 2 seconds
    }
  
    // Event listener for feed button
    feedButton.addEventListener("click", feedFish);
  });
  