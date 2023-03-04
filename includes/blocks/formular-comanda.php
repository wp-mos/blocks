<?php

  function mos_formular_comanda($attributes)
  {
    ob_start();
    ?>
      <div class="wp-block-mos-blocks-order-form">
          <form id="mos-order-form" class="mos-order-form" enctype="multipart/form-data" method="post">
              <div class="form-group mt-5 mx-2" data-filenum="0">
                  <div class="col col-flex row mt-3 g-3 px-2 rounded position-relative">

                      <div class="mb-3 col-sm-auto">
                          <label class="form-label" for="fileToUpload">DXF File</label>
                          <input type="file" class="form-control form-file" name="fileToUpload" required>
                      </div>

                      <div class="mb-3 col-sm-auto">
                          <label class="form-label" for="material">Material</label>
                          <select class="form-select form-material" name="material">
                              <option>Choose file</option>
                          </select>
                      </div>

                      <div class="mb-3 col-sm-auto">
                          <label class="form-label" for="quantity">Quantity</label>
                          <input type="number" class="form-control form-quantity" name="quantity" min="1" required
                                 max="100" value="1">
                      </div>

                      <div class="mb-3 col-sm-auto">
                          <div>Dimensions (mm)</div>
                          <div class="form-size mt-3">–</div>
                      </div>

                      <div class="mb-3 col-sm-auto">
                          <div>Price</div>
                          <div class="form-file-status">–</div>
                      </div>

                  </div>
              </div>

              <p class="ms-3 mt-4">Total price: <strong id="order-price">–</strong></p>

              <!--              <input class="form-submit-button form-subscribe-button" type="submit"-->
              <!--                     value="Proceseaza Comanda">-->

              <button id="mos-submit-form" type="submit">Proceseaza Comanda</button>
          </form>

      </div>
    <?php

    $output = ob_get_contents();
    ob_end_clean();

    return $output;
  }
