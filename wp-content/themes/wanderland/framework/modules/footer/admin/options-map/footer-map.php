<?php

if ( ! function_exists( 'wanderland_mikado_footer_options_map' ) ) {
	function wanderland_mikado_footer_options_map() {

		wanderland_mikado_add_admin_page(
			array(
				'slug'  => '_footer_page',
				'title' => esc_html__( 'Footer', 'wanderland' ),
				'icon'  => 'fa fa-sort-amount-asc'
			)
		);

		$footer_panel = wanderland_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Footer', 'wanderland' ),
				'name'  => 'footer',
				'page'  => '_footer_page'
			)
		);

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'footer_in_grid',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Footer in Grid', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will place Footer content in grid', 'wanderland' ),
				'parent'        => $footer_panel
			)
		);

        wanderland_mikado_add_admin_field(
            array(
                'type'          => 'yesno',
                'name'          => 'uncovering_footer',
                'default_value' => 'no',
                'label'         => esc_html__( 'Uncovering Footer', 'wanderland' ),
                'description'   => esc_html__( 'Enabling this option will make Footer gradually appear on scroll', 'wanderland' ),
                'parent'        => $footer_panel
            )
        );

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_top',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show Footer Top', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Top area', 'wanderland' ),
				'parent'        => $footer_panel
			)
		);
		
		$show_footer_top_container = wanderland_mikado_add_admin_container(
			array(
				'name'       => 'show_footer_top_container',
				'parent'     => $footer_panel,
				'dependency' => array(
					'show' => array(
						'show_footer_top' => 'yes'
					)
				)
			)
		);

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_top_columns',
				'parent'        => $show_footer_top_container,
				'default_value' => '3 3 3 3',
				'label'         => esc_html__( 'Footer Top Columns', 'wanderland' ),
				'description'   => esc_html__( 'Choose number of columns for Footer Top area', 'wanderland' ),
				'options'       => array(
					'12' => '1',
					'6 6' => '2',
					'3 9' => '2 (25% + 75%)',
					'4 4 4' => '3',
                    '3 3 6' => '3 (25% + 25% + 50%)',
					'3 3 3 3' => '4'
				)
			)
		);

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_top_columns_alignment',
				'default_value' => 'left',
				'label'         => esc_html__( 'Footer Top Columns Alignment', 'wanderland' ),
				'description'   => esc_html__( 'Text Alignment in Footer Columns', 'wanderland' ),
				'options'       => array(
					''       => esc_html__( 'Default', 'wanderland' ),
					'left'   => esc_html__( 'Left', 'wanderland' ),
					'center' => esc_html__( 'Center', 'wanderland' ),
					'right'  => esc_html__( 'Right', 'wanderland' )
				),
				'parent'        => $show_footer_top_container
			)
		);
		
		$footer_top_styles_group = wanderland_mikado_add_admin_group(
			array(
				'name'        => 'footer_top_styles_group',
				'title'       => esc_html__( 'Footer Top Styles', 'wanderland' ),
				'description' => esc_html__( 'Define style for footer top area', 'wanderland' ),
				'parent'      => $show_footer_top_container
			)
		);
		
		$footer_top_styles_row_1 = wanderland_mikado_add_admin_row(
			array(
				'name'   => 'footer_top_styles_row_1',
				'parent' => $footer_top_styles_group
			)
		);
		
			wanderland_mikado_add_admin_field(
				array(
					'name'   => 'footer_top_background_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Background Color', 'wanderland' ),
					'parent' => $footer_top_styles_row_1
				)
			);
			
			wanderland_mikado_add_admin_field(
				array(
					'name'   => 'footer_top_border_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Border Color', 'wanderland' ),
					'parent' => $footer_top_styles_row_1
				)
			);
			
			wanderland_mikado_add_admin_field(
				array(
					'name'   => 'footer_top_border_width',
					'type'   => 'textsimple',
					'label'  => esc_html__( 'Border Width', 'wanderland' ),
					'parent' => $footer_top_styles_row_1,
					'args'   => array(
						'suffix' => 'px'
					)
				)
			);

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_middle',
				'default_value' => 'no',
				'label'         => esc_html__( 'Show Footer middle', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will show Footer middle area', 'wanderland' ),
				'parent'        => $footer_panel,
			)
		);

		$show_footer_middle_container = wanderland_mikado_add_admin_container(
			array(
				'name'       => 'show_footer_middle_container',
				'parent'     => $footer_panel,
				'dependency' => array(
					'show' => array(
						'show_footer_middle' => 'yes'
					)
				)
			)
		);

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_middle_columns',
				'parent'        => $show_footer_middle_container,
				'default_value' => '3 3 3 3',
				'label'         => esc_html__( 'Footer middle Columns', 'wanderland' ),
				'description'   => esc_html__( 'Choose number of columns for Footer middle area', 'wanderland' ),
				'options'       => array(
					'12'      => '1',
					'6 6'     => '2',
					'4 4 4'   => '3',
					'3 3 6'   => '3 (25% + 25% + 50%)',
					'3 3 3 3' => '4'
				)
			)
		);

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_middle_columns_alignment',
				'default_value' => 'left',
				'label'         => esc_html__( 'Footer middle Columns Alignment', 'wanderland' ),
				'description'   => esc_html__( 'Text Alignment in Footer Columns', 'wanderland' ),
				'options'       => array(
					''       => esc_html__( 'Default', 'wanderland' ),
					'left'   => esc_html__( 'Left', 'wanderland' ),
					'center' => esc_html__( 'Center', 'wanderland' ),
					'right'  => esc_html__( 'Right', 'wanderland' )
				),
				'parent'        => $show_footer_middle_container,
			)
		);

		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'footer_middle_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Background Color', 'wanderland' ),
				'description' => esc_html__( 'Set background color for middle footer area', 'wanderland' ),
				'parent'      => $show_footer_middle_container
			)
		);

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'show_footer_bottom',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show Footer Bottom', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will show Footer Bottom area', 'wanderland' ),
				'parent'        => $footer_panel
			)
		);

		$show_footer_bottom_container = wanderland_mikado_add_admin_container(
			array(
				'name'            => 'show_footer_bottom_container',
				'parent'          => $footer_panel,
				'dependency' => array(
					'show' => array(
						'show_footer_bottom'  => 'yes'
					)
				)
			)
		);

		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'footer_bottom_columns',
				'default_value' => '6 6',
				'label'         => esc_html__( 'Footer Bottom Columns', 'wanderland' ),
				'description'   => esc_html__( 'Choose number of columns for Footer Bottom area', 'wanderland' ),
				'options'       => array(
					'12' => '1',
					'6 6' => '2',
					'4 4 4' => '3'
				),
				'parent'        => $show_footer_bottom_container
			)
		);
		
		$footer_bottom_styles_group = wanderland_mikado_add_admin_group(
			array(
				'name'        => 'footer_bottom_styles_group',
				'title'       => esc_html__( 'Footer Bottom Styles', 'wanderland' ),
				'description' => esc_html__( 'Define style for footer bottom area', 'wanderland' ),
				'parent'      => $show_footer_bottom_container
			)
		);
		
		$footer_bottom_styles_row_1 = wanderland_mikado_add_admin_row(
			array(
				'name'   => 'footer_bottom_styles_row_1',
				'parent' => $footer_bottom_styles_group
			)
		);
		
			wanderland_mikado_add_admin_field(
				array(
					'name'   => 'footer_bottom_background_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Background Color', 'wanderland' ),
					'parent' => $footer_bottom_styles_row_1
				)
			);
			
			wanderland_mikado_add_admin_field(
				array(
					'name'   => 'footer_bottom_border_color',
					'type'   => 'colorsimple',
					'label'  => esc_html__( 'Border Color', 'wanderland' ),
					'parent' => $footer_bottom_styles_row_1
				)
			);
			
			wanderland_mikado_add_admin_field(
				array(
					'name'   => 'footer_bottom_border_width',
					'type'   => 'textsimple',
					'label'  => esc_html__( 'Border Width', 'wanderland' ),
					'parent' => $footer_bottom_styles_row_1,
					'args'   => array(
						'suffix' => 'px'
					)
				)
			);
	}

	add_action( 'wanderland_mikado_action_options_map', 'wanderland_mikado_footer_options_map', wanderland_mikado_set_options_map_position( 'footer' ) );
}