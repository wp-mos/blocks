<?php

  function mos_formular_comanda($attributes)
  {
    ob_start();
    ?>
      <div class="wp-block-mos-blocks-order-form">
          <form id="mos-order-form" class="mos-order-form" enctype="multipart/form-data" method="post">

              <div class="order-form-group" data-id="0">

                  <div class="order-form-block">
                      <label class="order-form-label" for="file-0">DXF File</label>
                      <input type="file" class="order-form-file" name="file-0" required>
                  </div>

                  <div class="order-form-block">
                      <label class="order-form-label" for="material">Material</label>
                      <select class="order-form-material" name="material" required>
                          <option>Choose file</option>
                      </select>
                  </div>

                  <div class="order-form-block">
                      <label class="order-form-label" for="quantity">Quantity</label>
                      <input type="number" class="order-form-quantity" name="quantity" min="1"
                             required
                             max="100" value="1">
                  </div>

                  <div class="order-form-block">
                      <div class="order-form-dimensions"></div>
                      <div class="order-form-status"></div>
                  </div>


                  <button type="button" id="order-form-add" data-id="0">Add New Design</button>

              </div>

              <div id="order-form-total-price"></div>
              <button id="mos-submit-form" type="submit">Proceseaza Comanda</button>

          </form>


      </div>
    <?php

    $output = ob_get_contents();
    ob_end_clean();

    return $output;
  }