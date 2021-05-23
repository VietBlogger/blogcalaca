<?php

if ( ! function_exists( 'wanderland_mikado_map_content_bottom_meta' ) ) {
	function wanderland_mikado_map_content_bottom_meta() {
		
		$content_bottom_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'wanderland_mikado_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'content_bottom_meta' ),
				'title' => esc_html__( 'Content Bottom', 'wanderland' ),
				'name'  => 'content_bottom_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_enable_content_bottom_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Enable Content Bottom Area', 'wanderland' ),
				'description'   => esc_html__( 'This option will enable Content Bottom area on pages', 'wanderland' ),
				'parent'        => $content_bottom_meta_box,
				'options'       => wanderland_mikado_get_yes_no_select_array()
			)
		);
		
		$show_content_bottom_meta_container = wanderland_mikado_add_admin_container(
			array(
				'parent'          => $content_bottom_meta_box,
				'name'            => 'mkdf_show_content_bottom_meta_container',
				'dependency' => array(
					'show' => array(
						'mkdf_enable_content_bottom_area_meta' => 'yes'
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_content_bottom_sidebar_custom_display_meta',
				'type'          => 'selectblank',
				'default_value' => '',
				'label'         => esc_html__( 'Sidebar to Display', 'wanderland' ),
				'description'   => esc_html__( 'Choose a content bottom sidebar to display', 'wanderland' ),
				'options'       => wanderland_mikado_get_custom_sidebars(),
				'parent'        => $show_content_bottom_meta_container,
				'args'          => array(
					'select2' => true
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'type'          => 'select',
				'name'          => 'mkdf_content_bottom_in_grid_meta',
				'default_value' => '',
				'label'         => esc_html__( 'Display in Grid', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will place content bottom in grid', 'wanderland' ),
				'options'       => wanderland_mikado_get_yes_no_select_array(),
				'parent'        => $show_content_bottom_meta_container
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'type'        => 'color',
				'name'        => 'mkdf_content_bottom_background_color_meta',
				'label'       => esc_html__( 'Background Color', 'wanderland' ),
				'description' => esc_html__( 'Choose a background color for content bottom area', 'wanderland' ),
				'parent'      => $show_content_bottom_meta_container
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_content_bottom_meta', 71 );
}