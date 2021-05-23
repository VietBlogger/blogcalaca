<?php

if ( ! function_exists( 'wanderland_core_reviews_map' ) ) {
	function wanderland_core_reviews_map() {
		
		$reviews_panel = wanderland_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Reviews', 'wanderland-core' ),
				'name'  => 'panel_reviews',
				'page'  => '_page_page'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'      => $reviews_panel,
				'type'        => 'text',
				'name'        => 'reviews_section_title',
				'label'       => esc_html__( 'Reviews Section Title', 'wanderland-core' ),
				'description' => esc_html__( 'Enter title that you want to show before average rating on your page', 'wanderland-core' ),
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'parent'      => $reviews_panel,
				'type'        => 'textarea',
				'name'        => 'reviews_section_subtitle',
				'label'       => esc_html__( 'Reviews Section Subtitle', 'wanderland-core' ),
				'description' => esc_html__( 'Enter subtitle that you want to show before average rating on your page', 'wanderland-core' ),
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_additional_page_options_map', 'wanderland_core_reviews_map', 75 ); //one after elements
}