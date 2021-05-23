<?php

if ( ! function_exists( 'wanderland_mikado_woocommerce_options_map' ) ) {
	
	/**
	 * Add Woocommerce options page
	 */
	function wanderland_mikado_woocommerce_options_map() {
		
		wanderland_mikado_add_admin_page(
			array(
				'slug'  => '_woocommerce_page',
				'title' => esc_html__( 'Woocommerce', 'wanderland' ),
				'icon'  => 'fa fa-shopping-cart'
			)
		);
		
		/**
		 * Product List Settings
		 */
		$panel_product_list = wanderland_mikado_add_admin_panel(
			array(
				'page'  => '_woocommerce_page',
				'name'  => 'panel_product_list',
				'title' => esc_html__( 'Product List', 'wanderland' )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'woo_list_grid_space',
				'type'        => 'select',
				'label'       => esc_html__( 'Grid Layout Space', 'wanderland' ),
				'description' => esc_html__( 'Choose a space between content layout and sidebar layout for main shop page', 'wanderland' ),
				'options'     => wanderland_mikado_get_space_between_items_array( true ),
				'parent'      => $panel_product_list
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'mkdf_woo_product_list_columns',
				'label'         => esc_html__( 'Product List Columns', 'wanderland' ),
				'default_value' => 'mkdf-woocommerce-columns-3',
				'description'   => esc_html__( 'Choose number of columns for main shop page', 'wanderland' ),
				'options'       => array(
					'mkdf-woocommerce-columns-3' => esc_html__( '3 Columns', 'wanderland' ),
					'mkdf-woocommerce-columns-4' => esc_html__( '4 Columns', 'wanderland' )
				),
				'parent'        => $panel_product_list,
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'mkdf_woo_product_list_columns_space',
				'label'         => esc_html__( 'Space Between Items', 'wanderland' ),
				'description'   => esc_html__( 'Select space between items for product listing and related products on single product', 'wanderland' ),
				'default_value' => 'normal',
				'options'       => wanderland_mikado_get_space_between_items_array(),
				'parent'        => $panel_product_list,
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'mkdf_woo_product_list_info_position',
				'label'         => esc_html__( 'Product Info Position', 'wanderland' ),
				'default_value' => 'info_below_image',
				'description'   => esc_html__( 'Select product info position for product listing and related products on single product', 'wanderland' ),
				'options'       => array(
					'info_below_image'    => esc_html__( 'Info Below Image', 'wanderland' ),
					'info_on_image_hover' => esc_html__( 'Info On Image Hover', 'wanderland' )
				),
				'parent'        => $panel_product_list,
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'text',
				'name'          => 'mkdf_woo_products_per_page',
				'label'         => esc_html__( 'Number of products per page', 'wanderland' ),
				'description'   => esc_html__( 'Set number of products on shop page', 'wanderland' ),
				'parent'        => $panel_product_list,
				'args'          => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'mkdf_products_list_title_tag',
				'label'         => esc_html__( 'Products Title Tag', 'wanderland' ),
				'default_value' => 'h6',
				'options'       => wanderland_mikado_get_title_tag(),
				'parent'        => $panel_product_list,
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'woo_enable_percent_sign_value',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Percent Sign', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will show percent value mark instead of sale label on products', 'wanderland' ),
				'parent'        => $panel_product_list
			)
		);
		
		/**
		 * Single Product Settings
		 */
		$panel_single_product = wanderland_mikado_add_admin_panel(
			array(
				'page'  => '_woocommerce_page',
				'name'  => 'panel_single_product',
				'title' => esc_html__( 'Single Product', 'wanderland' )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'show_title_area_woo',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will show title area on single post pages', 'wanderland' ),
				'parent'        => $panel_single_product,
				'options'       => wanderland_mikado_get_yes_no_select_array(),
				'args'          => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'mkdf_single_product_title_tag',
				'default_value' => 'h4',
				'label'         => esc_html__( 'Single Product Title Tag', 'wanderland' ),
				'options'       => wanderland_mikado_get_title_tag(),
				'parent'        => $panel_single_product,
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'woo_number_of_thumb_images',
				'default_value' => '3',
				'label'         => esc_html__( 'Number of Thumbnail Images per Row', 'wanderland' ),
				'options'       => array(
					'4' => esc_html__( 'Four', 'wanderland' ),
					'3' => esc_html__( 'Three', 'wanderland' ),
				),
				'parent'        => $panel_single_product
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'woo_set_thumb_images_position',
				'default_value' => 'on-left-side',
				'label'         => esc_html__( 'Set Thumbnail Images Position', 'wanderland' ),
				'options'       => array(
					'below-image'  => esc_html__( 'Below Featured Image', 'wanderland' ),
					'on-left-side' => esc_html__( 'On The Left Side Of Featured Image', 'wanderland' )
				),
				'parent'        => $panel_single_product
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'woo_enable_single_product_zoom_image',
				'default_value' => 'no',
				'label'         => esc_html__( 'Enable Zoom Maginfier', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will show magnifier image on featured image hover', 'wanderland' ),
				'parent'        => $panel_single_product,
				'options'       => wanderland_mikado_get_yes_no_select_array( false ),
				'args'          => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'woo_set_single_images_behavior',
				'default_value' => 'pretty-photo',
				'label'         => esc_html__( 'Set Images Behavior', 'wanderland' ),
				'options'       => array(
					'pretty-photo' => esc_html__( 'Pretty Photo Lightbox', 'wanderland' ),
					'photo-swipe'  => esc_html__( 'Photo Swipe Lightbox', 'wanderland' )
				),
				'parent'        => $panel_single_product
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'mkdf_woo_related_products_columns',
				'label'         => esc_html__( 'Related Products Columns', 'wanderland' ),
				'default_value' => 'mkdf-woocommerce-columns-4',
				'description'   => esc_html__( 'Choose number of columns for related products on single product page', 'wanderland' ),
				'options'       => array(
					'mkdf-woocommerce-columns-3' => esc_html__( '3 Columns', 'wanderland' ),
					'mkdf-woocommerce-columns-4' => esc_html__( '4 Columns', 'wanderland' )
				),
				'parent'        => $panel_single_product,
			)
		);

		do_action('wanderland_mikado_woocommerce_additional_options_map');
	}
	
	add_action( 'wanderland_mikado_action_options_map', 'wanderland_mikado_woocommerce_options_map', wanderland_mikado_set_options_map_position( 'woocommerce' ) );
}