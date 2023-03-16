function submitForm() {
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
      url: "http://localhost/Guvi/php/register.php",
      type: "POST",
      data: formData,
      success: function (response) {
       console.log(response)
      },
    });
    console.log(email)
  }