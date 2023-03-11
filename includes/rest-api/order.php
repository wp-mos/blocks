<?php
function mos_rest_api_order($request)
{
  $response = ['status' => 1];
  $params = $request->get_params();

  // Check if auth_token cookie is set
  if (!isset($_COOKIE['auth_token'])) {
    $response['status'] = 1;
    $response['message'] = 'You must be logged in to submit an order.';
  }

  // Get the auth_token cookie value
  $auth_token = sanitize_text_field($_COOKIE['auth_token']);

  // Get the user ID associated with the token
  $user_id = get_users(array(
    'meta_key' => 'auth_token',
    'meta_value' => $auth_token,
    'fields' => 'ID'
  ));

  // Check if user ID was found
  if (empty($user_id)) {
    $response['status'] = 1;
    $response['message'] = 'User not found.';
  }

  // Get the current user object
  $current_user = get_user_by('ID', $user_id[0]);

  // Create a product
  // $product = new WC_Product();
  // $product->set_name($params['name']);
  // $product->set_regular_price($params['price']);
  // $product->set_description($params['description']);
  // $product->set_status('publish');

  // Add the product to the database
  // $product_id = $product->save();

  // Get the global cart object
  // $cart = WC()->cart->add_to_cart($product_id);

  // Add the product to the cart
  // $cart->add_to_cart($product_id);

  $response['user'] = $user;
  $response['params'] = $params;
  $response['status'] = 2;

  return rest_ensure_response($response);
}
