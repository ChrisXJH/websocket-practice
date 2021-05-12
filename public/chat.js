const socket = io.connect('http://localhost:3000');

const message = document.getElementById('message');
const handle = document.getElementById('handle');
const sendBtn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

socket.on('chat', data => {
    output.innerHTML +=
        `<p><strong>${data.handle}:</strong> ${data.message}</p>`;
    feedback.innerHTML = '';
});

socket.on('typing', data => {
    feedback.innerHTML = `<p><em>User ${data.handle} is typing</em></p>`;
});

sendBtn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', () => {
    socket.emit('typing', {
        handle: handle.value
    });
});
