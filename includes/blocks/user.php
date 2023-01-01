<?php

function mos_user_render_cb($attributes) {
  $current_user = wp_get_current_user();

  ob_start();

  if ( !($current_user instanceof WP_User ) ) {
    return;
  }

  ?>

  <div><?php echo esc_html( $current_user->user_login) ?></div>
  <div>User email: <?php echo esc_html( $current_user->user_email  )  ?></div>

  <?php

  // printf( __( 'Username: %s', 'textdomain' ), esc_html( $current_user->user_login ) ) . '<br />';
  // printf( __( 'User email: %s', 'textdomain' ), esc_html( $current_user->user_email ) ) . '<br />';
  // printf( __( 'User first name: %s', 'textdomain' ), esc_html( $current_user->user_firstname ) ) . '<br />';
  // printf( __( 'User last name: %s', 'textdomain' ), esc_html( $current_user->user_lastname ) ) . '<br />';
  // printf( __( 'User display name: %s', 'textdomain' ), esc_html( $current_user->display_name ) ) . '<br />';
  // printf( __( 'User ID: %s', 'textdomain' ), esc_html( $current_user->ID ) );

  $output = ob_get_contents();
  ob_end_clean();
  return $output;
}