<?php

function mos_auth_modal_render_cb($atts) {
  if(is_user_logged_in()) {
    return '';
  }

  ob_start();
  ?>
  <div class="wp-block-mos-blocks-auth-modal">
    <div class="modal-container">
      <div class="modal-overlay"></div>

      <div class="modal-content">
        <button class="modal-btn-close" type="button">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 13.5L13.5 4.5" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M13.5 13.5L4.5 4.5" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <!-- Tabs -->
        <ul class="tabs">
          <!-- Login Tab -->
          <li>
            <a href="#signin-tab" class="active-tab">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 3C14.625 3 15 3.75 15 9C15 14.25 14.625 15 10.5 15" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 9L11.25 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8.25 12L11.25 9L8.25 6" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Intră în cont
            </a>
          </li>
          <?php

          if($atts['showRegister']) {
            ?>
            <!-- Register Tab -->
            <li>
              <a href="#signup-tab">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 13.875C15 15.0221 12.4286 15.75 9 15.75C5.57143 15.75 3 15.0221 3 13.875C3 12.2019 6 11.25 9 11.25C12 11.25 15 12.375 15 13.875Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 9C10.864 9 12.375 7.48896 12.375 5.625C12.375 3.76104 10.864 2.25 9 2.25C7.13604 2.25 5.625 3.76104 5.625 5.625C5.625 7.48896 7.13604 9 9 9Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Creează un cont
              </a>
            </li>
            <?php
          }

          ?>
        </ul>

        <div class="modal-body">
          <!-- Login Form -->
          <form id="signin-tab" style="display: block;">
            <div id="signin-status"></div>
            <fieldset>
              <label>Email</label>
              <input type="text" id="si-email" placeholder="Email" />

              <label>Parola</label>
              <input type="password" id="si-password" placeholder="Parola" />

              <button type="submit">Intră în cont</button>
            </fieldset>
          </form>
          <?php

          if($atts['showRegister']) {
            ?>
            <!-- Register Form -->
            <form id="signup-tab">
              <div id="signup-status"></div>
              <fieldset>
                <label>Nume</label>
                <input type="text" id="su-name" placeholder="Nume" />

                <label>Email</label>
                <input type="email" id="su-email" placeholder="Email" />

                <label for="su-password">Parola</label>
                <input type="password" id="su-password" placeholder="Parola" />

                <button type="submit">Creează cont</button>
              </fieldset>
            </form>
            <?php
          }

          ?>

        </div>
      </div>
    </div>
  </div>
  <?php

  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}