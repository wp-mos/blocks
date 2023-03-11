<?php
function mos_rest_api_order_handler($request)
{
  // Check for authorization token in the request headers
  $headers = $request->get_headers();

  $token = $headers['authorization'];
  $prefix = "Bearer ";
  $user_id = substr($token[0], strlen($prefix));

  // Authenticate the user
  $user = wp_set_current_user($user_id);
  wp_set_auth_cookie($user_id);

  $response = ['status' => 1];
  $params = $request->get_params();

  // Create a product
  $product = new WC_Product();
  $product->set_name($params['name']);
  $product->set_regular_price($params['price']);
  $product->set_description($params['description']);
  $product->set_status('publish');

  // Add the product to the database
  $product_id = $product->save();

  // Get the global cart object
  $cart = WC()->cart->add_to_cart($product_id);

  // Add the product to the cart
  // $cart->add_to_cart($product_id);

  $response['params'] = $params;
  $response['userID'] = $user_id;
  $response['user'] = $user;
  $response['productID'] = $product_id;

  return rest_ensure_response($response);
}
