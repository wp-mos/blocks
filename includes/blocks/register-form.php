<?php

  function mos_register_form()
  {
    if (is_user_logged_in()) {
      return '';
    }

    ob_start(); ?>

      <div class="wp-block-mos-blocks-register-form">
          <!-- sof: register form -->
          <form id="register-form" class="register-form">
              <div id="register-status"></div>

              <label>Nume</label>
              <input type="text" id="register-form-name" placeholder="Nume"/>

              <label>Prenume</label>
              <input type="text" id="register-form-surname" placeholder="Nume"/>

              <label>Telefon</label>
              <input type="tel" id="register-form-tel" placeholder="Telefon"/>

              <label>Email</label>
              <input type="email" id="register-form-email" placeholder="Email"/>

              <label>Parola</label>
              <input type="password" id="register-form-password" placeholder="Parola"/>

              <label>Repetati Parola</label>
              <input type="password" id="register-form-confirm-password" placeholder="Repetati Parola"/>

              <button type="submit">Creează cont</button>
          </form>
          <!-- eof: register form -->
      </div>

    <?php
    $output = ob_get_contents();
    ob_end_clean();

    return $output;
  }
