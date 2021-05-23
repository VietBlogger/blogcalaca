<?php

if ( ! function_exists( 'wanderland_mikado_destination_category_additional_fields' ) ) {
	function wanderland_mikado_destination_category_additional_fields() {
		
		$fields = wanderland_mikado_add_taxonomy_fields(
			array(
				'scope' => 'destination-category',
				'name'  => 'destination_category_options'
			)
		);
		
		wanderland_mikado_add_taxonomy_field(
			array(
				'name'   => 'mkdf_destination_category_image_meta',
				'type'   => 'image',
				'label'  => esc_html__( 'Category Image', 'wanderland-core' ),
				'parent' => $fields
			)
		);
		wanderland_mikado_add_taxonomy_field(
			array(
				'name'   => 'mkdf_destination_category_hover_image_meta',
				'type'   => 'image',
				'label'  => esc_html__( 'Category Hover Image', 'wanderland-core' ),
				'parent' => $fields
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_custom_taxonomy_fields', 'wanderland_mikado_destination_category_additional_fields' );
}