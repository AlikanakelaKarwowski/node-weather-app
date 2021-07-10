const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading Please Wait . . .'
    messageTwo.innerHTML = ''
    const location = search.value
    if (!location) {
        console.log('You must type a location')
    } else {
        fetch('http://localhost:3000/weather?address=' + encodeURIComponent(location)).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.innerHTML = data.location
                    messageTwo.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>'
                }
            })
        })
    }
    console.log(location)
})
