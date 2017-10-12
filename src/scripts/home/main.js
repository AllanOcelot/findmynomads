//I don't want to bombard the server, so we only run checks on inputs after 5 seconds
var lastTimeSinceUserInput = 5000;

function resize_introduction(){
  var new_margin =  "-" + $('.introduction.active').height() / 2 + "px";
  $('.introduction.active').css('margin-top', new_margin);
}

function show_login_error(option){

  //We check to see if our login error cookie appears
  if(readCookie('user_login_attempts') == null){
    //The user has no login attemps, so we create one
    // It has a value of 0 and lasts for one day.
    createCookie('user_login_attempts' , 0 , 1);
  }

  if(readCookie('user_login_attempts') >= 25){
    alert('Youve tried to log in more than 25 times. Try again tommorow.');
  }else{
    //User entered invalid syntax for their email
    if(option == 0.5){
      alert("You must select your type of account.");
    }
    //User entered invalid syntax for their email
    if(option == 1){
      alert("It looks like your email address is not valid.");
    }
    //User does not exist
    if(option == 2){
      alert("Used does not exist");
    }
    //User has not completed all fields on the register form
    if(option == 5){
      alert('Not all fields on register are completed');
    }
    if(option == 6){
      alert('Company name is not valid');
    }
    if(option == 7){
      alert('No valid email address provided.')
    }
    if(option == 8){
      alert('Password needs to be longer than five charactrs');
    }
    if(option == 9){
      alert('Please ensure your details are correct');
    }
  }
}

function show_selection(item_to_display){
  $('.introduction').removeClass('active');
  if(item_to_display == "default"){
    $('.introduction.default').addClass('active');
  }
  if(item_to_display == "login"){
    $('.introduction.login').addClass('active');
  }
  if(item_to_display== "register"){
    $('.introduction.register').addClass('active');
  }
  resize_introduction();
}


//Check the company name is valid
function check_company_name_valid(){
  if($('#company_name').val()){
    var companyName = $('#company_name').val();
    if(companyName.length > 5){

      var regexString = "^[a-zA-Z0-9_\w \s ]*$";
      if( companyName.match(regexString)){
        return true;
      }else{
        return false;
      }
      //if(companyName.match(^[a-zA-Z0-9_\s]*S)){
      //  return true;
      //}else{
      //  return false;
      //}
    }
  }else{
    return false;
  }
}

//Check the user has provided a valid email address
function check_company_email_valid(){
  if($('#new_email_address').val()){
    var new_email_address = $('#new_email_address').val();
    var regexString = "^[a-zA-Z0-9_\w \s ]*$";
    if(new_email_address.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      return true;
    }else{
    return false;
    }
  }
}

//Check company password is valid
function check_company_password_valid(){
  if($('#new_company_password').val()){
    var new_company_password = $('#new_company_password').val();
    if(new_company_password.length > 5){
      return true;
    }else{
    return false;
    }
  }
}
