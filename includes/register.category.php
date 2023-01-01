<?php

  function mos_register_category($categories) {
    $categories[] = [
      'slug' => 'mos-category',
      'title' => 'Mos'
    ];

    return $categories;
  }