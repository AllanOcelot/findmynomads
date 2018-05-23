<?php
session_start();

    //// The sidebar will only spit out information relivant to the user.

    //Has to be made via an AJAX call
    if(isset($_GET["submitted"])){
      include '../functions/DB_companies.php';

	  //Select all users who's company_ID matches the one we send, Who's ID !Equal to the current users ID.
	  //TODO: - User's need to have (Real_name, Last_location -> linked to Locations table  (sort via date of last location ))
	  //TODO: - When a user log's out, we should keep a 'last seen' timestamp for them and display it.
	  //TODO: - Then we should calculate that with the user's timezone.

	  $query = $conn->prepare( "SELECT userName, user_real_name, user_role_title, user_last_location_id FROM users WHERE company_ID = ? AND ID <> ?" );
	  $query->bindValue( 1, $_SESSION['company_id']);
	  $query->bindValue( 2, $_SESSION['user_id']);
	  $query->execute();

	  //Will house all of our user's the company has and their details
	  $userList = $query->fetchAll(PDO::FETCH_ASSOC);

	  $HTML = "";

	  $HTML .="
  		<div class='panel team-panel'>

			<div class='title-container'>
				<div class='title'>
					Team
				</div>

				<div class='close-panel-icon'>
					close icon here
					##TODO
				</div>
			</div>

			<div class='panel-content-container'>
				<div class='introduction'>
					<div class='title'>
						Example title
					</div>
					<p>Welcome to the team panel, from here you can view and manage all aspects of your team.</p>
				</div>

				<div class='scroll_container team-container'>
		";


		foreach($userList as $row) {
			$HTML .= "
						<div class='item team_member' style='background-image:url(https://loremflickr.com/400/400/human,computer)'>
						  <div class='user_details'>
							  <div class='name'>" . $row['userName'] . " ("  . $row['user_real_name'] . ")</div>
							  <div class='role'>" . $row['user_role_title'] . "</div>";

                              $query = $conn->prepare( "SELECT name, timezone FROM locations WHERE ID = ?" );
                              $query->bindValue( 1, $row['user_last_location_id']);
                        	  $query->execute();
                        	  $locationList = $query->fetch();

			$HTML .= "
                        <div class='location'>". $locationList['name'] ." <span class='timezone'>". $locationList['timezone'] ." ( UTC )</div>
						  </div>
						  <div class='actions'>
							  <div class='action show_on_map'><i class='fa fa-map-marker' aria-hidden='true'></i></div>
							  <div class='action show_user_taks'><i class='fa fa-briefcase' aria-hidden='true'></i></div>
							  <div class='action contact_user'><i class='fa fa-envelope' aria-hidden='true'></i></div>
						  </div>
						</div>";
		}


		$HTML .="
            <div class='button'> Add more users </div>
			</div>
		</div>
	  ";

    }else{
      echo false;
    }


echo $HTML;

?>
