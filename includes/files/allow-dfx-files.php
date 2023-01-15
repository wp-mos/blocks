<?php
function allow_dfx_files_mime($mimes = array()) {
    // Add DFX file type
    $mimes['dfx'] = 'application/octet-stream';
    return $mimes;
}

