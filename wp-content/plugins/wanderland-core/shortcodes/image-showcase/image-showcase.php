<?php
namespace WanderlandCore\CPT\Shortcodes\ImageShowcase;

use WanderlandCore\Lib;

class ImageShowcase implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_image_showcase';
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'      => esc_html__( 'Image Showcase', 'wanderland-core' ),
					'base'      => $this->base,
					'icon'      => 'icon-wpb-image-showcase extended-custom-icon',
					'category'  => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'as_parent' => array( 'only' => 'mkdf_image_showcase_item' ),
					'js_view'   => 'VcColumnView',
					'params'    => array(
						array(
							'type'        => 'dropdown',
							'param_name'  => 'slider_loop',
							'heading'     => esc_html__( 'Enable Slider Loop', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'slider_autoplay',
							'heading'     => esc_html__( 'Enable Slider Autoplay', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'save_always' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'slider_speed',
							'heading'     => esc_html__( 'Slide Duration', 'wanderland-core' ),
							'description' => esc_html__( 'Default value is 5000 (ms)', 'wanderland-core' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'slider_speed_animation',
							'heading'     => esc_html__( 'Slide Animation Duration', 'wanderland-core' ),
							'description' => esc_html__( 'Speed of slide animation in milliseconds. Default value is 600.', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_full_height',
							'heading'     => esc_html__( 'Enable Custom Layout', 'wanderland-core' ),
							'description' => esc_html__( 'This option will create full height slider and place it at the right side of the layout', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false ) ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'slider_navigation',
							'heading'     => esc_html__( 'Enable Slider Navigation Arrows', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'slider_pagination',
							'heading'     => esc_html__( 'Enable Slider Pagination', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'save_always' => true
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'slider_loop'               => 'yes',
			'slider_autoplay'           => 'yes',
			'slider_speed'              => '3000',
			'slider_speed_animation'    => '600',
			'enable_full_height'        => 'no',
			'slider_navigation'         => 'yes',
			'slider_pagination'         => 'yes'
		);
		$params = shortcode_atts( $args, $atts );

		$params['enable_full_height'] = ! empty( $params['enable_full_height'] ) ? $params['enable_full_height'] : $args['enable_full_height'];

		$holder_classes = $this->getHolderClasses( $params );
		$slider_data    = $this->getSliderData( $params );

		$html = '<div class="mkdf-image-showcase ' . esc_attr( $holder_classes ) . '">';
			$html .= '<div class="mkdf-is-slider mkdf-owl-slider" ' . wanderland_mikado_get_inline_attrs($slider_data) . '>';
				$html .= do_shortcode( $content );
			$html .= '</div>';
		$html .= '</div>';
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();

		$holderClasses[] = $params['enable_full_height'] === 'yes' ? 'mkdf-is-full-height' : '';

		return implode( ' ', $holderClasses );
	}

	private function getSliderData( $params ) {
		$slider_data = array();

		$slider_data['data-number-of-items']        = '1';
		$slider_data['data-enable-loop']            = ! empty( $params['slider_loop'] ) ? $params['slider_loop'] : '';
		$slider_data['data-enable-autoplay']        = ! empty( $params['slider_autoplay'] ) ? $params['slider_autoplay'] : '';
		$slider_data['data-slider-speed']           = ! empty( $params['slider_speed'] ) ? $params['slider_speed'] : '3000';
		$slider_data['data-slider-speed-animation'] = ! empty( $params['slider_speed_animation'] ) ? $params['slider_speed_animation'] : '600';
		$slider_data['data-enable-navigation']      = ! empty( $params['slider_navigation'] ) ? $params['slider_navigation'] : '';
		$slider_data['data-enable-pagination']      = ! empty( $params['slider_pagination'] ) ? $params['slider_pagination'] : '';

		return $slider_data;
	}
}
