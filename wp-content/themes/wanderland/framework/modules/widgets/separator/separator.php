<?php

if ( class_exists( 'WanderlandCoreClassWidget' ) ) {
	class WanderlandMikadoClassSeparatorWidget extends WanderlandCoreClassWidget {
		public function __construct() {
			parent::__construct(
				'mkdf_separator_widget',
				esc_html__( 'Wanderland Separator Widget', 'wanderland' ),
				array( 'description' => esc_html__( 'Add a separator element to your widget areas', 'wanderland' ) )
			);
			
			$this->setParams();
		}
		
		protected function setParams() {
			$this->params = array(
				array(
					'type'    => 'dropdown',
					'name'    => 'type',
					'title'   => esc_html__( 'Type', 'wanderland' ),
					'options' => array(
						'normal'     => esc_html__( 'Normal', 'wanderland' ),
						'full-width' => esc_html__( 'Full Width', 'wanderland' )
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'position',
					'title'   => esc_html__( 'Position', 'wanderland' ),
					'options' => array(
						'center' => esc_html__( 'Center', 'wanderland' ),
						'left'   => esc_html__( 'Left', 'wanderland' ),
						'right'  => esc_html__( 'Right', 'wanderland' )
					)
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'border_style',
					'title'   => esc_html__( 'Style', 'wanderland' ),
					'options' => array(
						'solid'  => esc_html__( 'Solid', 'wanderland' ),
						'dashed' => esc_html__( 'Dashed', 'wanderland' ),
						'dotted' => esc_html__( 'Dotted', 'wanderland' )
					)
				),
				array(
					'type'  => 'colorpicker',
					'name'  => 'color',
					'title' => esc_html__( 'Color', 'wanderland' )
				),
				array(
					'type'  => 'textfield',
					'name'  => 'width',
					'title' => esc_html__( 'Width (px or %)', 'wanderland' )
				),
				array(
					'type'  => 'textfield',
					'name'  => 'thickness',
					'title' => esc_html__( 'Thickness (px)', 'wanderland' )
				),
				array(
					'type'  => 'textfield',
					'name'  => 'top_margin',
					'title' => esc_html__( 'Top Margin (px or %)', 'wanderland' )
				),
				array(
					'type'  => 'textfield',
					'name'  => 'bottom_margin',
					'title' => esc_html__( 'Bottom Margin (px or %)', 'wanderland' )
				)
			);
		}
		
		public function widget( $args, $instance ) {
			if ( ! is_array( $instance ) ) {
				$instance = array();
			}
			
			//prepare variables
			$params = '';
			
			//is instance empty?
			if ( is_array( $instance ) && count( $instance ) ) {
				//generate shortcode params
				foreach ( $instance as $key => $value ) {
					$params .= " $key='$value' ";
				}
			}
			
			echo '<div class="widget mkdf-separator-widget">';
			echo do_shortcode( "[mkdf_separator $params]" ); // XSS OK
			echo '</div>';
		}
	}
}