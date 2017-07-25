var username_too_short  = "Имя пользователя должно быть длиннее 4 символов и состоять из цифр и букв английского алфавита";
var passwords_mismatch  = "Пароль и повтор пароля не совпадают";
var password_too_simple = "Пароль недостаточно сложен: должны быть цифры, заглавные и строчные буквы и длина минимум 8 символов";



$( document ).ready(function() {

    $( "#sign-in-form" ).submit(function( event ) {
        var password = $("#password_form_field").val();
        $("#password_form_field").val("");
        $("#encrypted_password").val(Crypto.MD5(password));
    });
    //
    $( "#sign-up-form" ).submit(function( event ) {
        //
        //
        var password = $("#password_form_field_repeat").val();
        $("#password_form_field_first").val("");
        $("#password_form_field_repeat").val("");
        $("#encrypted_password").val(Crypto.MD5(password));
    });
    $("#register_button").click( function( event ) {
        var username   = $("#username_field").val();
        var passFirst  = $("#password_form_field_first").val();
        var passRepeat = $("#password_form_field_repeat").val();
        if ( passFirst != passRepeat || passFirst == "" || passRepeat == "" ) { 
            $("#password_set_info_field").text(passwords_mismatch);
            event.preventDefault();
        } else {
            $("#password_set_info_field").text("");
        }
        var digitCheck   = /[0-9]/.test(passRepeat);
        var capitalCheck = /[A-Z]/.test(passRepeat);
        var lowerCheck   = /[a-z]/.test(passRepeat);
        if ( digitCheck == false || capitalCheck == false || lowerCheck == false || passRepeat.length < 8 ) {
            $("#password_set_info_field").text(password_too_simple);
            event.preventDefault();
        } else {
            $("#password_set_info_field").text("");

        }
        if ( username.length < 5 ) {
            $("#username_set_info_field").text(username_too_short);
            event.preventDefault();
        }
    });

    $("#hello_phrase").text(getPartOfTheDay());
});


function getPartOfTheDay(){
  //
  var currentdate = new Date();
  var hour = currentdate.getHours() ; 
  //
  if ( hour >= 6 && hour<10 ) {
    return 'Доброе утро !';
  } else if ( hour >= 10 && hour<18 ) {
    return 'Добрый день !';
  } else if ( hour >= 18 && hour<22 ) {
    return 'Добрый вечер !';
  } else if ( hour == 22 || hour == 23 || ( hour >= 0 && hour <6 ) ) {
    return 'Доброй ночи !';
  }
}




