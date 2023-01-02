<?php

function mos_auth_user_content_render_cb($attributes) {
  $current_user = wp_get_current_user();

  ob_start();

  if ( !($current_user instanceof WP_User ) ) {
    return;
  }

  ?>
  <div class="wp-block-mos-blocks-auth-user-content">
    <div class="wp-block-mos-blocks-auth-user-content-sidebar">

      <ul class="wp-block-mos-blocks-auth-user-content-sidebar-navigation">
        <li><a href="#contul-meu" class="is-active">Contul meu</a></li>
        <li><a href="#comenzile-mele">Comenzile Mele</a></li>
      </ul>

    </div>

    <div class="wp-block-mos-blocks-auth-user-content-content">
      <div id="contul-meu" class="wp-block-mos-blocks-auth-user-content-content-wrapper">
        <h6>Contul Meu</h6>
        <form method="post" action="" class="wp-block-mos-blocks-auth-user-content-form" >

          <div class="form-group-name">
            <div class="form-block">
              <label for="first_name">Nume:</label>
              <input type="text" name="first_name" value="<?php echo $current_user->first_name; ?>">
            </div>

            <div class="form-block">
              <label for="last_name">Prenume:</label>
              <input type="text" name="last_name" value="<?php echo $current_user->last_name; ?>">
            </div>
          </div>

          <div class="form-group-company">
            <h6 class="small">Companie</h6>
            <div>
              <div class="form-block">
                <label for="company">Nume Companie:</label>
                <input type="text" name="company" value="<?php echo $current_user->company; ?>">
              </div>

              <div class="form-block">
                <label for="cui">RO/CUI:</label>
                <input type="text" name="cui" value="<?php echo $current_user->cui; ?>">
              </div>
            </div>
          </div>

          <div class="form-group-contact">
            <h6 class="small">Contact</h6>
            <div>
              <div class="form-block">
                <label for="email">Email:</label>
                <input type="email" name="email" value="<?php echo $current_user->user_email; ?>">
              </div>

              <div class="form-block">
                <label for="phone">Telefon:</label>
                <input type="text" name="phone" value="<?php echo $current_user->phone; ?>">
              </div>
            </div>

          </div>



          <div class="form-group-address">
            <h6 class="small">Adresa</h6>
            <div class="form-block">
              <label for="address">Strada:</label>
              <input type="text" name="address" value="<?php echo $current_user->address; ?>">
            </div>

            <div class="form-block">
              <label for="city">Localitate:</label>
              <input type="text" name="city" value="<?php echo $current_user->city; ?>">
            </div>

            <div class="form-block">
              <label for="postcode">Cod Postal:</label>
              <input type="text" name="postcode" value="<?php echo $current_user->postcode; ?>">
            </div>
          </div>

          <input type="submit" value="Update" class="form-submit">
        </form>
      </div>

      <div id="comenzile-mele" class="wp-block-mos-blocks-auth-user-content-content-wrapper">
        <h6>Comenzile Mele</h6>
        <p>Lista Comenzi</p>
      </div>

    </div>
  </div>

 <?php
  if ( isset( $_POST['email'] ) ) {

    $user_id = get_current_user_id();
    $first_name = sanitize_text_field( $_POST['first_name'] );
    $last_name = sanitize_text_field( $_POST['last_name'] );
    $company = sanitize_text_field($_POST['company']);
    $cui = sanitize_text_field($_POST['cui']);

    // Validate the email address
    $email = sanitize_email( $_POST['email'] );
    if ( ! is_email( $email ) ) {
      // The email address is invalid, so display an error message
      wp_die( 'Error: Invalid email address.' );
    }

    $phone = sanitize_text_field($_POST['phone']);
    // if(!preg_match('/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/', $phone)) {
    //   wp_die( 'Error: Invalid phone number.' );
    // }

    $address = sanitize_text_field($_POST['address']);
    $city = sanitize_text_field($_POST['city']);
    $postcode = sanitize_text_field($_POST['postcode']);

    wp_update_user( array( 'ID' => $user_id, 'user_email' => $email ) );

    update_user_meta( $user_id, 'first_name', $first_name );
    update_user_meta( $user_id, 'last_name', $last_name );
    update_user_meta( $user_id, 'company', $company);
    update_user_meta( $user_id, 'cui', $cui);
    update_user_meta( $user_id, 'phone', $phone);
    update_user_meta( $user_id, 'address', $address);
    update_user_meta( $user_id, 'city', $city);
    update_user_meta( $user_id, 'postcode', $postcode);

    // Redirect the user back to the form page
    wp_safe_redirect( $_SERVER['REQUEST_URI'] );
    exit;
  }

  $output = ob_get_contents();
  ob_end_clean();
  return $output;
}
