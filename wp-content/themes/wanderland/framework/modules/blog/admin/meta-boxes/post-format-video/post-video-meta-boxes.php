<?php

if ( ! function_exists( 'wanderland_mikado_map_post_video_meta' ) ) {
	function wanderland_mikado_map_post_video_meta() {
		$video_post_format_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Video Post Format', 'wanderland' ),
				'name'  => 'post_format_video_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_video_type_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Video Type', 'wanderland' ),
				'description'   => esc_html__( 'Choose video type', 'wanderland' ),
				'parent'        => $video_post_format_meta_box,
				'default_value' => 'social_networks',
				'options'       => array(
					'social_networks' => esc_html__( 'Video Service', 'wanderland' ),
					'self'            => esc_html__( 'Self Hosted', 'wanderland' )
				)
			)
		);
		
		$mkdf_video_embedded_container = wanderland_mikado_add_admin_container(
			array(
				'parent' => $video_post_format_meta_box,
				'name'   => 'mkdf_video_embedded_container'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_video_link_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Video URL', 'wanderland' ),
				'description' => esc_html__( 'Enter Video URL', 'wanderland' ),
				'parent'      => $mkdf_video_embedded_container,
				'dependency' => array(
					'show' => array(
						'mkdf_video_type_meta' => 'social_networks'
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_video_custom_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Video MP4', 'wanderland' ),
				'description' => esc_html__( 'Enter video URL for MP4 format', 'wanderland' ),
				'parent'      => $mkdf_video_embedded_container,
				'dependency' => array(
					'show' => array(
						'mkdf_video_type_meta' => 'self'
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_video_image_meta',
				'type'        => 'image',
				'label'       => esc_html__( 'Video Image', 'wanderland' ),
				'description' => esc_html__( 'Enter video image', 'wanderland' ),
				'parent'      => $mkdf_video_embedded_container,
				'dependency' => array(
					'show' => array(
						'mkdf_video_type_meta' => 'self'
					)
				)
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_post_video_meta', 22 );
}