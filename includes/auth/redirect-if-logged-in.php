<?php

function mos_redirect_if_logged_in()
{
  if (is_user_logged_in() && is_page('utilizatori/autentificare') || (is_user_logged_in() && is_page('utilizatori/inregistrare'))) {
    wp_redirect(home_url());
    exit();
  }
}
