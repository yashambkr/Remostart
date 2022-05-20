$(document).ready(function () {
  $("#section2").hide();

  $("#profile-btn").click(function () {
    $("#section1").show();
    $("#section2").hide();
    $("#change_pass_btn").removeClass("active");
    $("#profile-btn").addClass("active");
  });
  $("#change_pass_btn").click(function () {
    $("#section2").show();
    $("#section1").hide();
    $("#profile-btn").removeClass("active");
    $("#change_pass_btn").addClass("active");
  });
});
