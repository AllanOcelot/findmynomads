<?php
session_start();

    //// The sidebar will only spit out information relivant to the user.

    //Has to be made via an AJAX call
    if(isset($_GET["submitted"])){
      include '../functions/DB_companies.php';
      if(isset($_SESSION['user_id'])){

        $query = $conn->prepare( "SELECT userName, email_hash, role FROM users WHERE ID = ?" );
        $query->bindValue( 1, $_SESSION['user_id']);
        $query->execute();
        $result = $query->fetchAll(PDO::FETCH_ASSOC);

      }else{
        echo false;
      }
    }else{
      echo false;
    }





















$HTML = "";

$HTML .="
<div class='information-overlay'>
  <h3 class='title'>FindMyNomads</h3>
  <div class='user_block'>
    <div class='main_user_avatar' style='background-image:url(https://www.gravatar.com/avatar/". $result[0]['email_hash']  ."?s=124)'></div>
    <div class='user_content_container'>
        <p>Hi <span class='user_name'>". $result[0]['userName'] ."</span>.</p>
        <ul class='details'>
          <li>Location: </li>
          <li>Last Update: </li>
          <li>Timezone: </li>
        </ul>
    </div>
  </div>

  <div class='sidebar-button-container'>
    <div class='sidebar-button' id='update_location_button'>Update Location <i class='fa fa-map-pin' aria-hidden='true'></i></div>";

    //Only nomads can update their location. It's assumed team owners will be stationairy
    if($result[0]['role'] === 0){
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
