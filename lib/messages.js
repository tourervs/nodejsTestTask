var info_message              = "Вы вышли из приложения";
var form_inclomplete_message  = "Необходимо ввести учетные данные";
var wrong_credentials_message = "Имя пользователя и пароль не подходят";
var already_exists_message    = "Пользователь с таким именем уже зарегистрирован"; 
var internal_error_message    = "Произошла непредвиденная ошибка"

var info_body              = {classes:"alert alert-info",    text:info_message              };
var form_incomplete_body   = {classes:"alert alert-warning", text:form_inclomplete_message  };
var wrong_credentials_body = {classes:"alert alert-danger",  text:wrong_credentials_message };
var already_exists_body    = {classes:"alert alert-danger",  text:already_exists_message    };
var internal_error_body    = {classes:"alert alert-danger",  text:internal_error_message    };


module.exports.messages = { info   : info_body,
                 form_inclomplete  : form_incomplete_body,
                 wrong_credentials : wrong_credentials_body,
                 already_exists    : already_exists_body,
                 internal_error    : internal_error_body
} ;


