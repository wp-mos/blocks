<?php
function mos__generate_auth_token($user_login, $user)
{
  $token = md5(uniqid(rand(), true));
  setcookie('auth_token', $token, time() + (86400 * 30), '/'); // set cookie for 30 days
  update_user_meta($user->ID, 'auth_token', $token);
}

