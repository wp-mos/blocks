<?php

function mos_rest_api_init() {
  // example.com/wp-json/up/v1/signup
  register_rest_route('up/v1', '/signup', [
    'methods' => WP_REST_Server::CREATABLE,
    'callback' => 'mos_rest_api_signmos_handler',
    'permission_callback' => '__return_true'
  ]);

  register_rest_route('up/v1', '/signin', [
    'methods' => WP_REST_Server::EDITABLE,
    'callback' => 'mos_rest_api_signin_handler',
    'permission_callback' => '__return_true'
  ]);
}