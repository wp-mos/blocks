<?php

  function mos_rest_api_signup_mos_handler($request): array
  {
    $response = ['status' => 1];
    $params = $request->get_json_params();

    if (
      !isset($params['name'], $params['surname'], $params['email'], $params['password'])
      || empty($params['name'])
      || empty($params['surname'])
      || empty($params['email'])
      || empty($params['password'])
    ) {
      return $response;
    }

    $name = sanitize_text_field($params['name']);
    $surname = sanitize_text_field($params['surname']);
    $username = sanitize_text_field($params['name'] . '_' . $params['surname']);
    $tel = sanitize_text_field($params['tel']);
    $email = sanitize_email($params['email']);
    $password = sanitize_text_field($params['password']);

    if (
      username_exists($username) ||
      !is_email($email) ||
      email_exists($email)
    ) {
      return $response;
    }

    $user_id = wp_insert_user([
      'user_login' => $username,
      'user_email' => $email,
      'first_name' => $name,
      'last_name' => $surname,
      'user_pass' => $password,
      'show_admin_bar_front' => false
    ]);

    update_user_meta($user_id, 'phone', $tel);

    if (is_wp_error($user_id)) {
      return $response;
    }

    wp_new_user_notification($user_id, null, 'user');
    wp_set_current_user($user_id);
    wp_set_auth_cookie($user_id);

    $user = get_user_by('id', $user_id);

    do_action('wp_login', $user->user_login, $user);

    $response['status'] = 2;

    return $response;
  }
