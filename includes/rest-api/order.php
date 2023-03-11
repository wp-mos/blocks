<?php
function mos_rest_api_order($request)
{

  $response = ['status' => 1];
  $params = $request->get_params();





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

  $response['params'] = $params;

  return rest_ensure_response($response);
}
