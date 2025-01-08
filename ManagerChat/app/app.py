from flask import Flask, request, jsonify

app = Flask(__name__)

# Datos simulados para operadores y mensajes
operators = [
    {'id': 1, 'name': 'Juan'},
    {'id': 2, 'name': 'María'},
    {'id': 3, 'name': 'Carlos'}
]

messages = [
    {'id': 1, 'text': 'Hola, necesito ayuda', 'sender': 'Cliente 1', 'operator_id': 1},
    {'id': 2, 'text': '¿Tienen este medicamento?', 'sender': 'Cliente 2', 'operator_id': 2},
    {'id': 3, 'text': 'Gracias por su atención', 'sender': 'Cliente 3', 'operator_id': 3},
]

@app.route('/api/operators', methods=['GET'])
def get_operators():
    return jsonify(operators)

@app.route('/api/messages', methods=['GET'])
def get_messages():
    operator_id = int(request.args.get('operator'))
    assigned_messages = [msg for msg in messages if msg['operator_id'] == operator_id]
    return jsonify(assigned_messages)

@app.route('/api/send-message', methods=['POST'])
def send_message():
    data = request.json
    new_message = {
        'id': len(messages) + 1,
        'text': data['text'],
        'sender': 'Operador',
        'operator_id': data['operatorId']
    }
    messages.append(new_message)
    return 'Mensaje enviado', 200

if __name__ == '__main__':
    app.run(debug=True)
