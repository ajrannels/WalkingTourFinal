function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  // Open JSON file
  xobj.open('GET', 'parsed.json', true);
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  var listData = "";
  var mapData = "";
  loadJSON(function (response) {
    // Parse JSON string into object
    var actual_JSON = JSON.parse(response);
    // Iterate through object
    for (const key of Object.keys(actual_JSON)) {
      console.log(key, actual_JSON[key].Name);
      listData += list(actual_JSON[key]);
      mapData += map(actual_JSON[key]);
    }
    console.log(listData);
    console.log(mapData);
  });
}

function list(data) {
  // Store individual fields in variables
  var id = data.ID;
  var name = data.Name;
  var address = data.Address;
  var date = data.Date;
  var text = data.PlaqueText;

  //Output string for html
  var output = '<tr><td><img src="images/' + id + '.jpg" width="100" height="100" /></td><td>' + name + '</td><td>'+ address +  '</td></tr>';
  return (output);

}
function map(data) {
  // Store individual fields in variables
  var id = data.ID;
  var name = data.Name;
  var address = data.Address;
  var date = data.Date;
  var text = data.PlaqueText;
  var lat = data.Latitude;
  var long = data.Longitude;
  //Output string for html
  var output = '{coords: { lat: ' + lat + ', lng: ' + long + ' },content: \'<img src="images/' + id + '.jpg" width="100" height="100" /><h2 class="right">' + address + '</h2><br><h1>' + name + '</h1><h2>Date: ' + date + '</h2><p>' + text + '</p>\'},';

  return (output);

}

