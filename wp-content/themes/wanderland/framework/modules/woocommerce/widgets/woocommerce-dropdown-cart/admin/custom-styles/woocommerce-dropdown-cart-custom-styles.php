<?php

if ( ! function_exists( 'wanderland_mikado_dropdown_cart_icon_styles' ) ) {
	/**
	 * Generates styles for dropdown cart icon
	 */
	function wanderland_mikado_dropdown_cart_icon_styles() {
		$icon_color       = wanderland_mikado_options()->getOptionValue( 'dropdown_cart_icon_color' );
		$icon_hover_color = wanderland_mikado_options()->getOptionValue( 'dropdown_cart_hover_color' );
		
		if ( ! empty( $icon_color ) ) {
			echo wanderland_mikado_dynamic_css( '.mkdf-shopping-cart-holder .mkdf-header-cart a', array( 'color' => $icon_color ) );
		}
		
		if ( ! empty( $icon_hover_color ) ) {
			echo wanderland_mikado_dynamic_css( '.mkdf-shopping-cart-holder .mkdf-header-cart a:hover', array( 'color' => $icon_hover_color ) );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic', 'wanderland_mikado_dropdown_cart_icon_styles' );
}