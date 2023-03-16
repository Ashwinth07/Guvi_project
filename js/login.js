$(document).ready(function() {
    console.log("Hi");
    $("#my-form").submit(function (event) {
      console.log("hello");
      event.preventDefault();
  
      let formData = {
        email: $("#email").val(),
        password: $("#password").val(),
      };
      console.log(formData);
      $.ajax({
        type: "POST",
        url: "http://localhost/Guvi/php/login.php",
        data: formData,
        success: function (response) {
         console.log(response);
          let res = JSON.parse(response);
          localStorage.setItem("access_token", res.access_token);
  
          if (res.status == "success") {
            window.location.replace("http://localhost/Guvi/profile.html");
          }
        },
        error: function (jqXHR, textStatus, errorThrown) {
          console.log(errorThrown); 
        },
      });
    });
  });
