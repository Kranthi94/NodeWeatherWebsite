console.log('Client side javascript is loaded');

const form = document.querySelector('form');

const input = document.querySelector('input');

const divSuccess = document.querySelector('#div_success');

const divFailure = document.querySelector('#div_failure');

form.addEventListener('submit', (event) => {

    event.preventDefault();

    const location = input.value;

    if(!location) {
        return console.log('You need to enter a location');
    }

    fetch('/weather?address=' + location + '').then((response) => {

        console.log(response);

        response.json().then((data) => {

            if(data.error) {

                divSuccess.style.display = "none";

                divFailure.style.display = "block";

                divFailure.querySelector('#id_error').textContent = data.error;
                
                console.log(data.error);

            }else{

                divFailure.style.display = "none";

                divSuccess.style.display = "block";

                divSuccess.querySelector('#id_location').textContent = data.location;

                divSuccess.querySelector('#id_temperature').textContent = data.precipProbability;

                divSuccess.querySelector('#id_precipitation').textContent = data.temperature;

                console.log('Location : ' + data.location);

                console.log('Precipitation Probability : ' + data.precipProbability);

                console.log('Temperature : ' + data.temperature);
            }
        })
    })
})