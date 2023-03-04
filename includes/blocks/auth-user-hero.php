<?php

  function mos_auth_user_hero_render_cb($attributes)
  {
    $current_user = wp_get_current_user();

    ob_start();

    if (!($current_user instanceof WP_User)) {
      return;
    }

    ?>
      <div class="wp-block-mos-blocks-auth-user-hero">
          <h6>Salut,</h6>
          <h2><?php echo esc_html($current_user->user_login) ?></h2>
      </div>

    <?php
    $output = ob_get_contents();
    ob_end_clean();
    return $output;
  }
