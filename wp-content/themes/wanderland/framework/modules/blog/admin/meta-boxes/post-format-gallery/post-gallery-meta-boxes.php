<?php

if ( ! function_exists( 'wanderland_mikado_map_post_gallery_meta' ) ) {
	
	function wanderland_mikado_map_post_gallery_meta() {
		$gallery_post_format_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Gallery Post Format', 'wanderland' ),
				'name'  => 'post_format_gallery_meta'
			)
		);
		
		wanderland_mikado_add_multiple_images_field(
			array(
				'name'        => 'mkdf_post_gallery_images_meta',
				'label'       => esc_html__( 'Gallery Images', 'wanderland' ),
				'description' => esc_html__( 'Choose your gallery images', 'wanderland' ),
				'parent'      => $gallery_post_format_meta_box,
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_post_gallery_meta', 21 );
}
