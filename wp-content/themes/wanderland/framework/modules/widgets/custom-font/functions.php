<?php

if ( ! function_exists( 'wanderland_mikado_register_custom_font_widget' ) ) {
	/**
	 * Function that register custom font widget
	 */
	function wanderland_mikado_register_custom_font_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassCustomFontWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_custom_font_widget' );
}