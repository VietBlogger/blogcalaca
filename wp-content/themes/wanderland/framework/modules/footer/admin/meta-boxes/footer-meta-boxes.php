<?php

if ( ! function_exists( 'wanderland_mikado_map_footer_meta' ) ) {
	function wanderland_mikado_map_footer_meta() {
		
		$footer_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'wanderland_mikado_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'footer_meta' ),
				'title' => esc_html__( 'Footer', 'wanderland' ),
				'name'  => 'footer_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_disable_footer_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Disable Footer For This Page', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will hide footer on this page', 'wanderland' ),
				'options'       => wanderland_mikado_get_yes_no_select_array(),
				'parent'        => $footer_meta_box
			)
		);
		
		$show_footer_meta_container = wanderland_mikado_add_admin_container(
			array(
				'name'       => 'mkdf_show_footer_meta_container',
				'parent'     => $footer_meta_box,
				'dependency' => array(
					'hide' => array(
						'mkdf_disable_footer_meta' => 'yes'
					)
				)
			)
		);
		
			wanderland_mikado_create_meta_box_field(
				array(
					'name'          => 'mkdf_footer_in_grid_meta',
					'type'          => 'select',
					'default_value' => '',
					'label'         => esc_html__( 'Footer in Grid', 'wanderland' ),
					'description'   => esc_html__( 'Enabling this option will place Footer content in grid', 'wanderland' ),
					'options'       => wanderland_mikado_get_yes_no_select_array(),
					'parent'        => $show_footer_meta_container
				)
			);
			
			wanderland_mikado_create_meta_box_field(
				array(
					'name'          => 'mkdf_uncovering_footer_meta',
					'type'          => 'select',
					'default_value' => '',
					'label'         => esc_html__( 'Uncovering Footer', 'wanderland' ),
					'description'   => esc_html__( 'Enabling this option will make Footer gradually appear on scroll', 'wanderland' ),
					'options'       => wanderland_mikado_get_yes_no_select_array(),
					'parent'        => $show_footer_meta_container
				)
			);

		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_footer_skin_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Footer Skin', 'wanderland' ),
				'description'   => esc_html__( 'Choose footer skin', 'wanderland' ),
				'options'       => array(
					'light-footer' => esc_html__( 'Light', 'wanderland' ),
					'dark-footer'  => esc_html__( 'Dark', 'wanderland' )
				),
				'parent'        => $show_footer_meta_container
			)
		);
		
			wanderland_mikado_create_meta_box_field(
				array(
					'name'          => 'mkdf_show_footer_top_meta',
					'type'          => 'select',
					'default_value' => '',
					'label'         => esc_html__( 'Show Footer Top', 'wanderland' ),
					'description'   => esc_html__( 'Enabling this option will show Footer Top area', 'wanderland' ),
					'options'       => wanderland_mikado_get_yes_no_select_array(),
					'parent'        => $show_footer_meta_container
				)
			);
		
			$footer_top_styles_group = wanderland_mikado_add_admin_group(
				array(
					'name'        => 'footer_top_styles_group',
					'title'       => esc_html__( 'Footer Top Styles', 'wanderland' ),
					'description' => esc_html__( 'Define style for footer top area', 'wanderland' ),
					'parent'      => $show_footer_meta_container,
					'dependency'  => array(
						'hide' => array(
							'mkdf_show_footer_top_meta' => 'no'
						)
					)
				)
			);
			
			$footer_top_styles_row_1 = wanderland_mikado_add_admin_row(
				array(
					'name'   => 'footer_top_styles_row_1',
					'parent' => $footer_top_styles_group
				)
			);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'   => 'mkdf_footer_top_background_color_meta',
						'type'   => 'colorsimple',
						'label'  => esc_html__( 'Background Color', 'wanderland' ),
						'parent' => $footer_top_styles_row_1
					)
				);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'   => 'mkdf_footer_top_border_color_meta',
						'type'   => 'colorsimple',
						'label'  => esc_html__( 'Border Color', 'wanderland' ),
						'parent' => $footer_top_styles_row_1
					)
				);
		
				wanderland_mikado_create_meta_box_field(
					array(
						'name'   => 'mkdf_footer_top_border_width_meta',
						'type'   => 'textsimple',
						'label'  => esc_html__( 'Border Width', 'wanderland' ),
						'parent' => $footer_top_styles_row_1,
						'args'   => array(
							'suffix' => 'px'
						)
					)
				);

		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_footer_middle_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Footer Middle', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Middle area', 'wanderland' ),
				'options'       => wanderland_mikado_get_yes_no_select_array(),
				'parent'        => $show_footer_meta_container
			)
		);

		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_footer_middle_background_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Background Color', 'wanderland' ),
				'description' => esc_html__( 'Set background color for middle footer area', 'wanderland' ),
				'parent'      => $show_footer_meta_container
			)
		);
			
			wanderland_mikado_create_meta_box_field(
				array(
					'name'          => 'mkdf_show_footer_bottom_meta',
					'type'          => 'select',
					'default_value' => '',
					'label'         => esc_html__( 'Show Footer Bottom', 'wanderland' ),
					'description'   => esc_html__( 'Enabling this option will show Footer Bottom area', 'wanderland' ),
					'options'       => wanderland_mikado_get_yes_no_select_array(),
					'parent'        => $show_footer_meta_container
				)
			);
		
			$footer_bottom_styles_group = wanderland_mikado_add_admin_group(
				array(
					'name'        => 'footer_bottom_styles_group',
					'title'       => esc_html__( 'Footer Bottom Styles', 'wanderland' ),
					'description' => esc_html__( 'Define style for footer bottom area', 'wanderland' ),
					'parent'      => $show_footer_meta_container,
					'dependency'  => array(
						'hide' => array(
							'mkdf_show_footer_bottom_meta' => 'no'
						)
					)
				)
			);
			
			$footer_bottom_styles_row_1 = wanderland_mikado_add_admin_row(
				array(
					'name'   => 'footer_bottom_styles_row_1',
					'parent' => $footer_bottom_styles_group
				)
			);
			
				wanderland_mikado_create_meta_box_field(
					array(
						'name'   => 'mkdf_footer_bottom_background_color_meta',
						'type'   => 'colorsimple',
						'label'  => esc_html__( 'Background Color', 'wanderland' ),
						'parent' => $footer_bottom_styles_row_1
					)
				);
				
				wanderland_mikado_create_meta_box_field(
					array(
						'name'   => 'mkdf_footer_bottom_border_color_meta',
						'type'   => 'colorsimple',
						'label'  => esc_html__( 'Border Color', 'wanderland' ),
						'parent' => $footer_bottom_styles_row_1
					)
				);
				
				wanderland_mikado_create_meta_box_field(
					array(
						'name'   => 'mkdf_footer_bottom_border_width_meta',
						'type'   => 'textsimple',
						'label'  => esc_html__( 'Border Width', 'wanderland' ),
						'parent' => $footer_bottom_styles_row_1,
						'args'   => array(
							'suffix' => 'px'
						)
					)
				);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_footer_meta', 70 );
}