<?php

if ( ! function_exists( 'wanderland_core_register_widgets' ) ) {
	function wanderland_core_register_widgets() {
		$widgets = apply_filters( 'wanderland_core_filter_register_widgets', $widgets = array() );
		
		foreach ( $widgets as $widget ) {
			register_widget( $widget );
		}
	}
	
	add_action( 'widgets_init', 'wanderland_core_register_widgets' );
}