//These are all options that relate to the team panel page


//When the user wants to add a new team member
appContainer.on('click', '#add_new_team_member', function(e){
    display_panel('add_team_member');
});


// If the user provides a valid email ( an email not in use ) we will register a new user in the DB, assigned to that company.
appContainer.on('submit', '#create_new_nomad', function(e){
    e.preventDefault();

    //Check the user input
    var user_input = $('#new_user_email').val();

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(user_input).toLowerCase())){
        alert('its an email address');
    }else{
        alert('not an email');
    }

    /*

    $.ajax({
     type: "GET",
     data: {
       submitted: true,
       email: email_address_to_register,
     },
     url: "functions/check_user.php",
    })
    .done(function( data ) {
      //IF the data returned tells us it's all valid, continue to check_user_session as this will show the map page
      if(data == true) {
        check_user_session();
      }else{
        show_login_error(9);
      }
    });

    */

});
