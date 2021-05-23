<?php

if ( ! function_exists( 'wanderland_mikado_register_footer_sidebar' ) ) {
	function wanderland_mikado_register_footer_sidebar() {

		$show_footer_top    = wanderland_mikado_options()->getOptionValue( 'show_footer_top' ) !== 'yes' ? false : true;
		$show_footer_middle    = wanderland_mikado_options()->getOptionValue( 'show_footer_middle' ) !== 'yes' ? false : true;
		$show_footer_bottom = wanderland_mikado_options()->getOptionValue( 'show_footer_bottom' ) !== 'yes' ? false : true;

		if ( $show_footer_top ) {
			register_sidebar(
				array(
					'id'            => 'footer_top_column_1',
					'name'          => esc_html__( 'Footer Top Column 1', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the first column of top footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-1 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);

			register_sidebar(
				array(
					'id'            => 'footer_top_column_2',
					'name'          => esc_html__( 'Footer Top Column 2', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the second column of top footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-2 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);

			register_sidebar(
				array(
					'id'            => 'footer_top_column_3',
					'name'          => esc_html__( 'Footer Top Column 3', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the third column of top footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-3 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);

			register_sidebar(
				array(
					'id'            => 'footer_top_column_4',
					'name'          => esc_html__( 'Footer Top Column 4', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the fourth column of top footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-4 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);
		}

		if ( $show_footer_middle ) {

			register_sidebar(
				array(
					'id'            => 'footer_middle_column_1',
					'name'          => esc_html__( 'Footer Middle Column 1', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the first column of middle footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-1 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);

			register_sidebar(
				array(
					'id'            => 'footer_middle_column_2',
					'name'          => esc_html__( 'Footer Middle Column 2', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the second column of middle footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-2 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);

			register_sidebar(
				array(
					'id'            => 'footer_middle_column_3',
					'name'          => esc_html__( 'Footer Middle Column 3', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the third column of middle footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-3 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);

			register_sidebar(
				array(
					'id'            => 'footer_middle_column_4',
					'name'          => esc_html__( 'Footer Middle Column 4', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the fourth column of middle footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-column-4 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);
		}

		if ( $show_footer_bottom ) {

			register_sidebar(
				array(
					'id'            => 'footer_bottom_column_1',
					'name'          => esc_html__( 'Footer Bottom Column 1', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the first column of bottom footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-bottom-column-1 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);

			register_sidebar(
				array(
					'id'            => 'footer_bottom_column_2',
					'name'          => esc_html__( 'Footer Bottom Column 2', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the second column of bottom footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-bottom-column-2 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);

			register_sidebar(
				array(
					'id'            => 'footer_bottom_column_3',
					'name'          => esc_html__( 'Footer Bottom Column 3', 'wanderland' ),
					'description'   => esc_html__( 'Widgets added here will appear in the third column of bottom footer area', 'wanderland' ),
					'before_widget' => '<div id="%1$s" class="widget mkdf-footer-bottom-column-3 %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<div class="mkdf-widget-title-holder"><h6 class="mkdf-widget-title">',
					'after_title'   => '</h6></div>'
				)
			);
		}
	}
	
	add_action( 'widgets_init', 'wanderland_mikado_register_footer_sidebar' );
}

if ( ! function_exists( 'wanderland_mikado_get_footer' ) ) {
	/**
	 * Loads footer HTML
	 */
	function wanderland_mikado_get_footer() {
		$parameters          = array();
		$page_id             = wanderland_mikado_get_page_id();
		$disable_footer_meta = get_post_meta( $page_id, 'mkdf_disable_footer_meta', true );
		
		$parameters['display_footer']        = $disable_footer_meta !== 'yes';
		$parameters['display_footer_top']    = wanderland_mikado_show_footer_top();
		$parameters['display_footer_middle']  = wanderland_mikado_show_footer_middle();
		$parameters['display_footer_bottom'] = wanderland_mikado_show_footer_bottom();
        $parameters['holder_classes']        = wanderland_mikado_get_footer_holder_classes();
		
		wanderland_mikado_get_module_template_part( 'templates/footer', 'footer', '', $parameters );
	}
	
	add_action( 'wanderland_mikado_get_footer_template', 'wanderland_mikado_get_footer' );
}

if ( ! function_exists( 'wanderland_mikado_get_footer_holder_classes' ) ) {
	function wanderland_mikado_get_footer_holder_classes() {
		$footer_classes   = array();
		$page_id             = wanderland_mikado_get_page_id();
		$uncovering_footer_meta = wanderland_mikado_get_meta_field_intersect( 'uncovering_footer', $page_id );
		$footer_skin = get_post_meta( $page_id, 'mkdf_footer_skin_meta', true );

		$footer_classes[] = $uncovering_footer_meta === 'yes' ? 'mkdf-footer-uncover' : '';
		$footer_classes[] = 'mkdf-' . $footer_skin;

		return implode( ' ', $footer_classes );
	}
}

if ( ! function_exists( 'wanderland_mikado_show_footer_top' ) ) {
	/**
	 * Check footer top showing
	 * Function check value from options and checks if footer columns are empty.
	 * return bool
	 */
	function wanderland_mikado_show_footer_top() {
		$page_id         = wanderland_mikado_get_page_id();
		$footer_top_flag = false;
		
		//check value from options and meta field on current page
		$option_flag = wanderland_mikado_get_meta_field_intersect( 'show_footer_top', $page_id ) === 'yes';
		
		//check footer columns.If they are empty, disable footer top
		$columns_flag = false;
		for ( $i = 1; $i <= 4; $i ++ ) {
			$footer_columns_id = 'footer_top_column_' . $i;
			if ( is_active_sidebar( $footer_columns_id ) ) {
				$columns_flag = true;
				break;
			}
		}
		
		if ( $option_flag && $columns_flag ) {
			$footer_top_flag = true;
		}
		
		return $footer_top_flag;
	}
}

if ( ! function_exists( 'wanderland_mikado_show_footer_middle' ) ) {
	/**
	 * Check footer middle showing
	 * Function check value from options and checks if footer columns are empty.
	 * return bool
	 */
	function wanderland_mikado_show_footer_middle() {
		$footer_middle_flag = false;

		//check value from options and meta field on current page
		$option_flag = ( wanderland_mikado_get_meta_field_intersect( 'show_footer_middle' ) === 'yes' ) ? true : false;

		//check footer columns.If they are empty, disable footer middle
		$columns_flag = false;
		for ( $i = 1; $i <= 4; $i ++ ) {
			$footer_columns_id = 'footer_middle_column_' . $i;
			if ( is_active_sidebar( $footer_columns_id ) ) {
				$columns_flag = true;
				break;
			}
		}

		if ( $option_flag && $columns_flag ) {
			$footer_middle_flag = true;
		}

		return $footer_middle_flag;
	}
}

if ( ! function_exists( 'wanderland_mikado_show_footer_bottom' ) ) {
	/**
	 * Check footer bottom showing
	 * Function check value from options and checks if footer columns are empty.
	 * return bool
	 */
	function wanderland_mikado_show_footer_bottom() {
		$page_id            = wanderland_mikado_get_page_id();
		$footer_bottom_flag = false;
		
		//check value from options and meta field on current page
		$option_flag = wanderland_mikado_get_meta_field_intersect( 'show_footer_bottom', $page_id ) === 'yes';
		
		//check footer columns.If they are empty, disable footer bottom
		$columns_flag = false;
		for ( $i = 1; $i <= 3; $i ++ ) {
			$footer_columns_id = 'footer_bottom_column_' . $i;
			if ( is_active_sidebar( $footer_columns_id ) ) {
				$columns_flag = true;
				break;
			}
		}
		
		if ( $option_flag && $columns_flag ) {
			$footer_bottom_flag = true;
		}
		
		return $footer_bottom_flag;
	}
}

if ( ! function_exists( 'wanderland_mikado_get_footer_top' ) ) {
	/**
	 * Return footer top HTML
	 */
	function wanderland_mikado_get_footer_top() {
		$parameters = array();

		//get number of top footer columns
		$parameters['footer_top_columns'] = explode(' ', wanderland_mikado_options()->getOptionValue( 'footer_top_columns' ));
		
		//get footer top grid/full width class
		$parameters['footer_top_grid_class'] = wanderland_mikado_get_meta_field_intersect('footer_in_grid') === 'yes' ? 'mkdf-grid' : 'mkdf-full-width';
		
		//get footer top other classes
		$footer_top_classes = array();
		
		//footer alignment
		$footer_top_alignment = wanderland_mikado_options()->getOptionValue( 'footer_top_columns_alignment' );
		$footer_top_classes[] = ! empty( $footer_top_alignment ) ? 'mkdf-footer-top-alignment-' . esc_attr( $footer_top_alignment ) : '';
		
		$footer_top_classes = apply_filters( 'wanderland_mikado_filter_footer_top_classes', $footer_top_classes );
		
		$parameters['footer_top_classes'] = implode( ' ', $footer_top_classes );
		
		wanderland_mikado_get_module_template_part( 'templates/parts/footer-top', 'footer', '', $parameters );
	}
}

if ( ! function_exists( 'wanderland_mikado_get_footer_middle' ) ) {
	/**
	 * Return footer middle HTML
	 */
	function wanderland_mikado_get_footer_middle() {
		$parameters = array();

		//get number of middle footer columns
		$parameters['footer_middle_columns'] = explode(' ', wanderland_mikado_options()->getOptionValue( 'footer_middle_columns' ));

		//get footer middle grid/full width class
		$parameters['footer_middle_grid_class'] = wanderland_mikado_get_meta_field_intersect('footer_in_grid') === 'yes' ? 'mkdf-grid' : 'mkdf-full-width';

		//get footer middle other classes
		$footer_middle_classes = array();

		//footer alignment
		$footer_middle_alignment = wanderland_mikado_options()->getOptionValue( 'footer_middle_columns_alignment' );
		$footer_middle_classes[] = ! empty( $footer_middle_alignment ) ? 'mkdf-footer-middle-alignment-' . esc_attr( $footer_middle_alignment ) : '';

		$footer_middle_classes = apply_filters( 'wanderland_mikado_footer_middle_classes', $footer_middle_classes );

		$parameters['footer_middle_classes'] = implode( ' ', $footer_middle_classes );

		wanderland_mikado_get_module_template_part( 'templates/parts/footer-middle', 'footer', '', $parameters );
	}
}

if ( ! function_exists( 'wanderland_mikado_get_footer_bottom' ) ) {
	/**
	 * Return footer bottom HTML
	 */
	function wanderland_mikado_get_footer_bottom() {
		$parameters = array();

		//get number of bottom footer columns
		$parameters['footer_bottom_columns'] = explode(' ', wanderland_mikado_options()->getOptionValue( 'footer_bottom_columns' ));
		
		//get footer top grid/full width class
		$parameters['footer_bottom_grid_class'] = wanderland_mikado_get_meta_field_intersect('footer_in_grid') === 'yes' ? 'mkdf-grid' : 'mkdf-full-width';
		
		//get footer top other classes
		$footer_bottom_classes = array();
		$footer_bottom_classes = apply_filters( 'wanderland_mikado_filter_footer_bottom_classes', $footer_bottom_classes );
		
		$parameters['footer_bottom_classes'] = implode( ' ', $footer_bottom_classes );
		
		wanderland_mikado_get_module_template_part( 'templates/parts/footer-bottom', 'footer', '', $parameters );
	}
}

if ( ! function_exists( 'wanderland_mikado_footer_holder_style' ) ) {
	/**
	 * Function that return container style
	 */
	function wanderland_mikado_footer_holder_style( $style ) {
		$current_style = '';
		$page_id       = wanderland_mikado_get_page_id();
		$class_prefix  = wanderland_mikado_get_unique_page_class( $page_id, true );
		
		/***** footer top style - begin *****/
		
		$footer_top_styles   = array();
		$footer_top_selector = $class_prefix . ' .mkdf-page-footer .mkdf-footer-top-holder';
		
		$footer_top_background_color = get_post_meta( $page_id, 'mkdf_footer_top_background_color_meta', true );
		$footer_top_border_color     = get_post_meta( $page_id, 'mkdf_footer_top_border_color_meta', true );
		$footer_top_border_width     = get_post_meta( $page_id, 'mkdf_footer_top_border_width_meta', true );
		
		if ( ! empty( $footer_top_background_color ) ) {
			$footer_top_styles['background-color'] = $footer_top_background_color;
		}
		
		if ( ! empty( $footer_top_border_color ) ) {
			$footer_top_styles['border-color'] = $footer_top_border_color;
			
			if ( $footer_top_border_width === '' ) {
				$footer_top_styles['border-width'] = '1px';
			}
		}
		
		if ( $footer_top_border_width !== '' ) {
			$footer_top_styles['border-width'] = wanderland_mikado_filter_px( $footer_top_border_width ) . 'px';
		}
		
		if ( ! empty( $footer_top_styles ) ) {
			$current_style .= wanderland_mikado_dynamic_css( $footer_top_selector, $footer_top_styles );
		}
		
		/***** footer top style - end *****/

		/***** footer middle style - begin *****/

		$footer_middle_selector         = $class_prefix . ' .mkdf-page-footer .mkdf-footer-middle-holder';
		$footer_middle_background_color = get_post_meta( $page_id, 'mkdf_footer_middle_background_color_meta', true );

		if ( ! empty( $footer_middle_background_color ) ) {
			$current_style .= wanderland_mikado_dynamic_css( $footer_middle_selector, array( 'background-color' => $footer_middle_background_color ) );
		}

		/***** footer middle style - end *****/
		
		/***** footer bottom style - begin *****/
		
		$footer_bottom_styles   = array();
		$footer_bottom_selector = $class_prefix . ' .mkdf-page-footer .mkdf-footer-bottom-holder';
		
		$footer_bottom_background_color = get_post_meta( $page_id, 'mkdf_footer_bottom_background_color_meta', true );
		$footer_bottom_border_color     = get_post_meta( $page_id, 'mkdf_footer_bottom_border_color_meta', true );
		$footer_bottom_border_width     = get_post_meta( $page_id, 'mkdf_footer_bottom_border_width_meta', true );
		
		if ( ! empty( $footer_bottom_background_color ) ) {
			$footer_bottom_styles['background-color'] = $footer_bottom_background_color;
		}
		
		if ( ! empty( $footer_bottom_border_color ) ) {
			$footer_bottom_styles['border-color'] = $footer_bottom_border_color;
			
			if ( $footer_bottom_border_width === '' ) {
				$footer_bottom_styles['border-width'] = '1px';
			}
		}
		
		if ( $footer_bottom_border_width !== '' ) {
			$footer_bottom_styles['border-width'] = wanderland_mikado_filter_px( $footer_bottom_border_width ) . 'px';
		}
		
		if ( ! empty( $footer_bottom_styles ) ) {
			$current_style .= wanderland_mikado_dynamic_css( $footer_bottom_selector, $footer_bottom_styles );
		}
		
		/***** footer bottom style - end *****/
		
		$current_style = $current_style . $style;
		
		return $current_style;
	}
	
	add_filter( 'wanderland_mikado_filter_add_page_custom_style', 'wanderland_mikado_footer_holder_style' );
}