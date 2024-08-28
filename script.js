// script.js

document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addMessageToChatArea('User', userInput);
        sendToGROQAPI(userInput);
        document.getElementById('user-input').value = ''; // Clear input field
    }
});

function addMessageToChatArea(sender, message) {
    const chatArea = document.getElementById('chat-area');
    const messageElement = document.createElement('div');
    messageElement.className = 'message';
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight; // Auto-scroll to the bottom
}

function sendToGROQAPI(userInput) {
    fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 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' // Replace with your actual API key
        },
        body: JSON.stringify({
            messages: [
                {
                    role: 'user',
                    content: userInput // User's input message
                }
            ],
            model: 'llama3-8b-8192' // The model name specified in your curl command
        })
    })
    .then(response => response.json())
    .then(data => {
        const botResponse = data.choices[0].message.content; // Adjust according to the response format from your API
        addMessageToChatArea('Bot', botResponse);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessageToChatArea('Bot', 'Sorry, something went wrong. Please try again.');
    });
}

