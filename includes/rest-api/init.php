<?php

function mos_rest_api_init() {
  register_rest_route('mos/v1', '/signup', [
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'mos_rest_api_signup_mos_handler',
    'permission_callback' => '__return_true'
  ]);

  register_rest_route('mos/v1', '/signin', [
    'methods' => WP_REST_Server::EDITABLE,
    'callback' => 'mos_rest_api_signin_mos_handler',
    'permission_callback' => '__return_true'
  ]);

  register_rest_route('mos/v1', '/order', [
    'methods' => WP_REST_Server::EDITABLE,
    'callback' => 'mos_rest_api_order_mos_handler',
    'permission_callback' => '__return_true'
  ]);
}