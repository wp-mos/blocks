<?php

function add_product_to_cart() {
    //Retrieve form data
    $product_id = $_POST['product_id'];
    $quantity = $_POST['quantity'];

    //API URL and authentication
    $url = 'http://mos.local/wp-json/wc/v3/cart/create';
    $consumer_key = 'ck_15a35a6176d456be43390b7e381caaebf9226d0b';
    $consumer_secret = 'cs_0461b424f7acd4d48151ec5688a19e585d591020';

    //Create new cart
    $response = wp_remote_post( $url, array(
        'method' => 'POST',
        'timeout' => 45,
        'redirection' => 5,
        'httpversion' => '1.0',
        'blocking' => true,
        'headers' => array(
            'Authorization' => 'Basic ' . base64_encode( $consumer_key . ':' . $consumer_secret ),
            'Content-Type' => 'application/json',
        ),
        'body' => json_encode(array()),
        'cookies' => array()
    ) );

    if ( is_wp_error( $response ) ) {
        //Error handling
        $error_message = $response->get_error_message();
        echo "Something went wrong: $error_message";
    } else {
        $cart_id = json_decode(wp_remote_retrieve_body($response))->cart_id;
        //Add product to cart
        $response = wp_remote_post( 'http://mos.local/wp-json/wc/v3/cart/'.$cart_id.'/items', array(
            'method' => 'POST',
            'timeout' => 45,
            'redirection' => 5,
            'httpversion' => '1.0',
            'blocking' => true,
            'headers' => array(
                'Authorization' => 'Basic ' . base64_encode( $consumer_key . ':' . $consumer_secret ),
                'Content-Type' => 'application/json',
            ),
            'body' => json_encode(array(
                'product_id' => $product_id,
                'quantity' => $quantity,
            )),
            'cookies' => array()
        ) );

        if ( is_wp_error( $response ) ) {
            //Error handling
            $error_message = $response->get_error_message();
            echo "Something went wrong: $error_message";
        } else {
            //Success, redirect to checkout page
            wp_redirect( 'http://mos.local/checkout' );
            exit;
}
    }
}