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
