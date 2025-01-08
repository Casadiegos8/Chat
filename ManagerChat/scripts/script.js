let currentOperator = null;

// Cargar lista de operadores
function loadOperators() {
    fetch('/api/operators')
        .then(response => response.json())
        .then(data => {
            const operatorsDiv = document.getElementById('operators');
            operatorsDiv.innerHTML = '';
            data.forEach(operator => {
                const operatorDiv = document.createElement('div');
                operatorDiv.className = 'chat-item';
                operatorDiv.textContent = operator.name;
                operatorDiv.onclick = () => loadChat(operator.id);
                operatorsDiv.appendChild(operatorDiv);
            });
        });
}

// Cargar mensajes de un operador
function loadChat(operatorId) {
    currentOperator = operatorId;
    fetch(`/api/messages?operator=${operatorId}`)
        .then(response => response.json())
        .then(data => {
            const chatMessages = document.getElementById('chat-messages');
            chatMessages.innerHTML = '';
            data.forEach(msg => {
                const msgDiv = document.createElement('div');
                msgDiv.className = 'message';
                msgDiv.textContent = `${msg.sender}: ${msg.text}`;
                chatMessages.appendChild(msgDiv);
            });
        });
}

// Enviar mensaje
function sendMessage(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('message-input');
        const message = input.value;
        fetch('/api/send-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: message, operatorId: currentOperator }),
        }).then(() => {
            input.value = '';
            loadChat(currentOperator); // Recargar mensajes
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadOperators();
});
