<?php
function mos_rest_api_order_copy($request)
{
  $response = ['status' => 1];
  $params = $request->get_params();

  $auth_token = isset($_SERVER['HTTP_AUTHORIZATION']) ? $_SERVER['HTTP_AUTHORIZATION'] : '';

  // Extract the user ID from the auth token
  $userId = null;
  if (strpos($auth_token, 'Bearer ') === 0) {
    $token = substr($auth_token, 7); // remove "Bearer " prefix
    $token = urldecode($token); // decode the URL-encoded token
    $userQuery = new WP_User_Query([
      'meta_key' => 'auth_token',
      'meta_value' => $token,
    ]);
    $users = $userQuery->get_results();
    if (!empty($users)) {
      $user = $users[0];
      $userId = $user->ID;
    }
  }

  $response['auth_token'] = $auth_token;
  $response['user_id'] = $userId;
  $response['params'] = $params;
  $response['status'] = 2;

  return rest_ensure_response($response);
}
