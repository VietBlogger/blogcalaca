<?php
namespace WanderlandCore\CPT\Shortcodes\UncoveringSections;

use WanderlandCore\Lib;

class UncoveringSections implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_uncovering_sections';
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'      => esc_html__( 'Uncovering Sections', 'wanderland-core' ),
					'base'      => $this->base,
					'icon'      => 'icon-wpb-uncovering-sections extended-custom-icon',
					'category'  => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'as_parent' => array( 'only' => 'mkdf_uncovering_sections_item' ),
					'js_view'   => 'VcColumnView',
					'params'    => array()
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array();
		$params = shortcode_atts( $args, $atts );
		
		$params['content'] = $content;
		
		wp_enqueue_script( 'curtain', WANDERLAND_CORE_SHORTCODES_URL_PATH . '/uncovering-sections/assets/js/plugins/curtain.js', array( 'jquery' ), false, true );
		
		$html = wanderland_core_get_shortcode_module_template_part( 'templates/uncovering-sections', 'uncovering-sections', '', $params );
		
		return $html;
	}
}
