<?php

namespace WanderlandCore\CPT\Shortcodes\DestinationCategoryList;

use WanderlandCore\Lib;

class DestinationCategoryList implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_destination_category_list';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map( array(
					'name'     => esc_html__( 'Destination Category List', 'wanderland-core' ),
					'base'     => $this->getBase(),
					'category' => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'     => 'icon-wpb-destination-category-list extended-custom-icon',
					'params'   => array(
						array(
							'type'        => 'dropdown',
							'param_name'  => 'number_of_columns',
							'heading'     => esc_html__( 'Number of Columns', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_number_of_columns_array( true, array( 'one' ) ) ),
							'description' => esc_html__( 'Default value is Three', 'wanderland-core' ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'space_between_items',
							'heading'     => esc_html__( 'Space Between Items', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_space_between_items_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'number_of_items',
							'heading'     => esc_html__( 'Number of Items Per Page', 'wanderland-core' ),
							'description' => esc_html__( 'Set number of items for your destination category list. Default value is 6', 'wanderland-core' ),
							'value'       => '-1'
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'orderby',
							'heading'     => esc_html__( 'Order By', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_query_order_by_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'order',
							'heading'     => esc_html__( 'Order', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_query_order_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'image_proportions',
							'heading'     => esc_html__( 'Image Proportions', 'wanderland-core' ),
							'value'       => array(
								esc_html__( 'Original', 'wanderland-core' )  => 'full',
								esc_html__( 'Square', 'wanderland-core' )    => 'square',
								esc_html__( 'Landscape', 'wanderland-core' ) => 'landscape',
								esc_html__( 'Portrait', 'wanderland-core' )  => 'portrait',
								esc_html__( 'Medium', 'wanderland-core' )    => 'medium',
								esc_html__( 'Large', 'wanderland-core' )     => 'large',
								esc_html__( 'Custom', 'wanderland-core' )    => 'custom'
							),
							'description' => esc_html__( 'Set image proportions for your destination category list', 'wanderland-core' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_image_width',
							'heading'     => esc_html__( 'Custom Image Width', 'wanderland-core' ),
							'description' => esc_html__( 'Enter image width in px', 'wanderland-core' ),
							'dependency'  => array( 'element' => 'image_proportions', 'value' => 'custom' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_image_height',
							'heading'     => esc_html__( 'Custom Image Height', 'wanderland-core' ),
							'description' => esc_html__( 'Enter image height in px', 'wanderland-core' ),
							'dependency'  => array( 'element' => 'image_proportions', 'value' => 'custom' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'title_tag',
							'heading'    => esc_html__( 'Title Tag', 'wanderland-core' ),
							'value'      => array_flip( wanderland_mikado_get_title_tag( true ) )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'number_of_columns'   => 'three',
			'space_between_items' => 'normal',
			'number_of_items'     => '6',
			'orderby'             => 'date',
			'order'               => 'ASC',
			'image_proportions'   => 'full',
			'custom_image_width'  => '',
			'custom_image_height' => '',
			'title_tag'           => 'h6'
		);
		$params = shortcode_atts( $args, $atts );
		
		$query_array              = $this->getQueryArray( $params );
		$params['query_results']  = get_terms( $query_array );
		$params['holder_classes'] = $this->getHolderClasses( $params, $args );
		$params['image_size']     = $this->getImageSize( $params );
		$params['title_tag']      = ! empty( $params['title_tag'] ) ? $params['title_tag'] : $args['title_tag'];
		
		$html = wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-category-list', 'destination-category-holder', '', $params );
		
		return $html;
	}
	
	public function getQueryArray( $params ) {
		$query_array = array(
			'taxonomy'   => 'destination-category',
			'number'     => $params['number_of_items'],
			'orderby'    => $params['orderby'],
			'order'      => $params['order'],
			'hide_empty' => true
		);
		
		return $query_array;
	}
	
	public function getHolderClasses( $params, $args ) {
		$classes = array();
		
		$classes[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : 'mkdf-' . $args['number_of_columns'] . '-columns';
		$classes[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : 'mkdf-' . $args['space_between_items'] . '-space';
		
		return implode( ' ', $classes );
	}
	
	public function getImageSize( $params ) {
		$thumb_size = 'full';
		
		if ( ! empty( $params['image_proportions'] ) ) {
			$image_size = $params['image_proportions'];
			
			switch ( $image_size ) {
				case 'landscape':
					$thumb_size = 'wanderland_mikado_image_landscape';
					break;
				case 'portrait':
					$thumb_size = 'wanderland_mikado_image_portrait';
					break;
				case 'square':
					$thumb_size = 'wanderland_mikado_image_square';
					break;
				case 'medium':
					$thumb_size = 'medium';
					break;
				case 'large':
					$thumb_size = 'large';
					break;
				case 'full':
					$thumb_size = 'full';
					break;
				case 'custom':
					$thumb_size = 'custom';
					break;
			}
		}
		
		return $thumb_size;
	}
}