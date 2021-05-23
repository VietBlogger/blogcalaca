<?php

if ( ! function_exists( 'wanderland_mikado_logo_meta_box_map' ) ) {
	function wanderland_mikado_logo_meta_box_map() {
		
		$logo_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => apply_filters( 'wanderland_mikado_filter_set_scope_for_meta_boxes', array( 'page', 'post' ), 'logo_meta' ),
				'title' => esc_html__( 'Logo', 'wanderland' ),
				'name'  => 'logo_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_logo_image_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Default', 'wanderland' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'wanderland' ),
				'parent'      => $logo_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_logo_image_dark_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Dark', 'wanderland' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'wanderland' ),
				'parent'      => $logo_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_logo_image_light_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Light', 'wanderland' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'wanderland' ),
				'parent'      => $logo_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_logo_image_sticky_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Sticky', 'wanderland' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'wanderland' ),
				'parent'      => $logo_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_logo_image_mobile_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Logo Image - Mobile', 'wanderland' ),
				'description' => esc_html__( 'Choose a default logo image to display ', 'wanderland' ),
				'parent'      => $logo_meta_box
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_logo_meta_box_map', 47 );
}