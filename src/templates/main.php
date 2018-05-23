<?php
  //////// Provide the following HTML back to the user when the homepage is requsted

  $HTML = "";


  //In Regards to HTML, unsure if we should AJAX in the blocks below on an 'as when needed' basis
  $HTML .="
    <div class='main_map_container'>
      <div id='map_preloader'>
	  	<div class='preloader_wrapper'>
			<div class='pre_loader'></div>
	        <h3>Loading</h3>
	        <p>Thank you for using FindMyNomads!</p>
		</div>
      </div>

      <div id='main_map'></div>

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

      <div class='update_user_settings'>
        <div class='close'>
          <i class='fa fa-times-circle' aria-hidden='true'></i>
        </div>
        <div class='options-block-container'>
          <h4>Edit User Settings:</h4>
          <p>You can edit your user settings below:</p>

        </div>
      </div>

      <div class='panel left'></div>
    </div>

    <script type='text/javascript'>
      $('body').addClass('map_view');
    </script>

    <script src='https://use.fontawesome.com/4ef0ddee80.js'></script>

  ";

   echo $HTML;


 ?>
