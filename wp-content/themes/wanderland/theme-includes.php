<?php

//define constants
define( 'WANDERLAND_MIKADO_ROOT', get_template_directory_uri() );
define( 'WANDERLAND_MIKADO_ROOT_DIR', get_template_directory() );
define( 'WANDERLAND_MIKADO_ASSETS_ROOT', WANDERLAND_MIKADO_ROOT . '/assets' );
define( 'WANDERLAND_MIKADO_ASSETS_ROOT_DIR', WANDERLAND_MIKADO_ROOT_DIR . '/assets' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_ROOT', WANDERLAND_MIKADO_ROOT . '/framework' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_ROOT_DIR', WANDERLAND_MIKADO_ROOT_DIR . '/framework' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_ADMIN_ASSETS_ROOT', WANDERLAND_MIKADO_ROOT . '/framework/admin/assets' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_ICONS_ROOT', WANDERLAND_MIKADO_ROOT . '/framework/lib/icons-pack' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_ICONS_ROOT_DIR', WANDERLAND_MIKADO_ROOT_DIR . '/framework/lib/icons-pack' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_MODULES_ROOT', WANDERLAND_MIKADO_ROOT . '/framework/modules' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_MODULES_ROOT_DIR', WANDERLAND_MIKADO_ROOT_DIR . '/framework/modules' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_HEADER_ROOT', WANDERLAND_MIKADO_ROOT . '/framework/modules/header' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_HEADER_ROOT_DIR', WANDERLAND_MIKADO_ROOT_DIR . '/framework/modules/header' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_HEADER_TYPES_ROOT', WANDERLAND_MIKADO_ROOT . '/framework/modules/header/types' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_HEADER_TYPES_ROOT_DIR', WANDERLAND_MIKADO_ROOT_DIR . '/framework/modules/header/types' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_SEARCH_ROOT', WANDERLAND_MIKADO_ROOT . '/framework/modules/search' );
define( 'WANDERLAND_MIKADO_FRAMEWORK_SEARCH_ROOT_DIR', WANDERLAND_MIKADO_ROOT_DIR . '/framework/modules/search' );
define( 'WANDERLAND_MIKADO_THEME_ENV', 'false' );
define( 'WANDERLAND_MIKADO_PROFILE_SLUG', 'mikado' );
define( 'WANDERLAND_MIKADO_OPTIONS_SLUG', 'wanderland_mikado_theme_menu');

//include necessary files
include_once WANDERLAND_MIKADO_ROOT_DIR . '/framework/mkdf-framework.php';
include_once WANDERLAND_MIKADO_ROOT_DIR . '/includes/nav-menu/mkdf-menu.php';
require_once WANDERLAND_MIKADO_ROOT_DIR . '/includes/plugins/class-tgm-plugin-activation.php';
include_once WANDERLAND_MIKADO_ROOT_DIR . '/includes/plugins/plugins-activation.php';
include_once WANDERLAND_MIKADO_ROOT_DIR . '/assets/custom-styles/general-custom-styles.php';
include_once WANDERLAND_MIKADO_ROOT_DIR . '/assets/custom-styles/general-custom-styles-responsive.php';

if ( file_exists( WANDERLAND_MIKADO_ROOT_DIR . '/export' ) ) {
	include_once WANDERLAND_MIKADO_ROOT_DIR . '/export/export.php';
}

if ( ! is_admin() ) {
	include_once WANDERLAND_MIKADO_ROOT_DIR . '/includes/mkdf-body-class-functions.php';
	include_once WANDERLAND_MIKADO_ROOT_DIR . '/includes/mkdf-loading-spinners.php';
}