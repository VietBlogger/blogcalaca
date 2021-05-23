<?php

if ( ! function_exists( 'wanderland_mikado_get_hide_dep_for_dropdown_meta_boxes' ) ) {
	function wanderland_mikado_get_hide_dep_for_dropdown_meta_boxes() {
		$hide_dep_options = apply_filters( 'wanderland_mikado_filter_dropdown_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wanderland_mikado_dropdown_meta_options_map' ) ) {
	function wanderland_mikado_dropdown_meta_options_map( $header_meta_box ) {
		$hide_dep_widgets 			= wanderland_mikado_get_hide_dep_for_dropdown_meta_boxes();

		$dropdown_container = wanderland_mikado_add_admin_container_no_style(
			array(
				'type'       => 'container',
				'name'       => 'dropdown_container',
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
				'parent' => $dropdown_container,
				'name'   => 'dropdown_styles',
				'title'  => esc_html__( 'Dropdown Styles', 'wanderland' )
			)
		);


		wanderland_mikado_create_meta_box_field(
			array(
				'parent'        => $dropdown_container,
				'type'          => 'text',
				'name'          => 'mkdf_dropdown_top_position_meta',
				'label'         => esc_html__( 'Dropdown Position', 'wanderland' ),
				'description'   => esc_html__( 'Enter value in percentage of entire header height', 'wanderland' ),
				'args'          => array(
					'col_width' => 3,
					'suffix'    => '%'
				)
			)
		);

        wanderland_mikado_create_meta_box_field(
            array(
                'name'          => 'mkdf_wide_dropdown_menu_in_grid_meta',
                'type'          => 'select',
                'label'         => esc_html__( 'Wide Dropdown Menu In Grid', 'wanderland' ),
                'description'   => esc_html__( 'Set wide dropdown menu to be in grid', 'wanderland' ),
                'parent'        => $dropdown_container,
                'default_value' => '',
                'options'       => wanderland_mikado_get_yes_no_select_array()
            )
        );

        $wide_dropdown_menu_in_grid_container = wanderland_mikado_add_admin_container(
            array(
                'type'            => 'container',
                'name'            => 'wide_dropdown_menu_in_grid_container',
                'parent'          => $dropdown_container,
                'dependency' => array(
                    'show' => array(
                        'mkdf_wide_dropdown_menu_in_grid_meta'  => 'no'
                    )
                )
            )
        );

        wanderland_mikado_create_meta_box_field(
            array(
                'name'        => 'mkdf_wide_dropdown_menu_content_in_grid_meta',
                'type'          => 'select',
                'label'       => esc_html__( 'Wide Dropdown Menu Content In Grid', 'wanderland' ),
                'description' => esc_html__( 'Set wide dropdown menu content to be in grid', 'wanderland' ),
                'parent'      => $wide_dropdown_menu_in_grid_container,
                'default_value' => '',
                'options'       => wanderland_mikado_get_yes_no_select_array()
            )
        );
			
	
		
		do_action( 'wanderland_mikado_dropdown_additional_meta_boxes_map', $dropdown_container );
	}
	
	add_action( 'wanderland_mikado_action_dropdown_meta_boxes_map', 'wanderland_mikado_dropdown_meta_options_map', 10, 1 );
}