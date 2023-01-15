<?php

function mos_rest_api_order_handler($request) {
  $response = ['status' => 1];
  $params = $request->get_params();

  $file = $request->get_file_params();
  $response['file'] = $file['fileToUpload'];

  $response['status'] = 2;
  return $response;
}
