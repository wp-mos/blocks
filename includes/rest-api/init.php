<?php

function mos_rest_api_init()
{
  register_rest_route('mos/v1', '/order', [
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'mos_rest_api_order_handler',
    'permission_callback' => '__return_true'
  ]);
}
