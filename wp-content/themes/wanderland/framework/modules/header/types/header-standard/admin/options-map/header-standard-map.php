<?php

if ( ! function_exists( 'wanderland_mikado_get_hide_dep_for_header_standard_options' ) ) {
	function wanderland_mikado_get_hide_dep_for_header_standard_options() {
		$hide_dep_options = apply_filters( 'wanderland_mikado_filter_header_standard_hide_global_option', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wanderland_mikado_header_standard_map' ) ) {
	function wanderland_mikado_header_standard_map( $parent ) {
		$hide_dep_options = wanderland_mikado_get_hide_dep_for_header_standard_options();
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'          => $parent,
				'type'            => 'select',
				'name'            => 'set_menu_area_position',
				'default_value'   => 'right',
				'label'           => esc_html__( 'Choose Menu Area Position', 'wanderland' ),
				'description'     => esc_html__( 'Select menu area position in your header', 'wanderland' ),
				'options'         => array(
					'right'  => esc_html__( 'Right', 'wanderland' ),
					'left'   => esc_html__( 'Left', 'wanderland' ),
					'center' => esc_html__( 'Center', 'wanderland' )
				),
				'dependency' => array(
					'hide' => array(
						'header_options'  => $hide_dep_options
					)
				)
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_additional_header_menu_area_options_map', 'wanderland_mikado_header_standard_map' );
}