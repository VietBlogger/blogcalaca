<?php
/*
Plugin Name: Wanderland Twitter Feed
Description: Plugin that adds Twitter feed functionality to our theme
Author: Mikado Themes
Version: 1.0
*/

define( 'WANDERLAND_TWITTER_FEED_VERSION', '1.0' );
define( 'WANDERLAND_TWITTER_ABS_PATH', dirname( __FILE__ ) );
define( 'WANDERLAND_TWITTER_REL_PATH', dirname( plugin_basename( __FILE__ ) ) );
define( 'WANDERLAND_TWITTER_URL_PATH', plugin_dir_url( __FILE__ ) );
define( 'WANDERLAND_TWITTER_ASSETS_PATH', WANDERLAND_TWITTER_ABS_PATH . '/assets' );
define( 'WANDERLAND_TWITTER_ASSETS_URL_PATH', WANDERLAND_TWITTER_URL_PATH . 'assets' );
define( 'WANDERLAND_TWITTER_SHORTCODES_PATH', WANDERLAND_TWITTER_ABS_PATH . '/shortcodes' );
define( 'WANDERLAND_TWITTER_SHORTCODES_URL_PATH', WANDERLAND_TWITTER_URL_PATH . 'shortcodes' );

include_once 'load.php';

if ( ! function_exists( 'wanderland_twitter_theme_installed' ) ) {
	/**
	 * Checks whether theme is installed or not
	 * @return bool
	 */
	function wanderland_twitter_theme_installed() {
		return defined( 'WANDERLAND_MIKADO_ROOT' );
	}
}

if ( ! function_exists( 'wanderland_twitter_feed_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function wanderland_twitter_feed_text_domain() {
		load_plugin_textdomain( 'wanderland-twitter-feed', false, WANDERLAND_TWITTER_REL_PATH . '/languages' );
	}
	
	add_action( 'plugins_loaded', 'wanderland_twitter_feed_text_domain' );
}