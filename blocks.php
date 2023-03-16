<?php

/**
 * Plugin Name:       Mos Blocks
 * Theme URI: https: //github.com/wp-mos/blocks
 * Author: the Marius P.
 * Author URI: https: //github.com/wisethee
 * Description:       A plugin for adding blocks to Mos Theme.
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            Marius Paduraru
 * Text Domain:       /wp-mos/blocks
 * Domain Path:       /languages
 */

if (!function_exists('add_action')) {
	echo 'Seems like you stumbled here by accident. 😛';
	exit;
}

// Setup
define('MOS_PLUGIN_DIR', plugin_dir_path(__FILE__));

// Includes
$rootFiles         = glob(MOS_PLUGIN_DIR . 'includes/*.php');
$subdirectoryFiles = glob(MOS_PLUGIN_DIR . 'includes/**/*.php');
$allFiles          = array_merge($rootFiles, $subdirectoryFiles);

foreach ($allFiles as $filename) {
	include_once($filename);
}

// Filters
add_filter('block_categories_all', 'mos_register_category');
add_filter('upload_mimes', 'allow_dfx_files_mime');
add_filter('woocommerce_rest_authentication', function ($user, $username, $password) {
	return new WP_User(wp_authenticate_application_password($user, $username, $password));
}, 10, 3);

// Hooks
add_action('init', 'mos_register_blocks');
add_action('wp_enqueue_scripts', 'mos_enqueue_scripts');
add_action('admin_init', 'mos_redirect_subscribers_to_frontend');
add_action('wp_loaded', 'mos_hide_admin_bar');
add_action('template_redirect', 'mos_redirect_if_not_logged_in');
add_action('template_redirect', 'mos_redirect_if_logged_in');
add_action('template_redirect', 'mos_redirects');
add_action('rest_api_init', 'mos_rest_api_init');

add_action('wp_login', 'mos__generate_auth_token', 10, 2);
add_filter('http_request_args', 'mos_add_auth_token_to_api_request', 10, 2);
