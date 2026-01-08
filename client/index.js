function onPageLoad() {
    console.log("Page has fully loaded.");
    var url = "http://127.0.0.1:5000/get_location_name";
    $.get(url, function(data, status) {
      if(data){
        console.log("Location name received: " + data.location);
        var locations = data.location
        var uiLocation = $('#uiLocations');
        uiLocation.empty();
        for (var loc in locations) {
          var opt = new Option(locations[loc]);
          uiLocation.append(opt);
        }

      }
    });
}

window.onload = onPageLoad;