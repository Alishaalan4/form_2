document.getElementById("jobapplicationform").addEventListener('submit', function(event) {
    event.preventDefault();

    // 1- Collect the data from the submission event
    const formData = new FormData(event.target);

    // 2- Make formData => object to take the entries (everything found on name)
    const formobject = Object.fromEntries(formData.entries());

    // Take the latitude and longitude => location
    const locationdiv = document.getElementById('demo');
    const latitude = locationdiv.dataset.latitude || '';
    const longitude = locationdiv.dataset.longitude || '';

    // 4- Append the lat and long to the form
    formobject.latitude = latitude;
    formobject.longitude = longitude;

    // Transform the object to JSON string
    const jsonstring = JSON.stringify(formobject, null, 2);
    
    const blob = new Blob([jsonstring], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'job_application.json';
    a.click();    
    URL.revokeObjectURL(url);
});

function getlocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showposition);
    } else {
        document.getElementById('demo').innerHTML = "GeoLocation is not supported in your browser";
    }
}

function showposition(position) {
    const locationdiv = document.getElementById("demo");
    locationdiv.dataset.latitude = position.coords.latitude;
    locationdiv.dataset.longitude = position.coords.longitude;
    locationdiv.innerHTML = "Latitude: " + position.coords.latitude + '<br>' + "Longitude: " + position.coords.longitude;
}
