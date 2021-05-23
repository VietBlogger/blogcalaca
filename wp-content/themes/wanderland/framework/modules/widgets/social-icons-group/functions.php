<?php

if ( ! function_exists( 'wanderland_mikado_register_social_icons_widget' ) ) {
	/**
	 * Function that register social icon widget
	 */
	function wanderland_mikado_register_social_icons_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassClassIconsGroupWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_social_icons_widget' );
}