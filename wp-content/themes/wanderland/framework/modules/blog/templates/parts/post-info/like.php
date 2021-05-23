<?php if( wanderland_mikado_is_plugin_installed( 'core' ) ) { ?>
    <div class="mkdf-blog-like">
        <?php if( function_exists('wanderland_core_get_like') ) wanderland_core_get_like(); ?>
    </div>
<?php } ?>