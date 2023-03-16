<?php
function mos_rest_api_order_old($request)
{
  $key = 'ck_13bcee66edbb7e56c204a7f70364719bc6fccf61';
  $secret = 'cs_46d9998fa2c4a4d0c6a1bb95030b1dd95e817a0a';

  //   // Get the request parameters
  $response = ['status' => 1];
  $params = $request->get_params();

  //   // Create a new cart object
  //   $cart = new WC_Cart();

  //   // Check if auth_token cookie is set
  //   if (!isset($_COOKIE['auth_token'])) {
  //     $response['status'] = 1;
  //     $response['message'] = 'You must be logged in to submit an order.';
  //   }

  //   // Get the auth_token cookie value
  //   $auth_token = sanitize_text_field($_COOKIE['auth_token']);

  //   // Get the user ID associated with the token
  //   $user_id = get_users(array(
  //     'meta_key' => 'auth_token',
  //     'meta_value' => $auth_token,
  //     'fields' => 'ID'
  //   ));

  //   // Check if user ID was found
  //   if (empty($user_id)) {
  //     $response['status'] = 1;
  //     $response['message'] = 'User not found.';
  //   }

  //   // Get the current user object
  //   $current_user = get_user_by('ID', $user_id[0]);

  //   // Check if the user is logged in and the token is valid
  //   if (!$current_user || is_wp_error($current_user)) {
  //     $response['status'] = 1;
  //     $response['message'] = 'Invalid authentication token.';
  //     return rest_ensure_response($response);
  //   }


  //   // Add the product to WooCommerce cart
  //   // Create a product
  //   $product = new WC_Product();
  //   $product->set_name('Test Product');
  //   $product->set_regular_price(9.99);
  //   $product->set_description('This is a test product.');
  //   $product->set_status('publish');

  //   // Add the product to the database
  //   $product_id = $product->save();

  //   // Add the product to the cart
  //   $cart->add_to_cart($product_id);

  //   print_r($cart);

  //   $response['user'] = $current_user;
  //   $response['params'] = $params;
  $response['status'] = 2;
  return rest_ensure_response($response);
}
