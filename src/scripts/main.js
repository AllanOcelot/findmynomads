//////////////////////////////
//////// User lands on page //
//////////////////////////////
$('window').ready(function(){
  //Check the session. Act accordinly.
  check_user_session();
});

//Fire the script when the page starts
$('document').ready(function(){
  resize_introduction();
});

$('winow').resize(function(){
  resize_introduction();
});
