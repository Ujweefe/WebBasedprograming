const chatTrigger = document.querySelector('.chat-trigger');
const chatWidget = document.getElementById('chatWidget');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');

let isProcessing = false;

function toggleChat() {
    chatWidget.classList.toggle('active');
    if (chatWidget.classList.contains('active')) {
        userInput.focus();
    }
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message || isProcessing) return;

    isProcessing = true;
    
    // Kullanıcı mesajını ekle
    addMessage(message, 'user');
    userInput.value = '';

    // Yükleniyor mesajı
    const loadingMessage = addMessage('...', 'bot loading');

    try {
        const response = await fetch('http://localhost:3000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error('API yanıt vermedi');
        }

        const data = await response.json();
        
        // Yükleniyor mesajını kaldır
        loadingMessage.remove();
        
        // Bot yanıtını ekle
        if (data.error) {
            addMessage(data.error, 'bot error');
        } else {
            addMessage(data.response, 'bot');
        }

    } catch (error) {
        console.error('Chat error:', error);
        loadingMessage.remove();
        addMessage('Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.', 'bot error');
    } finally {
        isProcessing = false;
    }
}

function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
}

userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !isProcessing) {
        sendMessage();
    }
});

// Dışarı tıklandığında chat'i kapat
document.addEventListener('click', (e) => {
    if (!chatWidget.contains(e.target) && !chatTrigger.contains(e.target)) {
        chatWidget.classList.remove('active');
    }
}); 