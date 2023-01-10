<?php

function mos_order_block_render_cb($attributes) {
  ob_start();
  ?>
  <div class="wp-block-mos-blocks-order-form">

  <div class="form-placeholder" style="display: none;">
    Loading form…
    <span>Poor internet connection.</span>
  </div>

  <form>
    <div class="form-group mt-5 mx-2" data-filenum="0">
      <div class="form-wrapper col col-flex row mt-3 g-3 px-2 rounded position-relative">

        <div class="form-block form-block-load-design mb-3 col-sm-auto">
          <h5>Incarca Designul</h5>
          <div class="form-block-element">
              <label class="form-label" for="fileToUpload">DXF File</label>
              <div class="form-block-element-select">
                <div class="file-select-button" id="select-button">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7.5C3 3.375 3.75 3 9 3C14.25 3 15 3.375 15 7.49999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 15L9 6.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 9.75L9 6.75L6 9.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Incarca Designul
              </div>
                <input type="file" class="form-control form-file" name="fileToUpload" required="">
              </div>
          </div>
        </div>

        <div class="form-block mb-3 col-sm-auto">
          <h5>Alege Materialul</h5>
          <div class="form-block-element">
            <label class="form-label" for="material">Material</label>
            <select class="form-select form-material" name="material" required="">
              <option selected="selected">Choose file</option>
            </select>
          </div>
        </div>

        <div class="form-block mb-3 col-sm-auto">
          <h5>Selecteaza Cantitatea</h5>
          <div class="form-block-element">
            <label class="form-label" for="quantity">Quantity</label>
            <input type="number" class="form-control form-quantity" name="quantity" required="" min="1" max="100" value="1">
          </div>
        </div>

        <div class="mb-3 col-sm-auto">
          <div>Dimensions (mm)</div>
          <div class="form-size mt-3">–</div>
        </div>
        <div class="mb-3 col-sm-auto">
          <div>Price</div>
          <div class="form-filestatus">–</div>
        </div>
      </div>
    </div>
    <p class="ms-3 mt-4">Total price: <strong id="order-price">–</strong></p>
  </form>

  </div>
  <?php

  $output = ob_get_contents();
  ob_end_clean();

  return $output;
}