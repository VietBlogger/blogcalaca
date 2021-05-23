<?php

if ( ! function_exists( 'wanderland_mikado_register_image_gallery_widget' ) ) {
	/**
	 * Function that register image gallery widget
	 */
	function wanderland_mikado_register_image_gallery_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassImageGalleryWidget';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_image_gallery_widget' );
}