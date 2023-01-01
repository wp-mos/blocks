<?php

function mos_user_render_cb($attributes) {
  $current_user = wp_get_current_user();

  ob_start();

  if ( !($current_user instanceof WP_User ) ) {
    return;
  }

  ?>

  <h2><?php echo esc_html( $current_user->user_login) ?></h2>
  <h6>Email: <?php echo esc_html( $current_user->user_email  )  ?></h6>

  <?php

  $output = ob_get_contents();
  ob_end_clean();
  return $output;
}