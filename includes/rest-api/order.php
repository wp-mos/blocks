<?php

  function mos_rest_api_order_handler($request)
  {
    $response = ['status' => 1];
    $params = $request->get_params();

    $file = $request->get_file_params();
    $file_name = basename($file['fileToUpload']['name']);
    $file_tmp_name = $file['fileToUpload']['tmp_name'];

    // Set target directory
    $upload_dir = wp_upload_dir();
    $target_dir = $upload_dir['basedir'] . '/order-uploads/';
    $target_file = $target_dir . $file_name;

    if (file_exists($target_file)) {
      $response['status'] = 'error';
      $response['message'] = 'File already exists';
    } else {
      if (move_uploaded_file($file_tmp_name, $target_file)) {
        $response['status'] = 2;
        $response['message'] = 'File uploaded successfully';
      } else {
        $response['status'] = 'error';
        $response['message'] = 'File upload failed';
      }
    }

    $response['target'] = $target_file;
    $response['params'] = $params;

    $response['status'] = 2;
    return rest_ensure_response($response);
  }

