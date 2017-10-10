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

//All of our app takes place inside this container
var appContainer = $('#find-my-nomads-main');

var user_logged_in;
var geocoder;


//Location objects
var marker_current_position;
var new_location_object;
var update_location_object;
//The starting location will be the last location the user 'check in'
var starting_location;

///////// Read Cookies
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

//////// Write Cookies
function createCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}





//  *██████╗██╗**██╗███████╗*██████╗██╗**██╗****███████╗███████╗███████╗███████╗██╗*██████╗*███╗***██╗
//  ██╔════╝██║**██║██╔════╝██╔════╝██║*██╔╝****██╔════╝██╔════╝██╔════╝██╔════╝██║██╔═══██╗████╗**██║
//  ██║*****███████║█████╗**██║*****█████╔╝*****███████╗█████╗**███████╗███████╗██║██║***██║██╔██╗*██║
//  ██║*****██╔══██║██╔══╝**██║*****██╔═██╗*****╚════██║██╔══╝**╚════██║╚════██║██║██║***██║██║╚██╗██║
//  ╚██████╗██║**██║███████╗╚██████╗██║**██╗****███████║███████╗███████║███████║██║╚██████╔╝██║*╚████║
//  *╚═════╝╚═╝**╚═╝╚══════╝*╚═════╝╚═╝**╚═╝****╚══════╝╚══════╝╚══════╝╚══════╝╚═╝*╚═════╝*╚═╝**╚═══╝
//  **************************************************************************************************

function check_user_session(){
  $.ajax({
   type: "GET",
   data: {
     submitted :  true,
   },
   url: "/functions/get_session.php",
  })
  .done(function( data ) {
    if(data){
      user_logged_in = true;
    }else{
      user_logged_in = false;
    }
    init_all();
  });
}










//  ███╗***███╗*█████╗*██╗███╗***██╗****██╗███╗***██╗██╗████████╗
//  ████╗*████║██╔══██╗██║████╗**██║****██║████╗**██║██║╚══██╔══╝
//  ██╔████╔██║███████║██║██╔██╗*██║****██║██╔██╗*██║██║***██║***
//  ██║╚██╔╝██║██╔══██║██║██║╚██╗██║****██║██║╚██╗██║██║***██║***
//  ██║*╚═╝*██║██║**██║██║██║*╚████║****██║██║*╚████║██║***██║***
//  ╚═╝*****╚═╝╚═╝**╚═╝╚═╝╚═╝**╚═══╝****╚═╝╚═╝**╚═══╝╚═╝***╚═╝***
//  *************************************************************


//Function to instigate everything
function init_all(){


  var myNode = document.getElementById("find-my-nomads-main");
  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }


  if(user_logged_in == true){

    //The user goes to the 'map' page - our main page
    $.ajax({
     type: "GET",
     url: "/templates/main.php",
    })
    .done(function( data ) {
      appContainer.append(data);
      window.setTimeout(function(){
        $('#map_preloader').slideUp(300 , function (){
          resize_map($('#main_map'));
          populate_userdata();
          build_map();

          $('#main_map').fadeIn(300 , function(){
            $('.information-overlay').slideDown(300);
          });

          //Once the map is built, always re center it on the 'current location' of the user

          //Get the user travel plans
          //get_user_travel_plans(check_user_session() , map);

        });
      }, 1000);
    });


  // END OF LOGGED IN CODE
  }else{
  // START OF NOT LOGGED IN (HOME) CODE


    //Get the home template
    $.ajax({
     type: "GET",
     url: "/templates/home.php",
    })
    .done(function( data ) {
      //Add the template to the page
      appContainer.append(data);
      //Show the default landing section
      show_selection("default");
    });


    /////////////////
    /////// LOGIN CODE
    ////////////////

        //User clicks to display the login form
        appContainer.on('click', '.request-login', function(){
          show_selection("login");
        });

        //Check the user has selected a valid choice
        function validate_user_type(){
          var input = $('#usr_type').val();
          if(input == -1){
            return false;
          }else{
            if(input == 'digital_nomad' || input == 'company'){
              return input;
            }else{
              return false;
            }
          }
        }

        //Check the user input (email) containers no crazy or weird shit
        function validate_username_input(){
          var input = $('#usr_email').val();
          if(input.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            return input;
          }else{
            show_login_error(1);
            return null;
          }
        }

        //Check the user has provided a password
        function validate_password_input(){
          var input = $('#usr_pass').val();
          if( input.length > 5){
            return input;
          }else{
            show_login_error(8);
            return null;
          }
        }

        //Check all details have been provided. Check user details match server ones.
        function check_user(){
          //The user's input is correct, let's check if the user exits
          if(validate_user_type() != false && validate_username_input() != null && validate_password_input() != null){
            $.ajax({
             type: "GET",
             data: {
               submitted: true,
               user_type: validate_user_type(),
               user_name: validate_username_input(),
               user_pass: validate_password_input(),
             },
             url: "/functions/check_user.php",
            })
            .done(function( data ) {
              check_user_session();
            });
          }else{
            return false;
          }
        }

        //If user clicks the login button , check if their details are ok
        appContainer.on('click', '#attempt_login', function(){
          check_user();
        });

    ////////////////////
    ///// END OF LOGIN CODE
    ///////////////////
    //
    //
    //
    //
    //
    //
    //
    //
    ///////////////////
    ////// REGISTER CODE
    ///////////////////

      //user clicks register button
      appContainer.on('click', '.request-register', function(){
        show_selection("register");
      });

      appContainer.on('click', '#attempt_create_new', function(){
        //Before we bother with checking server side, let's do some basic checks

        //Check all the fields are provided
        if($('#company_name').val() && $('#new_email_address').val() && $('#new_company_password').val()){
          //They have entered details for each,
          if(check_company_name_valid()){
            //Check email is valid
            if(check_company_email_valid()){
              //Check they have provided a password
              if(check_company_password_valid()){
                //Create the account
                $.ajax({
                 type: "GET",
                 data: {
                   submitted: true,
                   company_name     : $('#company_name').val(),
                   company_email    : $('#new_email_address').val(),
                   company_password : $('#new_company_password').val(),
                 },
                 url: "/functions/register_company.php",
                })
                .done(function( data ) {

                });
              }else{
                show_login_error(8);
              }
            }else{
              show_login_error(7);
            }
          }else{
            show_login_error(6);
          }

        }else{
          show_login_error(5);
        }
      });
    //Both sections have a 'go home' button
    appContainer.on('click', '.go_home' , function(){
      show_selection('default');
    });

  }
}








//////////////////////////////
//  ███╗***███╗*█████╗*██████╗*
//  ████╗*████║██╔══██╗██╔══██╗
//  ██╔████╔██║███████║██████╔╝
//  ██║╚██╔╝██║██╔══██║██╔═══╝*
//  ██║*╚═╝*██║██║**██║██║*****
//  ╚═╝*****╚═╝╚═╝**╚═╝╚═╝*****
//  ***************************

//Build our for the first time
function build_map(){


  //We will create the google map here.
  //First, where should we set the user's centre of the map to be on login.
  $.ajax({
   type: "GET",
   dataType:"json",
   data: {
     submitted :  true,
   },
   url: "/functions/get_user_location.php",
  })
  .done(function( data ) {
    var new_data = JSON.parse(data['current_location']);

    starting_location = new_data.location;
    geocoder = new google.maps.Geocoder();

    map = new google.maps.Map(document.getElementById('main_map'), {
      zoom: 4,
      center: starting_location,
      disableDefaultUI: true
    });

    marker_current_position = new google.maps.Marker({
        map:map,
        draggable:true,
        animation: google.maps.Animation.DROP,
        position: starting_location,
        icon: {
          path: 'google.maps.SymbolPath.BACKWARD_OPEN_ARROW',
          fillOpacity: 0,
          fillColor: '#fff',
          strokeOpacity: 1.0,
          strokeColor: '#ff8e3b',
          strokeWeight: 4.0,
          scale: 5 //pixels
        }
    });

    google.maps.event.addListener(marker_current_position, 'dragend', function(){
      geocode_current_location_pin(marker_current_position.getPosition());
      marker_current_position.setPosition(marker_current_position.getPosition());
    });


    draw_all_staff_in_user_comapny();





    function geocode_current_location_pin(pos){
       geocoder = new google.maps.Geocoder();
       geocoder.geocode
        ({
            latLng: pos
        },
            function(results, status)
            {
                if (status == google.maps.GeocoderStatus.OK)
                {
                  /*  $("#mapSearchInput").val(results[0].formatted_address);
                    $("#mapErrorMsg").hide(100); */
                  //repositon map
                  map.setCenter(results[0].geometry.location);
                  map.setZoom(18);

                  var name;
                  var city;
                  var formatted;
                  var place_id;
                  var long = results[0].geometry.location.lng();
                  var lat = results[0].geometry.location.lat();
                  var new_longLat = {lat:lat,lng:long}
                  var country_name;

                  if(typeof results[0].address_components[1] !== 'undefined'){
                    name = results[0].address_components[1].long_name;
                  }else{
                    name = "Undefined";
                  }

                  if(typeof results[0].address_components[2] !== 'undefined'){
                    city = results[0].address_components[2].long_name;
                  }else{
                    city = "Undefined";
                  }

                  if(typeof results[0].place_id !== 'undefined'){
                    place_id = results[0].place_id;
                  }else{
                    place_id = "Undefined";
                  }

                  if(results[0].address_components[6]){
                    var country_name = results[0].address_components[6].long_name;
                  }else{
                    country_name = "undefined";
                  }

                  //This is the location that will be saved to the server
                  update_location_object = {
                    name : name,
                    city : city,
                    formatted : results[0].formatted_address,
                    location : new_longLat,
                    place_id : place_id,
                  };

                  console.log(new_longLat);



                  $('#map_preloader').slideUp(300,function(){
                    $('.update_location_information .location_name').text("" + city + ", " + country_name);
                    //Display information about this location
                    $('.information-overlay').addClass('hidden');
                    $('.update_location_information').slideDown(300);
                  });

                }
                else
                {
                  console.log('error');
                }
            }
        );
    }


  });
}

//Resize our map to be fullscreen
function resize_map(map){
  map.css('height', $(window).height());
  map.css('width',  $(window).width());
}

//Recentre the camera on a new long lat value
function change_map_location(long,lat){
  var move_to_location =  {lat: lat, lng: long};
  map.setCenter(move_to_location);
}


function codeAddress() {
   var address = document.getElementById('search_location_api').value;
   geocoder.geocode( { 'address': address}, function(results, status) {
     if (status == 'OK') {

       $('#search_location_api').slideUp(300,function(){
         $('#search_new_location_button_try_again').slideDown(300);
       });

       //Chang the button
       $('#search_new_location_button').text("Yup, that's it!").removeClass('default').addClass('active');

       //Move the 'new location' out of the way
       $('#add_location_container').addClass('active');

       //repositon map
       map.setCenter(results[0].geometry.location);
       map.setZoom(12);

       new_location_object = {
         name : results[0].address_components[0].long_name,
         city : results[0].address_components[2].long_name,
         formatted : results[0].formatted_address,
         location : results[0].geometry.location,
         place_id : results[0].place_id,
       };
     } else {
       //Chang the button
       $('#search_new_location_button').text("Oops, No results!").removeClass('active').addClass('default');

       //Move the 'new location' out of the way
       $('#add_location_container').removeClass('active');
       new_location_object = '';
     }
   });
}


//When user clicks on 'add new location button - populate the data ';
function add_new_location(){
  codeAddress();
}



appContainer.on('click', '#search_new_location_button', function(){
  if($(this).hasClass('active')){
    //Add location to db
  }else{
    codeAddress();
  }
});



appContainer.on('click', '#search_new_location_button_try_again', function(){
  $('#add_location_container').removeClass('active');
  $('#search_location_api').val('');
  $('#search_new_location_button').text('Search').removeClass('active').addClass('default');
  $('#search_new_location_button_try_again').slideUp(300, function(){
    $('#search_location_api').slideDown(300);
  });
});


/////////////////
////// MAIN FUNCTIONS ( Sidebar buttons )

  //Open add new location
  appContainer.on('click', '#add-location-button', function(){
    $('.information-overlay').addClass('hidden');
    $('#add_location_container').fadeIn(600);
  });
  //Close add new location
  appContainer.on('click' , '#add_location_container .close', function(){
    $('#add_location_container').fadeOut(600, function(){
      $('.information-overlay').removeClass('hidden');
    });
  });


  //If the user clicks to update their current position
  appContainer.on('click', '#update_location_button', function(){
    //Hide the information sidebar
    $('.information-overlay').addClass('hidden');
    $('#map_preloader').fadeIn(300);
    update_user_location();
  });

  //User has searched for a location, now they click on 'yes'
  appContainer.on('click','.update_location_information .yes', function(){
    //submit the location to the server via ajax
    $.ajax({
     type: "GET",
     //dataType:"json",
     data: {
       submitted :  true,
       new_location :  JSON.stringify(update_location_object),
     },
     url: "/functions/update_user_location.php",
    })
    .done(function( data ) {
      console.log('New location saved');
      map.setZoom(4);
      $('.update_location_information').fadeOut(300, function(){
        $('.information-overlay').removeClass('hidden');
      });
    });
  });

  //If user clicks close instead, we want to set things to null etc
  appContainer.on('click', '.close', function(){
    $('.update_location_information').fadeOut(300, function(){
      map.setCenter(starting_location);
      marker_current_position.setPosition(starting_location);
      new_location_object = [];
      map.setZoom(18);
      $('.information-overlay').removeClass('hidden');
    });
  });
























// When the user updates their location by pressing the button
// Add the 'current' location to the previous locations
// and add the 'new' loation and set it as the current one
function update_user_location(){
  //Update user location
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position) {

      var pre_lat  = position.coords.latitude;
      var pre_long = position.coords.longitude;

      var location = "" + pre_lat + " " + pre_long + "";

      var address = location;
      geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == 'OK') {

          //repositon map
          map.setCenter(results[0].geometry.location);
          map.setZoom(18);

          var long = results[0].geometry.location.lng();
          var lat = results[0].geometry.location.lat();
          var new_longLat = {lat:lat,lng:long}


          marker_current_position.setPosition(new_longLat);

          var name;
          var city;
          var formatted;
          var place_id;
          var long = results[0].geometry.location.lng();
          var lat = results[0].geometry.location.lat();
          var new_longLat = {lat:lat,lng:long}
          var country_name;

          if(typeof results[0].address_components[1] !== 'undefined'){
            name = results[0].address_components[1].long_name;
          }else{
            name = "Undefined";
          }

          if(typeof results[0].address_components[2] !== 'undefined'){
            city = results[0].address_components[2].long_name;
          }else{
            city = "Undefined";
          }

          if(typeof results[0].place_id !== 'undefined'){
            place_id = results[0].place_id;
          }else{
            place_id = "Undefined";
          }

          if(results[0].address_components[6]){
            var country_name = results[0].address_components[6].long_name;
          }else{
            country_name = "undefined";
          }


          //This is the location that will be saved to the server
          update_location_object = {
            name : name,
            city : city,
            formatted : results[0].formatted_address,
            location : new_longLat,
            place_id : place_id,
          };


          $('#map_preloader').slideUp(300,function(){
            $('.update_location_information .location_name').text("" + city + ", " + country_name);
            //Display information about this location
            $('.update_location_information').slideDown(300);
          });


        } else {
          console.log('no results');
        }
      });
    });
  }else{
    alert("User has not enabled locations. Application may not function as expected.");
  }
}


////////// User account functions
function populate_userdata(){
  $.ajax({
   type: "GET",
   data: {
     submitted: true,
   },
   dataType:"json",
   url: "/functions/get_userdetails.php",
  })
  .done(function( data ) {
    if(data != false){
      //Username
      $('.user_name').text(data[0]);
      //The user's avatar (using gravatar)
      var background_image = 'https://www.gravatar.com/avatar/' + data[1] + '?s=200';
      $('.main_user_avatar').css('background-image', 'url(' + background_image + ')');
    }else{
      console.log('Could not find a username to match id.');
    }
  });
}










//////////////////
//////// THE TRAVEL PLAN SECTION
//////// - When a user clicks the button
///////  - Hide information overlay []
///////  - Display all previous travel plans in a list []
///////  - Add buttons for 'Add New Travel Plan' []
//////   - Allan [bookmark]

appContainer.on('click', '#add-travel-plan', function(){
  $('.information-overlay').addClass('hidden');
  get_user_travel_plans();
});


// Get and display the user's upcoming travel plans
function get_user_travel_plans(){
  $.ajax({
   type: "GET",
   data: {
     submitted: true,
   },
   dataType:"json",
   url: "/functions/get_travelplans.php",
  })
  .done(function( data ) {
    console.log(data);
    if(data != false){

      //Loop over each TRAVEL PLAN
      for(i = 0; i < data.length; i++){
        //console.log(data[i]['Locations']);
        //var json_object = JSON.parse(data[i]['Locations']);
        //console.log(json_object);
        //var location = json_object.location;
        //console.log(location);
        //var location_array = location.split(',');

        //Now, for each TRAVEL PLAN loop over the locations!
        for(x = 0; x < data[i].Locations.length; x++){
          travel_plan_location = new google.maps.Polyline({
            path: {lat:parseFloat(location_array[0]),lng: parseFloat(location_array[1])},
            //geodesic: true,
            strokeColor: '#4286f4',
            strokeOpacity: 1.0,
            strokeWeight: 5
          });

          travel_plan_location.setMap(map);

          // Open the InfoWindow on mouseover:
          travel_plan_location.addListener('click', function(e) {
            map.setCenter(e.latLng);
          });

        }
      }

















      //Data about the plans
      var plan = {
        title: data[0],
        lnglat: [],
      }

      //The line data
      var line_data = {
        lines: [],
      }


      function generate_lines(long,lat){
        var lat  = parseFloat(lat);
        var long = parseFloat(long);
        var returnPath = {lat:lat,lng:long};
        return returnPath;
      }





    }else{
      console.log('Could not find a username to match id.');
    }
  });
}


/////////////////
//////// SHOW ALL STAFF INFORMATION
/////////////////


  /////////////// Let's draw all the people in your company - their last location!
  function draw_all_staff_in_user_comapny(){

    //Connect to the company table where ID  = user_company_id
    $.ajax({
     type: "GET",
     data: {
       submitted :  true,
     },
     dataType : "JSON",
     url: "/functions/get_teammembers.php",
    })
    .done(function( data ) {
      console.log(data);
      for(var i=0;i < data.length;i++) {
        var current_location  = JSON.parse((data[i]['current_location']));
        var current_location_lng_lat = current_location.location.lat;
        console.log(data[i]['Colour']);

        marker = new google.maps.Marker({
           map: map,
           animation: google.maps.Animation.DROP,
           position: new google.maps.LatLng(parseFloat(current_location.location.lat),parseFloat(current_location.location.lng)),
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillOpacity: 0.2,
              fillColor: '#fff',
              strokeOpacity: 1.0,
              strokeColor: data[i]['Colour'],
              strokeWeight: 5.0,
              scale: 20 //pixels
            }
        });


        /*

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
             return function() {
                 infowindow.setContent(locations[i][0]);
                 infowindow.open(map, marker);
             }
        })(marker, i));
        */


      }
    });
  }

  //allan



 function display_team_members_panel(){
   $('.information-overlay').addClass('hidden');
 }










  //////// When user clicks on 'View Team'
  appContainer.on('click', '#view-team', function(){
    display_team_members_panel();
  });

















//  ██╗******██████╗**██████╗******██████╗*██╗***██╗████████╗
//  ██║*****██╔═══██╗██╔════╝*****██╔═══██╗██║***██║╚══██╔══╝
//  ██║*****██║***██║██║**███╗****██║***██║██║***██║***██║***
//  ██║*****██║***██║██║***██║****██║***██║██║***██║***██║***
//  ███████╗╚██████╔╝╚██████╔╝****╚██████╔╝╚██████╔╝***██║***
//  ╚══════╝*╚═════╝**╚═════╝******╚═════╝**╚═════╝****╚═╝***
//  *********************************************************

//No matter where the user is, if they press the log out button, do so.
appContainer.on('click', '#log_out_button', function(){
  log_out_user();
});

function log_out_user(){
  $.ajax({
   type: "GET",
   data: {
     submitted :  true,
   },
   url: "/functions/function_logout.php",
  })
  .done(function( data ) {
    alert(data);
    //init_all();
  });
}

  /////// VARS
  var map;


  $(window).on('load', function(){
    //If the user is on the map page
    if($('body').hasClass('map_view')){



    }
  });

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
