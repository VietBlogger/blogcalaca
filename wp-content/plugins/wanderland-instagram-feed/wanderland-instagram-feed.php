<?php
/*
Plugin Name: Wanderland Instagram Feed
Description: Plugin that adds Instagram feed functionality to our theme
Author: Mikado Themes
Version: 2.1
*/
define('WANDERLAND_INSTAGRAM_FEED_VERSION', '2.1');
define('WANDERLAND_INSTAGRAM_ABS_PATH', dirname(__FILE__));
define('WANDERLAND_INSTAGRAM_REL_PATH', dirname(plugin_basename(__FILE__ )));
define( 'WANDERLAND_INSTAGRAM_URL_PATH', plugin_dir_url( __FILE__ ) );
define( 'WANDERLAND_INSTAGRAM_ASSETS_PATH', WANDERLAND_INSTAGRAM_ABS_PATH . '/assets' );
define( 'WANDERLAND_INSTAGRAM_ASSETS_URL_PATH', WANDERLAND_INSTAGRAM_URL_PATH . 'assets' );
define( 'WANDERLAND_INSTAGRAM_SHORTCODES_PATH', WANDERLAND_INSTAGRAM_ABS_PATH . '/shortcodes' );
define( 'WANDERLAND_INSTAGRAM_SHORTCODES_URL_PATH', WANDERLAND_INSTAGRAM_URL_PATH . 'shortcodes' );

include_once 'load.php';

if ( ! function_exists( 'wanderland_instagram_theme_installed' ) ) {
    /**
     * Checks whether theme is installed or not
     * @return bool
     */
    function wanderland_instagram_theme_installed() {
        return defined( 'WANDERLAND_MIKADO_ROOT' );
    }
}

if ( ! function_exists( 'wanderland_instagram_feed_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function wanderland_instagram_feed_text_domain() {
		load_plugin_textdomain( 'wanderland-instagram-feed', false, WANDERLAND_INSTAGRAM_REL_PATH . '/languages' );
	}
	
	add_action( 'plugins_loaded', 'wanderland_instagram_feed_text_domain' );
}
