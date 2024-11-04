// for AI-assistant
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'flex'; // Set AI Assistant tab to flex
}

function createMessage(tabId, message) {
    const tab = document.getElementById(`${tabId}-messages`);
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    tab.appendChild(newMessage);
    tab.scrollTop = tab.scrollHeight;  // Auto-scroll to the bottom
}

// Function to handle question submission in AI Assistant tab
function submitQuestion() {
    const questionInput = document.getElementById('user-question');
    const question = questionInput.value.trim();

    if (question) {
        createMessage('ai-assistant', `User: ${question}`);
        questionInput.value = '';  // Clear the input field

        // Here, you could also add code to simulate an AI response if needed
        setTimeout(() => {
            createMessage('ai-assistant', "AI: I'm here to help with your fish pond questions!");
        }, 500);  // Simulate response delay
    }
}

// toggle button (console)
function toggleConsole() {
    const consoleElement = document.getElementById('console');
    if (consoleElement.style.display === 'none' || consoleElement.style.display === '') {
        consoleElement.style.display = 'block';
    } else {
        consoleElement.style.display = 'none';
    }
}

// Initialize with Messages tab open
openTab('messages');