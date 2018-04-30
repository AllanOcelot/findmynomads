<?php
session_start();

  //Has to be made via an AJAX call
  if(isset($_GET["submitted"])){
    if(isset($_SESSION['user_id'])){
      if($_SESSION['user_id'] != null){
        echo $_SESSION['user_id'];
      }else{
        echo false;
      }  
    }
  }else{
    echo false;
  }

?>
