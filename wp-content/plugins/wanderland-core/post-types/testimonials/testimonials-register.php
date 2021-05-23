<?php

namespace WanderlandCore\CPT\Testimonials;

use WanderlandCore\Lib;

/**
 * Class TestimonialsRegister
 * @package WanderlandCore\CPT\Testimonials
 */
class TestimonialsRegister implements Lib\PostTypeInterface {
	private $base;
	
	public function __construct() {
		$this->base    = 'testimonials';
		$this->taxBase = 'testimonials-category';
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
	}
	
	/**
	 * Regsiters custom post type with WordPress
	 */
	private function registerPostType() {
		$menuPosition = 5;
		$menuIcon     = 'dashicons-format-quote';
		
		register_post_type( 'testimonials',
			array(
				'labels'        => array(
					'menu_name'     => esc_html__( 'Wanderland Testimonials', 'wanderland-core' ),
					'name'          => esc_html__( 'Testimonials', 'wanderland-core' ),
					'singular_name' => esc_html__( 'Testimonial', 'wanderland-core' ),
					'add_item'      => esc_html__( 'New Testimonial', 'wanderland-core' ),
					'add_new_item'  => esc_html__( 'Add New Testimonial', 'wanderland-core' ),
					'edit_item'     => esc_html__( 'Edit Testimonial', 'wanderland-core' )
				),
				'public'        => false,
				'show_in_menu'  => true,
				'rewrite'       => array( 'slug' => 'testimonials' ),
				'menu_position' => $menuPosition,
				'show_ui'       => true,
				'has_archive'   => false,
				'hierarchical'  => false,
				'supports'      => array( 'title', 'thumbnail' ),
				'menu_icon'     => $menuIcon
			)
		);
	}
	
	/**
	 * Registers custom taxonomy with WordPress
	 */
	private function registerTax() {
		$labels = array(
			'name'              => esc_html__( 'Testimonials Categories', 'wanderland-core' ),
			'singular_name'     => esc_html__( 'Testimonial Category', 'wanderland-core' ),
			'search_items'      => esc_html__( 'Search Testimonials Categories', 'wanderland-core' ),
			'all_items'         => esc_html__( 'All Testimonials Categories', 'wanderland-core' ),
			'parent_item'       => esc_html__( 'Parent Testimonial Category', 'wanderland-core' ),
			'parent_item_colon' => esc_html__( 'Parent Testimonial Category:', 'wanderland-core' ),
			'edit_item'         => esc_html__( 'Edit Testimonials Category', 'wanderland-core' ),
			'update_item'       => esc_html__( 'Update Testimonials Category', 'wanderland-core' ),
			'add_new_item'      => esc_html__( 'Add New Testimonials Category', 'wanderland-core' ),
			'new_item_name'     => esc_html__( 'New Testimonials Category Name', 'wanderland-core' ),
			'menu_name'         => esc_html__( 'Testimonials Categories', 'wanderland-core' )
		);
		
		register_taxonomy( $this->taxBase, array( $this->base ), array(
			'hierarchical'      => true,
			'labels'            => $labels,
			'show_ui'           => true,
			'query_var'         => true,
			'show_admin_column' => true,
			'rewrite'           => array( 'slug' => 'testimonials-category' )
		) );
	}
}