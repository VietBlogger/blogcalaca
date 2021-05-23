<?php

if ( ! function_exists( 'wanderland_mikado_map_woocommerce_meta' ) ) {
	function wanderland_mikado_map_woocommerce_meta() {
		
		$woocommerce_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'product' ),
				'title' => esc_html__( 'Product Meta', 'wanderland' ),
				'name'  => 'woo_product_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_product_featured_image_size',
				'type'        => 'select',
				'label'       => esc_html__( 'Dimensions for Product List Shortcode', 'wanderland' ),
				'description' => esc_html__( 'Choose image layout when it appears in Mikado Product List - Masonry layout shortcode', 'wanderland' ),
				'options'     => array(
					''                   => esc_html__( 'Default', 'wanderland' ),
					'small'              => esc_html__( 'Small', 'wanderland' ),
					'large-width'        => esc_html__( 'Large Width', 'wanderland' ),
					'large-height'       => esc_html__( 'Large Height', 'wanderland' ),
					'large-width-height' => esc_html__( 'Large Width Height', 'wanderland' )
				),
				'parent'      => $woocommerce_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_title_area_woo_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wanderland' ),
				'description'   => esc_html__( 'Disabling this option will turn off page title area', 'wanderland' ),
				'options'       => wanderland_mikado_get_yes_no_select_array(),
				'parent'        => $woocommerce_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_new_sign_woo_meta',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Show New Sign', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will show new sign mark on product', 'wanderland' ),
				'parent'        => $woocommerce_meta_box
			)
		);

		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_hover_product_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Hover Product Image', 'wanderland' ),
				'description' => esc_html__( 'Choose the hover image for product list', 'wanderland' ),
				'parent'      => $woocommerce_meta_box
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_woocommerce_meta', 99 );
}