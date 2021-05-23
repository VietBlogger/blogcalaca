<?php
namespace WanderlandCore\CPT\Shortcodes\Team;

use WanderlandCore\lib;

class Team implements lib\ShortcodeInterface {
	private $base;

	public function __construct() {
		$this->base = 'mkdf_team';

		add_action('vc_before_init', array($this, 'vcMap'));
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Team', 'wanderland-core' ),
					'base'                      => $this->base,
					'category'                  => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'                      => 'icon-wpb-team extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array_merge(
						array(
							array(
								'type'       => 'attach_image',
								'param_name' => 'team_image',
								'heading'    => esc_html__( 'Image', 'wanderland-core' )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'team_name',
								'heading'    => esc_html__( 'Name', 'wanderland-core' )
							),
							array(
								'type'        => 'dropdown',
								'param_name'  => 'team_name_tag',
								'heading'     => esc_html__( 'Name Tag', 'wanderland-core' ),
								'value'       => array_flip( wanderland_mikado_get_title_tag( true ) ),
								'save_always' => true,
								'dependency'  => array( 'element' => 'team_name', 'not_empty' => true )
							),
							array(
								'type'       => 'colorpicker',
								'param_name' => 'team_name_color',
								'heading'    => esc_html__( 'Name Color', 'wanderland-core' ),
								'dependency' => array( 'element' => 'team_name', 'not_empty' => true )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'team_position',
								'heading'    => esc_html__( 'Position', 'wanderland-core' )
							),
							array(
								'type'       => 'textfield',
								'param_name' => 'team_link',
								'heading'    => esc_html__( 'Link', 'wanderland-core' )
							),
							array(
								'type'       => 'dropdown',
								'param_name' => 'team_target',
								'heading'    => esc_html__( 'Target', 'wanderland-core' ),
								'value'      => array_flip( wanderland_mikado_get_link_target_array() ),
								'dependency' => array( 'element' => 'team_link', 'not_empty' => true )
							),
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args = array(
			'team_image'            => '',
			'team_name'             => '',
			'team_name_tag'         => 'h5',
			'team_name_color'       => '',
			'team_position'       => '',
			'team_link'             => '',
			'team_target'           => '_blank',
		);
		
		$params = shortcode_atts( $args, $atts );
		
		$params['team_name_tag']        = ! empty( $params['team_name_tag'] ) ? $params['team_name_tag'] : $args['team_name_tag'];
		$params['team_name_styles']     = $this->getTeamNameStyles( $params );
		
		//Get HTML from template based on type of team
		$html = wanderland_core_get_shortcode_module_template_part( 'templates/info-on-image', 'team', '', $params );
		
		return $html;
	}
	
	private function getTeamNameStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['team_name_color'] ) ) {
			$styles[] = 'color: ' . $params['team_name_color'];
		}
		
		return implode( ';', $styles );
	}
}