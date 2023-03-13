<?php
function mos_rest_api_handle_order($request)
{
  $response = ['status' => 1];
  $params = $request->get_params();

  $key = 'ck_e6fb7653610a2f5c941200b0b7eb74619325af9d';
  $secret = 'cs_5f49341d20fa9bfe6b68a270899a00cb73c8fc7b';

  $app_password = 'HIaD MFjm e8Fz yX3Y 56Xw 5Fo6';

  $url = 'http://localhost:10009/wp-json/wc/v3/products';
  $args = array(
    'headers' => array(
      'Authorization' => 'Basic ' . base64_encode('rmos5467' . ':' . $app_password)
    ),
    'sslverify' => false
  );
  $response = wp_remote_get($url, $args);
  $response_code = wp_remote_retrieve_response_code($response);
  $response_body = wp_remote_retrieve_body($response);
  if ($response_code == 200) {
    $products = json_decode($response_body);
    return $products;
  } else {
    return false;
  }

  $response['params'] = $params;
  $response['status'] = 2;

  return rest_ensure_response($response);
}
