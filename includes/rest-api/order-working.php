<?php


function mos_rest_api_order_working($request)
{
  $response = ['status' => 2];
  $user = wp_get_current_user();

  if (!is_user_logged_in()) {
    $response['status'] = 1;
    return rest_ensure_response($response);
  }

  $new_sku = generate_sku();

  // Create the new product
  $product_id = wp_insert_post(array(
    'post_type' => 'product',
    'post_title' => 'Product Name 3',
    'post_content' => 'Product Description',
    'post_status' => 'publish',
    'meta_input' => array(
      '_price' => 300,
      '_stock_status' => 'instock',
      '_stock' => 1,
      '_sku' => $new_sku,
      '_regular_price' => 300,
      '_visibility' => 'visible',
    ),
  ));

  // Redirect the user to the cart page with the new product
  $cart_url = wc_get_cart_url();
  $cart_url = add_query_arg('add-to-cart', $product_id, $cart_url);

  $response['cart_url'] = $cart_url;

  $params = $request->get_params();

  $response['user'] = $user->data->ID;
  $response['params'] = $params;
  return rest_ensure_response($response);
}

function generate_sku_working()
{
  $timestamp = microtime(true) * 1000;
  $random_string = wp_generate_password(6, false);
  return 'SKU-' . $timestamp . '-' . $random_string;
}
