<?php

namespace WanderlandCore\CPT\Shortcodes\HorizontalTimeline;

use WanderlandCore\Lib;

class HorizontalTimelineItem implements Lib\ShortcodeInterface {
	private $base;
	
	function __construct() {
		$this->base = 'mkdf_horizontal_timeline_item';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'            => esc_html__( 'Horizontal Timeline Item', 'wanderland-core' ),
					'base'            => $this->base,
					'category'        => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'            => 'icon-wpb-horizontal-timeline-item extended-custom-icon',
					'as_child'        => array( 'only' => 'mkdf_horizontal_timeline' ),
					'params'                  => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'title',
							'heading'     => esc_html__( 'Timeline Event Title', 'backpacktraveler-core' ),
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'label_one',
							'heading'     => esc_html__( 'Timeline Event Label1', 'backpacktraveler-core' ),
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'label_two',
							'heading'     => esc_html__( 'Timeline Event Label2', 'backpacktraveler-core' ),
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'custom_link',
							'heading'    => esc_html__( 'Timeline Event Link', 'backpacktraveler-core' ),
						),
						array(
							'type'       => 'attach_image',
							'param_name' => 'content_image',
							'heading'    => esc_html__( 'Timeline Event Image', 'backpacktraveler-core' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args = array(
			'title'         => '',
			'label_one'      => '',
			'label_two'      => '',
			'custom_link'   => '#',
			'content_image' => ''
		);
		$params       = shortcode_atts( $args, $atts );
		
		$params['holder_classes'] = $this->getHolderClasses( $params );
		$params['content']        = $content;
		
		$html = wanderland_core_get_shortcode_module_template_part( 'templates/horizontal-timeline-item', 'horizontal-timeline', '', $params );
		
		return $html;
	}
	
	private function getHolderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = ! empty( $params['content_image'] ) ? 'mkdf-timeline-has-image' : 'mkdf-timeline-no-image';
		
		return implode( ' ', $holderClasses );
	}
}