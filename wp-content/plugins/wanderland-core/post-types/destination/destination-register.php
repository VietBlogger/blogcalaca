<?php

namespace WanderlandCore\CPT\Destination;

use WanderlandCore\Lib\PostTypeInterface;

/**
 * Class DestinationRegister
 * @package WanderlandCore\CPT\Destination
 */
class DestinationRegister implements PostTypeInterface {
	private $base;
	private $taxBase;
	private $tagBase;
	
	public function __construct() {
		$this->base    = 'destination-item';
		$this->taxBase = 'destination-category';
		$this->tagBase = 'destination-tag';
		
		add_filter( 'archive_template', array( $this, 'registerArchiveTemplate' ) );
		add_filter( 'single_template', array( $this, 'registerSingleTemplate' ) );
	}
	
	/**
	 * @return string
	 */
	public function getBase() {
		return $this->base;
	}
	
	/**
	 * Registers custom post type with WordPress
	 */
	public function register() {
		$this->registerPostType();
		$this->registerTax();
		$this->registerTagTax();
	}
	
	/**
	 * Registers destination archive template if one does'nt exists in theme.
	 * Hooked to archive_template filter
	 *
	 * @param $archive string current template
	 *
	 * @return string string changed template
	 */
	public function registerArchiveTemplate( $archive ) {
		global $post;
		
		if ( ! empty( $post ) && $post->post_type == $this->base ) {
			if ( ! file_exists( get_template_directory() . '/archive-' . $this->base . '.php' ) ) {
				return WANDERLAND_CORE_CPT_PATH . '/destination/templates/archive-' . $this->base . '.php';
			}
		}
		
		return $archive;
	}
	
	/**
	 * Registers destination single template if one does'nt exists in theme.
	 * Hooked to single_template filter
	 *
	 * @param $single string current template
	 *
	 * @return string string changed template
	 */
	public function registerSingleTemplate( $single ) {
		global $post;
		
		if ( ! empty( $post ) && $post->post_type == $this->base ) {
			if ( ! file_exists( get_template_directory() . '/single-destination-item.php' ) ) {
				return WANDERLAND_CORE_CPT_PATH . '/destination/templates/single-' . $this->base . '.php';
			}
		}
		
		return $single;
	}
	
	/**
	 * Registers custom post type with WordPress
	 */
	private function registerPostType() {
		$menuPosition = 5;
		$menuIcon     = 'dashicons-screenoptions';
		$slug         = $this->base;
		
		if ( wanderland_core_theme_installed() ) {
			if ( wanderland_mikado_options()->getOptionValue( 'destination_single_slug' ) ) {
				$slug = wanderland_mikado_options()->getOptionValue( 'destination_single_slug' );
			}
		}
		
		register_post_type( $this->base,
			array(
				'labels'        => array(
					'name'          => esc_html__( 'Wanderland Destination', 'wanderland-core' ),
					'singular_name' => esc_html__( 'Destination Item', 'wanderland-core' ),
					'add_item'      => esc_html__( 'New Destination Item', 'wanderland-core' ),
					'add_new_item'  => esc_html__( 'Add New Destination Item', 'wanderland-core' ),
					'edit_item'     => esc_html__( 'Edit Destination Item', 'wanderland-core' )
				),
				'public'        => true,
				'has_archive'   => true,
				'rewrite'       => array( 'slug' => $slug ),
				'menu_position' => $menuPosition,
				'show_ui'       => true,
				'supports'      => array(
					'author',
					'title',
					'editor',
					'thumbnail',
					'excerpt',
					'page-attributes',
					'comments'
				),
				'menu_icon'     => $menuIcon
			)
		);
	}
	
	/**
	 * Registers custom taxonomy with WordPress
	 */
	private function registerTax() {
		$labels = array(
			'name'              => esc_html__( 'Destination Categories', 'wanderland-core' ),
			'singular_name'     => esc_html__( 'Destination Category', 'wanderland-core' ),
			'search_items'      => esc_html__( 'Search Destination Categories', 'wanderland-core' ),
			'all_items'         => esc_html__( 'All Destination Categories', 'wanderland-core' ),
			'parent_item'       => esc_html__( 'Parent Destination Category', 'wanderland-core' ),
			'parent_item_colon' => esc_html__( 'Parent Destination Category:', 'wanderland-core' ),
			'edit_item'         => esc_html__( 'Edit Destination Category', 'wanderland-core' ),
			'update_item'       => esc_html__( 'Update Destination Category', 'wanderland-core' ),
			'add_new_item'      => esc_html__( 'Add New Destination Category', 'wanderland-core' ),
			'new_item_name'     => esc_html__( 'New Destination Category Name', 'wanderland-core' ),
			'menu_name'         => esc_html__( 'Destination Categories', 'wanderland-core' )
		);
		
		register_taxonomy( $this->taxBase, array( $this->base ), array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'query_var'         => true,
			'show_admin_column' => true,
			'rewrite'           => array( 'slug' => 'destination-category' )
		) );
	}
	
	/**
	 * Registers custom tag taxonomy with WordPress
	 */
	private function registerTagTax() {
		$labels = array(
			'name'              => esc_html__( 'Destination Tags', 'wanderland-core' ),
			'singular_name'     => esc_html__( 'Destination Tag', 'wanderland-core' ),
			'search_items'      => esc_html__( 'Search Destination Tags', 'wanderland-core' ),
			'all_items'         => esc_html__( 'All Destination Tags', 'wanderland-core' ),
			'parent_item'       => esc_html__( 'Parent Destination Tag', 'wanderland-core' ),
			'parent_item_colon' => esc_html__( 'Parent Destination Tags:', 'wanderland-core' ),
			'edit_item'         => esc_html__( 'Edit Destination Tag', 'wanderland-core' ),
			'update_item'       => esc_html__( 'Update Destination Tag', 'wanderland-core' ),
			'add_new_item'      => esc_html__( 'Add New Destination Tag', 'wanderland-core' ),
			'new_item_name'     => esc_html__( 'New Destination Tag Name', 'wanderland-core' ),
			'menu_name'         => esc_html__( 'Destination Tags', 'wanderland-core' )
		);
		
		register_taxonomy( $this->tagBase, array( $this->base ), array(
			'hierarchical'      => false,
			'labels'            => $labels,
			'show_ui'           => true,
			'query_var'         => true,
			'show_admin_column' => true,
			'rewrite'           => array( 'slug' => 'destination-tag' )
		) );
	}
}