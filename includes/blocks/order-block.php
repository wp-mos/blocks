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
    <div class="form-group form-container mt-5 mx-2" data-filenum="0">
      <div class="form-wrapper col col-flex row mt-3 g-3 px-2 rounded position-relative">

        <div class="form-block form-block-load-design mb-3 col-sm-auto">
          <div class="form-block-meta">
            <span>1</span>
            <h6>Incarca Designul</h6>
          </div>
          <div class="form-block-element">
            <label class="form-label" for="fileToUpload">DXF File</label>
            <input type="file" class="form-control form-file" name="fileToUpload" required="">
          </div>
        </div>

        <div class="form-block mb-3 col-sm-auto">
          <div class="form-block-meta">
            <span>2</span>
            <h6>Alege Materialul</h6>
          </div>
          <div class="form-block-element">
            <label class="form-label" for="material">Material</label>
            <select class="form-select form-material" name="material" required="">
              <option selected="selected">Choose file</option>
            </select>
          </div>
        </div>

        <div class="form-block mb-3 col-sm-auto">
          <div class="form-block-meta">
            <span>3</span>
            <h6>Selecteaza Cantitatea</h6>
          </div>
          <div class="form-block-element">
            <label class="form-label" for="quantity">Quantity</label>
            <input type="number" class="form-control form-quantity" name="quantity" required="" min="1" max="100" value="1">
          </div>
        </div>

        <div class="form-block mb-3 col-sm-auto">
          <div class="form-block-meta form-block-meta-price">
            <div class="form-block-meta-title-price">TOTAL DESIGN</div>
            <div class="form-block-meta-price-size">
              <div>Dimensions (mm):</div>
              <div class="form-size mt-3">-</div>
              <div>Price:</div>
              <div class="form-filestatus">-</div>
            </div>
          </div>
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