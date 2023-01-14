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

          <div class="form-block form-block-select-material hidden">
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

          <div class="form-block form-block-quantity hidden">
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

          <div class="form-block-a form-block-details">
            <div class="form-block-header form-block-header-price">
              <div class="form-block-header-title-price">TOTAL DESIGN</div>
              <div class="form-block-header-price-size">
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