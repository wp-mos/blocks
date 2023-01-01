<?php

function mos_auth_link_render_cb($atts) {
  $user = wp_get_current_user();
  $name = $user->exists() ? $user->user_login : 'CONTUL TĂU';
  $openClass = $user->exists() ? '' : 'open-modal';

  ob_start();
  ?>
  <div class="wp-block-mos-blocks-auth-link">
    <?php

    if($atts['showAuth']) {
      ?>
      <a class="mos-blocks-sign-in-link <?php echo $openClass; ?>" href="#">
        <?php echo $name; ?>
      </a>
      <?php
    }

    ?>
  </div>
  <?php

  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}