$(document).ready(function () {
  $("#section2").hide();
  $("#section3").hide();
  $("#profile-btn").click(function () {
    $("#section1").show();
    $("#section2").hide();
    $("#section3").hide();
    $("#change_pass_btn").removeClass("active");
    $("#referral_btn").removeClass("active");
    $(this).addClass("active");
  });
  $("#change_pass_btn").click(function () {
    $("#section2").show();
    $("#section1").hide();
    $("#section3").hide();
    $("#profile-btn").removeClass("active");
    $("#referral_btn").removeClass("active");

    $(this).addClass("active");
  });
  $("#referral_btn").click(function () {
    $("#section3").show();
    $("#section1").hide();
    $("#section2").hide();
    $("#profile-btn").removeClass("active");
    $("#change_pass_btn").removeClass("active");

    $(this).addClass("active");
  });

});
