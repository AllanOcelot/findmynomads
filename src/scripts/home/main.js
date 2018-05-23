//I don't want to bombard the server, so we only run checks on inputs after 5 seconds
var lastTimeSinceUserInput = 5000;

function show_alert(dom_element_to_show){
    dom_element_to_show.addClass('active');
}

function show_login_error(option){
    var alert_login = $('.alert');

  //We check to see if our login error cookie appears
  if(readCookie('user_login_attempts') == null){
    //The user has no login attemps, so we create one
    // It has a value of 0 and lasts for one day.
    createCookie('user_login_attempts' , 0 , 1);
  }else{
    // If itr does exist, bind it to a variable so we can increase login attempts
    var login_attempts_val = parseInt(readCookie('user_login_attempts')) + 1;
  }

  if(readCookie('user_login_attempts') >= 25){
    alert_login.text('Youve tried to log in more than 25 times. Try again tommorow.');
    $('#attempt_login').remove();
  }else{
    //TODO - these should not be alerts, they should be styling the inputs with feedback etc.
    //User entered invalid syntax for their email
    if(option == 0.5){
      alert_login.text("You must select your type of account.");
    }
    //User entered invalid syntax for their email
    if(option == 1 || option == 2){
      alert_login.text("Please check you have entered a correct Username.");
    }
    //User has not completed all fields on the register form
    if(option == 5){
      alert_login.text('Please ensure all fields are completed');
    }
    if(option == 6){
      alert_login.text('Company name is not valid');
    }
    if(option == 7){
      alert_login.text('No valid email address provided.')
    }
    if(option == 8){
      alert_login.text('Please check your password is correct.');
    }
    if(option == 9){
      alert_login.text('Please ensure your details are correct');
    }
  }

    createCookie('user_login_attempts' , login_attempts_val  , 1);
    show_alert(alert_login);
    console.log(login_attempts_val);
}

function show_selection(item_to_display){
  $('.introduction').removeClass('active').css('display','none');
  if(item_to_display == "default"){
    $('.introduction.default').css("display", "flex").addClass("active").hide().fadeIn();
  }
  if(item_to_display == "login"){
    $('.introduction.login').css("display", "flex").addClass("active").hide().fadeIn();
  }
  if(item_to_display== "register"){
    $('.introduction.register').css("display", "flex").addClass("active").hide().fadeIn();
  }
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
