<?php

function mos_rest_api_init()
{
  register_rest_route('mos/v1', '/handle-order', [
    'methods' => 'POST',
    'callback' => 'mos_rest_api_handle_order',
    'permission_callback' => '__return_true',
  ]);
}
