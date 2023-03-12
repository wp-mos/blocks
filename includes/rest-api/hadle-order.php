<?php

use Automattic\WooCommerce\Client;

function mos_rest_api_handle_order($request)
{
  $response = ['status' => 1];
  $params = $request->get_params();

  $key = 'ck_e6fb7653610a2f5c941200b0b7eb74619325af9d';
  $secret = 'cs_5f49341d20fa9bfe6b68a270899a00cb73c8fc7b';

  // Authenticate to the WooCommerce REST API
  $woo = new Client(
    'https://mos.local',
    $key,
    $secret,
    [
      'version' => 'wc/v3',
      'debug' => true,
    ]
  );


  // Check if the authentication was successful
  if (is_wp_error($woo)) {
    $response['authentication'] = 'Authentication failed.';
    return new WP_Error('authentication_failed', 'Authentication failed.', array('status' => 401));
  } else {
    $response['authentication'] = 'Authentication successful.';
  }

  // Create a new product using the WooCommerce REST API
  // $product_data = array(
  //   'name' => 'Test Product',
  //   'regular_price' => '9.99',
  //   'type' => 'simple',
  //   'description' => 'This is a test product.',
  //   // Add any additional product data here
  // );

  // $product = $woo->post('products', $product_data);

  $response['woo'] = $woo;
  $response['params'] = $params;
  $response['status'] = 2;

  return rest_ensure_response($response);
}
