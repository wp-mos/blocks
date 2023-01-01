<?php

function mos_enqueue_scripts() {
  $authURLs = json_encode([
    'signup' => esc_url_raw(rest_url('mos/v1/signup')),
    'signin' => esc_url_raw(rest_url('mos/v1/signin'))
  ]);

  wp_add_inline_script(
    'mos-blocks-auth-modal-script',
    "const mos_auth_rest = {$authURLs}",
    'before' // 'after'
  );
}