<?php
session_start();

    //// The sidebar will only spit out information relivant to the user.

    //Has to be made via an AJAX call
    if(isset($_GET["submitted"])){
      include '../DB_companies.php';

	  //Select all users who's company_ID matches the one we send, Who's ID !Equal to the current users ID.
	  //TODO: - User's need to have (Real_name, Last_location -> linked to Locations table  (sort via date of last location ))
	  //TODO: - When a user log's out, we should keep a 'last seen' timestamp for them and display it.
	  //TODO: - Then we should calculate that with the user's timezone.

	  $query = $conn->prepare( "SELECT userName, user_real_name, user_role_title, user_last_location_id , email_hash, company_ID FROM users WHERE company_ID = ? AND ID <> ?" );
	  $query->bindValue( 1, $_SESSION['company_id']);
	  $query->bindValue( 2, $_SESSION['user_id']);
	  $query->execute();

	  //Will house all of our user's the company has and their details
	  $userList = $query->fetchAll(PDO::FETCH_ASSOC);
      //Increment as we go over each user.
      $userCount = 0;

	$HTML = "";

    $HTML .="
        <div class='title-container'>
            <div class='title'>Your Team</div>

            <div class='close-panel-icon'>
                <i class='fa fa-times'></i>
            </div>
        </div>

		<div class='panel-content-container'>
			<div class='introduction'>
				<div class='title'>
					Example title
				</div>
				<p>Welcome to the team panel, from here you can view and manage all aspects of your team.</p>
			</div>

			<div class='scroll_container team-container'>";


		foreach($userList as $row) {
			$HTML .= "
						<div class='item team_member' style='background-image:url(https://www.gravatar.com/avatar/". $row['email_hash']  ."?s=430)'>
						  <div class='user_details'>
							  <div class='name'>" . $row['userName'] . " ("  . $row['user_real_name'] . ")</div>
							  <div class='role'>" . $row['user_role_title'] . "</div>";

                              $query = $conn->prepare( "SELECT name, longitude, latitude, timezone FROM locations WHERE ID = ?" );
                              $query->bindValue( 1, $row['user_last_location_id']);
                        	  $query->execute();
                        	  $locationList = $query->fetch();

			$HTML .= "
                        <div class='location'>". $locationList['name'] ." <span class='timezone'>". $locationList['timezone'] ." ( UTC )</div>
						  </div>
						  <div class='actions'>
							  <div class='action show_on_map' data-longitude='". $locationList['longitude'] ."' data-latitude='". $locationList['latitude'] ."'><i class='fa fa-map-marker' aria-hidden='true'></i></div>
							  <div class='action show_user_taks'><i class='fa fa-briefcase' aria-hidden='true'></i></div>
							  <div class='action contact_user'><i class='fa fa-envelope' aria-hidden='true'></i></div>
						  </div>
						</div>";
            $userCount++;
		}


	$HTML .="</div>";


    //Query the company via id and see how many users they are allowed.
    $max_users_query = $conn->prepare( "SELECT max_users FROM companies WHERE ID = ?" );
    $max_users_query->bindValue( 1, $userList[0]['company_ID']);
    $max_users_query->execute();
    $max_users_result = $max_users_query->fetch();

    $max_users = (int)$max_users_result['max_users'];

    if($userCount === $max_users){
        $HTML .= "
        <div class='button-container'>
            <p class='info'>You have reached your user limit, why not add more?.</p>
            <div class='button' id='add_more_users_to_plan'> Add more users <i class='fa fa fa-plus-square-o' aria-hidden='true'></div>
        </div>
        ";
    }else{
        $users_left_on_plan = $max_users-$userCount;
        $HTML .= "
        <div class='button-container'>
            <p class='info'>You currently have". $users_left_on_plan ." users available on your plan.</p>
            <div class='button' id='add_new_team_member'>Add a new team member <i class='fa fa-user-plus' aria-hidden='true'></i></div>
            <div class='button' id='add_more_users_to_plan'> Add more users <i class='fa fa fa-plus-square-o' aria-hidden='true'></i></div>
        </div>
        ";
    }











    $HTML .= "</div>";

    }else{
      echo false;
    }


echo $HTML;

?>
