<?php

if ( ! function_exists( 'wanderland_mikado_register_woocommerce_dropdown_cart_widget' ) ) {
	/**
	 * Function that register dropdown cart widget
	 */
	function wanderland_mikado_register_woocommerce_dropdown_cart_widget( $widgets ) {
		$widgets[] = 'WanderlandMikadoClassWoocommerceDropdownCart';
		
		return $widgets;
	}
	
	add_filter( 'wanderland_core_filter_register_widgets', 'wanderland_mikado_register_woocommerce_dropdown_cart_widget' );
}

if ( ! function_exists( 'wanderland_mikado_get_dropdown_cart_icon_class' ) ) {
	/**
	 * Returns dropdow cart icon class
	 */
	function wanderland_mikado_get_dropdown_cart_icon_class() {
		$classes = array(
			'mkdf-header-cart'
		);
		
		$classes[] = wanderland_mikado_get_icon_sources_class( 'dropdown_cart', 'mkdf-header-cart' );
		
		return implode( ' ', $classes );
	}
}