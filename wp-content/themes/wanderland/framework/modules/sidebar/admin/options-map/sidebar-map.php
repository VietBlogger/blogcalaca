<?php

if ( ! function_exists( 'wanderland_mikado_sidebar_options_map' ) ) {
	function wanderland_mikado_sidebar_options_map() {
		
		wanderland_mikado_add_admin_page(
			array(
				'slug'  => '_sidebar_page',
				'title' => esc_html__( 'Sidebar Area', 'wanderland' ),
				'icon'  => 'fa fa-indent'
			)
		);
		
		$sidebar_panel = wanderland_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Sidebar Area', 'wanderland' ),
				'name'  => 'sidebar',
				'page'  => '_sidebar_page'
			)
		);
		
		wanderland_mikado_add_admin_field( array(
			'name'          => 'sidebar_layout',
			'type'          => 'select',
			'label'         => esc_html__( 'Sidebar Layout', 'wanderland' ),
			'description'   => esc_html__( 'Choose a sidebar layout for pages', 'wanderland' ),
			'parent'        => $sidebar_panel,
			'default_value' => 'no-sidebar',
            'options'       => wanderland_mikado_get_custom_sidebars_options()
		) );
		
		$wanderland_custom_sidebars = wanderland_mikado_get_custom_sidebars();
		if ( count( $wanderland_custom_sidebars ) > 0 ) {
			wanderland_mikado_add_admin_field( array(
				'name'        => 'custom_sidebar_area',
				'type'        => 'selectblank',
				'label'       => esc_html__( 'Sidebar to Display', 'wanderland' ),
				'description' => esc_html__( 'Choose a sidebar to display on pages. Default sidebar is "Sidebar"', 'wanderland' ),
				'parent'      => $sidebar_panel,
				'options'     => $wanderland_custom_sidebars,
				'args'        => array(
					'select2' => true
				)
			) );
		}
	}
	
	add_action( 'wanderland_mikado_action_options_map', 'wanderland_mikado_sidebar_options_map', wanderland_mikado_set_options_map_position( 'sidebar' ) );
}