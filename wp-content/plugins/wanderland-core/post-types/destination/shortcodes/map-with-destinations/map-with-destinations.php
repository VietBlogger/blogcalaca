<?php

namespace WanderlandCore\CPT\Shortcodes\MapWithDestinations;

use WanderlandCore\Lib;

class MapWithDestinations implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_map_with_destinations';
		
		// Destination selected items filter
		add_filter( 'vc_autocomplete_mkdf_map_with_destinations_selected_items_callback', array( &$this, 'destinationIdAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		// Destination selected items render
		add_filter( 'vc_autocomplete_mkdf_map_with_destinations_selected_items_render', array( &$this, 'destinationIdAutocompleteRender', ), 10, 1 ); // Render exact destination. Must return an array (label,value)
		
		//Portfolio category filter
		add_filter( 'vc_autocomplete_mkdf_map_with_destinations_category_callback', array( &$this, 'destinationCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Portfolio category render
		add_filter( 'vc_autocomplete_mkdf_map_with_destinations_category_render', array( &$this, 'destinationCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination tag filter
		add_filter( 'vc_autocomplete_mkdf_map_with_destinations_tag_callback', array( &$this, 'destinationTagAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination tag render
		add_filter( 'vc_autocomplete_mkdf_map_with_destinations_tag_render', array( &$this, 'destinationTagAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map( array(
					'name'     => esc_html__( 'Map With Destinations', 'wanderland-core' ),
					'base'     => $this->getBase(),
					'category' => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'     => 'icon-wpb-map-with-destinations extended-custom-icon',
					'params'   => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'map_height',
							'heading'     => esc_html__( 'Map Height', 'wanderland-core' ),
							'description' => esc_html__( 'Default value is 500px', 'wanderland-core' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'number_of_items',
							'heading'     => esc_html__( 'Number of Items', 'wanderland-core' ),
							'description' => esc_html__( 'Set number of items for your list. Enter -1 to show all.', 'wanderland-core' ),
							'value'       => '-1'
						),
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'selected_items',
							'heading'     => esc_html__( 'Show Only Items with Listed IDs', 'wanderland-core' ),
							'settings'    => array(
								'multiple'      => true,
								'sortable'      => true,
								'unique_values' => true
							),
							'description' => esc_html__( 'Delimit ID numbers by comma (leave empty for all)', 'wanderland-core' )
						),
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'category',
							'heading'     => esc_html__( 'By Category', 'wanderland-core' ),
							'value'       => ''
						),
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'tag',
							'heading'     => esc_html__( 'By Tag', 'wanderland-core' ),
							'value'       => ''
						),
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'map_height'      => '',
			'number_of_items' => '-1',
			'selected_items'  => '',
			'category'        => '',
			'tag'             => '',
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['map_styles'] = $this->getMapStyles( $params );
		$params['have_items'] = $this->checkIsItemsExist();
		$params['maps_args']  = $this->setMapArgs( $params );
		
		$html = wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'map-with-destinations', 'holder', '', $params, array(), false );
		
		return $html;
	}
	
	private function setMapArgs( $params ) {
		$args = array(
			'posts_per_page' => $params['number_of_items'],
			'order'          => 'DESC',
		);
		
		$items_ids = null;
		if ( ! empty( $params['selected_items'] ) ) {
			$items_ids        = explode( ',', $params['selected_items'] );
			$args['post__in'] = $items_ids;
		}
		
		// Taxonomy query values
		if ( ! empty( $params['category'] ) || ! empty( $params['location'] ) || ! empty( $params['tag'] ) || ! empty( $params['amenity'] ) ) {
			$tax_query = array();
			
			if ( ! empty( $params['category'] ) ) {
				$tax_query[] = array(
					'taxonomy' => 'destination-category',
					'terms'    => $params['category']
				);
			}
			
			if ( ! empty( $params['tag'] ) ) {
				$tax_query[] = array(
					'taxonomy' => 'destination-tag',
					'terms'    => $params['tag']
				);
			}
			
			$args['tax_query'] = $tax_query;
		}
		
		// Custom meta query args
		$order_by   = 'date';
		$query_args = array( 'relation' => 'AND' );

		$args['orderby'] = $order_by;
		
		$args['meta_query'] = $query_args;
		
		if ( ! empty( $params['next_page'] ) ) {
			$args['paged'] = $params['next_page'];
		} else {
			$args['paged'] = 1;
		}
		
		return $args;
	}
	
	private function getMapStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['map_height'] ) ) {
			$styles[] = 'height: ' . wanderland_mikado_filter_px( $params['map_height'] ) . 'px';
		}
		
		return implode( ';', $styles );
	}
	
	private function checkIsItemsExist() {

        $items      = array();
        $query_args = array(
            'post_status'    => 'publish',
            'post_type'      => 'destination-item',
            'posts_per_page' => '-1',
            'fields'         => 'ids'
        );

        if ( ! empty( $args ) ) {
            foreach ( $args as $key => $value ) {
                if ( ! empty( $value ) ) {
                    $query_args[ $key ] = $value;
                }
            }
        }

        $cpt_items = new \WP_Query( $query_args );

        if ( $cpt_items->have_posts() ) {

            foreach ( $cpt_items->posts as $id ):
                $items[ $id ] = get_the_title( $id );
            endforeach;
        }

        wp_reset_postdata();
		
		return ! empty( $items );
	}
	
	/**
	 * Filter destination items by ID or Title
	 *
	 * @param $query
	 *
	 * @return array
	 */
	public function destinationIdAutocompleteSuggester( $query ) {
		global $wpdb;
		$destination_id      = (int) $query;
		$post_meta_infos = $wpdb->get_results( $wpdb->prepare( "SELECT ID AS id, post_title AS title
					FROM {$wpdb->posts} 
					WHERE post_type = 'destination-item' AND ( ID = '%d' OR post_title LIKE '%%%s%%' )", $destination_id > 0 ? $destination_id : - 1, stripslashes( $query ), stripslashes( $query ) ), ARRAY_A );
		
		$results = array();
		if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
			foreach ( $post_meta_infos as $value ) {
				$data          = array();
				$data['value'] = $value['id'];
				$data['label'] = esc_html__( 'Id', 'wanderland-core' ) . ': ' . $value['id'] . ( ( strlen( $value['title'] ) > 0 ) ? ' - ' . esc_html__( 'Title', 'wanderland-core' ) . ': ' . $value['title'] : '' );
				$results[]     = $data;
			}
		}
		
		return $results;
	}
	
	/**
	 * Find destination by id
	 * @since 4.4
	 *
	 * @param $query
	 *
	 * @return bool|array
	 */
	public function destinationIdAutocompleteRender( $query ) {
		$query = trim( $query['value'] ); // get value from requested
		if ( ! empty( $query ) ) {
			// get destination
			$destination = get_post( (int) $query );
			if ( ! is_wp_error( $destination ) ) {
				
				$destination_id    = $destination->ID;
				$destination_title = $destination->post_title;
				
				$destination_title_display = '';
				if ( ! empty( $destination_title ) ) {
					$destination_title_display = ' - ' . esc_html__( 'Title', 'wanderland-core' ) . ': ' . $destination_title;
				}
				
				$destination_id_display = esc_html__( 'Id', 'wanderland-core' ) . ': ' . $destination_id;
				
				$data          = array();
				$data['value'] = $destination_id;
				$data['label'] = $destination_id_display . $destination_title_display;
				
				return ! empty( $data ) ? $data : false;
			}
			
			return false;
		}
		
		return false;
	}
	
	/**
	 * Filter destination categories
	 *
	 * @param $query
	 *
	 * @return array
	 */
	public function destinationCategoryAutocompleteSuggester( $query ) {
		global $wpdb;
		$post_meta_infos = $wpdb->get_results( $wpdb->prepare( "SELECT a.slug AS slug, a.name AS destination_category_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'destination-category' AND a.name LIKE '%%%s%%'", stripslashes( $query ) ), ARRAY_A );
		
		$results = array();
		if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
			foreach ( $post_meta_infos as $value ) {
				$data          = array();
				$data['value'] = $value['slug'];
				$data['label'] = ( ( strlen( $value['destination_category_title'] ) > 0 ) ? esc_html__( 'Category', 'wanderland-core' ) . ': ' . $value['destination_category_title'] : '' );
				$results[]     = $data;
			}
		}
		
		return $results;
	}
	
	/**
	 * Find destination category by slug
	 * @since 4.4
	 *
	 * @param $query
	 *
	 * @return bool|array
	 */
	public function destinationCategoryAutocompleteRender( $query ) {
		$query = trim( $query['value'] ); // get value from requested
		if ( ! empty( $query ) ) {
			// get destination category
			$destination_category = get_term_by( 'slug', $query, 'destination-category' );
			if ( is_object( $destination_category ) ) {
				
				$destination_category_slug  = $destination_category->slug;
				$destination_category_title = $destination_category->name;
				
				$destination_category_title_display = '';
				if ( ! empty( $destination_category_title ) ) {
					$destination_category_title_display = esc_html__( 'Category', 'wanderland-core' ) . ': ' . $destination_category_title;
				}
				
				$data          = array();
				$data['value'] = $destination_category_slug;
				$data['label'] = $destination_category_title_display;
				
				return ! empty( $data ) ? $data : false;
			}
			
			return false;
		}
		
		return false;
	}
	
	/**
	 * Filter destination tags
	 *
	 * @param $query
	 *
	 * @return array
	 */
	public function destinationTagAutocompleteSuggester( $query ) {
		global $wpdb;
		$post_meta_infos = $wpdb->get_results( $wpdb->prepare( "SELECT a.slug AS slug, a.name AS destination_tag_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'destination-tag' AND a.name LIKE '%%%s%%'", stripslashes( $query ) ), ARRAY_A );
		
		$results = array();
		if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
			foreach ( $post_meta_infos as $value ) {
				$data          = array();
				$data['value'] = $value['slug'];
				$data['label'] = ( ( strlen( $value['destination_tag_title'] ) > 0 ) ? esc_html__( 'Tag', 'wanderland-core' ) . ': ' . $value['destination_tag_title'] : '' );
				$results[]     = $data;
			}
		}
		
		return $results;
	}
	
	/**
	 * Find destination tag by slug
	 * @since 4.4
	 *
	 * @param $query
	 *
	 * @return bool|array
	 */
	public function destinationTagAutocompleteRender( $query ) {
		$query = trim( $query['value'] ); // get value from requested
		if ( ! empty( $query ) ) {
			// get destination category
			$destination_tag = get_term_by( 'slug', $query, 'destination-tag' );
			if ( is_object( $destination_tag ) ) {
				
				$destination_tag_slug  = $destination_tag->slug;
				$destination_tag_title = $destination_tag->name;
				
				$destination_tag_title_display = '';
				if ( ! empty( $destination_tag_title ) ) {
					$destination_tag_title_display = esc_html__( 'Tag', 'wanderland-core' ) . ': ' . $destination_tag_title;
				}
				
				$data          = array();
				$data['value'] = $destination_tag_slug;
				$data['label'] = $destination_tag_title_display;
				
				return ! empty( $data ) ? $data : false;
			}
			
			return false;
		}
		
		return false;
	}
}
