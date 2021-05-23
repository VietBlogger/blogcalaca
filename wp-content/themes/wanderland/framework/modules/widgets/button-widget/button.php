<?php

if ( class_exists( 'WanderlandCoreClassWidget' ) ) {
	class WanderlandMikadoClassButtonWidget extends WanderlandCoreClassWidget {
		public function __construct() {
			parent::__construct(
				'mkdf_button_widget',
				esc_html__( 'Wanderland Button Widget', 'wanderland' ),
				array( 'description' => esc_html__( 'Add button element to widget areas', 'wanderland' ) )
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
						'solid'   => esc_html__( 'Solid', 'wanderland' ),
						'outline' => esc_html__( 'Outline', 'wanderland' ),
						'simple'  => esc_html__( 'Simple', 'wanderland' )
					)
				),
				array(
					'type'        => 'dropdown',
					'name'        => 'size',
					'title'       => esc_html__( 'Size', 'wanderland' ),
					'options'     => array(
						'small'  => esc_html__( 'Small', 'wanderland' ),
						'medium' => esc_html__( 'Medium', 'wanderland' ),
						'large'  => esc_html__( 'Large', 'wanderland' ),
						'huge'   => esc_html__( 'Huge', 'wanderland' )
					),
					'description' => esc_html__( 'This option is only available for solid and outline button type', 'wanderland' )
				),
				array(
					'type'    => 'textfield',
					'name'    => 'text',
					'title'   => esc_html__( 'Text', 'wanderland' ),
					'default' => esc_html__( 'Button Text', 'wanderland' )
				),
				array(
					'type'  => 'textfield',
					'name'  => 'link',
					'title' => esc_html__( 'Link', 'wanderland' )
				),
				array(
					'type'    => 'dropdown',
					'name'    => 'target',
					'title'   => esc_html__( 'Link Target', 'wanderland' ),
					'options' => wanderland_mikado_get_link_target_array()
				),
				array(
					'type'  => 'colorpicker',
					'name'  => 'color',
					'title' => esc_html__( 'Color', 'wanderland' )
				),
				array(
					'type'  => 'colorpicker',
					'name'  => 'hover_color',
					'title' => esc_html__( 'Hover Color', 'wanderland' )
				),
				array(
					'type'        => 'colorpicker',
					'name'        => 'background_color',
					'title'       => esc_html__( 'Background Color', 'wanderland' ),
					'description' => esc_html__( 'This option is only available for solid button type', 'wanderland' )
				),
				array(
					'type'        => 'colorpicker',
					'name'        => 'hover_background_color',
					'title'       => esc_html__( 'Hover Background Color', 'wanderland' ),
					'description' => esc_html__( 'This option is only available for solid button type', 'wanderland' )
				),
				array(
					'type'        => 'colorpicker',
					'name'        => 'border_color',
					'title'       => esc_html__( 'Border Color', 'wanderland' ),
					'description' => esc_html__( 'This option is only available for solid and outline button type', 'wanderland' )
				),
				array(
					'type'        => 'colorpicker',
					'name'        => 'hover_border_color',
					'title'       => esc_html__( 'Hover Border Color', 'wanderland' ),
					'description' => esc_html__( 'This option is only available for solid and outline button type', 'wanderland' )
				),
				array(
					'type'        => 'textfield',
					'name'        => 'margin',
					'title'       => esc_html__( 'Margin', 'wanderland' ),
					'description' => esc_html__( 'Insert margin in format: top right bottom left (e.g. 10px 5px 10px 5px)', 'wanderland' )
				)
			);
		}
		
		public function widget( $args, $instance ) {
			$params = '';
			
			if ( ! is_array( $instance ) ) {
				$instance = array();
			}
			
			// Filter out all empty params
			$instance = array_filter( $instance, function ( $array_value ) {
				return trim( $array_value ) != '';
			} );
			
			// Default values
			if ( ! isset( $instance['text'] ) ) {
				$instance['text'] = 'Button Text';
			}
			
			// Generate shortcode params
			foreach ( $instance as $key => $value ) {
				$params .= " $key='$value' ";
			}
			
			echo '<div class="widget mkdf-button-widget">';
			echo do_shortcode( "[mkdf_button $params]" ); // XSS OK
			echo '</div>';
		}
	}
}