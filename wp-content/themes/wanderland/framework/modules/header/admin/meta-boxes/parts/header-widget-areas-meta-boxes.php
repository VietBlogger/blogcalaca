<?php

if ( ! function_exists( 'wanderland_mikado_get_hide_dep_for_header_widget_areas_meta_boxes' ) ) {
	function wanderland_mikado_get_hide_dep_for_header_widget_areas_meta_boxes() {
		$hide_dep_options = apply_filters( 'wanderland_mikado_filter_header_widget_areas_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wanderland_mikado_get_hide_dep_for_header_widget_area_two_meta_boxes' ) ) {
	function wanderland_mikado_get_hide_dep_for_header_widget_area_two_meta_boxes() {
		$hide_dep_options = apply_filters( 'wanderland_mikado_filter_header_widget_area_two_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wanderland_mikado_header_widget_areas_meta_options_map' ) ) {
	function wanderland_mikado_header_widget_areas_meta_options_map( $header_meta_box ) {
		$hide_dep_widgets 			= wanderland_mikado_get_hide_dep_for_header_widget_areas_meta_boxes();
		$hide_dep_widget_area_two 	= wanderland_mikado_get_hide_dep_for_header_widget_area_two_meta_boxes();
		
		$header_widget_areas_container = wanderland_mikado_add_admin_container_no_style(
			array(
				'type'       => 'container',
				'name'       => 'header_widget_areas_container',
				'parent'     => $header_meta_box,
				'dependency' => array(
					'hide' => array(
						'mkdf_header_type_meta' => $hide_dep_widgets
					)
				),
				'args'       => array(
					'enable_panels_for_default_value' => true
				)
			)
		);
		
		wanderland_mikado_add_admin_section_title(
			array(
				'parent' => $header_widget_areas_container,
				'name'   => 'header_widget_areas',
				'title'  => esc_html__( 'Widget Areas', 'wanderland' )
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_disable_header_widget_areas_meta',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Disable Header Widget Areas', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will hide widget areas from header', 'wanderland' ),
				'parent'        => $header_widget_areas_container,
			)
		);

		$header_custom_widget_areas_container = wanderland_mikado_add_admin_container_no_style(
			array(
				'type'       => 'container',
				'name'       => 'header_custom_widget_areas_container',
				'parent'     => $header_widget_areas_container,
				'dependency' => array(
					'hide' => array(
						'mkdf_disable_header_widget_areas_meta' => 'yes'
					)
				)
			)
		);
					
		$wanderland_custom_sidebars = wanderland_mikado_get_custom_sidebars();
		if ( count( $wanderland_custom_sidebars ) > 0 ) {
			wanderland_mikado_create_meta_box_field(
				array(
					'name'        => 'mkdf_custom_header_widget_area_one_meta',
					'type'        => 'selectblank',
					'label'       => esc_html__( 'Choose Custom Header Widget Area One', 'wanderland' ),
					'description' => esc_html__( 'Choose custom widget area to display in header widget area one', 'wanderland' ),
					'parent'      => $header_custom_widget_areas_container,
					'options'     => $wanderland_custom_sidebars
				)
			);
		}

		if ( count( $wanderland_custom_sidebars ) > 0 ) {
			wanderland_mikado_create_meta_box_field(
				array(
					'name'        => 'mkdf_custom_header_widget_area_two_meta',
					'type'        => 'selectblank',
					'label'       => esc_html__( 'Choose Custom Header Widget Area Two', 'wanderland' ),
					'description' => esc_html__( 'Choose custom widget area to display in header widget area two', 'wanderland' ),
					'parent'      => $header_custom_widget_areas_container,
					'options'     => $wanderland_custom_sidebars,
					'dependency' => array(
						'hide' => array(
							'mkdf_header_type_meta' => $hide_dep_widget_area_two
						)
					)
				)
			);
		}
		
		do_action( 'wanderland_mikado_header_widget_areas_additional_meta_boxes_map', $header_widget_areas_container );
	}
	
	add_action( 'wanderland_mikado_action_header_widget_areas_meta_boxes_map', 'wanderland_mikado_header_widget_areas_meta_options_map', 10, 1 );
}