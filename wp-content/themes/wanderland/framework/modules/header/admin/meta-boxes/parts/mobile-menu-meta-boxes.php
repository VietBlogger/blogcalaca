<?php

if ( ! function_exists( 'wanderland_mikado_mobile_menu_meta_box_map' ) ) {
	function wanderland_mikado_mobile_menu_meta_box_map($header_meta_box) {

		wanderland_mikado_add_admin_section_title(
			array(
				'parent' => $header_meta_box,
				'name'   => 'header_mobile',
				'title'  => esc_html__( 'Mobile Header in Grid', 'wanderland' )
			)
		);

		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_mobile_header_in_grid_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Mobile Header in Grid', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will put mobile header in grid', 'wanderland' ),
				'parent'        => $header_meta_box,
				'options'       => wanderland_mikado_get_yes_no_select_array()
			)
		);

		$mobile_header_without_grid_container = wanderland_mikado_add_admin_container(
			array(
				'parent'          => $header_meta_box,
				'name'            => 'mobile_header_without_grid_container',
				'dependency' => array(
					'show' => array(
						'mkdf_mobile_header_in_grid_meta' => 'no'
					)
				)
			)
		);

		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_mobile_header_without_grid_padding_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Mobile Header Padding', 'wanderland' ),
				'description' => esc_html__( 'Set padding for Mobile Header', 'wanderland' ),
				'parent'      => $mobile_header_without_grid_container,
				'args'        => array(
					'col_width' => 3,
					'suffix'    => 'px'
				)
			)
		);


	}
	
	add_action( 'wanderland_mikado_action_header_mobile_menu_meta_boxes_map', 'wanderland_mikado_mobile_menu_meta_box_map', 10 );
}