<?php

function mos_order_block_render_cb( $attributes ): false|string {
	ob_start();
	?>
  <div class="wp-block-mos-blocks-order-form">

    <div class="form-placeholder" style="display: none;">
      Loading form…
      <span>Poor internet connection.</span>
    </div>

    <form id="mor-order-form" class="mor-order-form">
      <div class="form-group" data-filenum="0">
        <div class="form-wrapper">

          <div class="form-block form-block-load-design">
            <div class="form-block-header">
              <span>1</span>
              <h6>Incarca Designul</h6>
            </div>
            <div class="form-block-body">
              <label class="form-label" for="fileToUpload">DXF File</label>
              <input type="file" id="fileToUpload" class="form-control form-file" name="fileToUpload" required="">
            </div>
          </div>

          <div class="form-block form-block-select-material disabled">
            <div class="form-block-header">
              <span>2</span>
              <h6>Alege Materialul</h6>
            </div>
            <div class="form-block-body">
              <label class="form-label" for="material">Material</label>
              <select class="form-select form-material" name="material" required="">
                <option selected="selected">Choose file</option>
              </select>
            </div>
          </div>

          <div class="form-block form-block-quantity disabled">
            <div class="form-block-header">
              <span>3</span>
              <h6>Selecteaza Cantitatea</h6>
            </div>
            <div class="form-block-body">
              <label class="form-label" for="quantity">Quantity</label>
              <input type="number" class="form-control form-quantity" name="quantity" required="" min="1" max="100"
                     value="1">
            </div>
          </div>

          <div class="form-block-details hide">
              <div class="form-block-details-title">Item 1</div>
              <div class="form-block-details-body">
                <div class="form-block-details-dimensions">
                  <div>Dimensions (mm):</div>
                  <div class="form-size">-</div>
                </div>
                <div class="form-block-details-price">
                  <div>Price:</div>
                  <div class="form-filestatus">-</div>
                </div>
              </div>
              </div>
          </div>
        </div>
      </div>

      <input type="submit" value="Upload">

      <div class="form-price hide">
        <div class="form-price-wrapper">
          <span class="title">Total price:</span> <span id="order-price" class="total-price">–</span>
        </div>
      </div>
    </form>

  </div>
	<?php

	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}