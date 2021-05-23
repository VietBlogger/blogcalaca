<?php

if ( ! function_exists( 'wanderland_mikado_content_responsive_styles' ) ) {
	/**
	 * Generates content responsive custom styles
	 */
	function wanderland_mikado_content_responsive_styles() {
		$content_style = array();
		
		$padding_mobile = wanderland_mikado_options()->getOptionValue( 'content_padding_mobile' );
		if ( $padding_mobile !== '' ) {
			$content_style['padding'] = $padding_mobile;
		}
		
		$content_selector = array(
			'.mkdf-content .mkdf-content-inner > .mkdf-container > .mkdf-container-inner',
			'.mkdf-content .mkdf-content-inner > .mkdf-full-width > .mkdf-full-width-inner',
		);
		
		echo wanderland_mikado_dynamic_css( $content_selector, $content_style );
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_1024', 'wanderland_mikado_content_responsive_styles' );
}

if ( ! function_exists( 'wanderland_mikado_h1_responsive_styles3' ) ) {
	function wanderland_mikado_h1_responsive_styles3() {
		$selector = array(
			'h1'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h1_responsive', '_3' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_768_1024', 'wanderland_mikado_h1_responsive_styles3' );
}

if ( ! function_exists( 'wanderland_mikado_h2_responsive_styles3' ) ) {
	function wanderland_mikado_h2_responsive_styles3() {
		$selector = array(
			'h2'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h2_responsive', '_3' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_768_1024', 'wanderland_mikado_h2_responsive_styles3' );
}

if ( ! function_exists( 'wanderland_mikado_h3_responsive_styles3' ) ) {
	function wanderland_mikado_h3_responsive_styles3() {
		$selector = array(
			'h3'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h3_responsive', '_3' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_768_1024', 'wanderland_mikado_h3_responsive_styles3' );
}

if ( ! function_exists( 'wanderland_mikado_h4_responsive_styles3' ) ) {
	function wanderland_mikado_h4_responsive_styles3() {
		$selector = array(
			'h4'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h4_responsive', '_3' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_768_1024', 'wanderland_mikado_h4_responsive_styles3' );
}

if ( ! function_exists( 'wanderland_mikado_h5_responsive_styles3' ) ) {
	function wanderland_mikado_h5_responsive_styles3() {
		$selector = array(
			'h5'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h5_responsive', '_3' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_768_1024', 'wanderland_mikado_h5_responsive_styles3' );
}

if ( ! function_exists( 'wanderland_mikado_h6_responsive_styles3' ) ) {
	function wanderland_mikado_h6_responsive_styles3() {
		$selector = array(
			'h6'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h6_responsive', '_3' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_768_1024', 'wanderland_mikado_h6_responsive_styles3' );
}

if ( ! function_exists( 'wanderland_mikado_h1_responsive_styles' ) ) {
	function wanderland_mikado_h1_responsive_styles() {
		$selector = array(
			'h1'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h1_responsive' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680_768', 'wanderland_mikado_h1_responsive_styles' );
}

if ( ! function_exists( 'wanderland_mikado_h2_responsive_styles' ) ) {
	function wanderland_mikado_h2_responsive_styles() {
		$selector = array(
			'h2'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h2_responsive' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680_768', 'wanderland_mikado_h2_responsive_styles' );
}

if ( ! function_exists( 'wanderland_mikado_h3_responsive_styles' ) ) {
	function wanderland_mikado_h3_responsive_styles() {
		$selector = array(
			'h3'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h3_responsive' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680_768', 'wanderland_mikado_h3_responsive_styles' );
}

if ( ! function_exists( 'wanderland_mikado_h4_responsive_styles' ) ) {
	function wanderland_mikado_h4_responsive_styles() {
		$selector = array(
			'h4'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h4_responsive' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680_768', 'wanderland_mikado_h4_responsive_styles' );
}

if ( ! function_exists( 'wanderland_mikado_h5_responsive_styles' ) ) {
	function wanderland_mikado_h5_responsive_styles() {
		$selector = array(
			'h5'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h5_responsive' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680_768', 'wanderland_mikado_h5_responsive_styles' );
}

if ( ! function_exists( 'wanderland_mikado_h6_responsive_styles' ) ) {
	function wanderland_mikado_h6_responsive_styles() {
		$selector = array(
			'h6'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h6_responsive' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680_768', 'wanderland_mikado_h6_responsive_styles' );
}

if ( ! function_exists( 'wanderland_mikado_text_responsive_styles' ) ) {
	function wanderland_mikado_text_responsive_styles() {
		$selector = array(
			'body',
			'p'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'text', '_res1' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680_768', 'wanderland_mikado_text_responsive_styles' );
}

if ( ! function_exists( 'wanderland_mikado_h1_responsive_styles2' ) ) {
	function wanderland_mikado_h1_responsive_styles2() {
		$selector = array(
			'h1'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h1_responsive', '_2' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680', 'wanderland_mikado_h1_responsive_styles2' );
}

if ( ! function_exists( 'wanderland_mikado_h2_responsive_styles2' ) ) {
	function wanderland_mikado_h2_responsive_styles2() {
		$selector = array(
			'h2'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h2_responsive', '_2' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680', 'wanderland_mikado_h2_responsive_styles2' );
}

if ( ! function_exists( 'wanderland_mikado_h3_responsive_styles2' ) ) {
	function wanderland_mikado_h3_responsive_styles2() {
		$selector = array(
			'h3'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h3_responsive', '_2' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680', 'wanderland_mikado_h3_responsive_styles2' );
}

if ( ! function_exists( 'wanderland_mikado_h4_responsive_styles2' ) ) {
	function wanderland_mikado_h4_responsive_styles2() {
		$selector = array(
			'h4'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h4_responsive', '_2' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680', 'wanderland_mikado_h4_responsive_styles2' );
}

if ( ! function_exists( 'wanderland_mikado_h5_responsive_styles2' ) ) {
	function wanderland_mikado_h5_responsive_styles2() {
		$selector = array(
			'h5'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h5_responsive', '_2' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680', 'wanderland_mikado_h5_responsive_styles2' );
}

if ( ! function_exists( 'wanderland_mikado_h6_responsive_styles2' ) ) {
	function wanderland_mikado_h6_responsive_styles2() {
		$selector = array(
			'h6'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'h6_responsive', '_2' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680', 'wanderland_mikado_h6_responsive_styles2' );
}

if ( ! function_exists( 'wanderland_mikado_text_responsive_styles2' ) ) {
	function wanderland_mikado_text_responsive_styles2() {
		$selector = array(
			'body',
			'p'
		);
		
		$styles = wanderland_mikado_get_responsive_typography_styles( 'text', '_res2' );
		
		if ( ! empty( $styles ) ) {
			echo wanderland_mikado_dynamic_css( $selector, $styles );
		}
	}
	
	add_action( 'wanderland_mikado_action_style_dynamic_responsive_680', 'wanderland_mikado_text_responsive_styles2' );
}