<?php

namespace WanderlandCore\CPT\Shortcodes\MasonryGallery;

use WanderlandCore\Lib;

class MasonryGallery implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_masonry_gallery';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
		
		//Masonry Gallery category filter
		add_filter( 'vc_autocomplete_mkdf_masonry_gallery_category_callback', array( &$this, 'masonryGalleryCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Masonry Gallery category render
		add_filter( 'vc_autocomplete_mkdf_masonry_gallery_category_render', array( &$this, 'masonryGalleryCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Masonry Gallery', 'wanderland-core' ),
					'base'                      => $this->base,
					'category'                  => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'                      => 'icon-wpb-masonry-gallery extended-custom-icon',
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'       => 'textfield',
							'param_name' => 'number_of_items',
							'heading'    => esc_html__( 'Number of Items', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'space_between_items',
							'heading'     => esc_html__( 'Space Between Items', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_space_between_items_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'category',
							'heading'     => esc_html__( 'Category', 'wanderland-core' ),
							'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'orderby',
							'heading'     => esc_html__( 'Order By', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_query_order_by_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'order',
							'heading'     => esc_html__( 'Order', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_query_order_array() ),
							'save_always' => true
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args = array(
			'number_of_items'     => - 1,
			'space_between_items' => 'normal',
			'category'            => '',
			'orderby'             => 'date',
			'order'               => 'ASC'
		);
		$params = shortcode_atts( $args, $atts );
		
		$query_array                         = $this->getQueryArray( $params );
		$query_results                       = new \WP_Query( $query_array );
		$additional_params['query_results']  = $query_results;
		$additional_params['holder_classes'] = $this->getHolderClasses( $params, $args );
		
		$params['this_object'] = $this;
		
		$html = wanderland_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'masonry-gallery-holder', '', $params, $additional_params );
		
		return $html;
	}
	
	private function getQueryArray( $params ) {
		$query_array = array(
			'post_status'    => 'publish',
			'post_type'      => 'masonry-gallery',
			'posts_per_page' => $params['number_of_items'],
			'orderby'        => $params['orderby'],
			'order'          => $params['order']
		);
		
		if ( ! empty( $params['category'] ) ) {
			$query_array['masonry-gallery-category'] = $params['category'];
		}
		
		return $query_array;
	}
	
	private function getHolderClasses( $params, $args ) {
		$classes = array();
		
		$classes[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : 'mkdf-' . $args['space_between_items'] . '-space';
		
		return implode( ' ', $classes );
	}
	
	public function getItemClasses() {
		$classes = array( 'mkdf-mg-item' );
		
		$itemID       = get_the_ID();
		$type         = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_type', true );
		$image_size   = get_post_meta( $itemID, 'mkdf_masonry_gallery_item_size', true );
		$content_skin = get_post_meta( $itemID, 'mkdf_masonry_gallery_content_skin', true );
		
		if ( ! empty( $type ) ) {
			$classes[] = 'mkdf-mg-' . $type;
		}
		
		if ( ! empty( $image_size ) ) {
			$classes[] = 'mkdf-masonry-size-' . $image_size;
		}
		
		if ( ! empty( $content_skin ) ) {
			$classes[] = 'mkdf-mg-skin-' . $content_skin;
		}
		
		return implode( ' ', $classes );
	}
	
	public function getItemImageStyles( $item_id ) {
		$styles = array();
		$image_url = wp_get_attachment_url( get_post_thumbnail_id( $item_id ) );
		
		if ( ! empty( $image_url ) ) {
			$styles[] = 'background-image: url(' . esc_url( $image_url ) . ')';
		}

		return implode( ';', $styles );
	}
	
	public function getItemCustomIcon( $item_id ) {
		$custom_icon = get_post_meta( $item_id, 'mkdf_masonry_gallery_custom_icon', true );
		$image_meta  = array();
		
		if ( ! empty( $custom_icon ) ) {
			$image_id = wanderland_mikado_get_attachment_id_from_url( $custom_icon );
			
			$image_meta['url'] = $custom_icon;
			$image_meta['alt'] = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
		}
		
		return $image_meta;
	}
	
	/**
	 * Filter masonry gallery categories
	 *
	 * @param $query
	 *
	 * @return array
	 */
	public function masonryGalleryCategoryAutocompleteSuggester( $query ) {
		global $wpdb;
		$post_meta_infos = $wpdb->get_results( $wpdb->prepare( "SELECT a.slug AS slug, a.name AS masonry_gallery_category_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'masonry-gallery-category' AND a.name LIKE '%%%s%%'", stripslashes( $query ) ), ARRAY_A );
		
		$results = array();
		if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
			foreach ( $post_meta_infos as $value ) {
				$data          = array();
				$data['value'] = $value['slug'];
				$data['label'] = ( ( strlen( $value['masonry_gallery_category_title'] ) > 0 ) ? esc_html__( 'Category', 'wanderland-core' ) . ': ' . $value['masonry_gallery_category_title'] : '' );
				$results[]     = $data;
			}
		}
		
		return $results;
	}
	
	/**
	 * Find masonry gallery category by slug
	 * @since 4.4
	 *
	 * @param $query
	 *
	 * @return bool|array
	 */
	public function masonryGalleryCategoryAutocompleteRender( $query ) {
		$query = trim( $query['value'] ); // get value from requested
		if ( ! empty( $query ) ) {
			// get portfolio category
			$masonry_gallery_category = get_term_by( 'slug', $query, 'masonry-gallery-category' );
			if ( is_object( $masonry_gallery_category ) ) {
				
				$masonry_gallery_category_slug  = $masonry_gallery_category->slug;
				$masonry_gallery_category_title = $masonry_gallery_category->name;
				
				$masonry_gallery_category_title_display = '';
				if ( ! empty( $masonry_gallery_category_title ) ) {
					$masonry_gallery_category_title_display = esc_html__( 'Category', 'wanderland-core' ) . ': ' . $masonry_gallery_category_title;
				}
				
				$data          = array();
				$data['value'] = $masonry_gallery_category_slug;
				$data['label'] = $masonry_gallery_category_title_display;
				
				return ! empty( $data ) ? $data : false;
			}
			
			return false;
		}
		
		return false;
	}
}