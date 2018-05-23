<?php
session_start();

    //// The sidebar will only spit out information relivant to the user.

    //Has to be made via an AJAX call
    if(isset($_GET["submitted"])){
      include '../functions/DB_companies.php';
      if(isset($_SESSION['user_id'])){

        $query = $conn->prepare( "SELECT userName, user_real_name , email_hash, user_last_location_id , role FROM users WHERE ID = ? LIMIT 1" );
        $query->bindValue( 1, $_SESSION['user_id']);
        $query->execute();
        $result = $query->fetch();

      }else{
        echo false;
      }
    }else{
      echo false;
    }

$HTML = "";


//TODO : Apply user settings here to the sidebar for left or right aligned sidebar display

$HTML .="
<div class='information-overlay left'>
	<h3 class='title'>FindMyNomads</h3>
	<div class='user_block'>
		<div class='main_user_avatar' style='background-image:url(https://www.gravatar.com/avatar/". $result['email_hash']  ."?s=430)'></div>
		<div class='user_content_container'>
		    <p class='title'>Hi <span class='user_name'>". $result['user_real_name'] ."</span>.</p>";

            // Get the user's last location ID and populate the data for the sidebar with that info below
            $location_query = $conn->prepare( "SELECT name, timezone, time_edited FROM locations WHERE company_owner_ID = ? AND owner_ID = ? LIMIT 1" );
            $location_query->bindValue( 1, $_SESSION['company_id']);
            $location_query->bindValue( 2, $_SESSION['user_id']);
            $location_query->execute();
            $location_result = $location_query->fetch();

            //Formated the last edited date into human readable
            $last_edit_date = new DateTime($location_result['time_edited']);

            $HTML .= "<p class='info'>". $location_result['name'] . ", " . $location_result['timezone'] ."(UTC) </p>";
            $HTML .= "<p class='info'>Last Update:". $last_edit_date->format('d-m H:i') . "</p>
	</div>
</div>

  <div class='sidebar-button-container'>
    <div class='sidebar-button' id='update_location_button'>Update Location <i class='fa fa-map-pin' aria-hidden='true'></i></div>";

    //Only nomads can update their location. It's assumed team owners will be stationairy
    if($result['role'] === 0){
      $HTML .="<div class='sidebar-button' id='add-location-button'>Add Location <i class='fa fa-globe' aria-hidden='true'></i></div>";
    }

  $HTML .="
    <div class='sidebar-button' id='view-team'>Team<i class='fa fa-users' aria-hidden='true'></i></div>
    <div class='sidebar-button' id='user-settings'>Settings <i class='fa fa-sliders' aria-hidden='true'></i></div>
    <div class='sidebar-button' id='log_out_button'>Log Out <i class='fa fa-sign-out' aria-hidden='true'></i></div>
  </div>
</div>
";

echo $HTML;

?>
