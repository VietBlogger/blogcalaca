<?php

if ( ! function_exists( 'wanderland_mikado_include_woocommerce_shortcodes' ) ) {
	function wanderland_mikado_include_woocommerce_shortcodes() {
		foreach ( glob( WANDERLAND_MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/woocommerce/shortcodes/*/load.php' ) as $shortcode_load ) {
			include_once $shortcode_load;
		}
	}
	
	if ( wanderland_mikado_is_plugin_installed( 'core' ) ) {
		add_action( 'wanderland_core_action_include_shortcodes_file', 'wanderland_mikado_include_woocommerce_shortcodes' );
	}
}
