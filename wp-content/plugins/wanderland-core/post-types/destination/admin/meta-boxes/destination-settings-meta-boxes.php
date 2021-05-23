<?php

if ( ! function_exists( 'wanderland_core_map_destination_settings_meta' ) ) {
	function wanderland_core_map_destination_settings_meta() {
		$meta_box = wanderland_mikado_create_meta_box( array(
			'scope' => 'destination-item',
			'title' => esc_html__( 'Destination Settings', 'wanderland-core' ),
			'name'  => 'destination_settings_meta_box'
		) );
		
		// Location meta box section - begin
		
		$location_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => 'destination-item',
				'name'  => 'destination_single_location_meta_box',
				'title' => esc_html__( 'Location Section', 'wanderland-core' )
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'   => 'destination_single_location_address_info',
				'title'  => esc_html__( 'Address Information', 'wanderland-core' ),
				'parent' => $location_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'   => 'mkdf_destination_single_full_address_meta',
				'type'   => 'address',
				'label'  => esc_html__( 'Full Address', 'wanderland-core' ),
				'parent' => $location_box,
				'args'   => array(
					'latitude_field'  => 'mkdf_destination_single_full_address_latitude_meta',
					'longitude_field' => 'mkdf_destination_single_full_address_longitude_meta'
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'   => 'mkdf_destination_single_full_address_latitude_meta',
				'type'   => 'text',
				'label'  => esc_html__( 'Latitude', 'wanderland-core' ),
				'parent' => $location_box,
				'args'   => array(
					'col_width'    => 3,
					'custom_class' => 'mkdf-address-elements',
					'input-data'   => array(
						'data-geo' => 'lat'
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'   => 'mkdf_destination_single_full_address_longitude_meta',
				'type'   => 'text',
				'label'  => esc_html__( 'Longitude', 'wanderland-core' ),
				'parent' => $location_box,
				'args'   => array(
					'col_width'    => 3,
					'custom_class' => 'mkdf-address-elements',
					'input-data'   => array(
						'data-geo' => 'lng'
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_show_title_area_destination_single_meta',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Show Title Area', 'wanderland-core' ),
				'description'   => esc_html__( 'Enabling this option will show title area on your single destination page', 'wanderland-core' ),
				'parent'        => $meta_box,
				'options'       => wanderland_mikado_get_yes_no_select_array()
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'destination_info_top_padding',
				'type'        => 'text',
				'label'       => esc_html__( 'Destination Info Top Padding', 'wanderland-core' ),
				'description' => esc_html__( 'Set top padding for destination info elements holder. This option works only for Destination Images, Slider, Gallery and Masonry destination types', 'wanderland-core' ),
				'parent'      => $meta_box,
				'args'        => array(
					'col_width' => 3,
					'suffix'    => 'px'
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_destination_sidebar_link',
				'type'        => 'text',
				'label'       => esc_html__( 'Sidebar Button Link', 'wanderland-core' ),
				'description' => esc_html__( 'Set custom link for sidebar button on this single Destination', 'wanderland-core' ),
				'parent'      => $meta_box,
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_destination_sidebar_link_text',
				'type'        => 'text',
				'label'       => esc_html__( 'Sidebar Button Text', 'wanderland-core' ),
				'description' => esc_html__( 'Set text for sidebar button on this single Destination', 'wanderland-core' ),
				'parent'      => $meta_box,
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_core_map_destination_settings_meta', 41 );
}