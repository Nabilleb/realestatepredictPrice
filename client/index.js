
var submit = $('.submit');

function getBHKValue() {
  return $("input[name='uiBHK']:checked").val();
}

function getBathValue() {
  return $("input[name='uiBathrooms']:checked").val();
}

function onPageLoad() {
    console.log("Page has fully loaded.");
    var url = "http://127.0.0.1:5000/get_location_name";
    $.get(url, function(data, status) {
      if(data){
        var locations = data.location
        var uiLocation = $('#uiLocations');
        uiLocation.empty();
        for (var loc in locations) {
          var opt = new Option(locations[loc]);
          uiLocation.append(opt);
        }

      }
    });

    var submit = $('.submit');
    submit.click(function onClickedEstimatePrice() {
      var bhk = getBHKValue();
      var bath = getBathValue();
      console.log("BHK: " + bhk);
      console.log("Bath: " + bath);
    });
}

window.onload = onPageLoad;