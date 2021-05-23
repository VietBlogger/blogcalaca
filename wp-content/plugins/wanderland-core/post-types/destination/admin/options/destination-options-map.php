<?php

if ( ! function_exists( 'wanderland_mikado_destination_options_map' ) ) {
	function wanderland_mikado_destination_options_map() {
		
		wanderland_mikado_add_admin_page(
			array(
				'slug'  => '_destination',
				'title' => esc_html__( 'Destination', 'wanderland-core' ),
				'icon'  => 'fa fa-camera-retro'
			)
		);
		
		$panel_archive = wanderland_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Destination Archive', 'wanderland-core' ),
				'name'  => 'panel_destination_archive',
				'page'  => '_destination'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'destination_archive_number_of_items',
				'type'        => 'text',
				'label'       => esc_html__( 'Number of Items', 'wanderland-core' ),
				'description' => esc_html__( 'Set number of items for your destination list on archive pages. Default value is 12', 'wanderland-core' ),
				'parent'      => $panel_archive,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_archive_number_of_columns',
				'type'          => 'select',
				'label'         => esc_html__( 'Number of Columns', 'wanderland-core' ),
				'default_value' => 'four',
				'description'   => esc_html__( 'Set number of columns for your destination list on archive pages. Default value is Four columns', 'wanderland-core' ),
				'parent'        => $panel_archive,
				'options'       => wanderland_mikado_get_number_of_columns_array( false, array( 'one', 'six' ) )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_archive_space_between_items',
				'type'          => 'select',
				'label'         => esc_html__( 'Space Between Items', 'wanderland-core' ),
				'description'   => esc_html__( 'Set space size between destination items for your destination list on archive pages. Default value is normal', 'wanderland-core' ),
				'default_value' => 'normal',
				'options'       => wanderland_mikado_get_space_between_items_array(),
				'parent'        => $panel_archive
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_archive_image_size',
				'type'          => 'select',
				'label'         => esc_html__( 'Image Proportions', 'wanderland-core' ),
				'default_value' => 'landscape',
				'description'   => esc_html__( 'Set image proportions for your destination list on archive pages. Default value is landscape', 'wanderland-core' ),
				'parent'        => $panel_archive,
				'options'       => array(
					'full'      => esc_html__( 'Original', 'wanderland-core' ),
					'landscape' => esc_html__( 'Landscape', 'wanderland-core' ),
					'portrait'  => esc_html__( 'Portrait', 'wanderland-core' ),
					'square'    => esc_html__( 'Square', 'wanderland-core' )
				)
			)
		);
		
		$panel = wanderland_mikado_add_admin_panel(
			array(
				'title' => esc_html__( 'Destination Single', 'wanderland-core' ),
				'name'  => 'panel_destination_single',
				'page'  => '_destination'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'select',
				'name'          => 'show_title_area_destination_single',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will show title area on single projects', 'wanderland-core' ),
				'parent'        => $panel,
				'options'       => array(
					''    => esc_html__( 'Default', 'wanderland-core' ),
					'yes' => esc_html__( 'Yes', 'wanderland-core' ),
					'no'  => esc_html__( 'No', 'wanderland-core' )
				),
				'args'          => array(
					'col_width' => 3
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_single_lightbox_images',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Lightbox for Images', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will turn on lightbox functionality for projects with images', 'wanderland-core' ),
				'parent'        => $panel,
				'default_value' => 'yes'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_single_lightbox_videos',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Lightbox for Videos', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will turn on lightbox functionality for YouTube/Vimeo projects', 'wanderland-core' ),
				'parent'        => $panel,
				'default_value' => 'no'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_single_enable_categories',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Categories', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will enable category meta description on single projects', 'wanderland-core' ),
				'parent'        => $panel,
				'default_value' => 'yes'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_single_sticky_sidebar',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Sticky Side Text', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will make side text sticky on Single Project pages. This option works only for Full Width Images, Small Images, Small Gallery and Small Masonry destination types', 'wanderland-core' ),
				'parent'        => $panel,
				'default_value' => 'yes'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_single_comments',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Show Comments', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will show comments on your page', 'wanderland-core' ),
				'parent'        => $panel,
				'default_value' => 'no'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_single_hide_pagination',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Hide Pagination', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will turn off destination pagination functionality', 'wanderland-core' ),
				'parent'        => $panel,
				'default_value' => 'no'
			)
		);
		
		$container_navigate_category = wanderland_mikado_add_admin_container(
			array(
				'name'            => 'navigate_same_category_container',
				'parent'          => $panel,
				'dependency' => array(
					'hide' => array(
						'destination_single_hide_pagination'  => array(
							'yes'
						)
					)
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_single_nav_same_category',
				'type'          => 'yesno',
				'label'         => esc_html__( 'Enable Pagination Through Same Category', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will make destination pagination sort through current category', 'wanderland-core' ),
				'parent'        => $container_navigate_category,
				'default_value' => 'no'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'destination_single_slug',
				'type'        => 'text',
				'label'       => esc_html__( 'Destination Single Slug', 'wanderland-core' ),
				'description' => esc_html__( 'Enter if you wish to use a different Single Project slug (Note: After entering slug, navigate to Settings -> Permalinks and click "Save" in order for changes to take effect)', 'wanderland-core' ),
				'parent'      => $panel,
				'args'        => array(
					'col_width' => 3
				)
			)
		);
		
		$panel_maps = wanderland_mikado_add_admin_panel(
			array(
				'name'  => 'panel_maps',
				'title' => esc_html__( 'Destination Maps', 'wanderland-core' ),
				'page'  => '_destination'
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'destination_map_style',
				'type'        => 'textarea',
				'label'       => esc_html__( 'Maps Style', 'wanderland-core' ),
				'description' => esc_html__( 'Insert map style json', 'wanderland-core' ),
				'parent'      => $panel_maps
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_maps_scrollable',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Scrollable Maps', 'wanderland-core' ),
				'parent'        => $panel_maps
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_maps_draggable',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Draggable Maps', 'wanderland-core' ),
				'parent'        => $panel_maps
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_maps_street_view_control',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Maps Street View Controls', 'wanderland-core' ),
				'parent'        => $panel_maps
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_maps_zoom_control',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Maps Zoom Control', 'wanderland-core' ),
				'parent'        => $panel_maps
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'destination_maps_type_control',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Maps Type Control', 'wanderland-core' ),
				'parent'        => $panel_maps
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_options_map', 'wanderland_mikado_destination_options_map', wanderland_mikado_set_options_map_position( 'destination' ) );
}