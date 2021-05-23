<?php

if ( ! function_exists( 'wanderland_core_map_testimonials_meta' ) ) {
	function wanderland_core_map_testimonials_meta() {
		$testimonial_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'testimonials' ),
				'title' => esc_html__( 'Testimonial', 'wanderland-core' ),
				'name'  => 'testimonial_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_testimonial_title',
				'type'        => 'text',
				'label'       => esc_html__( 'Title', 'wanderland-core' ),
				'description' => esc_html__( 'Enter testimonial title', 'wanderland-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_testimonial_text',
				'type'        => 'text',
				'label'       => esc_html__( 'Text', 'wanderland-core' ),
				'description' => esc_html__( 'Enter testimonial text', 'wanderland-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_testimonial_author',
				'type'        => 'text',
				'label'       => esc_html__( 'Author', 'wanderland-core' ),
				'description' => esc_html__( 'Enter author name', 'wanderland-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_testimonial_author_position',
				'type'        => 'text',
				'label'       => esc_html__( 'Author Position', 'wanderland-core' ),
				'description' => esc_html__( 'Enter author job position', 'wanderland-core' ),
				'parent'      => $testimonial_meta_box,
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_core_map_testimonials_meta', 95 );
}