<?php

function mos_auth_link_render_cb( $attributes ): false|string {
	$user           = wp_get_current_user();
	$user_logged_in = $user->exists();

	$name = $user_logged_in ? $user->user_login : __( 'Contul Tau', 'mos-blocks' );

	ob_start();

	?>
  <div class="wp-block-mos-blocks-auth-link has-dropdown">

	<?php
	if ( ! $user_logged_in ) {
		?>
    <a class="mos-blocks-sign-in-link" href="<?php echo esc_url( site_url( '/utilizatori/autentificare' ) ) ?>">
			<?php echo $name; ?>
    </a>
	<?php } ?>

	<?php
if ( $user_logged_in ) { ?>
  <a class="mos-blocks-sign-in-link" href="#">
		<?php echo $name; ?>
  </a>
  <div class="dropdown">
  <div class="dropdown-wrapper">
    <a href="<?php echo esc_url( site_url( '/utilizatori/contul-meu' ) ) ?>" class="dropdown-item">Contul Meu</a>
    <a href="<?php echo wp_logout_url( home_url() ) ?>" class="dropdown-item">Logout</a>
    </di>
  </div>
<?php } ?>

  </div>
	<?php

	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}