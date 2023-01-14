<?php

function mos_login_form(): false|string {
	if ( is_user_logged_in() ) {
		return '';
	}

	ob_start(); ?>

  <div class="wp-block-mos-blocks-login-form">
    <!-- sof: login form -->
    <form id="login-form" class="login-form">
      <div id="login-status" class="login-status"></div>

      <div class="form-group">
        <label>Email</label>
        <input type="text" id="login-form-email" class="form-input" placeholder="Email"/>
      </div>

      <div class="form-group">
        <label>Parola</label>
        <input type="password" id="login-form-password" class="form-input" placeholder="Parola"/>
      </div>

      <div class="form-footer">
        <div class="form-footer-meta">
          Nu ai inca cont?
          <a class="animated-link" href="<?php echo site_url( '/utilizatori/inregistrare' ) ?>">Inregistreza-te</a>
        </div>
        <button class="form-subscribe-button" type="submit">Intră în cont</button>
      </div>

    </form>
    <!-- eof: login form -->
  </div>

	<?php
	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}
