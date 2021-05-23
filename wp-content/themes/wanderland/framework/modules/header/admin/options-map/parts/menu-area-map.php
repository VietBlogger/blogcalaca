<?php

if ( ! function_exists( 'wanderland_mikado_get_hide_dep_for_header_menu_area_options' ) ) {
	function wanderland_mikado_get_hide_dep_for_header_menu_area_options() {
		$hide_dep_options = apply_filters( 'wanderland_mikado_filter_header_menu_area_hide_global_option', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wanderland_mikado_header_menu_area_options_map' ) ) {
	function wanderland_mikado_header_menu_area_options_map( $panel_header ) {
		$hide_dep_options = wanderland_mikado_get_hide_dep_for_header_menu_area_options();
		
		$menu_area_container = wanderland_mikado_add_admin_container_no_style(
			array(
				'parent'          => $panel_header,
				'name'            => 'menu_area_container',
				'dependency' => array(
					'hide' => array(
						'header_options'  => $hide_dep_options
					)
				),
			)
		);
		
		wanderland_mikado_add_admin_section_title(
			array(
				'parent' => $menu_area_container,
				'name'   => 'menu_area_style',
				'title'  => esc_html__( 'Menu Area Style', 'wanderland' )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_container,
				'type'          => 'yesno',
				'name'          => 'menu_area_in_grid',
				'default_value' => 'no',
				'label'         => esc_html__( 'Menu Area In Grid', 'wanderland' ),
				'description'   => esc_html__( 'Set menu area content to be in grid', 'wanderland' ),
			)
		);
		
		$menu_area_in_grid_container = wanderland_mikado_add_admin_container(
			array(
				'parent'          => $menu_area_container,
				'name'            => 'menu_area_in_grid_container',
				'dependency' => array(
					'hide' => array(
						'menu_area_in_grid'  => 'no'
					)
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_in_grid_container,
				'type'          => 'color',
				'name'          => 'menu_area_grid_background_color',
				'default_value' => '',
				'label'         => esc_html__( 'Grid Background Color', 'wanderland' ),
				'description'   => esc_html__( 'Set grid background color for menu area', 'wanderland' ),
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_in_grid_container,
				'type'          => 'text',
				'name'          => 'menu_area_grid_background_transparency',
				'default_value' => '',
				'label'         => esc_html__( 'Grid Background Transparency', 'wanderland' ),
				'description'   => esc_html__( 'Set grid background transparency for menu area', 'wanderland' ),
				'args'          => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_in_grid_container,
				'type'          => 'yesno',
				'name'          => 'menu_area_in_grid_shadow',
				'default_value' => 'no',
				'label'         => esc_html__( 'Grid Area Shadow', 'wanderland' ),
				'description'   => esc_html__( 'Set shadow on grid area', 'wanderland' )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_in_grid_container,
				'type'          => 'yesno',
				'name'          => 'menu_area_in_grid_border',
				'default_value' => 'no',
				'label'         => esc_html__( 'Grid Area Border', 'wanderland' ),
				'description'   => esc_html__( 'Set border on grid area', 'wanderland' )
			)
		);
		
		$menu_area_in_grid_border_container = wanderland_mikado_add_admin_container(
			array(
				'parent'          => $menu_area_in_grid_container,
				'name'            => 'menu_area_in_grid_border_container',
				'dependency' => array(
					'hide' => array(
						'menu_area_in_grid_border'  => 'no'
					)
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_in_grid_border_container,
				'type'          => 'color',
				'name'          => 'menu_area_in_grid_border_color',
				'default_value' => '',
				'label'         => esc_html__( 'Border Color', 'wanderland' ),
				'description'   => esc_html__( 'Set border color for menu area', 'wanderland' ),
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'menu_area_in_grid_border_color_transparency',
				'type'        => 'text',
				'label'       => esc_html__( 'Border Color Transparency', 'wanderland' ),
				'description' => esc_html__( 'Value should be between 0 and 1', 'wanderland' ),
				'parent'      => $menu_area_in_grid_border_container,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_container,
				'type'          => 'color',
				'name'          => 'menu_area_background_color',
				'default_value' => '',
				'label'         => esc_html__( 'Background Color', 'wanderland' ),
				'description'   => esc_html__( 'Set background color for menu area', 'wanderland' )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_container,
				'type'          => 'text',
				'name'          => 'menu_area_background_transparency',
				'default_value' => '',
				'label'         => esc_html__( 'Background Transparency', 'wanderland' ),
				'description'   => esc_html__( 'Set background transparency for menu area', 'wanderland' ),
				'args'          => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'        => $menu_area_container,
				'type'          => 'yesno',
				'name'          => 'menu_area_shadow',
				'default_value' => 'no',
				'label'         => esc_html__( 'Menu Area Shadow', 'wanderland' ),
				'description'   => esc_html__( 'Set shadow on menu area', 'wanderland' ),
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'menu_area_border',
				'default_value' => 'no',
				'label'         => esc_html__( 'Menu Area Border', 'wanderland' ),
				'description'   => esc_html__( 'Set border on menu area', 'wanderland' ),
				'parent'        => $menu_area_container
			)
		);
		
		$menu_area_border_container = wanderland_mikado_add_admin_container(
			array(
				'parent'          => $menu_area_container,
				'name'            => 'menu_area_border_container',
				'dependency' => array(
					'hide' => array(
						'menu_area_border'  => 'no'
					)
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'        => 'color',
				'name'        => 'menu_area_border_color',
				'label'       => esc_html__( 'Border Color', 'wanderland' ),
				'description' => esc_html__( 'Set border color for menu area', 'wanderland' ),
				'parent'      => $menu_area_border_container
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'menu_area_border_color_transparency',
				'type'        => 'text',
				'label'       => esc_html__( 'Border Color Transparency', 'wanderland' ),
				'description' => esc_html__( 'Value should be between 0 and 1', 'wanderland' ),
				'parent'      => $menu_area_border_container,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'        => 'text',
				'name'        => 'menu_area_height',
				'label'       => esc_html__( 'Height', 'wanderland' ),
				'description' => esc_html__( 'Enter header height', 'wanderland' ),
				'parent'      => $menu_area_container,
				'args'        => array(
					'col_width' => 3,
					'suffix'    => 'px'
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'   => 'text',
				'name'   => 'menu_area_side_padding',
				'label'  => esc_html__( 'Menu Area Side Padding', 'wanderland' ),
				'parent' => $menu_area_container,
				'args'   => array(
					'col_width' => 2,
					'suffix'    => esc_html__( 'px or %', 'wanderland' )
				)
			)
		);
		
		do_action( 'wanderland_mikado_header_menu_area_additional_options', $panel_header );
	}
	
	add_action( 'wanderland_mikado_action_header_menu_area_options_map', 'wanderland_mikado_header_menu_area_options_map', 10, 1 );
}