<?php

if ( ! function_exists( 'wanderland_mikado_get_hide_dep_for_header_standard_meta_boxes' ) ) {
	function wanderland_mikado_get_hide_dep_for_header_standard_meta_boxes() {
		$hide_dep_options = apply_filters( 'wanderland_mikado_filter_header_standard_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wanderland_mikado_header_standard_meta_map' ) ) {
	function wanderland_mikado_header_standard_meta_map( $parent ) {
		$hide_dep_options = wanderland_mikado_get_hide_dep_for_header_standard_meta_boxes();
		
		wanderland_mikado_create_meta_box_field(
			array(
				'parent'          => $parent,
				'type'            => 'select',
				'name'            => 'mkdf_set_menu_area_position_meta',
				'default_value'   => '',
				'label'           => esc_html__( 'Choose Menu Area Position', 'wanderland' ),
				'description'     => esc_html__( 'Select menu area position in your header', 'wanderland' ),
				'options'         => array(
					''       => esc_html__( 'Default', 'wanderland' ),
					'left'   => esc_html__( 'Left', 'wanderland' ),
					'right'  => esc_html__( 'Right', 'wanderland' ),
					'center' => esc_html__( 'Center', 'wanderland' )
				),
				'dependency' => array(
					'hide' => array(
						'mkdf_header_type_meta'  => $hide_dep_options
					)
				)
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_additional_header_area_meta_boxes_map', 'wanderland_mikado_header_standard_meta_map' );
}