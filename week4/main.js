var ourRequest = new XMLHttpRequest();
var btn = document.getElementById("btn");
var cityContainer = document.getElementById("city-info");

btn.addEventListener("click", function() {

ourRequest.open('GET', 'https://david-g-f.github.io/F28WP-Lab/week4/cities1.json');
ourRequest.onload = function() {
    var cityData = JSON.parse(ourRequest.responseText);
    renderHTML(cityData);
    btn.classList.add("hide-me");
};
ourRequest.send();
});

function renderHTML(data) {
    var htmlString = "";

    for (i = 0; i < data.length; i++){
        htmlString += "<p>" + data[i].name + " is a city in " + data[i].country + ",</br> Where you can enjoy indoor places like: ";
        for (j = 0; j < data[i].places.indoor.length; j++){
            if (j == 0) {htmlString += data[i].places.indoor[j];}
            else {htmlString += ", and " + data[i].places.indoor[j];}
        }
        htmlString += ". You can also enjoy outdoor places like: ";
        for (j = 0; j< data[i].places.outdoor.length; j++){
            if(j == 0){htmlString += data[i].places.outdoor[j];}
            else{htmlString += " and " + data[i].places.outdoor[j];}
        }
        htmlString += ".</p>";
    }

    cityContainer.insertAdjacentHTML('beforeend', htmlString);
}