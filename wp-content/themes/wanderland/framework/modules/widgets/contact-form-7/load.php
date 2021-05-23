<?php

if ( wanderland_mikado_is_plugin_installed( 'contact-form-7' ) ) {
	include_once WANDERLAND_MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/widgets/contact-form-7/contact-form-7.php';
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_cf7_widget' );
}

if ( ! function_exists( 'wanderland_mikado_register_cf7_widget' ) ) {
	/**
	 * Function that register cf7 widget
	 */
	function wanderland_mikado_register_cf7_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassContactForm7Widget';
		
		return $widgets;
	}
}