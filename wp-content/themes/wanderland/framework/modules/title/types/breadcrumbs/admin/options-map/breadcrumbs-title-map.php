<?php

if ( ! function_exists('wanderland_mikado_breadcrumbs_title_type_options_map') ) {
	function wanderland_mikado_breadcrumbs_title_type_options_map($panel_typography) {
		
		wanderland_mikado_add_admin_section_title(
			array(
				'name'   => 'type_section_breadcrumbs',
				'title'  => esc_html__( 'Breadcrumbs', 'wanderland' ),
				'parent' => $panel_typography
			)
		);
	
		$group_page_breadcrumbs_styles = wanderland_mikado_add_admin_group(
			array(
				'name'        => 'group_page_breadcrumbs_styles',
				'title'       => esc_html__( 'Breadcrumbs', 'wanderland' ),
				'description' => esc_html__( 'Define styles for page breadcrumbs', 'wanderland' ),
				'parent'      => $panel_typography
			)
		);
	
			$row_page_breadcrumbs_styles_1 = wanderland_mikado_add_admin_row(
				array(
					'name'   => 'row_page_breadcrumbs_styles_1',
					'parent' => $group_page_breadcrumbs_styles
				)
			);
		
				wanderland_mikado_add_admin_field(
					array(
						'type'   => 'colorsimple',
						'name'   => 'page_breadcrumb_color',
						'label'  => esc_html__( 'Text Color', 'wanderland' ),
						'parent' => $row_page_breadcrumbs_styles_1
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'type'          => 'textsimple',
						'name'          => 'page_breadcrumb_font_size',
						'default_value' => '',
						'label'         => esc_html__( 'Font Size', 'wanderland' ),
						'parent'        => $row_page_breadcrumbs_styles_1,
						'args'          => array(
							'suffix' => 'px'
						)
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'type'          => 'textsimple',
						'name'          => 'page_breadcrumb_line_height',
						'default_value' => '',
						'label'         => esc_html__( 'Line Height', 'wanderland' ),
						'parent'        => $row_page_breadcrumbs_styles_1,
						'args'          => array(
							'suffix' => 'px'
						)
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'type'          => 'selectblanksimple',
						'name'          => 'page_breadcrumb_text_transform',
						'default_value' => '',
						'label'         => esc_html__( 'Text Transform', 'wanderland' ),
						'options'       => wanderland_mikado_get_text_transform_array(),
						'parent'        => $row_page_breadcrumbs_styles_1
					)
				);
	
			$row_page_breadcrumbs_styles_2 = wanderland_mikado_add_admin_row(
				array(
					'name'   => 'row_page_breadcrumbs_styles_2',
					'parent' => $group_page_breadcrumbs_styles,
					'next'   => true
				)
			);
	
				wanderland_mikado_add_admin_field(
					array(
						'type'          => 'fontsimple',
						'name'          => 'page_breadcrumb_google_fonts',
						'default_value' => '-1',
						'label'         => esc_html__( 'Font Family', 'wanderland' ),
						'parent'        => $row_page_breadcrumbs_styles_2
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'type'          => 'selectblanksimple',
						'name'          => 'page_breadcrumb_font_style',
						'default_value' => '',
						'label'         => esc_html__( 'Font Style', 'wanderland' ),
						'options'       => wanderland_mikado_get_font_style_array(),
						'parent'        => $row_page_breadcrumbs_styles_2
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'type'          => 'selectblanksimple',
						'name'          => 'page_breadcrumb_font_weight',
						'default_value' => '',
						'label'         => esc_html__( 'Font Weight', 'wanderland' ),
						'options'       => wanderland_mikado_get_font_weight_array(),
						'parent'        => $row_page_breadcrumbs_styles_2
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'type'          => 'textsimple',
						'name'          => 'page_breadcrumb_letter_spacing',
						'default_value' => '',
						'label'         => esc_html__( 'Letter Spacing', 'wanderland' ),
						'parent'        => $row_page_breadcrumbs_styles_2,
						'args'          => array(
							'suffix' => 'px'
						)
					)
				);
	
			$row_page_breadcrumbs_styles_3 = wanderland_mikado_add_admin_row(
				array(
					'name'   => 'row_page_breadcrumbs_styles_3',
					'parent' => $group_page_breadcrumbs_styles,
					'next'   => true
				)
			);
		
				wanderland_mikado_add_admin_field(
					array(
						'type'   => 'colorsimple',
						'name'   => 'page_breadcrumb_hovercolor',
						'label'  => esc_html__( 'Hover/Active Text Color', 'wanderland' ),
						'parent' => $row_page_breadcrumbs_styles_3
					)
				);
    }

	add_action( 'wanderland_mikado_action_additional_title_typography_options_map', 'wanderland_mikado_breadcrumbs_title_type_options_map');
}