<?php

if ( ! function_exists( 'wanderland_core_import_object' ) ) {
	function wanderland_core_import_object() {
		$wanderland_core_import_object = new WanderlandCoreImport();
	}
	
	add_action( 'init', 'wanderland_core_import_object' );
}

if ( ! function_exists( 'wanderland_core_data_import' ) ) {
	function wanderland_core_data_import() {
		$importObject = WanderlandCoreImport::getInstance();
		
		if ( $_POST['import_attachments'] == 1 ) {
			$importObject->attachments = true;
		} else {
			$importObject->attachments = false;
		}
		
		$folder = "wanderland/";
		if ( ! empty( $_POST['example'] ) ) {
			$folder = $_POST['example'] . "/";
		}
		
		$importObject->import_content( $folder . $_POST['xml'] );
		
		die();
	}
	
	add_action( 'wp_ajax_wanderland_core_action_import_content', 'wanderland_core_data_import' );
}

if ( ! function_exists( 'wanderland_core_widgets_import' ) ) {
	function wanderland_core_widgets_import() {
		$importObject = WanderlandCoreImport::getInstance();
		
		$folder = "wanderland/";
		if ( ! empty( $_POST['example'] ) ) {
			$folder = $_POST['example'] . "/";
		}
		
		$importObject->import_widgets( $folder . 'widgets.txt', $folder . 'custom_sidebars.txt' );
		
		die();
	}
	
	add_action( 'wp_ajax_wanderland_core_action_import_widgets', 'wanderland_core_widgets_import' );
}

if ( ! function_exists( 'wanderland_core_options_import' ) ) {
	function wanderland_core_options_import() {
		$importObject = WanderlandCoreImport::getInstance();
		
		$folder = "wanderland/";
		if ( ! empty( $_POST['example'] ) ) {
			$folder = $_POST['example'] . "/";
		}
		
		$importObject->import_options( $folder . 'options.txt' );
		
		die();
	}
	
	add_action( 'wp_ajax_wanderland_core_action_import_options', 'wanderland_core_options_import' );
}

if ( ! function_exists( 'wanderland_core_other_import' ) ) {
	function wanderland_core_other_import() {
		$importObject = WanderlandCoreImport::getInstance();
		
		$folder = "wanderland/";
		if ( ! empty( $_POST['example'] ) ) {
			$folder = $_POST['example'] . "/";
		}
		
		$importObject->import_options( $folder . 'options.txt' );
		$importObject->import_widgets( $folder . 'widgets.txt', $folder . 'custom_sidebars.txt' );
		$importObject->import_menus( $folder . 'menus.txt' );
		$importObject->import_settings_pages( $folder . 'settingpages.txt' );
		
		$importObject->mkdf_update_meta_fields_after_import( $folder );
		$importObject->mkdf_update_options_after_import( $folder );
		
		if ( wanderland_core_is_revolution_slider_installed() ) {
			$importObject->rev_slider_import( $folder );
		}
		
		die();
	}
	
	add_action( 'wp_ajax_wanderland_core_action_import_other_elements', 'wanderland_core_other_import' );
}