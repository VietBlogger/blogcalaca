<?php

if ( ! function_exists( 'wanderland_mikado_register_separator_widget' ) ) {
	/**
	 * Function that register separator widget
	 */
	function wanderland_mikado_register_separator_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassSeparatorWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_separator_widget' );
}