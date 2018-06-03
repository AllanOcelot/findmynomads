<?php
session_start();

    //// The sidebar will only spit out information relivant to the user.

    //Has to be made via an AJAX call
    if(isset($_GET["submitted"])){
      include '../DB_companies.php';


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
					Add New Team Member
				</div>
				<p>Provide us with an Email address and we'll send an activation link to your new team member <span class='help-icon' >? <span class='tooltip'>example tooltip text here.</span></span>.</p>
			</div>";


    $HTML = "
        <form id='create_new_nomad'>
            <label for='new_user_email'>New User's Email Address:</label>
            <input id='new_user_email' type='text' placeholder='Email Address' />
            <input type='submit' value='Send out invite' />
        </form>
    ";

    }else{
      echo false;
    }


echo $HTML;

?>
