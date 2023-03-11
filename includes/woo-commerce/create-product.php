<?php
function wc_create_product($data)
{
  $product = new WC_Product();

  // Set the product name
  if (isset($data['name'])) {
    $product->set_name($data['name']);
  }

  // Set the product description
  if (isset($data['description'])) {
    $product->set_description($data['description']);
  }

  // Set the product short description
  if (isset($data['short_description'])) {
    $product->set_short_description($data['short_description']);
  }

  // Set the product price
  if (isset($data['price'])) {
    $product->set_regular_price($data['price']);
  }

  // Set the product SKU
  // if (isset($data['sku'])) {
  //   $product->set_sku($data['sku']);
  // }

  // Set the product category
  // if (isset($data['category'])) {
  //   $term = get_term_by('name', $data['category'], 'product_cat');
  //   if ($term) {
  //     $product->set_category_ids(array($term->term_id));
  //   }
  // }

  // Set the product status
  // if (isset($data['status'])) {
  //   $product->set_status($data['status']);
  // }

  // Save the product
  $product->save();

  // Return the product ID
  return $product->get_id();
}
