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
<<<<<<< HEAD
            'Authorization': 'Bearer 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' // Replace with your actual API key
=======
            'Authorization': 'Bearer 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' // Replace with your actual API key
>>>>>>> 7f8214bf6c977fe11032d2a3834e35b597bf2845
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

