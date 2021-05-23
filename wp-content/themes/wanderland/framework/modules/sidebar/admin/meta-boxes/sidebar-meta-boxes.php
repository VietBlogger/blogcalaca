<?php

if ( ! function_exists( 'wanderland_mikado_map_sidebar_meta' ) ) {
	function wanderland_mikado_map_sidebar_meta() {
		$mkdf_sidebar_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'wanderland_mikado_filter_set_scope_for_meta_boxes', array( 'page' ), 'sidebar_meta' ),
				'title' => esc_html__( 'Sidebar', 'wanderland' ),
				'name'  => 'sidebar_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_sidebar_layout_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Sidebar Layout', 'wanderland' ),
				'description' => esc_html__( 'Choose the sidebar layout', 'wanderland' ),
				'parent'      => $mkdf_sidebar_meta_box,
                'options'       => wanderland_mikado_get_custom_sidebars_options( true )
			)
		);
		
		$mkdf_custom_sidebars = wanderland_mikado_get_custom_sidebars();
		if ( count( $mkdf_custom_sidebars ) > 0 ) {
			wanderland_mikado_create_meta_box_field(
				array(
					'name'        => 'mkdf_custom_sidebar_area_meta',
					'type'        => 'selectblank',
					'label'       => esc_html__( 'Choose Widget Area in Sidebar', 'wanderland' ),
					'description' => esc_html__( 'Choose Custom Widget area to display in Sidebar"', 'wanderland' ),
					'parent'      => $mkdf_sidebar_meta_box,
					'options'     => $mkdf_custom_sidebars,
					'args'        => array(
						'select2' => true
					)
				)
			);
		}
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_sidebar_meta', 31 );
}