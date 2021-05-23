<?php

if ( ! function_exists( 'wanderland_mikado_get_subscribe_popup' ) ) {
	/**
	 * Loads search HTML based on search type option.
	 */
	function wanderland_mikado_get_subscribe_popup() {

		if ( wanderland_mikado_options()->getOptionValue( 'enable_subscribe_popup' ) === 'yes' && ( wanderland_mikado_options()->getOptionValue( 'subscribe_popup_contact_form' ) !== '' || wanderland_mikado_options()->getOptionValue( 'subscribe_popup_title' ) !== '' ) ) {
			wanderland_mikado_load_subscribe_popup_template();
		}
	}

	//Get subscribe popup HTML
	add_action( 'wanderland_mikado_action_before_page_header', 'wanderland_mikado_get_subscribe_popup' );
}

if ( ! function_exists( 'wanderland_mikado_load_subscribe_popup_template' ) ) {
	/**
	 * Loads HTML template with parameters
	 */
	function wanderland_mikado_load_subscribe_popup_template() {
		$parameters                       = array();
		$parameters['title']              = wanderland_mikado_options()->getOptionValue( 'subscribe_popup_title' );
		$parameters['subtitle']           = wanderland_mikado_options()->getOptionValue( 'subscribe_popup_subtitle' );
		$background_image_meta            = wanderland_mikado_options()->getOptionValue( 'subscribe_popup_background_image' );
		$parameters['background_styles']  = ! empty( $background_image_meta ) ? 'background-image: url(' . esc_url( $background_image_meta ) . ')' : '';
		$parameters['contact_form']       = wanderland_mikado_options()->getOptionValue( 'subscribe_popup_contact_form' );
		$parameters['contact_form_style'] = wanderland_mikado_options()->getOptionValue( 'subscribe_popup_contact_form_style' );
		$parameters['enable_prevent']     = wanderland_mikado_options()->getOptionValue( 'enable_subscribe_popup_prevent' );
		$parameters['prevent_behavior']   = wanderland_mikado_options()->getOptionValue( 'subscribe_popup_prevent_behavior' );

		$holder_classes   = array();
		$holder_classes[] = $parameters['enable_prevent'] === 'yes' ? 'mkdf-prevent-enable' : 'mkdf-prevent-disable';
		$holder_classes[] = ! empty( $parameters['prevent_behavior'] ) ? 'mkdf-sp-prevent-' . $parameters['prevent_behavior'] : 'mkdf-sp-prevent-session';
		$holder_classes[] = ! empty( $background_image_meta ) ? 'mkdf-sp-has-image' : '';

		$parameters['holder_classes'] = implode( ' ', $holder_classes );

		wanderland_mikado_get_module_template_part( 'templates/subscribe-popup', 'subscribe-popup', '', $parameters );
	}
}