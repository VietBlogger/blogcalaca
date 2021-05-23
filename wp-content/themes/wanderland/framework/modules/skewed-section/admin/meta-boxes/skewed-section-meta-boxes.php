<?php

if ( ! function_exists( 'wanderland_mikado_skewed_section_title_meta' ) ) {
	function wanderland_mikado_skewed_section_title_meta( $show_title_area_container ) {
		
		wanderland_mikado_add_admin_section_title(
			array(
				'parent' => $show_title_area_container,
				'name'   => 'skewed_section_container',
				'title'  => esc_html__( 'Skewed Section', 'wanderland' )
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_enable_skewed_section_on_title_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Enable Skewed Section', 'wanderland' ),
				'description'   => esc_html__( 'This option will enable/disable Skew Section on Title Area', 'wanderland' ),
				'options'       => wanderland_mikado_get_yes_no_select_array(),
				'parent'        => $show_title_area_container
			)
		);
		
		$show_skewed_section_title_area_container = wanderland_mikado_add_admin_container(
			array(
				'parent'     => $show_title_area_container,
				'name'       => 'show_skewed_section_title_area_container',
				'dependency' => array(
					'show' => array(
						'mkdf_enable_skewed_section_on_title_area_meta' => 'yes'
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_title_area_skewed_section_type_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Position', 'wanderland' ),
				'description'   => esc_html__( 'Specify skewed section position', 'wanderland' ),
				'parent'        => $show_skewed_section_title_area_container,
				'options'       => array(
					''        => esc_html__( 'Default', 'wanderland' ),
					'outline' => esc_html__( 'Outline', 'wanderland' ),
					'inset'   => esc_html__( 'Inset', 'wanderland' )
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_title_area_container,
				'type'        => 'textarea',
				'name'        => 'mkdf_title_area_skewed_section_svg_path_meta',
				'label'       => esc_html__( 'Skewed Section On Title Area SVG Path', 'wanderland' ),
				'description' => esc_html__( 'Enter your Section On Title Area SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'wanderland' ),
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_title_area_container,
				'type'        => 'color',
				'name'        => 'mkdf_title_area_skewed_section_svg_color_meta',
				'label'       => esc_html__( 'Skewed Section Color', 'wanderland' ),
				'description' => esc_html__( 'Choose a background color for Skewed Section', 'wanderland' ),
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_additional_title_area_meta_boxes', 'wanderland_mikado_skewed_section_title_meta', 20 );
}

if ( ! function_exists( 'wanderland_mikado_skewed_section_header_meta' ) ) {
	function wanderland_mikado_skewed_section_header_meta( $show_header_area_container ) {
		
		wanderland_mikado_add_admin_section_title(
			array(
				'parent' => $show_header_area_container,
				'name'   => 'skewed_section_container',
				'title'  => esc_html__( 'Skewed Section', 'wanderland' )
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_enable_skewed_section_on_header_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Enable Skewed Section', 'wanderland' ),
				'description'   => esc_html__( 'This option will enable/disable Skew Section on Header Area', 'wanderland' ),
				'options'       => wanderland_mikado_get_yes_no_select_array(),
				'parent'        => $show_header_area_container
			)
		);
		
		$show_skewed_section_header_area_container = wanderland_mikado_add_admin_container(
			array(
				'parent'     => $show_header_area_container,
				'name'       => 'show_skewed_section_header_area_container',
				'dependency' => array(
					'show' => array(
						'mkdf_enable_skewed_section_on_header_area_meta' => 'yes'
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_header_area_container,
				'type'        => 'textarea',
				'name'        => 'mkdf_header_area_skewed_section_svg_path_meta',
				'label'       => esc_html__( 'Skewed Section On Header Area SVG Path', 'wanderland' ),
				'description' => esc_html__( 'Enter your Section On Header Area SVG path here. Please remove version and id attributes from your SVG path because of HTML validation', 'wanderland' ),
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'parent'      => $show_skewed_section_header_area_container,
				'type'        => 'color',
				'name'        => 'mkdf_header_area_skewed_section_svg_color_meta',
				'label'       => esc_html__( 'Skewed Section Color', 'wanderland' ),
				'description' => esc_html__( 'Choose a background color for Skewed Section', 'wanderland' ),
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_additional_header_area_meta_boxes', 'wanderland_mikado_skewed_section_header_meta', 20 );
}