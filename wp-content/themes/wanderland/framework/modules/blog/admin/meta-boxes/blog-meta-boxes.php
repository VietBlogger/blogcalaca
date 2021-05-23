<?php

foreach ( glob( WANDERLAND_MIKADO_FRAMEWORK_MODULES_ROOT_DIR . '/blog/admin/meta-boxes/*/*.php' ) as $meta_box_load ) {
	include_once $meta_box_load;
}

if ( ! function_exists( 'wanderland_mikado_map_blog_meta' ) ) {
	function wanderland_mikado_map_blog_meta() {
		$mkdf_blog_categories = array();
		$categories           = get_categories();
		foreach ( $categories as $category ) {
			$mkdf_blog_categories[ $category->slug ] = $category->name;
		}
		
		$blog_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'page' ),
				'title' => esc_html__( 'Blog', 'wanderland' ),
				'name'  => 'blog_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_blog_category_meta',
				'type'        => 'selectblank',
				'label'       => esc_html__( 'Blog Category', 'wanderland' ),
				'description' => esc_html__( 'Choose category of posts to display (leave empty to display all categories)', 'wanderland' ),
				'parent'      => $blog_meta_box,
				'options'     => $mkdf_blog_categories
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_show_posts_per_page_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Number of Posts', 'wanderland' ),
				'description' => esc_html__( 'Enter the number of posts to display', 'wanderland' ),
				'parent'      => $blog_meta_box,
				'options'     => $mkdf_blog_categories,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_blog_masonry_layout_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Masonry - Layout', 'wanderland' ),
				'description' => esc_html__( 'Set masonry layout. Default is in grid.', 'wanderland' ),
				'parent'      => $blog_meta_box,
				'options'     => array(
					''           => esc_html__( 'Default', 'wanderland' ),
					'in-grid'    => esc_html__( 'In Grid', 'wanderland' ),
					'full-width' => esc_html__( 'Full Width', 'wanderland' )
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_blog_masonry_number_of_columns_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Masonry - Number of Columns', 'wanderland' ),
				'description' => esc_html__( 'Set number of columns for your masonry blog lists', 'wanderland' ),
				'parent'      => $blog_meta_box,
				'options'     => wanderland_mikado_get_number_of_columns_array( true, array( 'one', 'six' ) )
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_blog_masonry_space_between_items_meta',
				'type'        => 'select',
				'label'       => esc_html__( 'Masonry - Space Between Items', 'wanderland' ),
				'description' => esc_html__( 'Set space size between posts for your masonry blog lists', 'wanderland' ),
				'options'     => wanderland_mikado_get_space_between_items_array( true ),
				'parent'      => $blog_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_blog_list_featured_image_proportion_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Masonry - Featured Image Proportion', 'wanderland' ),
				'description'   => esc_html__( 'Choose type of proportions you want to use for featured images on masonry blog lists', 'wanderland' ),
				'parent'        => $blog_meta_box,
				'default_value' => '',
				'options'       => array(
					''         => esc_html__( 'Default', 'wanderland' ),
					'fixed'    => esc_html__( 'Fixed', 'wanderland' ),
					'original' => esc_html__( 'Original', 'wanderland' )
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_blog_pagination_type_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Pagination Type', 'wanderland' ),
				'description'   => esc_html__( 'Choose a pagination layout for Blog Lists', 'wanderland' ),
				'parent'        => $blog_meta_box,
				'default_value' => '',
				'options'       => array(
					''                => esc_html__( 'Default', 'wanderland' ),
					'standard'        => esc_html__( 'Standard', 'wanderland' ),
					'load-more'       => esc_html__( 'Load More', 'wanderland' ),
					'infinite-scroll' => esc_html__( 'Infinite Scroll', 'wanderland' ),
					'no-pagination'   => esc_html__( 'No Pagination', 'wanderland' )
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'type'          => 'text',
				'name'          => 'mkdf_number_of_chars_meta',
				'default_value' => '',
				'label'         => esc_html__( 'Number of Words in Excerpt', 'wanderland' ),
				'description'   => esc_html__( 'Enter a number of words in excerpt (article summary). Default value is 40', 'wanderland' ),
				'parent'        => $blog_meta_box,
				'args'          => array(
					'col_width' => 3
				)
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_blog_meta', 30 );
}