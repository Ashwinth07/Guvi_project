let data;
function setData() {
  $(".view-mode")
    .find("p:eq(0)")
    .html("User Name:" + data.name);
  $(".view-mode")
    .find("p:eq(1)")
    .html("Email:" + data.email);
  $(".view-mode")
    .find("p:eq(2)")
    .html("Date of birth:" + data.dob);
  $(".view-mode")
    .find("p:eq(3)")
    .html("Age:" + data.age);
  $(".view-mode")
    .find("p:eq(4)")
    .html("Contact:" + data.contact);
}

function showSuccessMessage(message) {
  let successMessageContainer = $(".success-msg-container");
  let successMessage = $(".success-msg");
  successMessage.text(message);
  successMessageContainer.show();
  setTimeout(function () {
    successMessageContainer.hide();
  }, 5000);
}

function showErrorMessage(message) {
  let errorMessageContainer = $(".err-msg-container");
  let errorMessage = $(".err-msg");
  errorMessage.text(message);
  errorMessageContainer.show();
  setTimeout(function () {
    errorMessageContainer.hide();
  }, 5000);
}

$(document).ready(function () {
  $("#loading-message").show();
  //check the session is valid or not
  $.ajax({
    type: "POST",
    url: "http://localhost/Guvi_project/php/profile.php",
    data: { action: "valid-session", redisId: localStorage.getItem("redisId") },
    success: function (response) {
      let json = JSON.parse(response);

      if (json.status != "success") {
        showErrorMessage(
          "Something went wrong..., Login Again to Continue , You Will Be Redirected"
        );
        setTimeout(() => {
          window.location.href = "http://localhost/Guvi_project/login.html";
        }, 3000);
      }
    },
  });

  $.ajax({
    url: "http://localhost/Guvi_project/php/profile.php",
    type: "POST",
    data: { action: "get-data", redisId: localStorage.getItem("redisId") },
    success: function (response) {
      $("#loading-message").hide();
      let json = JSON.parse(response);
      data = json.data[0];
      setData();
    },

    error: function (error) {
      console.log(error);
    },
  });

  $(".edit-btn").click(function () {
    $(".view-mode").hide();
    $(".edit-mode").show();
    $("#email-input").val(data.email);
    $("#dob-input").val(data.dob);
    $("#age-input").val(data.age);
    $("#contact-input").val(data.contact);
  });

  $(".cancel-btn").click(function () {
    $(".edit-mode").hide();
    $(".view-mode").show();
  });

  $(".save-btn").click(function () {
    var email = $("#email-input").val();
    var dob = $("#dob-input").val();
    var dobArray = dob.split("-");
    dob = dobArray[2] + "-" + dobArray[1] + "-" + dobArray[0];
    var age = $("#age-input").val();
    var contact = $("#contact-input").val();

    data = { ...data, dob, age, contact };
    setData();

    //send the updated data
    $.ajax({
      url: "http://localhost/Guvi_project/php/profile.php",
      type: "POST",
      data: { action: "update-data", email, data },
      success: function (response) {
        $("#loading-message").hide();
        console.log(response);
      },

      error: function (error) {
        console.log(error);
      },
    });

    $(".edit-mode").hide();
    $(".view-mode").show();
  });
});

let loading = true;
//logout
$("#logout-button").click(function (e) {
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: "http://localhost/Guvi_project/php/profile.php",
    data: { action: "logout", redisId: localStorage.getItem("redisId") },
    success: function (response) {
      let json = JSON.parse(response);

      if (json.status == "success") {
        showSuccessMessage(json.message + " Redirecting to login page...");

        setTimeout(function () {
          window.location.href = "http://localhost/Guvi_project/login.html";
        }, 3000);
      }
    },
  });

  localStorage.removeItem("redisId");
});
