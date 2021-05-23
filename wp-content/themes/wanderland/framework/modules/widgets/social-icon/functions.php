<?php

if ( ! function_exists( 'wanderland_mikado_register_social_icon_widget' ) ) {
	/**
	 * Function that register social icon widget
	 */
	function wanderland_mikado_register_social_icon_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassSocialIconWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_social_icon_widget' );
}