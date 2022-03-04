const socket = io()

const form = document.getElementById('snd')
const messageInput = document.getElementById('text')
const messageContainer = document.getElementById('conversation')

form.addEventListener('submit', (evnt) => {
    evnt.preventDefault()
    const msgval = messageInput.value
    append(`You :${msgval}`, 'end')
    socket.emit('send', msgval)
    messageInput.value = ""

})

const append = (message, position) => {
    const msgEle = document.createElement("div")
    msgEle.innerText = message;
    msgEle.classList.add("msg")
    msgEle.classList.add(position)
    messageContainer.appendChild(msgEle)

}

const username = prompt("Please Enter Your Name");
socket.emit("new_user_joined", username)
socket.on("user-joined", (username) => {
    append(`${username} joined `, "middle")
})
socket.on("user-left", (username) => {
    append(`${username} left `, "middle")

})
socket.on('receive', (data) => {
    append(`${data.username} : ${data.message}`, "start")
})