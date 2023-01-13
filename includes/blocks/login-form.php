<?php

function mos_login_form(): false|string {
	if ( is_user_logged_in() ) {
		return '';
	}

	ob_start(); ?>

  <div class="wp-block-mos-blocks-login-form">
    <!-- sof: login form -->
    <form id="login-form" class="login-form">
      <div id="login-status"></div>
      <label>Email</label>
      <input type="text" id="si-email" placeholder="Email"/>

      <label>Parola</label>
      <input type="password" id="si-password" placeholder="Parola"/>

      <button type="submit">Intră în cont</button>
    </form>
    <!-- eof: login form -->
  </div>

	<?php
	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}
