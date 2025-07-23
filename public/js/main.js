                              // Weather details

const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const city_name = document.getElementById('city_name');
const temp_real = document.getElementById('temp_real');
const temp_status = document.getElementById('temp_status');

const dataHide = document.querySelector('.middle_layer');

    const getInfo = async(event) => {
        event.preventDefault();

        // Check if the input field is empty
        let cityVal = cityName.value; // Get the value from the input field(user input)
        if(cityVal === "") {
            city_name.innerText = "Please write the name before you search";

            // Hide the data of middle layer if input is empty
            dataHide.classList.add('data_hide'); 

        } else { 
            // using try for error handling
            try {
                // Fetching data from the API
             let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=800a056d8a6c4bac700c5afd5b434625`;
             const response = await fetch(url);

             const data = await response.json();
             const arrData = [data];

            // accessing the data from the API
             city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
             temp_real.innerText = arrData[0].main.temp;

             // call the property of API
             const tempMood = arrData[0].weather[0].main;

             // condition to check sunny or cloudy

              if (arrData[0].main.temp > 30) {
                document.body.style.backgroundImage = "url('/images/clear.jpg')";
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";

              }else if(tempMood === "Clear") {
               document.body.style.backgroundImage = "url('/images/clear.jpg')";
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68; ' ></i>";

             } else if (tempMood === "Clouds"){
                document.body.style.backgroundImage = "url('/images/cloudy.jpg')";
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6; ' ></i>";

             } else if(tempMood === "Rain") {
                document.body.style.backgroundImage = "url('/images/rain.avif')";
                temp_status.innerHTML = "<i class='fas fa-cloud-rain' style='color: #a4b0be; ' ></i>";
             } else {
                document.body.style.backgroundImage = "url('/images/default.jpg')";
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68; ' ></i>";
             }
             // Show the data by removing the class 'data_hide'
                dataHide.classList.remove('data_hide');

             // Catching any errors that occur during the fetch
            } catch {
                city_name.innerText = "Please enter the city name properly";

                // hide the data 
                 dataHide.classList.add('data_hide');
                

            }
            
        }

    }
    submitBtn.addEventListener('click', getInfo);

    // Hide temperature data when input is cleared
      cityName.addEventListener('input', () => {
         if (cityName.value === "") {
               dataHide.classList.add('data_hide');
               // hide background image when input is cleared
               document.body.style.backgroundImage = 'none';
         }
      });


