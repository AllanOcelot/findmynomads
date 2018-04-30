//////////////////////////////
//////// User lands on page //
//////////////////////////////
$('window').ready(function(){
  //Check the session. Act accordinly.
  check_user_session();
});

//All of our app takes place inside this container
var appContainer = $('body');

var user_logged_in = '';
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
   url: "functions/get_session.php",
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

  //var myNode = document.getElementById("find-my-nomads-main");
  //while (myNode.firstChild) {
  //    myNode.removeChild(myNode.firstChild);
  //}
  if(user_logged_in == true){

    $('.introduction').remove();

    //The user goes to the 'map' page - our main page
    $.ajax({
     type: "GET",
     url: "templates/main.php",
    })
    .done(function( data ) {
      $('#find-my-nomads-main').remove();
      $('body').prepend(data);
      window.setTimeout(function(){

          resize_map($('#main_map'));
          //populate_userdata();
          build_map();
          build_sidebar();
          $('#main_map').fadeIn(300);
          //Once the map is built, always re center it on the 'current location' of the user
          //Get the user travel plans
          //get_user_travel_plans(check_user_session() , map);

      }, 1000);
    });
  // END OF LOGGED IN CODE
  }else{
  // START OF NOT LOGGED IN (HOME) CODE
  //Get the home template
    $.ajax({
      type: "GET",
      url: "templates/home.php",
    }).done(function( data ) {
      //Add the template to the page
      $('#find-my-nomads-main').html(data);
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

        //Check the user input (email) containers no crazy or weird shit
        function validate_username_input(){
          var input = $('#usr_username').val();
          if(input){
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
          if(validate_username_input() != null && validate_password_input() != null){
            $.ajax({
             type: "GET",
             data: {
               submitted: true,
               user_name: validate_username_input(),
               user_pass: validate_password_input(),
             },
             url: "functions/check_user.php",
            })
            .done(function( data ) {
              //IF the data returned tells us it's all valid, continue to check_user_session as this will show the map page
              if(data == true) {
                check_user_session();
              }else{

              }
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
                console.log( $('#company_name').val() );
                console.log( $('#new_email_address').val() );
                console.log( $('#new_company_password').val() );
                //Create the account
                $.ajax({
                 type: "GET",
                 data: {
                   submitted: true,
                   company_name     : $('#company_name').val(),
                   company_email    : $('#new_email_address').val(),
                   company_password : $('#new_company_password').val(),
                 },
                 url: "functions/register_company.php",
                })
                .done(function( data ) {
                    console.log(data);
                });
              }else{
                alert('error at register script');
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



function build_sidebar() {
  if(!$('.information-overlay').length){
    //Get all staff from this account's company and display their location
    $.ajax({
    type: "GET",
    dataType: "html",
    data: {
      submitted :  true,
    },
    url: "templates/sidebar.php",
    success: function (data) {
        $('.main_map_container').append(data);
        $('.information-overlay').addClass('active');
    },
    error: function (request, status, error) {
        alert(request.responseText);
    }
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
   url: "functions/get_user_location.php",
   success: function (data) {

     ///var new_data = JSON.parse(data['longlat']);
     starting_location = new google.maps.LatLng(data['longitude'], data['latitude']);
     geocoder = new google.maps.Geocoder();

     map = new google.maps.Map(document.getElementById('main_map'), {
       zoom: 4,
       center: starting_location,
       disableDefaultUI: true,
       minZoom: 3,
       maxZoom: 15
     });

     marker_current_position = new google.maps.Marker({
         map:map,
         draggable:true,
         animation: google.maps.Animation.DROP,
         position: starting_location,
         icon: {
           path: google.maps.SymbolPath.CIRCLE,
           fillOpacity: 0.2,
           fillColor: '#fff',
           strokeOpacity: 1.0,
           //strokeColor: data[i]['Colour'],
           strokeWeight: 5.0,
           scale: 20 //pixels
         }
     });

     google.maps.event.addListener(marker_current_position, 'dragend', function(){
       geocode_current_location_pin(marker_current_position.getPosition());
       marker_current_position.setPosition(marker_current_position.getPosition());
     });


     //We want to draw all staff who belong to company X

     //draw_all_staff_in_user_comapny();


     // We use this to 'build' information about the location
     /*
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
     */
   },
   error: function (request, status, error) {
       alert(request.responseText);
   }
  });

  //Get all staff from this account's company and display their location
  $.ajax({
  type: "GET",
  dataType: "json",
  data: {
    submitted :  true,
  },
  url: "functions/get_staff_last_location.php",
  success: function (data) {
    data.forEach(function(item) {

    staff_member_last_location = new google.maps.LatLng(item.latitude, item.longitude);

    //Generate the image, via the user's provided email address and set it as the marker.
    var image = 'https://www.gravatar.com/avatar/' + item.owner_email_hash + '?s=24';

    var icon = {
      url: image, // url
      size: new google.maps.Size(24, 24),
      scale: 1,
      anchor: new google.maps.Point(12, 45),
    };

    marker_staff_last_position_image= new google.maps.Marker({
        map:map,
        draggable:false,
        animation: google.maps.Animation.DROP,
        position: staff_member_last_location,
        icon: icon
    });

    var icon = {
        //path: "M950,295.4c-8.3,0-15,3.6-15,15.6c0,12,15,32.9,15,32.9s15-20.9,15-32.9C965,299,958.3,295.4,950,295.4z,M950,322.8c-6.6,0-12-5.4-12-12s5.4-12,12-12s12,5.4,12,12S956.6,322.8,950,322.8z",
        //fillColor: '#FFF',
        //fillOpacity: 1,
        url : "images/icons/pin_icon.png",
        strokeWeight: 0,
        size: new google.maps.Size(30, 49),
        scaledSize: new google.maps.Size(30, 49),
        anchor: new google.maps.Point(15,49) // anchor
    }

    var marker = new google.maps.Marker({
        position: staff_member_last_location,
        map: map,
        draggable: false,
        icon: icon
    });


    //When clicked, use this ID to look up the location and populate our box;
    //marker_staff_last_position.location_ID = item.ID;

    //marker_staff_last_position.addListener('click', function() {
    //    console.log(this.location_ID);
    //});



    });
    //Once all the map data has been generated, we get the sidebar.

    $('.information-overlay').addClass('active');
    //Hide the preloader
    $('#map_preloader').slideUp(200);
  },
  error: function (request, status, error) {
      alert(request.responseText);
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

   //We GEOcode the user's location using the googel maps api
   geocoder.geocode( { 'address': address}, function(results, status) {
     //If it's a valid address, we proceed
     if (status == 'OK') {

       $('#search_location_api').slideUp(300,function(){
         $('#search_new_location_button_try_again').slideDown(300);
       });

       //Chang the button
       $('#search_new_location_button').text("Yup, that's it!").removeClass('default').addClass('active');

       //Move the 'new location' out of the way
       $('#add_location_container').addClass('right');

       //The URL we want to query to get the nearest road point
       var marker_user_add_location;
       var long = results[0].geometry.location.lng();
       var lat = results[0].geometry.location.lat();
       var new_point = "" + lat + "," + long;

       //console.log(results[0].geometry.location.lng());
       //console.log(results[0].geometry.location);
       var google_roads_response = "https://roads.googleapis.com/v1/nearestRoads?points=" + new_point + "&key=AIzaSyCjp6Sn-zK4IMI3DRfGO42gfieXo3xKvYQ";

       $.ajax({
        type: "POST",
        url: google_roads_response,
       })
       .done(function( data ) {
         console.log(data);
         var lat = data.snappedPoints[0].location.latitude;
         var lng = data.snappedPoints[0].location.longitude;

         var newLatLong = {lat:lat,lng:long};

         //Create a draggable marker for the location, incase they need to refine it.
         marker_user_add_location = new google.maps.Marker({
             map:map,
             draggable:true,
             animation: google.maps.Animation.DROP,
             position: newLatLong,
         });

         google.maps.event.addListener(marker_user_add_location, 'dragend', function(){
          // geocode_current_location_pin(marker_current_position.getPosition());
          // marker_current_position.setPosition(marker_current_position.getPosition());
          console.log('Pin has been dragged');
         });

         map.setCenter(newLatLong);
         map.setZoom(12);


       });








      // new_location_object = {
      //   name : results[0].address_components[0].long_name,
      //   city : results[0].address_components[2].long_name,
      //   formatted : results[0].formatted_address,
      //   location : results[0].geometry.location,
      //   place_id : results[0].place_id,
      // };
     }
     //The address the user' gave is not recognised by google. Somthing is wrong.
     else {
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
  $('#add_location_container').removeClass('right');
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
    $('#add_location_container').addClass('active');
  });
  //Close add new location
  appContainer.on('click' , '#add_location_container .close', function(){
    $('#add_location_container').fadeOut(600, function(){
      $('#add_location_container').removeClass('active').removeClass('right');
      $('.information-overlay').removeClass('hidden');
    });
  });


  //If the user clicks to update their current position
  $('body').on('click', '#update_location_button', function(){
    //Hide the information sidebar
    alert('clicked');
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
      map.setZoom(4);
      $('.update_location_information').fadeOut(300, function(){
        $('.information-overlay').removeClass('hidden');
      });
    });
  });

  //If user clicks close instead, we want to set things to null etc
  //This is super bad code - why is this closing everything?
  appContainer.on('click', '.close', function(){
    $('.update_location_information').fadeOut(300, function(){
      map.setCenter(starting_location);
      marker_current_position.setPosition(starting_location);
      new_location_object = [];
      map.setZoom(18);
      $('.information-overlay').removeClass('hidden');
    });
  });

  //////////////////////
  ////////// USER SETTINGS
  appContainer.on('click', '#user-settings', function(){
    //Fade in the user settings panel
    $('.information-overlay').addClass('hidden');
    $('.update_user_settings').fadeIn(600);
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
  console.log('try to log out');
  log_out_user();
});

function log_out_user(){
  $.ajax({
   type: "GET",
   data: {
     submitted :  true,
   },
   url: "functions/function_logout.php",
  })
  .done(function( data ) {
    init_all();
  });
}

//I don't want to bombard the server, so we only run checks on inputs after 5 seconds
var lastTimeSinceUserInput = 5000;

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


    //TODO - these should not be alerts, they should be styling the inputs with feedback etc.

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

  alert(readCookie('user_login_attempts'));
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

  /////// VARS
  var map;


  $(window).on('load', function(){
    //If the user is on the map page
    if($('body').hasClass('map_view')){



    }
  });
