<?php
namespace WanderlandCore\CPT\Shortcodes\ImageShowcaseItem;

use WanderlandCore\Lib;

class ImageShowcaseItem implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_image_showcase_item';
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'      => esc_html__( 'Image Showcase Item', 'wanderland-core' ),
					'base'      => $this->base,
					'icon'      => 'icon-wpb-image-showcase-item extended-custom-icon',
					'category'  => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'as_parent' => array( 'except' => 'vc_row' ),
					'as_child'  => array( 'only' => 'mkdf_image_showcase' ),
					'js_view'   => 'VcColumnView',
					'params'    => array(
						array(
							'type'       => 'attach_image',
							'param_name' => 'image',
							'heading'    => esc_html__( 'Background Image', 'wanderland-core' )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'info_box_color',
							'heading'    => esc_html__( 'Info Box Color', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'info_text_skin',
							'heading'    => esc_html__( 'Info Text Skin', 'wanderland-core' ),
							'value'      => array(
								esc_html__( 'Default', 'wanderland-core' ) => '',
								esc_html__( 'Light', 'wanderland-core' )   => 'light',
								esc_html__( 'Dark', 'wanderland-core' )    => 'dark'
							)
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'image'          => '',
			'info_box_color' => '',
			'info_text_skin' => ''
		);
		$params = shortcode_atts( $args, $atts );

		$params['content_classes'] = $this->getContentClasses( $params );
		$params['content_styles']  = $this->getContentStyles( $params );
		$params['image']           = $this->getImage( $params );
		$params['content']         = $content;

		$html = wanderland_core_get_shortcode_module_template_part( 'templates/image-showcase-item-template', 'image-showcase', '', $params );
		
		return $html;
	}

	private function getContentClasses( $params ) {
		$contentClasses = array();

		$contentClasses[] = ! empty( $params['info_text_skin'] ) ? 'mkdf-is-info-' . $params['info_text_skin'] . '-skin' : '';

		return implode( ' ', $contentClasses );
	}

	private function getContentStyles( $params ) {
		$styles = array();

		if ( ! empty( $params['info_box_color'] ) ) {
			$styles[] = 'background-color: ' . $params['info_box_color'];
		}

		return implode( ';', $styles );
	}

	private function getImage( $params ) {
		$image = array();

		if ( ! empty( $params['image'] ) ) {
			$id = $params['image'];

			$image['image_id'] = $id;
			$image_original    = wp_get_attachment_image_src( $id, 'full' );
			$image['url']      = $image_original[0];
			$image['title']    = get_the_title( $id );
			$image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
		}

		return $image;
	}
}
