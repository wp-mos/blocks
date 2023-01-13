<?php

function mos_register_blocks(): void {
	$blocks = [
		[ 'name' => 'button' ],
		[
			'name'    => 'auth-user-hero',
			'options' => [
				'render_callback' => 'mos_auth_user_hero_render_cb'
			]
		],
		[
			'name'    => 'auth-user-content',
			'options' => [
				'render_callback' => 'mos_auth_user_content_render_cb'
			]
		],
		[
			'name'    => 'auth-link',
			'options' => [
				'render_callback' => 'mos_auth_link_render_cb'
			]
		],
		[
			'name'    => 'order-form',
			'options' => [
				'render_callback' => 'mos_order_block_render_cb'
			]
		],
		[
			'name'    => 'login-form',
			'options' => [
				'render_callback' => 'mos_login_form'
			]
		],
		[
			'name'    => 'register-form',
			'options' => [
				'render_callback' => 'mos_register_form'
			]
		]
	];

	foreach ( $blocks as $block ) {
		register_block_type(
			MOS_PLUGIN_DIR . 'build/blocks/' . $block['name'],
			$block['options'] ?? []
		);
	}
}