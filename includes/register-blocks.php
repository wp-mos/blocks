<?php

function mos_register_blocks() {
  $blocks = [
    [ 'name' => 'button'],
    [ 'name' => 'auth-user-hero', 'options' => [
      'render_callback' => 'mos_auth_user_hero_render_cb'
    ]],
    [ 'name' => 'auth-user-content', 'options' => [
      'render_callback' => 'mos_auth_user_content_render_cb'
    ]],
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