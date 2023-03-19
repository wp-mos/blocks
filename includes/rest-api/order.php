<?php

function mos_rest_api_order($request)
{
  if (defined('WC_ABSPATH')) {
    // WC 3.6+ - Cart and other frontend functions are not included for REST requests.
    include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
    include_once WC_ABSPATH . 'includes/wc-notice-functions.php';
    include_once WC_ABSPATH . 'includes/wc-template-hooks.php';
  }

  if (
    null === WC()->session
  ) {
    $session_class = apply_filters('woocommerce_session_handler', 'WC_Session_Handler');

    WC()->session = new $session_class();
    WC()->session->init();
  }

  if (
    null === WC()->customer
  ) {
    WC()->customer = new WC_Customer(get_current_user_id(), true);
  }

  if (
    null === WC()->cart
  ) {
    WC()->cart = new WC_Cart();

    // We need to force a refresh of the cart contents from session here (cart contents are normally refreshed on wp_loaded, which has already happened by this point).
    WC()->cart->get_cart();
  }

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

  $checkout_url = wc_get_checkout_url();
  $response['checkout_url'] = $checkout_url;

  $response['cart_url'] = $cart_url;
  $params = $request->get_params();

  $cart = WC()->cart->get_cart();
  $response['cart'] = $cart;

  $response['user'] = $user->data->ID;
  $response['params'] = $params;
  return rest_ensure_response($response);
}

//woo support
function check_woo_files()
{
  if (defined('WC_ABSPATH')) {
    // WC 3.6+ - Cart and other frontend functions are not included for REST requests.
    include_once WC_ABSPATH . 'includes/wc-cart-functions.php';
    include_once WC_ABSPATH . 'includes/wc-notice-functions.php';
    include_once WC_ABSPATH . 'includes/wc-template-hooks.php';
  }

  if (
    null === WC()->session
  ) {
    $session_class = apply_filters('woocommerce_session_handler', 'WC_Session_Handler');

    WC()->session = new $session_class();
    WC()->session->init();
  }

  if (
    null === WC()->customer
  ) {
    WC()->customer = new WC_Customer(get_current_user_id(), true);
  }

  if (
    null === WC()->cart
  ) {
    WC()->cart = new WC_Cart();

    // We need to force a refresh of the cart contents from session here (cart contents are normally refreshed on wp_loaded, which has already happened by this point).
    WC()->cart->get_cart();
  }

  return true;
}


//logUser
function logUser()
{
  // $user_id = $this->user->user_id;
  // $user = get_user_by('id', $user_id);
  //if not logged in
  // if (!is_user_logged_in()) {
  // wp_set_current_user($user_id, $user->user_login);
  // wp_set_auth_cookie($user_id);
  // }
  check_woo_files();
}
