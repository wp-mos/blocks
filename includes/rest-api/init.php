<?php

function mos_rest_api_init()
{
  register_rest_route('mos/v1', '/order', [
    'methods' => 'POST',
    'callback' => 'mos_rest_api_order',
  ]);
}

add_action('woocommerce_loaded', 'mos_woocommerce_loaded');
function mos_woocommerce_loaded()
{
  global $wc;
  $wc = WC();
}
