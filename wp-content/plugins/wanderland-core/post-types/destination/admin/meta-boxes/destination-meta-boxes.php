<?php

if ( ! function_exists( 'wanderland_core_map_destination_meta' ) ) {
	function wanderland_core_map_destination_meta() {
		global $wanderland_mikado_global_Framework;
		
		$wanderland_pages = array();
		$pages      = get_pages();
		foreach ( $pages as $page ) {
			$wanderland_pages[ $page->ID ] = $page->post_title;
		}
		
		//Portfolio Images
		
		$wanderland_destination_images = new WanderlandMikadoClassMetaBox( 'destination-item', esc_html__( 'Destination Images (multiple upload)', 'wanderland-core' ), '', '', 'destination_images' );
		$wanderland_mikado_global_Framework->mkdMetaBoxes->addMetaBox( 'destination_images', $wanderland_destination_images );
		
		$wanderland_destination_image_gallery = new WanderlandMikadoClassMultipleImages( 'mkdf-destination-image-gallery', esc_html__( 'Destination Images', 'wanderland-core' ), esc_html__( 'Choose your destination images', 'wanderland-core' ) );
		$wanderland_destination_images->addChild( 'mkdf-destination-image-gallery', $wanderland_destination_image_gallery );
		
		//Destination Single Upload Images/Videos
		
		$wanderland_destination_images_videos = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'destination-item' ),
				'title' => esc_html__( 'Destination Images/Videos (single upload)', 'wanderland-core' ),
				'name'  => 'mkdf_destination_images_videos'
			)
		);
		wanderland_mikado_add_repeater_field(
			array(
				'name'        => 'mkdf_destination_single_upload',
				'parent'      => $wanderland_destination_images_videos,
				'button_text' => esc_html__( 'Add Image/Video', 'wanderland-core' ),
				'fields'      => array(
					array(
						'type'        => 'select',
						'name'        => 'file_type',
						'label'       => esc_html__( 'File Type', 'wanderland-core' ),
						'options' => array(
							'image' => esc_html__('Image','wanderland-core'),
							'video' => esc_html__('Video','wanderland-core'),
						)
					),
					array(
						'type'        => 'image',
						'name'        => 'single_image',
						'label'       => esc_html__( 'Image', 'wanderland-core' ),
						'dependency' => array(
							'show' => array(
								'file_type'  => 'image'
							)
						)
					),
					array(
						'type'        => 'select',
						'name'        => 'video_type',
						'label'       => esc_html__( 'Video Type', 'wanderland-core' ),
						'options'	  => array(
							'youtube' => esc_html__('YouTube', 'wanderland-core'),
							'vimeo' => esc_html__('Vimeo', 'wanderland-core'),
							'self' => esc_html__('Self Hosted', 'wanderland-core'),
						),
						'dependency' => array(
							'show' => array(
								'file_type'  => 'video'
							)
						)
					),
					array(
						'type'        => 'text',
						'name'        => 'video_id',
						'label'       => esc_html__( 'Video ID', 'wanderland-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => array('youtube','vimeo')
							)
						)
					),
					array(
						'type'        => 'text',
						'name'        => 'video_mp4',
						'label'       => esc_html__( 'Video mp4', 'wanderland-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => 'self'
							)
						)
					),
					array(
						'type'        => 'image',
						'name'        => 'video_cover_image',
						'label'       => esc_html__( 'Video Cover Image', 'wanderland-core' ),
						'dependency' => array(
							'show' => array(
								'file_type' => 'video',
								'video_type'  => 'self'
							)
						)
					)
				)
			)
		);
		
		//Portfolio Additional Sidebar Items
		
		$wanderland_additional_sidebar_items = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'destination-item' ),
				'title' => esc_html__( 'Additional Destination Sidebar Items', 'wanderland-core' ),
				'name'  => 'destination_properties'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name' => 'mkdf_destination_properties_title',
				'type' => 'text',
				'parent' => $wanderland_additional_sidebar_items,
				'label' => esc_html__('Title for Additional Destination Sidebar Items Section','wanderland-core'),
			)
		);

		wanderland_mikado_add_repeater_field(
			array(
				'name'        => 'mkdf_destination_properties',
				'parent'      => $wanderland_additional_sidebar_items,
				'button_text' => esc_html__( 'Add New Item', 'wanderland-core' ),
				'fields'      => array(
					array(
						'type'        => 'image',
						'name'        => 'item_image',
						'label'       => esc_html__( 'Item Image', 'wanderland-core' ),
					),
					array(
						'type'        => 'text',
						'name'        => 'item_text',
						'label'       => esc_html__( 'Item Text', 'wanderland-core' )
					),
					array(
						'type'        => 'text',
						'name'        => 'item_url',
						'label'       => esc_html__( 'Enter Full URL for Item Text Link', 'wanderland-core' )
					),
					array(
						'type'        => 'text',
						'name'        => 'item_url_class',
						'label'       => esc_html__( 'Enter Custom Class if needed for Item Text Link', 'wanderland-core' )
					)
				)
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_core_map_destination_meta', 40 );
}