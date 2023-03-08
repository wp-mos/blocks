<?php

  function mos_rest_api_order_handler($request)
  {
    // Check for authorization token in the request headers
    $headers = $request->get_headers();
    $auth_token = $headers['authorization'] ?? '';

    $token = $headers['authorization'];
    $prefix = "Bearer ";
    $user_id = substr($token[0], strlen($prefix));

    $response = ['status' => 1];
    $params = $request->get_params();

    $files = $_FILES;
    foreach ($files as $file) {
      $file_name = basename($file['name']);
      $file_path = $file['tmp_name'];

      // Set target directory
      $upload_dir = wp_upload_dir();
      $target_dir = $upload_dir['basedir'] . '/order-uploads/';
      $target_file = $target_dir . $file_name;

      if (file_exists($target_file)) {
        $response['status'] = 'error';
        $response['message'] = 'File already exists';
      } else {
        if (move_uploaded_file($file_path, $target_file)) {
          $response['status'] = 2;
          $response['message'] = 'File uploaded successfully';
        } else {
          $response['status'] = 'error';
          $response['message'] = 'File upload failed';
        }
      }
    }

    $response['params'] = $params;
    $response['files'] = $user_id;

    $response['status'] = 2;
    return rest_ensure_response($response);
  }
