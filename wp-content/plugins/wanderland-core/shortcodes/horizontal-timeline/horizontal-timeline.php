<?php
namespace WanderlandCore\CPT\Shortcodes\HorizontalTimeline;

use WanderlandCore\Lib;

class HorizontalTimeline implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_horizontal_timeline';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                    => esc_html__( 'Horizontal Timeline', 'wanderland-core' ),
					'base'                    => $this->base,
					'icon'                    => 'icon-wpb-horizontal-timeline extended-custom-icon',
					'category'                => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'as_parent'               => array( 'only' => 'mkdf_horizontal_timeline_item' ),
					'content_element'         => true,
					'js_view'                 => 'VcColumnView',
					'params'                  => array(
					)
				)
			);
		}
	}
	/**
	 * Renders HTML for horizontal timeline shortcode
	 *
	 * @param array $atts
	 * @param null  $content
	 *
	 * @return string
	 */
	public function render( $atts, $content = null ) {
		$args   = array(
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['content'] = $content;
		
		$html = wanderland_core_get_shortcode_module_template_part( 'templates/horizontal-timeline-holder', 'horizontal-timeline', '', $params );
		
		return $html;
	}
}