  $(document).ready(function () {
    if (localStorage.getItem("redisId")) {
      window.location.replace("http://localhost/Guvi-Task/profile.html");
    }
  });
  $("#register-form").submit(function (event) {
      event.preventDefault();
        var name = $("input[name=name]").val();
        var password = $("input[name=password]").val();
        var email = $("input[name=email]").val();
        var mobile = $("input[name=mobile]").val();
        var formData = {
          name: name,
          password: password,
          email:email,
          mobile:mobile
          };
    $.ajax({
      type: "POST",
      url: "http://localhost/Guvi_project/php/register.php",
      data: formData,
  
      success: function (response) {
        window.location.href = "http://localhost/Guvi_project/login.html";
      },
      error: function (errorThrown) {
        console.log(errorThrown);
      },
    });
    console.log(formData);
  });
  