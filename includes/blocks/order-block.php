<?php

function mos_order_block_render_cb( $attributes ): false|string {
	ob_start();
	?>
  <div class="wp-block-mos-blocks-order-form">

    <div class="form-placeholder" style="display: none;">
      Loading form…
      <span>Poor internet connection.</span>
    </div>

    <form id="mos-order-form" class="mos-order-form" enctype="multipart/form-data" method="post">
      <div class="form-group" data-filenum="0">
        <div class="form-wrapper">

          <div class="form-block form-block-load-design">
            <div class="form-block-header">
              <span>1</span>
              <h6>Incarca Designul</h6>
            </div>
            <div class="form-block-body">
              <label class="form-label form-subscribe-button" for="fileToUpload">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 9C15 13.5 14.3333 15.75 9 15.75C3.66667 15.75 3 13.5 3 9C3 4.5 3.75 2.25 9 2.25C14.25 2.25 15 4.5 15 9Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.75 3C6.75 3 7.20343 4.79657 6.375 5.625C5.54657 6.45343 3.75 6 3.75 6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.75 9.75H11.25M9 12L9 7.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Upload DXF File</label>
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
              <label class="form-label" for="quantity">Cantitate</label>
              <input type="number" class="form-control form-quantity form-input" name="quantity" required="" min="1" max="100"
                     value="1">
            </div>
          </div>

            <div class="form-block-details hide">
              <div class="form-block-details-title"></div>
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
          <!-- </div> -->
          <!-- <div><button class="form-group-add">add new file</button></div> -->
        </div>

      </div>

      <div class="form-price hide">
        <div class="form-price-wrapper">
          <span class="title">Total price:</span> <span id="order-price" class="total-price">–</span>
        </div>
      </div>

      <div class="form-submit hide" >
        <div class="form-submit-wrapper">
          <input type="hidden" name="action" value="add_product_to_cart">
          <input class="form-submit-button form-subscribe-button hide" type="submit" value="Proceseaza Comanda">
        </div>
      </div>

    </form>

  </div>
	<?php

	$output = ob_get_contents();
	ob_end_clean();

	return $output;
}