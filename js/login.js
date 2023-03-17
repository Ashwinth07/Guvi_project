// $(document).ready(function() {
//     console.log("Hi");
//     $("#my-form").submit(function (event) {
//       console.log("hello");
//       event.preventDefault();
  
//       let formData = {
//         email: $("#email").val(),
//         password: $("#password").val(),
//       };
//       console.log(formData);
//       $.ajax({
//         type: "POST",
//         url: "http://localhost/Guvi/php/login.php",
//         data: formData,
//         success: function (response) {
//          console.log(response);
//           let res = JSON.parse(response);
//           localStorage.setItem("access_token", res.access_token);
  
//           if (res.status == "success") {
//             window.location.replace("http://localhost/Guvi/profile.html");
//           }
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//           console.log(errorThrown); 
//         },
//       });
//     });
//   });

$(document).ready(function () {
  console.log("Hi");
  if (localStorage.getItem("redisId")) {
    window.location.replace("http://localhost/Project/profile.html");
  }
  $("#my-form").submit(function (event) {
    event.preventDefault();
    let formData = {
      email: $("#email").val(),
      password: $("#password").val(),
    };
    console.log(formData);
    $.ajax({
      type: "POST",
      url: "http://localhost/project/php/login.php",
      data: formData,

      success: function (response) {
        let res = JSON.parse(response);
        if (res.status == "success") {
          console.log(res.session_id);
          localStorage.setItem("redisId", res.session_id);
          if (localStorage.getItem("redisId") != null) {
            window.location.href = "http://localhost/Project/profile.html";
          }
        } else {
          console.log(res.message);
          showErrorMessage(res.message);
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown); // log error message to console
      },
    });
  });
});