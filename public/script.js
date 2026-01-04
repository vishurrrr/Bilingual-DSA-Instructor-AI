const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');
const micBtn = document.getElementById('mic-btn');
const langSelect = document.getElementById('lang-select');

// Auto-focus input on load
window.addEventListener('DOMContentLoaded', () => {
    userInput.focus();
});

// Voice Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    // Default language
    recognition.lang = 'en-US';

    // Update language when selector changes
    langSelect.addEventListener('change', () => {
        recognition.lang = langSelect.value;
        const langName = langSelect.options[langSelect.selectedIndex].text;
        console.log(`Language set to: ${recognition.lang}`);
    });

    micBtn.addEventListener('click', () => {
        if (micBtn.classList.contains('listening')) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });

    recognition.onstart = () => {
        micBtn.classList.add('listening');
        micBtn.innerHTML = '<i class="fa-solid fa-microphone-slash"></i>';
        micBtn.title = "Stop Listening";
        userInput.placeholder = "Listening...";
    };

    recognition.onend = () => {
        micBtn.classList.remove('listening');
        micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        micBtn.title = "Start Listening";
        userInput.placeholder = "Ask a question about arrays, trees, graphs...";
        userInput.focus();
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        micBtn.classList.remove('listening');
        micBtn.innerHTML = '<i class="fa-solid fa-microphone"></i>';
        userInput.placeholder = "Error listening. Try again.";
    };

} else {
    console.log("Web Speech API not supported in this browser.");
    micBtn.style.display = 'none';
    langSelect.style.display = 'none';
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';

    const loadingId = addLoadingIndicator();

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        removeLoadingIndicator(loadingId);

        if (response.ok) {
            addMessage(data.response, 'ai');
        } else {
            addMessage('Error: ' + (data.error || 'Something went wrong'), 'ai');
        }
    } catch (error) {
        removeLoadingIndicator(loadingId);
        addMessage('Error: Failed to connect to server', 'ai');
        console.error('Error:', error);
    }
});

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);

    const avatarHtml = sender === 'ai'
        ? '<div class="avatar"><i class="fa-solid fa-robot"></i></div>'
        : '<div class="avatar"><i class="fa-solid fa-user"></i></div>';

    messageDiv.innerHTML = `
        ${avatarHtml}
        <div class="text">${formatText(text)}</div>
    `;

    chatMessages.appendChild(messageDiv);

    // Highlight code blocks
    if (window.Prism) {
        Prism.highlightAllUnder(messageDiv);
    }

    scrollToBottom();
}

function addLoadingIndicator() {
    const id = 'loading-' + Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'ai-message');
    messageDiv.id = id;

    messageDiv.innerHTML = `
        <div class="avatar"><i class="fa-solid fa-robot"></i></div>
        <div class="text" style="display: flex; gap: 4px; align-items: center;">
            <span class="dot" style="animation: bounce 1.4s infinite ease-in-out both; animation-delay: -0.32s; width: 6px; height: 6px; background: #94a3b8; border-radius: 50%;"></span>
            <span class="dot" style="animation: bounce 1.4s infinite ease-in-out both; animation-delay: -0.16s; width: 6px; height: 6px; background: #94a3b8; border-radius: 50%;"></span>
            <span class="dot" style="animation: bounce 1.4s infinite ease-in-out both; width: 6px; height: 6px; background: #94a3b8; border-radius: 50%;"></span>
        </div>
        <style>
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
        </style>
    `;

    chatMessages.appendChild(messageDiv);
    scrollToBottom();
    return id;
}

function removeLoadingIndicator(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatText(text) {
    let formatted = text.replace(/\n/g, '<br>');

    // Enhanced code block regex for Prism
    formatted = formatted.replace(/```(\w+)?\s*([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'javascript'; // Default to JS if no lang specified
        const cleanCode = code.trim().replace(/<br>/g, '\n'); // Restore newlines for code
        return `<pre><code class="language-${language}">${cleanCode}</code></pre>`;
    });

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return formatted;
}
