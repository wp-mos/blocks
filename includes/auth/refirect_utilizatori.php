<?php

function mos_redirects() {
	if ( is_page( 'utilizatori' ) ) {
		wp_redirect( home_url() );
		exit();
	}
}