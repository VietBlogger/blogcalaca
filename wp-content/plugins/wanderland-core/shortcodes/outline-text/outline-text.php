<?php

namespace WanderlandCore\CPT\Shortcodes\OutlineText;

use WanderlandCore\Lib;

class OutlineText implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_outline_text';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'     => esc_html__( 'Outline Text', 'wanderland-core' ),
					'base'     => $this->getBase(),
					'category' => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'     => 'icon-wpb-outline-text extended-custom-icon',
					'params'   => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_class',
							'heading'     => esc_html__( 'Custom CSS Class', 'wanderland-core' ),
							'description' => esc_html__( 'Style particular content element differently - add a class name and refer to it in custom CSS', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'text',
							'heading'    => esc_html__( 'Text', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'text_direction',
							'heading'    => esc_html__( 'Text Direction', 'wanderland-core' ),
							'value'       => array(
								esc_html__( 'Horizontal', 'wanderland-core' ) => 'horizontal',
								esc_html__( 'Vertical', 'wanderland-core' )    => 'vertical'
							)
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'text_position',
							'heading'    => esc_html__( 'Text Position', 'wanderland-core' ),
							'value'       => array(
								esc_html__( 'Left', 'wanderland-core' )  => 'left',
								esc_html__( 'Right', 'wanderland-core' ) => 'right'
							),
							'dependency' => array( 'element' => 'text_direction', 'value' => 'vertical' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'text_tag',
							'heading'     => esc_html__( 'Text Tag', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_title_tag( true, array( 'p' => 'p' ) ) ),
							'save_always' => true
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'font_family',
							'heading'    => esc_html__( 'Font Family', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'font_size',
							'heading'    => esc_html__( 'Font Size (px or em)', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'line_height',
							'heading'    => esc_html__( 'Line Height (px or em)', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'font_weight',
							'heading'     => esc_html__( 'Font Weight', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_font_weight_array( true ) ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'font_style',
							'heading'     => esc_html__( 'Font Style', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_font_style_array( true ) ),
							'save_always' => true
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'letter_spacing',
							'heading'    => esc_html__( 'Letter Spacing (px or em)', 'wanderland-core' )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'color',
							'heading'    => esc_html__( 'Text Color', 'wanderland-core' )
						),
						array(
							'type'       => 'colorpicker',
							'param_name' => 'outline_color',
							'heading'    => esc_html__( 'Outline Color', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'outline_width',
							'heading'    => esc_html__( 'Outline Width', 'wanderland-core' ),
							'description' => esc_html__( 'Insert value in pixels (e.g. 2px)', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'text_align',
							'heading'     => esc_html__( 'Text Align', 'wanderland-core' ),
							'value'       => array(
								esc_html__( 'Default', 'wanderland-core' ) => '',
								esc_html__( 'Left', 'wanderland-core' )    => 'left',
								esc_html__( 'Center', 'wanderland-core' )  => 'center',
								esc_html__( 'Right', 'wanderland-core' )   => 'right',
								esc_html__( 'Justify', 'wanderland-core' ) => 'justify'
							),
							'save_always' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'margin',
							'heading'     => esc_html__( 'Margin (px or %)', 'wanderland-core' ),
							'description' => esc_html__( 'Insert margin in format: top right bottom left (e.g. 10px 5px 10px 5px)', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'font_size_1366',
							'heading'    => esc_html__( 'Font Size (px or em)', 'wanderland-core' ),
							'group'      => esc_html__( 'Laptops', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'line_height_1366',
							'heading'    => esc_html__( 'Line Height (px or em)', 'wanderland-core' ),
							'group'      => esc_html__( 'Laptops', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'font_size_1024',
							'heading'    => esc_html__( 'Font Size (px or em)', 'wanderland-core' ),
							'group'      => esc_html__( 'Tablets Landscape', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'line_height_1024',
							'heading'    => esc_html__( 'Line Height (px or em)', 'wanderland-core' ),
							'group'      => esc_html__( 'Tablets Landscape', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'font_size_768',
							'heading'    => esc_html__( 'Font Size (px or em)', 'wanderland-core' ),
							'group'      => esc_html__( 'Tablets Portrait', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'line_height_768',
							'heading'    => esc_html__( 'Line Height (px or em)', 'wanderland-core' ),
							'group'      => esc_html__( 'Tablets Portrait', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'font_size_680',
							'heading'    => esc_html__( 'Font Size (px or em)', 'wanderland-core' ),
							'group'      => esc_html__( 'Mobiles', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'line_height_680',
							'heading'    => esc_html__( 'Line Height (px or em)', 'wanderland-core' ),
							'group'      => esc_html__( 'Mobiles', 'wanderland-core' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'custom_class'     => '',
			'text'             => '',
			'text_direction'   => 'horizontal',
			'text_position'    => '',
			'text_tag'         => 'h2',
			'font_family'      => '',
			'font_size'        => '',
			'line_height'      => '',
			'font_weight'      => '',
			'font_style'       => '',
			'letter_spacing'   => '',
			'color'            => '',
			'outline_color'    => '',
			'outline_width'    => '',
			'text_align'       => '',
			'margin'           => '',
			'font_size_1366'   => '',
			'line_height_1366' => '',
			'font_size_1024'   => '',
			'line_height_1024' => '',
			'font_size_768'    => '',
			'line_height_768'  => '',
			'font_size_680'    => '',
			'line_height_680'  => ''
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['holder_classes']    = $this->getHolderClasses( $params );
		$params['text_styles']     = $this->getTextStyles( $params );
		$params['text_data']       = $this->getTextData( $params );
		
		$params['text_tag'] = ! empty( $params['text_tag'] ) ? $params['text_tag'] : $args['text_tag'];
		
		$html = wanderland_core_get_shortcode_module_template_part( 'templates/outline-text', 'outline-text', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['custom_class'] ) ? esc_attr( $params['custom_class'] ) : '';
		$holderClasses[] = ! empty( $params['text_direction'] ) ? 'mkdf-ot-' . esc_attr( $params['text_direction'] ) : '';
		$holderClasses[] = $params['text_position'] == 'right' ? 'mkdf-ot-position-right' : 'mkdf-ot-position-left';
		
		return implode( ' ', $holderClasses );
	}
	
	private function getTextStyles( $params ) {
		$styles = array();
		
		if ( $params['font_family'] !== '' ) {
			$styles[] = 'font-family: ' . $params['font_family'];
		}
		
		if ( ! empty( $params['font_size'] ) ) {
			if ( wanderland_mikado_string_ends_with( $params['font_size'], 'px' ) || wanderland_mikado_string_ends_with( $params['font_size'], 'em' ) ) {
				$styles[] = 'font-size: ' . $params['font_size'];
			} else {
				$styles[] = 'font-size: ' . $params['font_size'] . 'px';
			}
		}
		
		if ( ! empty( $params['line_height'] ) ) {
			if ( wanderland_mikado_string_ends_with( $params['line_height'], 'px' ) || wanderland_mikado_string_ends_with( $params['line_height'], 'em' ) ) {
				$styles[] = 'line-height: ' . $params['line_height'];
			} else {
				$styles[] = 'line-height: ' . $params['line_height'] . 'px';
			}
		}
		
		if ( ! empty( $params['font_weight'] ) ) {
			$styles[] = 'font-weight: ' . $params['font_weight'];
		}
		
		if ( ! empty( $params['font_style'] ) ) {
			$styles[] = 'font-style: ' . $params['font_style'];
		}
		
		if ( ! empty( $params['letter_spacing'] ) ) {
			if ( wanderland_mikado_string_ends_with( $params['letter_spacing'], 'px' ) || wanderland_mikado_string_ends_with( $params['letter_spacing'], 'em' ) ) {
				$styles[] = 'letter-spacing: ' . $params['letter_spacing'];
			} else {
				$styles[] = 'letter-spacing: ' . $params['letter_spacing'] . 'px';
			}
		}
		
		if ( ! empty( $params['text_align'] ) ) {
			$styles[] = 'text-align: ' . $params['text_align'];
		}
		
		if ( ! empty( $params['color'] ) ) {
			$styles[] = 'color: ' . $params['color'];
		}
		
		if ( ! empty( $params['outline_color'] ) && ! empty( $params['outline_width'] ) ) {
			$styles[] = '-webkit-text-stroke: ' . $params['outline_width'] . ' ' .$params['outline_color'];
			$styles[] = 'text-stroke: ' . $params['outline_width'] . ' ' . $params['outline_color'];
		}
		
		if ( $params['margin'] !== '' ) {
			$styles[] = 'margin: ' . $params['margin'];
		}
		
		return implode( ';', $styles );
	}
	
	private function getTextData( $params ) {
		$data = array();
		
		if ( $params['font_size_1366'] !== '' ) {
			if ( wanderland_mikado_string_ends_with( $params['font_size_1366'], 'px' ) || wanderland_mikado_string_ends_with( $params['font_size_1366'], 'em' ) ) {
				$data['data-font-size-1366'] = $params['font_size_1366'];
			} else {
				$data['data-font-size-1366'] = $params['font_size_1366'] . 'px';
			}
		}
		
		if ( $params['font_size_1024'] !== '' ) {
			if ( wanderland_mikado_string_ends_with( $params['font_size_1024'], 'px' ) || wanderland_mikado_string_ends_with( $params['font_size_1024'], 'em' ) ) {
				$data['data-font-size-1024'] = $params['font_size_1024'];
			} else {
				$data['data-font-size-1024'] = $params['font_size_1024'] . 'px';
			}
		}
		
		if ( $params['font_size_768'] !== '' ) {
			if ( wanderland_mikado_string_ends_with( $params['font_size_768'], 'px' ) || wanderland_mikado_string_ends_with( $params['font_size_768'], 'em' ) ) {
				$data['data-font-size-768'] = $params['font_size_768'];
			} else {
				$data['data-font-size-768'] = $params['font_size_768'] . 'px';
			}
		}
		
		if ( $params['font_size_680'] !== '' ) {
			if ( wanderland_mikado_string_ends_with( $params['font_size_680'], 'px' ) || wanderland_mikado_string_ends_with( $params['font_size_680'], 'em' ) ) {
				$data['data-font-size-680'] = $params['font_size_680'];
			} else {
				$data['data-font-size-680'] = $params['font_size_680'] . 'px';
			}
		}
		
		if ( $params['line_height_1366'] !== '' ) {
			if ( wanderland_mikado_string_ends_with( $params['line_height_1366'], 'px' ) || wanderland_mikado_string_ends_with( $params['line_height_1366'], 'em' ) ) {
				$data['data-line-height-1366'] = $params['line_height_1366'];
			} else {
				$data['data-line-height-1366'] = $params['line_height_1366'] . 'px';
			}
		}
		
		if ( $params['line_height_1024'] !== '' ) {
			if ( wanderland_mikado_string_ends_with( $params['line_height_1024'], 'px' ) || wanderland_mikado_string_ends_with( $params['line_height_1024'], 'em' ) ) {
				$data['data-line-height-1024'] = $params['line_height_1024'];
			} else {
				$data['data-line-height-1024'] = $params['line_height_1024'] . 'px';
			}
		}
		
		if ( $params['line_height_768'] !== '' ) {
			if ( wanderland_mikado_string_ends_with( $params['line_height_768'], 'px' ) || wanderland_mikado_string_ends_with( $params['line_height_768'], 'em' ) ) {
				$data['data-line-height-768'] = $params['line_height_768'];
			} else {
				$data['data-line-height-768'] = $params['line_height_768'] . 'px';
			}
		}
		
		if ( $params['line_height_680'] !== '' ) {
			if ( wanderland_mikado_string_ends_with( $params['line_height_680'], 'px' ) || wanderland_mikado_string_ends_with( $params['line_height_680'], 'em' ) ) {
				$data['data-line-height-680'] = $params['line_height_680'];
			} else {
				$data['data-line-height-680'] = $params['line_height_680'] . 'px';
			}
		}
		
		return $data;
	}
}