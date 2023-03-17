$(document).ready(function () {
    if (localStorage.getItem("redisId")) {
        window.location.replace("http://localhost/Guvi_project/profile.html");
    }
    $("#my-form").submit(function (event) {
        event.preventDefault();
        let formData = {
            email: $("#email").val(),
            password: $("#password").val(),
        };
        $.ajax({
            type: "POST",
            url: "http://localhost/Guvi_project/php/login.php",
            data: formData,

            success: function (response) {
            let json = JSON.parse(response);
            if (json.status == "success") {
                console.log(json.session_id);
                localStorage.setItem("redisId", json.session_id);
                if (localStorage.getItem("redisId") != null) {
                  window.location.href = "http://localhost/Guvi_project/profile.html";
                }
            } else {
              showErrorMessage(json.message);
            }
          },
          error: function (errorThrown) {
            console.log(errorThrown);
          },
        });
    });
});
