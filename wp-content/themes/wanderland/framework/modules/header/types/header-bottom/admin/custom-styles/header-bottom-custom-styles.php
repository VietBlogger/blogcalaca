<?php

if ( ! function_exists( 'wanderland_mikado_header_bottom_main_menu_styles' ) ) {
    /**
     * Generates styles for vertical main main menu
     */
    function wanderland_mikado_header_bottom_main_menu_styles() {

        // vertical menu 1st level style

        $first_level_styles = wanderland_mikado_get_typography_styles( 'vertical_menu_1st' );

        $first_level_selector = array(
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu > ul > li > a'
        );

        echo wanderland_mikado_dynamic_css( $first_level_selector, $first_level_styles );

        $first_level_hover_styles = array();

        $first_level_hover_color = wanderland_mikado_options()->getOptionValue( 'vertical_menu_1st_hover_color' );
        if ( ! empty( $first_level_hover_color ) ) {
            $first_level_hover_styles['color'] = $first_level_hover_color;
        }

        $first_level_hover_selector = array(
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu > ul > li > a:hover',
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu > ul > li > a.mkdf-active-item',
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu > ul > li > a.current-menu-ancestor'
        );

        echo wanderland_mikado_dynamic_css( $first_level_hover_selector, $first_level_hover_styles );

        // vertical menu 2nd level style

        $second_level_styles = wanderland_mikado_get_typography_styles( 'vertical_menu_2nd' );

        $second_level_selector = array(
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu ul li ul li a'
        );

        echo wanderland_mikado_dynamic_css( $second_level_selector, $second_level_styles );

        $second_level_hover_styles = array();

        $second_level_hover_color = wanderland_mikado_options()->getOptionValue( 'vertical_menu_2nd_hover_color' );
        if ( ! empty( $second_level_hover_color ) ) {
            $second_level_hover_styles['color'] = $second_level_hover_color;
        }

        $second_level_hover_selector = array(
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu ul li ul li a:hover',
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu ul li ul li.current-menu-ancestor > a',
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu ul li ul li.current-menu-item > a'
        );

        echo wanderland_mikado_dynamic_css( $second_level_hover_selector, $second_level_hover_styles );

        // vertical menu 3rd level style

        $third_level_styles = wanderland_mikado_get_typography_styles( 'vertical_menu_3rd' );

        $third_level_selector = array(
            '.mkdf-header-vertical-sliding nav.mkdf-header-bottom-menu ul li ul li ul li a'
        );

        echo wanderland_mikado_dynamic_css( $third_level_selector, $third_level_styles );


        $third_level_hover_styles = array();

        $third_level_hover_color = wanderland_mikado_options()->getOptionValue( 'vertical_menu_3rd_hover_color' );
        if ( ! empty( $third_level_hover_color ) ) {
            $third_level_hover_styles['color'] = $third_level_hover_color;
        }

        $third_level_hover_selector = array(
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu ul li ul li ul li a:hover',
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu ul li ul li ul li.current-menu-ancestor > a',
            '.mkdf-header-bottom nav.mkdf-header-bottom-menu ul li ul li ul li.current-menu-item > a'
        );

        echo wanderland_mikado_dynamic_css( $third_level_hover_selector, $third_level_hover_styles );
    }

    add_action( 'wanderland_mikado_action_style_dynamic', 'wanderland_mikado_header_bottom_main_menu_styles' );
}