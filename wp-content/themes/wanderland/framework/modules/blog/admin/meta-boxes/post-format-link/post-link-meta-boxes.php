<?php

if ( ! function_exists( 'wanderland_mikado_map_post_link_meta' ) ) {
	function wanderland_mikado_map_post_link_meta() {
		$link_post_format_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Link Post Format', 'wanderland' ),
				'name'  => 'post_format_link_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_link_link_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Link', 'wanderland' ),
				'description' => esc_html__( 'Enter link', 'wanderland' ),
				'parent'      => $link_post_format_meta_box
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_post_link_meta', 24 );
}