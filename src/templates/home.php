<?php
  //////// Provide the following HTML back to the user when the homepage is requsted

  $HTML = "";

  $HTML .="
      <div class='introduction default'>
        <h1 class='main-logo'>Find My Nomads</h1>
           <p>If you work with digital nomads, </br>
           you’ll want an easy to use tool to </br>
           keep track of where they are in the world.</p>
         <div class='button-container'>
           <div class='app-button request-login'>Login</div>
           <div class='app-button request-register'>Register</div>
         </div>
      </div>


      <div class='introduction login'>
        <div class='form-container'>
          <h3>Login </h3>
          <form action=''>
            <div class='input-container'>
              <label for='usr_type'>I am a...</label>
              <select id='usr_type' class='text usr_type'>
                <option value='-1'>Please select</option>
                <option value='digital_nomad'>Digital Nomad</option>
                <option value='company'>Team Owner</option>
              </select> 
            </div>
            <div class='input-container'>
              <label for='usr_email'>Email Address:</label>
              <input type='text' name='usr_email' class='text' id='usr_email' placeholder='Please enter your email address'>
            </div>
            <div class='input-container'>
              <label for='usr_pass'>Password:</label>
              <input type='password' name='usr_pass' class='text' id='usr_pass' placeholder=''>
            </div>
            <div class='button-container'>
              <div class='app-button go_home'>Back?</div>
              <input type='text' class='app-button' id='attempt_login' value='Login'>
            </div>
          </form>
        </div>
      </div>


      <div class='introduction register'>
        <div class='form-container'>
          <h3>Let's Go!</h3>
          <p>Quickly register to start tracking your team!</p>

          <form action=''>
          <div class='input-container'>
            <label for='company_name'>Company Name:</label>
            <input type='text' name='company_name' class='text' id='company_name' placeholder='The name of your company / team'>
          </div>

          <div class='input-container'>
            <label for='new_email_address'>Email Address:</label>
            <input type='text' name='new_email_address' class='text' id='new_email_address' placeholder='Where should we send the admin details to?'>
          </div>

          <div class='input-container'>
            <label for='new_company_password'>Password:</label>
            <input type='password' name='new_company_password' class='text' id='new_company_password' placeholder=''>
          </div>

          <div class='button-container'>
            <div class='app-button go_home'>Back?</div>
            <input type='text' class='app-button' id='attempt_create_new' value='Register'>
          </div>

          </form>
        </div>
      </div>


      <div class='project_banner_details'>This is a project by <a href='http://www.workofcode.com' target='_blank'>Allan</div>

      ";

   echo $HTML;


 ?>
