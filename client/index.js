
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
      var sqft = $('#uiSqft').val();
      var location = $('#uiLocations').val();
      
      var url = 'http://127.0.0.1:5000/predict_home_price';
      $.post(url,{
        total_sqft: parseFloat(sqft),
        bhk: parseInt(bhk),
        bath: parseInt(bath),
        location: location
      },function(data, status) {
        console.log(data.estimated_price);
        $('#uiEstimatedPrice').html("<h2>" + data.estimated_price.toString() + " Lakh</h2>");
        console.log(status);  
      });
    });
}

window.onload = onPageLoad;