<?php

if ( ! function_exists( 'wanderland_mikado_get_skewed_section_vc' ) ) {
	/**
	 * Loads Visual Composer Params
	 */
	function wanderland_mikado_get_skewed_section_vc() {
		
		vc_add_param( 'vc_row', array(
			'type'       => 'dropdown',
			'heading'    => esc_html__( 'Mikado Skewed Section Effect on Row', 'wanderland' ),
			'param_name' => 'enable_skewed_section_effect',
			'value'      => array(
				esc_html__( 'Disabled', 'wanderland' ) => 'no',
				esc_html__( 'Enabled', 'wanderland' )  => 'yes'
			),
			'group'      => esc_html__( 'Mikado Settings', 'wanderland' )
		) );
		
		vc_add_param( 'vc_row', array(
			'type'       => 'dropdown',
			'heading'    => esc_html__( 'Mikado Skewed Section Effect Top', 'wanderland' ),
			'param_name' => 'skewed_section_effect_top',
			'value'      => array(
				esc_html__( 'Disabled', 'wanderland' ) => 'no',
				esc_html__( 'Enabled', 'wanderland' )  => 'yes'
			),
			'dependency' => array( 'element' => 'enable_skewed_section_effect', 'value' => array( 'yes' ) ),
			'group'      => esc_html__( 'Mikado Settings', 'wanderland' )
		) );
		
		vc_add_param( 'vc_row', array(
			'type'       => 'dropdown',
			'heading'    => esc_html__( 'Mikado Skewed Section Effect Bottom', 'wanderland' ),
			'param_name' => 'skewed_section_effect_bottom',
			'value'      => array(
				esc_html__( 'Disabled', 'wanderland' ) => 'no',
				esc_html__( 'Enabled', 'wanderland' )  => 'yes'
			),
			'dependency' => array( 'element' => 'enable_skewed_section_effect', 'value' => array( 'yes' ) ),
			'group'      => esc_html__( 'Mikado Settings', 'wanderland' )
		) );
	}
	
	add_action( 'wanderland_mikado_action_additional_vc_row_params', 'wanderland_mikado_get_skewed_section_vc' );
}

if ( ! function_exists( 'wanderland_mikado_skewed_section_on_vc_row_top' ) ) {
	/**
	 * Loads html for skew section on top of the vc row
	 *
	 * @param $html
	 * @param $atts
	 *
	 * @return mixed
	 */
	function wanderland_mikado_skewed_section_on_vc_row_top( $html, $atts ) {
		$params = array();
		
		if ( isset( $atts['enable_skewed_section_effect'] ) && $atts['enable_skewed_section_effect'] === 'yes' && isset( $atts['skewed_section_effect_top'] ) && $atts['skewed_section_effect_top'] === 'yes' ) {
			// add additional class
			$params['additional_class'] = 'mkdf-top-skewed-section-effect';
			
			// get style for skewed section
			$skewed_section_effect_style = array();
			if ( isset( $atts['simple_background_color'] ) && $atts['simple_background_color'] !== '' ) {
				$skewed_section_effect_style[] = 'color: ' . $atts['simple_background_color'];
			}
			
			$params['skewed_section_effect_style'] = implode( ';', $skewed_section_effect_style );
			
			// get svg code
			$params['skewed_section_svg'] = wanderland_mikado_skewed_section_default_svg();
			if ( wanderland_mikado_options()->getOptionValue( 'skewed_section_row_top_svg_path' ) !== '' ) {
				$params['skewed_section_svg'] = wanderland_mikado_options()->getOptionValue( 'skewed_section_row_top_svg_path' );
			}
			
			$html .= wanderland_mikado_get_html_module_template_part( 'templates/skewed-section-template', 'skewed-section', '', $params );
		}
		
		return $html;
	}
	
	add_filter( 'wanderland_mikado_filter_vc_after_wrapper_open', 'wanderland_mikado_skewed_section_on_vc_row_top', 10, 2 );
}

if ( ! function_exists( 'wanderland_mikado_skewed_section_on_vc_row_bottom' ) ) {
	/**
	 * Loads html for skew section on bottom of the vc row
	 *
	 * @param $html
	 * @param $atts
	 *
	 * @return mixed
	 */
	function wanderland_mikado_skewed_section_on_vc_row_bottom( $html, $atts ) {

		if ( isset( $atts['enable_skewed_section_effect'] ) && $atts['enable_skewed_section_effect'] === 'yes' && isset( $atts['skewed_section_effect_bottom'] ) && $atts['skewed_section_effect_bottom'] === 'yes' ) {

			// add additional class
			$params['additional_class'] = 'mkdf-bottom-skewed-section-effect';

			// get style for skewed section
			$skewed_section_effect_style = array();
			if ( isset( $atts['simple_background_color'] ) && $atts['simple_background_color'] !== '' ) {
				$skewed_section_effect_style[] = 'color: ' . $atts['simple_background_color'];
			}
			
			$params['skewed_section_effect_style'] = implode( ';', $skewed_section_effect_style );

			// get svg code
			$params['skewed_section_svg'] = wanderland_mikado_skewed_section_default_svg();
			if ( wanderland_mikado_options()->getOptionValue( 'skewed_section_row_bottom_svg_path' ) !== '' ) {
				$params['skewed_section_svg'] = wanderland_mikado_options()->getOptionValue( 'skewed_section_row_bottom_svg_path' );
			}
			
			$html .= wanderland_mikado_get_html_module_template_part( 'templates/skewed-section-template', 'skewed-section', '', $params );
		}

		return $html;
	}

	add_filter( 'wanderland_mikado_filter_vc_before_wrapper_close', 'wanderland_mikado_skewed_section_on_vc_row_bottom', 10, 2 );
}

if ( ! function_exists( 'wanderland_mikado_skewed_section_on_title' ) ) {
	/**
	 * Print html for skew section on title area
	 *
	 * @return mixed
	 */
	function wanderland_mikado_skewed_section_on_title() {
		$id                   = wanderland_mikado_get_page_id();
		$title_skewed_section = wanderland_mikado_get_meta_field_intersect( 'enable_skewed_section_on_title_area', $id );

		if ( $title_skewed_section === 'yes' ) {
			$params = array();

			// add additional class
			$params['additional_class'] = 'mkdf-title-skewed-section-effect';

			// inset or outline class - only for title
			if ( wanderland_mikado_get_meta_field_intersect( 'title_area_skewed_section_type', $id ) === 'inset' ) {
				$params['additional_class'] .= ' mkdf-title-inset-section-effect';
			}

			// get style for skewed section
			$skewed_section_effect_style = array();
			$title_skewed_section_color  = wanderland_mikado_get_meta_field_intersect( 'title_area_skewed_section_svg_color', $id );
			if ( $title_skewed_section_color !== '' ) {
				$skewed_section_effect_style[] = 'color: ' . $title_skewed_section_color;
			}
			
			$params['skewed_section_effect_style'] = implode( ';', $skewed_section_effect_style );

			// get svg code
			$params['skewed_section_svg'] = wanderland_mikado_skewed_section_default_svg();
			$title_skewed_section_svg     = wanderland_mikado_options()->getOptionValue( 'title_area_skewed_section_svg_path' );
			
			if ( $title_skewed_section_svg !== '' ) {
				$params['skewed_section_svg'] = $title_skewed_section_svg;
			}

			wanderland_mikado_get_module_template_part( 'templates/skewed-section-template', 'skewed-section', '', $params );
		}
	}

	add_action( 'wanderland_mikado_action_after_page_title', 'wanderland_mikado_skewed_section_on_title' );
}

if ( ! function_exists( 'wanderland_mikado_skewed_section_on_header' ) ) {
	/**
	 * Print html for skew section on title area
	 *
	 * @return mixed
	 */
	function wanderland_mikado_skewed_section_on_header() {
		$id                    = wanderland_mikado_get_page_id();
		$header_skewed_section = wanderland_mikado_get_meta_field_intersect( 'enable_skewed_section_on_header_area', $id );

		if ( $header_skewed_section === 'yes' ) {
			$params = array();

			// add additional class
			$params['additional_class'] = 'mkdf-header-skewed-section-effect';

			// get style for skewed section
			$skewed_section_effect_style = array();
			$header_skewed_section_color = wanderland_mikado_get_meta_field_intersect( 'header_area_skewed_section_svg_color', $id );
			
			if ( $header_skewed_section_color !== '' ) {
				$skewed_section_effect_style[] = 'color: ' . $header_skewed_section_color;
			}
			
			$params['skewed_section_effect_style'] = implode( ';', $skewed_section_effect_style );

			// get svg code
			$params['skewed_section_svg'] = wanderland_mikado_skewed_section_default_svg();
			$header_skewed_section_svg    = wanderland_mikado_options()->getOptionValue( 'header_area_skewed_section_svg_path' );
			
			if ( $header_skewed_section_svg !== '' ) {
				$params['skewed_section_svg'] = $header_skewed_section_svg;
			}

			wanderland_mikado_get_module_template_part( 'templates/skewed-section-template', 'skewed-section', '', $params );
		}
	}

	add_action( 'wanderland_mikado_action_before_page_header_html_close', 'wanderland_mikado_skewed_section_on_header' );
}