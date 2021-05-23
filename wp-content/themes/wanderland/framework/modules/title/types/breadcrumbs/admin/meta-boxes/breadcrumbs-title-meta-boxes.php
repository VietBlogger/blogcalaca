<?php

if ( ! function_exists( 'wanderland_mikado_get_hide_dep_for_breadcrumbs_title_meta_boxes' ) ) {
	function wanderland_mikado_get_hide_dep_for_breadcrumbs_title_meta_boxes() {
		$hide_dep_options = apply_filters( 'wanderland_mikado_filter_breadcrumbs_title_hide_meta_boxes', $hide_dep_options = array() );
		
		return $hide_dep_options;
	}
}

if ( ! function_exists( 'wanderland_mikado_breadcrumbs_title_type_options_meta_boxes' ) ) {
	function wanderland_mikado_breadcrumbs_title_type_options_meta_boxes( $show_title_area_meta_container ) {
	    $hide_dep_options = wanderland_mikado_get_hide_dep_for_breadcrumbs_title_meta_boxes();
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_breadcrumbs_color_meta',
				'type'        => 'color',
				'label'       => esc_html__( 'Breadcrumbs Color', 'wanderland' ),
				'description' => esc_html__( 'Choose a color for breadcrumbs text', 'wanderland' ),
				'parent'      => $show_title_area_meta_container,
                'dependency'  => array(
                    'hide' => array(
                        'mkdf_title_area_type_meta' => $hide_dep_options
                    )
                )
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_additional_title_area_meta_boxes', 'wanderland_mikado_breadcrumbs_title_type_options_meta_boxes' );
}