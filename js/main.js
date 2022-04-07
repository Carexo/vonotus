const form = document.querySelector("form")
const nameInput = form.querySelector(".name");
const emailInput = form.querySelector(".email")
const messageInput = form.querySelector(".message")
const notificationBox = document.querySelector(".notification")

notificationBox.classList.add("hidden")

const showNotification = (message) => {
    notificationBox.classList.remove("hidden");
    notificationBox.querySelector("p").innerHTML = message;

    setTimeout(() => {
        notificationBox.classList.add("hidden");
    }, 3000)
}

const sendEmail = (data) => {
    fetch("https://formsubmit.co/ajax/info@wirtualnebiuro.de", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            message: data.message,
        })
    }).then(response => response.json())
        .then(data => {
            showNotification("Wiadomość wysłana")
        })
        .catch(error => {
            showNotification("Coś poszło nie tak")
        });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value
    const email = emailInput.value
    const message = messageInput.value

    if (!name.trim() || !email.trim() || !message.trim()) {
        showNotification("Pole w formularzu jest puste")
        return;
    }
    sendEmail({name, email, message});
});
