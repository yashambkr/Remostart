// typewrites JS
var app = document.getElementById("typewriter");

var typewriter = new Typewriter(app, {
  loop: true,
});

typewriter
  .typeString("Full Time")
  .pauseFor(2500)
  .deleteAll()
  .typeString("Part Time")
  .pauseFor(2500)
  .deleteAll()
  .typeString("Contract Jobs")
  .pauseFor(2500)
  .deleteAll()
  .typeString("As interns")
  .pauseFor(2500)
  .deleteAll()
  .start();

//   jqeury started and company names changes function below
$(function () {
  var companyName = [
    "Startups",
    "Entrepreneurs",
    "Businesses",
    "Projects",
    "SMEs",
  ];
 var index = 0;
  var timer = setInterval(function () {
    console.log(companyName[index])
    $("#fade_company").fadeTo("slow", 1);
    document.getElementById("fade_company").innerHTML = companyName[index++];
    if (index >= companyName.length) {
      index = 0;
    }

    $("#fade_company").fadeTo("slow", 0);
  },2000);
});
