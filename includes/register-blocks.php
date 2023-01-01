<?php

function mos_register_blocks() {
  $blocks = [
    [ 'name' => 'auth-link', 'options' => [
      'render_callback' => 'mos_auth_link_render_cb'
    ]],
    [ 'name' => 'auth-modal', 'options' => [
      'render_callback' => 'mos_auth_modal_render_cb'
    ]]
  ];

  foreach($blocks as $block) {
    register_block_type(
      MOS_PLUGIN_DIR . 'build/blocks/' . $block['name'],
      isset($block['options']) ? $block['options'] : []
    );
  }
}