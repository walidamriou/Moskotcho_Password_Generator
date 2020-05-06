/*
var English = "https://moskotchopg.walidamriou.com/language/en.json";
var Arabic = "https://moskotchopg.walidamriou.com/language/ar.json";

var request_data;

function readJsonFile(file) {
  return new Promise(function (resolve, reject) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status == "200") {
        var data = JSON.parse(rawFile.responseText);
        resolve(data);
      }
    };
    rawFile.send(null);
  });
}

function ReadLanguage(language) {
  readJsonFile(language).then(function (data) {
    console.log(data);
    request_data = data;
    document.getElementById("test").innerHTML = request_data.English['Help_text'];

  });
}

var default_language = ReadLanguage(English);
//ReadLanguage(Arabic['Help_text']);
//console.log(request_data['Help_text']);
function BodyTextstructure(){
  //change by id
  //default_language
  document.getElementById("your_new_password_text").innerHTML = default_language;


}

*/