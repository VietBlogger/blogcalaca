<?php

if ( ! function_exists( 'wanderland_mikado_map_post_quote_meta' ) ) {
	function wanderland_mikado_map_post_quote_meta() {
		$quote_post_format_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Quote Post Format', 'wanderland' ),
				'name'  => 'post_format_quote_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_quote_text_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Quote Text', 'wanderland' ),
				'description' => esc_html__( 'Enter Quote text', 'wanderland' ),
				'parent'      => $quote_post_format_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_quote_author_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Quote Author', 'wanderland' ),
				'description' => esc_html__( 'Enter Quote author', 'wanderland' ),
				'parent'      => $quote_post_format_meta_box
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_post_quote_meta', 25 );
}