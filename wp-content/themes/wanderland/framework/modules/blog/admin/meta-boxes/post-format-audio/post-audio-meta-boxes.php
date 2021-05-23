<?php

if ( ! function_exists( 'wanderland_mikado_map_post_audio_meta' ) ) {
	function wanderland_mikado_map_post_audio_meta() {
		$audio_post_format_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'post' ),
				'title' => esc_html__( 'Audio Post Format', 'wanderland' ),
				'name'  => 'post_format_audio_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_audio_type_meta',
				'type'          => 'select',
				'label'         => esc_html__( 'Audio Type', 'wanderland' ),
				'description'   => esc_html__( 'Choose audio type', 'wanderland' ),
				'parent'        => $audio_post_format_meta_box,
				'default_value' => 'social_networks',
				'options'       => array(
					'social_networks' => esc_html__( 'Audio Service', 'wanderland' ),
					'self'            => esc_html__( 'Self Hosted', 'wanderland' )
				)
			)
		);
		
		$mkdf_audio_embedded_container = wanderland_mikado_add_admin_container(
			array(
				'parent' => $audio_post_format_meta_box,
				'name'   => 'mkdf_audio_embedded_container'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_audio_link_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Audio URL', 'wanderland' ),
				'description' => esc_html__( 'Enter audio URL', 'wanderland' ),
				'parent'      => $mkdf_audio_embedded_container,
				'dependency' => array(
					'show' => array(
						'mkdf_audio_type_meta' => 'social_networks'
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'        => 'mkdf_post_audio_custom_meta',
				'type'        => 'text',
				'label'       => esc_html__( 'Audio Link', 'wanderland' ),
				'description' => esc_html__( 'Enter audio link', 'wanderland' ),
				'parent'      => $mkdf_audio_embedded_container,
				'dependency' => array(
					'show' => array(
						'mkdf_audio_type_meta' => 'self'
					)
				)
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_mikado_map_post_audio_meta', 23 );
}