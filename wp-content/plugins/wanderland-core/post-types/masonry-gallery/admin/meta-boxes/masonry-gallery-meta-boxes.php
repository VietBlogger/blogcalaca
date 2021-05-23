<?php

if ( ! function_exists( 'wanderland_core_map_masonry_gallery_meta' ) ) {
	function wanderland_core_map_masonry_gallery_meta() {
		
		$masonry_gallery_meta_box = wanderland_mikado_create_meta_box(
			array(
				'scope' => array( 'masonry-gallery' ),
				'title' => esc_html__( 'Masonry Gallery General', 'wanderland-core' ),
				'name'  => 'masonry_gallery_meta'
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_item_type',
				'type'          => 'select',
				'default_value' => 'standard',
				'label'         => esc_html__( 'Type', 'wanderland-core' ),
				'parent'        => $masonry_gallery_meta_box,
				'options'       => array(
					'standard'    => esc_html__( 'Standard', 'wanderland-core' ),
					'with-button' => esc_html__( 'With Button', 'wanderland-core' ),
					'textual'     => esc_html__( 'Textual', 'wanderland-core' ),
					'simple'      => esc_html__( 'Simple', 'wanderland-core' )
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_item_size',
				'type'          => 'select',
				'default_value' => 'small',
				'label'         => esc_html__( 'Size', 'wanderland-core' ),
				'parent'        => $masonry_gallery_meta_box,
				'options'       => array(
					'small'              => esc_html__( 'Small', 'wanderland-core' ),
					'large-width'        => esc_html__( 'Large Width', 'wanderland-core' ),
					'large-height'       => esc_html__( 'Large Height', 'wanderland-core' ),
					'large-width-height' => esc_html__( 'Large Width/Height', 'wanderland-core' )
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_item_title_tag',
				'type'          => 'select',
				'default_value' => 'h2',
				'label'         => esc_html__( 'Title Tag', 'wanderland-core' ),
				'parent'        => $masonry_gallery_meta_box,
				'options'       => wanderland_mikado_get_title_tag( true, array( 'span' => esc_html__( 'Custom Heading' ) ) ),
				'dependency'    => array(
					'hide' => array(
						'mkdf_masonry_gallery_item_type' => array( 'simple', 'textual' )
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'       => 'mkdf_masonry_gallery_item_text',
				'type'       => 'text',
				'label'      => esc_html__( 'Text', 'wanderland-core' ),
				'parent'     => $masonry_gallery_meta_box,
				'dependency' => array(
					'show' => array(
						'mkdf_masonry_gallery_item_type' => array( 'standard', 'textual' )
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_item_text_tag',
				'type'          => 'select',
				'default_value' => 'p',
				'label'         => esc_html__( 'Text Tag', 'wanderland-core' ),
				'parent'        => $masonry_gallery_meta_box,
				'options'       => wanderland_mikado_get_title_tag( true, array( 'p' => 'p', 'span' => esc_html__( 'Custom Heading' ) ) ),
				'dependency'    => array(
					'show' => array(
						'mkdf_masonry_gallery_item_type' => array( 'standard', 'textual' )
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'       => 'mkdf_masonry_gallery_custom_icon',
				'type'       => 'image',
				'label'      => esc_html__( 'Custom Icon', 'wanderland-core' ),
				'parent'     => $masonry_gallery_meta_box,
				'dependency' => array(
					'show' => array(
						'mkdf_masonry_gallery_item_type' => array( 'standard' )
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'       => 'mkdf_masonry_gallery_button_label',
				'type'       => 'text',
				'label'      => esc_html__( 'Button Label', 'wanderland-core' ),
				'parent'     => $masonry_gallery_meta_box,
				'dependency' => array(
					'show' => array(
						'mkdf_masonry_gallery_item_type' => array( 'with-button' )
					)
				)
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'   => 'mkdf_masonry_gallery_item_link',
				'type'   => 'text',
				'label'  => esc_html__( 'Link', 'wanderland-core' ),
				'parent' => $masonry_gallery_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_item_link_target',
				'type'          => 'select',
				'default_value' => '_self',
				'label'         => esc_html__( 'Link Target', 'wanderland-core' ),
				'options'       => wanderland_mikado_get_link_target_array(),
				'parent'        => $masonry_gallery_meta_box
			)
		);
		
		wanderland_mikado_create_meta_box_field(
			array(
				'name'          => 'mkdf_masonry_gallery_content_skin',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Content Skin', 'wanderland-core' ),
				'options'       => array(
					'default' => esc_html__( 'Default', 'wanderland-core' ),
					'light'   => esc_html__( 'Light', 'wanderland-core' )
				),
				'parent'        => $masonry_gallery_meta_box,
				'dependency'    => array(
					'hide' => array(
						'mkdf_masonry_gallery_item_type' => array( 'simple' )
					)
				)
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_meta_boxes_map', 'wanderland_core_map_masonry_gallery_meta', 45 );
}