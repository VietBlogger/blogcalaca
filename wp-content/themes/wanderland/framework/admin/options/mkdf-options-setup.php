<?php

if ( ! function_exists( 'wanderland_mikado_admin_map_init' ) ) {
	function wanderland_mikado_admin_map_init() {
		do_action( 'wanderland_mikado_action_before_options_map' );
		
		foreach ( glob( WANDERLAND_MIKADO_FRAMEWORK_ROOT_DIR . '/admin/options/*/*.php' ) as $module_load ) {
			include_once $module_load;
		}
		
		do_action( 'wanderland_mikado_action_options_map' );
		
		do_action( 'wanderland_mikado_action_after_options_map' );
	}
	
	add_action( 'after_setup_theme', 'wanderland_mikado_admin_map_init', 1 );
}