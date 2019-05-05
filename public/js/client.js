console.log('Client side javascript is loaded');

const form = document.querySelector('form');

const input = document.querySelector('input');

const divSuccess = document.querySelector('#div_success');

const divFailure = document.querySelector('#div_failure');

divSuccess.style.display = "none";

divFailure.style.display = "block";

form.addEventListener('submit', (event) => {

    event.preventDefault();

    const location = input.value;

    if(!location) {
        
        divFailure.querySelector('#id_error').textContent = "You need to enter a location";

        return console.log('You need to enter a location');
    }


    divFailure.querySelector('#id_error').textContent = "Loading...";

    fetch('/weather?address=' + location + '').then((response) => {

        console.log(response);

        response.json().then((data) => {

            if(data.error) {

                divSuccess.style.display = "none";

                divFailure.style.display = "block";

                divFailure.querySelector('#id_error').textContent = data.error;
            
            }else{

                divFailure.style.display = "none";

                divSuccess.style.display = "block";

                divSuccess.querySelector('#id_location').textContent = 'Location : ' + data.location;

                divSuccess.querySelector('#id_temperature').textContent = 'Precipitation Probability : ' + data.precipProbability;

                divSuccess.querySelector('#id_precipitation').textContent = 'Temperature : ' + data.temperature;
            }
        })
    })
})