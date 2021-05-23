<?php

if ( ! function_exists( 'wanderland_mikado_search_body_class' ) ) {
    /**
     * Function that adds body classes for different search types
     *
     * @param $classes array original array of body classes
     *
     * @return array modified array of classes
     */
    function wanderland_mikado_search_body_class( $classes ) {
        $classes[] = 'mkdf-on-side-search';

        return $classes;
    }

    add_filter( 'body_class', 'wanderland_mikado_search_body_class' );
}

if ( ! function_exists( 'wanderland_mikado_get_search' ) ) {
    /**
     * Loads search HTML based on search type option.
     */
    function wanderland_mikado_get_search() {
	    wanderland_mikado_load_search_template();
    }

    add_action( 'wanderland_mikado_action_after_search_opener', 'wanderland_mikado_get_search' );
}

if ( ! function_exists( 'wanderland_mikado_load_search_template' ) ) {
    /**
     * Loads search HTML based on search type option.
     */
    function wanderland_mikado_load_search_template() {
        $parameters = array();
	
	    wanderland_mikado_get_module_template_part( 'types/on-side/templates/on-side', 'search', '', $parameters );
    }
}