<?php

if ( ! function_exists( 'wanderland_mikado_header_top_bar_styles' ) ) {
	/**
	 * Generates styles for header top bar
	 */
	function wanderland_mikado_header_top_bar_styles() {
		$top_header_height = wanderland_mikado_options()->getOptionValue( 'top_bar_height' );
		
		if ( ! empty( $top_header_height ) ) {
			echo wanderland_mikado_dynamic_css( '.mkdf-top-bar', array( 'height' => wanderland_mikado_filter_px( $top_header_height ) . 'px' ) );
			echo wanderland_mikado_dynamic_css( '.mkdf-top-bar .mkdf-logo-wrapper a', array( 'max-height' => wanderland_mikado_filter_px( $top_header_height ) . 'px' ) );
		}
		
		echo wanderland_mikado_dynamic_css( '.mkdf-header-box .mkdf-top-bar-background', array( 'height' => wanderland_mikado_get_top_bar_background_height() . 'px' ) );
		
		$top_bar_container_selector = '.mkdf-top-bar > .mkdf-vertical-align-containers';
		$top_bar_container_styles   = array();
		$container_side_padding     = wanderland_mikado_options()->getOptionValue( 'top_bar_side_padding' );
		
		if ( $container_side_padding !== '' ) {
			if ( wanderland_mikado_string_ends_with( $container_side_padding, 'px' ) || wanderland_mikado_string_ends_with( $container_side_padding, '%' ) ) {
				$top_bar_container_styles['padding-left'] = $container_side_padding;
				$top_bar_container_styles['padding-right'] = $container_side_padding;
			} else {
				$top_bar_container_styles['padding-left'] = wanderland_mikado_filter_px( $container_side_padding ) . 'px';
				$top_bar_container_styles['padding-right'] = wanderland_mikado_filter_px( $container_side_padding ) . 'px';
			}
			
			echo wanderland_mikado_dynamic_css( $top_bar_container_selector, $top_bar_container_styles );
		}
		
		if ( wanderland_mikado_options()->getOptionValue( 'top_bar_in_grid' ) == 'yes' ) {
			$top_bar_grid_selector                = '.mkdf-top-bar .mkdf-grid .mkdf-vertical-align-containers';
			$top_bar_grid_styles                  = array();
			$top_bar_grid_background_color        = wanderland_mikado_options()->getOptionValue( 'top_bar_grid_background_color' );
			$top_bar_grid_background_transparency = wanderland_mikado_options()->getOptionValue( 'top_bar_grid_background_transparency' );
			
			if ( !empty($top_bar_grid_background_color) ) {
				$grid_background_color        = $top_bar_grid_background_color;
				$grid_background_transparency = 1;
				
				if ( $top_bar_grid_background_transparency !== '' ) {
					$grid_background_transparency = $top_bar_grid_background_transparency;
				}
				
				$grid_background_color                   = wanderland_mikado_rgba_color( $grid_background_color, $grid_background_transparency );
				$top_bar_grid_styles['background-color'] = $grid_background_color;
			}
			
			echo wanderland_mikado_dynamic_css( $top_bar_grid_selector, $top_bar_grid_styles );
		}
		
		$top_bar_styles   = array();
		$top_bar_after_styles   = array();
		$top_bar_border_after_styles   = array();
		$background_color = wanderland_mikado_options()->getOptionValue( 'top_bar_background_color' );
		$border_color     = wanderland_mikado_options()->getOptionValue( 'top_bar_border_color' );
		
		if ( $background_color !== '' ) {
			$background_transparency = 1;
			if ( wanderland_mikado_options()->getOptionValue( 'top_bar_background_transparency' ) !== '' ) {
				$background_transparency = wanderland_mikado_options()->getOptionValue( 'top_bar_background_transparency' );
			}
			
			$background_color                   = wanderland_mikado_rgba_color( $background_color, $background_transparency );
			$top_bar_styles['background-color'] = $background_color;
			
			echo wanderland_mikado_dynamic_css( '.mkdf-header-box .mkdf-top-bar-background', array( 'background-color' => $background_color ) );
		}
		
		if ( wanderland_mikado_options()->getOptionValue( 'top_bar_border' ) == 'yes' && $border_color != '' ) {
			$border_transparency = 1;
			if ( wanderland_mikado_options()->getOptionValue( 'top_bar_border_color_transparency' ) !== '' ) {
				$border_transparency = wanderland_mikado_options()->getOptionValue( 'top_bar_border_color_transparency' );
			}
			$border_color = wanderland_mikado_rgba_color( $border_color, $border_transparency );
			
			if ( wanderland_mikado_options()->getOptionValue( 'top_bar_in_grid' ) == 'yes' ) {
				$top_bar_after_styles['border-bottom'] = '1px solid ' . $border_color;
			} else {
				$top_bar_border_after_styles['border-bottom'] = '1px solid ' . $border_color;
			}
		}
		
		echo wanderland_mikado_dynamic_css( '.mkdf-top-bar', $top_bar_styles );
		echo wanderland_mikado_dynamic_css( '.mkdf-top-bar:after', $top_bar_border_after_styles );
		echo wanderland_mikado_dynamic_css( '.mkdf-top-bar .mkdf-grid .mkdf-vertical-align-containers', $top_bar_after_styles );
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic', 'wanderland_mikado_header_top_bar_styles' );
}