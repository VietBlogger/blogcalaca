<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php
	/**
	 * wanderland_mikado_action_header_meta hook
	 *
	 * @see wanderland_mikado_header_meta() - hooked with 10
	 * @see wanderland_mikado_user_scalable_meta - hooked with 10
	 * @see wanderland_core_set_open_graph_meta - hooked with 10
	 */
	do_action( 'wanderland_mikado_action_header_meta' );
	
	wp_head(); ?>
</head>
<body <?php body_class(); ?> itemscope itemtype="https://schema.org/WebPage">
	<?php do_action( 'wanderland_mikado_action_after_opening_body_tag' ); ?>
    <div class="mkdf-wrapper">
        <div class="mkdf-wrapper-inner">
            <?php
            /**
             * wanderland_mikado_action_after_wrapper_inner hook
             *
             * @see wanderland_mikado_get_header() - hooked with 10
             * @see wanderland_mikado_get_mobile_header() - hooked with 20
             * @see wanderland_mikado_back_to_top_button() - hooked with 30
             * @see wanderland_mikado_get_header_minimal_full_screen_menu() - hooked with 40
             * @see wanderland_mikado_get_header_bottom_navigation() - hooked with 40
             */
            do_action( 'wanderland_mikado_action_after_wrapper_inner' ); ?>
	        
            <div class="mkdf-content" <?php wanderland_mikado_content_elem_style_attr(); ?>>
                <div class="mkdf-content-inner">