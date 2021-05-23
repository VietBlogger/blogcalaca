<?php

if ( ! function_exists( 'wanderland_mikado_gutenberg_title' ) ) {
	/**
	 * Loads default gutenberg editor title on pages
	 */
	function wanderland_mikado_gutenberg_title() {
		$title         = '';
		$title_tag     = 'h2';
		$page_id = wanderland_mikado_get_page_id();

		if ( ( is_home() && is_front_page() ) || is_singular( 'post' ) ) {
			$title = '';
		} elseif ( is_page() ) {
			$title   = get_the_title( $page_id );
		}

		$parameters = array(
			'title'           => $title,
			'title_tag'       => $title_tag
		);
		$parameters = apply_filters( 'wanderland_mikado_filter_gutenberg_title_params', $parameters );

		wanderland_mikado_get_module_template_part( 'templates/gutenberg-title', 'gutenberg', '', $parameters );

	}
}