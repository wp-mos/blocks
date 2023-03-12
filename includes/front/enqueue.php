<?php

function mos_enqueue_scripts(): void
{
  $authURLs = json_encode([
    'order' => esc_url_raw(rest_url('mos/v1/handle-order')),
  ]);

  wp_add_inline_script(
    'mos-blocks-formular-comanda-script',
    "const mos_auth_rest = {$authURLs}",
    'before'
  );
}
