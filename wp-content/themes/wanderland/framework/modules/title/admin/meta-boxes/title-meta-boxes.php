<?php

if ( ! function_exists( 'wanderland_mikado_get_title_types_meta_boxes' ) ) {
	function wanderland_mikado_get_title_types_meta_boxes() {
		$title_type_options = apply_filters( 'wanderland_mikado_filter_title_type_meta_boxes', $title_type_options = array( '' => esc_html__( 'Default', 'wanderland' ) ) );
		
		return $title_type_options;
	}
}

foreach ( glob( WANDERLAND_MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/title/types/*/admin/meta-boxes/*.php' ) as $meta_box_load ) {
	include_once $meta_box_load;
}

if ( ! function_exists( 'wanderland_mikado_map_title_meta' ) ) {
	function wanderland_mikado_map_title_meta() {
		$title_type_meta_boxes = wanderland_mikado_get_title_types_meta_boxes();
		
		$title_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'wanderland_mikado_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'title_meta' ),
				'title' => esc_html__( 'Title', 'wanderland' ),
				'name'  => 'title_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_title_area_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wanderland' ),
				'description'   => esc_html__( 'Disabling this option will turn off page title area', 'wanderland' ),
				'parent'        => $title_meta_box,
				'options'       => wanderland_mikado_get_yes_no_select_array()
			)
		);
		
			$show_title_area_meta_container = wanderland_mikado_add_admin_container(
				array(
					'parent'          => $title_meta_box,
					'name'            => 'mkdf_show_title_area_meta_container',
					'dependency' => array(
						'hide' => array(
							'mkdf_show_title_area_meta' => 'no'
						)
					)
				)
			);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_title_area_type_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Title Area Type', 'wanderland' ),
						'description'   => esc_html__( 'Choose title type', 'wanderland' ),
						'parent'        => $show_title_area_meta_container,
						'options'       => $title_type_meta_boxes
					)
				);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_title_area_in_grid_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Title Area In Grid', 'wanderland' ),
						'description'   => esc_html__( 'Set title area content to be in grid', 'wanderland' ),
						'options'       => wanderland_mikado_get_yes_no_select_array(),
						'parent'        => $show_title_area_meta_container
					)
				);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_title_area_height_meta',
						'type'        => 'text',
						'label'       => esc_html__( 'Height', 'wanderland' ),
						'description' => esc_html__( 'Set a height for Title Area', 'wanderland' ),
						'parent'      => $show_title_area_meta_container,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px'
						)
					)
				);

				wanderland_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_title_area_height_mobile_meta',
						'type'        => 'text',
						'label'       => esc_html__( 'Height on Mobile', 'wanderland' ),
						'description' => esc_html__( 'Set a height for Title Area on Mobile', 'wanderland' ),
						'parent'      => $show_title_area_meta_container,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px'
						)
					)
				);
				
				wanderland_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_title_area_background_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Background Color', 'wanderland' ),
						'description' => esc_html__( 'Choose a background color for title area', 'wanderland' ),
						'parent'      => $show_title_area_meta_container
					)
				);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_title_area_background_image_meta',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Image', 'wanderland' ),
						'description' => esc_html__( 'Choose an Image for title area', 'wanderland' ),
						'parent'      => $show_title_area_meta_container
					)
				);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_title_area_background_image_behavior_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Background Image Behavior', 'wanderland' ),
						'description'   => esc_html__( 'Choose title area background image behavior', 'wanderland' ),
						'parent'        => $show_title_area_meta_container,
						'options'       => array(
							''                    => esc_html__( 'Default', 'wanderland' ),
							'hide'                => esc_html__( 'Hide Image', 'wanderland' ),
							'responsive'          => esc_html__( 'Enable Responsive Image', 'wanderland' ),
							'responsive-disabled' => esc_html__( 'Disable Responsive Image', 'wanderland' ),
							'parallax'            => esc_html__( 'Enable Parallax Image', 'wanderland' ),
							'parallax-zoom-out'   => esc_html__( 'Enable Parallax With Zoom Out Image', 'wanderland' ),
							'parallax-disabled'   => esc_html__( 'Disable Parallax Image', 'wanderland' )
						)
					)
				);
				
				wanderland_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_title_area_vertical_alignment_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Vertical Alignment', 'wanderland' ),
						'description'   => esc_html__( 'Specify title area content vertical alignment', 'wanderland' ),
						'parent'        => $show_title_area_meta_container,
						'options'       => array(
							''              => esc_html__( 'Default', 'wanderland' ),
							'header-bottom' => esc_html__( 'From Bottom of Header', 'wanderland' ),
							'window-top'    => esc_html__( 'From Window Top', 'wanderland' )
						)
					)
				);
				
				wanderland_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_title_area_title_tag_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Title Tag', 'wanderland' ),
						'options'       => wanderland_mikado_get_title_tag( true ),
						'parent'        => $show_title_area_meta_container
					)
				);
				
				wanderland_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_title_text_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Title Color', 'wanderland' ),
						'description' => esc_html__( 'Choose a color for title text', 'wanderland' ),
						'parent'      => $show_title_area_meta_container
					)
				);
				
				wanderland_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_title_area_subtitle_meta',
						'type'          => 'text',
						'default_value' => '',
						'label'         => esc_html__( 'Subtitle Text', 'wanderland' ),
						'description'   => esc_html__( 'Enter your subtitle text', 'wanderland' ),
						'parent'        => $show_title_area_meta_container,
						'args'          => array(
							'col_width' => 6
						)
					)
				);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'          => 'mkdf_title_area_subtitle_tag_meta',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Subtitle Tag', 'wanderland' ),
						'options'       => wanderland_mikado_get_title_tag( true, array( 'p' => 'p' ) ),
						'parent'        => $show_title_area_meta_container
					)
				);
				
				wanderland_mikado_create_meta_box_field(
					array(
						'name'        => 'mkdf_subtitle_color_meta',
						'type'        => 'color',
						'label'       => esc_html__( 'Subtitle Color', 'wanderland' ),
						'description' => esc_html__( 'Choose a color for subtitle text', 'wanderland' ),
						'parent'      => $show_title_area_meta_container
					)
				);
		
		/***************** Additional Title Area Layout - start *****************/
		
		do_action( 'wanderland_mikado_action_additional_title_area_meta_boxes', $show_title_area_meta_container );
		
		/***************** Additional Title Area Layout - end *****************/
		
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_title_meta', 60 );
}