<?php
function mos_rest_api_order_working($request)
{
  $response = ['status' => 1];
  $params = $request->get_params();

  $site_url = get_site_url();
  $api_products_path = '/wp-json/wc/v3/products';

  $app_username = 'rmos5467';
  $app_password = 'HIaD MFjm e8Fz yX3Y 56Xw 5Fo6';

  $product_data = [
    'name' => 'Premium Quality',
    'type' => 'simple',
    'regular_price' => '21.99',
    'description' => 'description',
    'short_description' => 'short description',
  ];

  $url_products = $site_url . $api_products_path;
  $args_get = array(
    'headers' => array(
      "method" => "GET",
      'Authorization' => 'Basic ' . base64_encode($app_username . ':' . $app_password),
      'Content-Type' => 'application/json'
    ),
    'sslverify' => false
  );

  // Set the request arguments
  $args_post = array(
    'method' => 'POST',
    'headers' => array(
      'Authorization' => 'Basic ' . base64_encode($app_username . ':' . $app_password),
      'Content-Type' => 'application/json'
    ),
    'body' => json_encode($product_data),
    'sslverify' => false
  );

  // Make the API request
  // $api_response = wp_remote_get($url_products, $args_get);

  // Retrieve the response code and body from the API response
  // $api_response_code = wp_remote_retrieve_response_code($api_response);
  // $api_response_body = wp_remote_retrieve_body($api_response);

  // Check if the API request was successful
  // if (200 === $api_response_code) {
  // Parse the JSON response body to get the products
  // $products = json_decode($api_response_body);

  // Add the products to the API response array
  // $api_response['products'] = $products;
  // } else {
  // Handle API request errors
  // $error_message = 'Error: API request failed with response code ' . $api_response_code;
  // You can return an error message, log the error, or take any other appropriate action
  // return false;
  // }

  // Make the API request
  $response_product = wp_remote_post($url_products, $args_post);

  // Get the response body
  $response_body = wp_remote_retrieve_body($response_product);

  // Parse the JSON response
  $product = json_decode($response_body);

  // Check for errors
  if (is_wp_error($response)) {
    // handle error
    return false;
  }

  // Output the newly created product's ID
  $response['id'] = $product->id;

  $response['params'] = $params;
  $response['status'] = 2;

  return rest_ensure_response($response);
}
