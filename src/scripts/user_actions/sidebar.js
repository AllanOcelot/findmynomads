/////////////////
////// ( Sidebar buttons )

	// Active state for sidebar buttons
	appContainer.on('click', '.sidebar-button', function(){
		var this_button = $(this);

		if(this_button.hasClass('active')){
			// Do nothing, we want users to click on a close icon
		}else{
			$('.sidebar-button.active').removeClass('active');
			this_button.addClass('active');
		}
	});

    //Open add new location
    appContainer.on('click', '#add-location-button', function(){
      $('.information-overlay').addClass('hidden');
      $('#add_location_container').addClass('active');
    });

	// When user clicks on 'View Team'
	appContainer.on('click', '#view-team', function(){
	  display_panel('team');
	});

    // When user clicks on 'View Team'
    appContainer.on('click', '#user-settings', function(){
      display_panel('settings');
    });

    //If the user clicks to update their current position
    $('body').on('click', '#update_location_button', function(){
      //Hide the information sidebar
      $('.information-overlay').addClass('hidden');
      preloader_show();
      update_user_location();
    });
