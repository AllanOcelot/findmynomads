<?php
  //////// Provide the following HTML back to the user when the homepage is requsted

  $HTML = "";

  $HTML .="
    <div class='main_map_container'>
      <div id='map_preloader'>
        <div class='pre_loader'></div>
        <h3>Loading</h3>
        <p>Thank you for using FindMyNomads!</p>
      </div>

      <div id='main_map'></div>

      <div class='information-overlay'>
        <h3 class='title'>FindMyNomads</h3>
        <div class='user_block'>
          <div class='main_user_avatar'></div>
          <div class='user_content_container'>
              <p>Hi <span class='user_name'></span>.</p>
              <ul class='details'>
                <li>Location: </li>
                <li>Last Update: </li>
                <li>Timezone: </li>
              </ul>
          </div>
        </div>

        <div class='sidebar-button-container'>
          <div class='sidebar-button' id='update_location_button'>Update Location <i class='fa fa-map-pin' aria-hidden='true'></i></div>
          <div class='sidebar-button' id='add-location-button'>Add Location <i class='fa fa-globe' aria-hidden='true'></i></div>
          <div class='sidebar-button' id='add-travel-plan'>Travel Plans <i class='fa fa-plane' aria-hidden='true'></i></div>
          <div class='sidebar-button' id='view-team'>Team Members<i class='fa fa-users' aria-hidden='true'></i></div>
          <div class='sidebar-button' id='user-settings'>Edit Settings <i class='fa fa-sliders' aria-hidden='true'></i></div>
          <div class='sidebar-button' id='log_out_button'>Log Out <i class='fa fa-sign-out' aria-hidden='true'></i></div>
        </div>
      </div>




      <div id='add_location_container'>
        <div class='close'>
          <i class='fa fa-times-circle' aria-hidden='true'></i>
        </div>
        <h4>Add a location?</h4>
        <p>A location is simply a place you've visited in the past, it's a great way to 'tick off' destinations!</p>
        <div id='user_add_location'>
          <div class='input_container'>
            <input type='text' class='text' id='search_location_api' placeholder='Search for a location...'></input>
            <div class='button default' id='search_new_location_button'>Search</div>
            <div class='button try_again' id='search_new_location_button_try_again'>Not even close!</div>
          </div>
        </div>
      </div>

      <div class='update_location_information'>
      <div class='close'>
        <i class='fa fa-times-circle' aria-hidden='true'></i>
      </div>
        <h4>Is this it?</h4>
        <p>That looks like </br>
        <span class='location_name'></span>.</p>
        <input type='text' hidden value='' id='update_location_information_search' class='hidden'></input>
        <div class='button yes'>Yes, update location.</div>
      </div>






    </div>

    <script type='text/javascript'>
      $('body').addClass('map_view');
    </script>

    <script src='https://use.fontawesome.com/4ef0ddee80.js'></script>

  ";

   echo $HTML;


 ?>
