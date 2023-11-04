const weather = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
const messageThree = document.querySelector("#message-3")

messageOne.textContent = "Loading";
messageTwo.textContent = "";
messageThree.textContent = "";

weather.addEventListener('submit', (e) => {
    messageOne.textContent = ''
    const locations = search.value;
    e.preventDefault()
    if (locations === '') { return messageThree.textContent = "Please enter valid search" }

    fetch('/weather?address=' + locations).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast

        })
    })

})
