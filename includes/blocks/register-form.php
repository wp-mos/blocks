<?php
function mos_register_form()
{
  if (is_user_logged_in()) {
    return '';
  }

  // Process form submission
  if (isset($_POST['register-form-submit'])) {
    $name = sanitize_text_field($_POST['register-form-name']);
    $surname = sanitize_text_field($_POST['register-form-surname']);
    $tel = sanitize_text_field($_POST['register-form-tel']);
    $email = sanitize_email($_POST['register-form-email']);
    $password = sanitize_text_field($_POST['register-form-password']);
    $confirm_password = sanitize_text_field($_POST['register-form-confirm-password']);

    // Perform validation on form data
    $errors = array();

    if (empty($name)) {
      $errors[] = 'Numele este obligatoriu.';
    }

    if (empty($surname)) {
      $errors[] = 'Prenumele este obligatoriu.';
    }

    if (empty($email)) {
      $errors[] = 'Email-ul este obligatoriu.';
    } elseif (!is_email($email)) {
      $errors[] = 'Email-ul este invalid.';
    } elseif (email_exists($email)) {
      $errors[] = 'Email-ul este deja inregistrat.';
    }

    if (empty($password)) {
      $errors[] = 'Parola este obligatorie.';
    } elseif ($password != $confirm_password) {
      $errors[] = 'Parolele nu coincid.';
    }

    // If there are errors, display them
    if (!empty($errors)) {
      echo '<div class="error">' . implode('<br>', $errors) . '</div>';
    } else {
      // Create new user
      $user_id = wp_create_user($email, $password, $email);

      if (is_wp_error($user_id)) {
        echo '<div class="error">' . $user_id->get_error_message() . '</div>';
      } else {
        // Set user meta data
        update_user_meta($user_id, 'first_name', $name);
        update_user_meta($user_id, 'last_name', $surname);
        update_user_meta($user_id, 'billing_phone', $tel);

        // Log user in
        wp_set_auth_cookie($user_id, true);
        wp_redirect(home_url());
        exit;
      }
    }
  }

  // Display registration form
  ob_start(); ?>

  <div class="wp-block-mos-blocks-register-form">
    <!-- sof: register form -->
    <form id="register-form" class="register-form" method="post">
      <div id="register-status"></div>

      <label>Nume</label>
      <input type="text" id="register-form-name" name="register-form-name" placeholder="Nume" />

      <label>Prenume</label>
      <input type="text" id="register-form-surname" name="register-form-surname" placeholder="Prenume" />

      <label>Telefon</label>
      <input type="tel" id="register-form-tel" name="register-form-tel" placeholder="Telefon" />

      <label>Email</label>
      <input type="email" id="register-form-email" name="register-form-email" placeholder="Email" />

      <label>Parola</label>
      <input type="password" id="register-form-password" name="register-form-password" placeholder="Parola" />
      <label>Repetati Parola</label>
      <input type="password" id="register-form-confirm-password" name="register-form-confirm-password" placeholder="Repetati Parola" />

      <button type="submit" name="register-form-submit">Creează cont</button>
    </form>
    <!-- eof: register form -->
  </div>

<?php
  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}
