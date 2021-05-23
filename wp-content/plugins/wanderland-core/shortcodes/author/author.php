<?php
namespace WanderlandCore\CPT\Shortcodes\Author;

use WanderlandCore\Lib;

class Author implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_author';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Author', 'wanderland-core' ),
					'base'                      => $this->getBase(),
					'category'                  => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'                      => 'icon-wpb-author extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_class',
							'heading'     => esc_html__( 'Custom CSS Class', 'wanderland-core' ),
							'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wanderland-core' )
						),
						array(
							'type'        => 'attach_image',
							'param_name'  => 'image',
							'heading'     => esc_html__( 'Image', 'wanderland-core' ),
							'description' => esc_html__( 'Select image from media library, suggested size is 171x171', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'custom_link',
							'heading'    => esc_html__( 'Custom Link', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'custom_link_target',
							'heading'    => esc_html__( 'Custom Link Target', 'wanderland-core' ),
							'value'      => array_flip( wanderland_mikado_get_link_target_array() )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'text',
							'heading'    => esc_html__( 'Position', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'title',
							'heading'    => esc_html__( 'Title', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'title_tag',
							'heading'     => esc_html__( 'Title Tag', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_title_tag( true ) ),
							'save_always' => true,
							'dependency'  => array( 'element' => 'title', 'not_empty' => true )
						),

						array(
							'type'       => 'textfield',
							'param_name' => 'text_margin',
							'heading'    => esc_html__( 'Text Margin (px)', 'wanderland-core' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'custom_class'        => '',
			'image'               => '',
			'custom_link'         => '',
			'custom_link_target'  => '_self',
			'title'               => '',
			'title_tag'           => 'h5',
			'text'                => '',
			'text_margin'         => ''
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['holder_classes']     = $this->getHolderClasses( $params );
		$params['image']              = $this->getImage( $params );
		$params['custom_link_target'] = ! empty( $params['custom_link_target'] ) ? $params['custom_link_target'] : $args['custom_link_target'];
		$params['title_tag']          = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $args['title_tag'];
		$params['text_styles']        = $this->getTextStyles( $params );
		
		$html = wanderland_core_get_shortcode_module_template_part( 'templates/author', 'author', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		
		return implode( ' ', $holderClasses );
	}
	
	private function getImage( $params ) {
		$image = array();
		
		if ( ! empty( $params['image'] ) ) {
			$id = $params['image'];
			
			$image['image_id'] = $id;
			$image_original    = wp_get_attachment_image_src( $id, 'full' );
			$image['url']      = $image_original[0];
			$image['alt']      = get_post_meta( $id, '_wp_attachment_image_alt', true );
		}
		
		return $image;
	}
	
	private function getTextStyles( $params ) {
		$styles = array();
		
		if ( $params['text_margin'] !== '' ) {
			$styles[] = 'margin: ' . wanderland_mikado_filter_px( $params['text_margin'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
}