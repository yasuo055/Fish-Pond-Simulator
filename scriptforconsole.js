function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'flex'; // Set AI Assistant tab to flex
}

// Function to handle question submission in AI Assistant tab
function submitQuestion() {
    const questionInput = document.getElementById('user-question');
    const question = questionInput.value.trim();

    if (question) {
        logMessage('ai-assistant', `User: ${question}`);
        questionInput.value = '';  // Clear the input field

        // Here, you could also add code to simulate an AI response if needed
        setTimeout(() => {
            logMessage('ai-assistant', "AI: I'm here to help with your fish pond questions!");
        }, 500);  // Simulate response delay
    }
}

// for toggle button (console)


// Initialize with Messages tab open
openTab('messages');