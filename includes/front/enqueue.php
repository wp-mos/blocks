<?php

  function mos_enqueue_scripts(): void
  {
    $authURLs = json_encode([
      'signup' => esc_url_raw(rest_url('mos/v1/signup')),
      'signin' => esc_url_raw(rest_url('mos/v1/signin')),
      'order' => esc_url_raw(rest_url('mos/v1/order')),
    ]);

    wp_add_inline_script(
      'mos-blocks-login-form-script',
      "const mos_auth_rest = {$authURLs}",
      'before'
    );

    wp_add_inline_script(
      'mos-blocks-register-form-script',
      "const mos_auth_rest = {$authURLs}",
      'before'
    );

    wp_add_inline_script(
      'mos-blocks-order-form-script',
      "const mos_auth_rest = {$authURLs}",
      'before'
    );

    wp_add_inline_script(
      'mos-blocks-formular-comanda-script',
      "const mos_auth_rest = {$authURLs}",
      'before'
    );
  }
