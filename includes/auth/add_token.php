<?php
function mos_add_auth_token_to_api_request($args, $url)
{
  $site_url = get_site_url();
  $url_route = $site_url . '/mos/v1/order';

  if (strpos($url, $url_route) !== false) {
    $auth_token = isset($_COOKIE['auth_token']) ? $_COOKIE['auth_token'] : '';
    if (!$auth_token) {
      $user_id = get_current_user_id();
      $auth_token = get_user_meta($user_id, 'auth_token', true);
    }
    $args['headers']['Authorization'] = 'Bearer ' . $auth_token;
  }
  return $args;
}
