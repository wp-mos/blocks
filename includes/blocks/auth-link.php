<?php

function mos_auth_link_render_cb($attributes) {
  $user = wp_get_current_user();
  $user_logged_in = $user->exists();

  $name = $user_logged_in ? $user->user_login : 'CONTUL TĂU';
  $openClass = $user_logged_in ? '' : 'open-modal';


  ob_start();
  ?>
  <div class="wp-block-mos-blocks-auth-link has-dropdown">
    <?php

    if($attributes['showAuth']) {
      ?>
      <a class="mos-blocks-sign-in-link <?php echo $openClass; ?>" href="#">
        <?php echo $name; ?>
      </a>
      <?php
    }
    ?>

    <?php
    if($user_logged_in) { ?>
      <div class="dropdown">
        <div class="dropdown-wrapper">
          <a href="<?php echo wp_logout_url(home_url()) ?>" class="dropdown-item">Logout</a>
        </di>
      </div>
    <?php } ?>

  </div>
  <?php

  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}