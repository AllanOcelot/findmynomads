<?php

if(isset(( $_SESSION['user_id']))){
  echo "User ID is :" + $$_SESSION['user_id'];
}else{
  echo "No session set";
  $_SESSION['user_id'] = '094950';
}
?>
 
