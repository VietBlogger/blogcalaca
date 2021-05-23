<?php

namespace WanderlandCore\CPT\Shortcodes\BlogListWithDestinations;

use WanderlandCore\Lib;

class BlogListWithDestinations implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_blog_list_with_destinations';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
		
		add_filter( 'vc_autocomplete_mkdf_blog_list_with_destinations_post_category_callback', array( &$this, 'blogDestinationListCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		add_filter( 'vc_autocomplete_mkdf_blog_list_with_destinations_post_category_render', array( &$this, 'blogDestinationListCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
		add_filter( 'vc_autocomplete_mkdf_blog_list_with_destinations_destination_category_callback', array( &$this, 'destinationCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		add_filter( 'vc_autocomplete_mkdf_blog_list_with_destinations_destination_category_render', array( &$this, 'destinationCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map( array(
				        'name'     => esc_html__( 'Blog List With Destinations', 'wanderland-core' ),
				        'base'     => $this->getBase(),
				        'category' => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
				        'icon'     => 'icon-wpb-blog-list-with-destinations extended-custom-icon',
				        'params'   => array(
					        array(
						        'type'        => 'textfield',
						        'param_name'  => 'number_of_items',
						        'heading'     => esc_html__( 'Number of Items', 'wanderland-core' ),
						        'description' => esc_html__( 'Set total number of items within list. Enter -1 to show all.', 'wanderland-core' ),
						        'value'       => '-1'
					        ),
					        array(
						        'type'       => 'textfield',
						        'param_name' => 'item_height',
						        'heading'    => esc_html__( 'Item Height (px)', 'wanderland-core' )
					        ),
					        array(
						        'type'        => 'dropdown',
						        'param_name'  => 'space_between_items',
						        'heading'     => esc_html__( 'Space Between Items', 'wanderland-core' ),
						        'value'       => array_flip( wanderland_mikado_get_space_between_items_array() ),
						        'save_always' => true
					        ),
					        array(
						        'type'        => 'dropdown',
						        'param_name'  => 'orderby',
						        'heading'     => esc_html__( 'Order By', 'wanderland-core' ),
						        'description' => esc_html__('Note: defines only in which order destination and post items will appear, not the list structure/configuration'),
						        'value'       => array_flip( wanderland_mikado_get_query_order_by_array() ),
						        'save_always' => true
					        ),
					        array(
						        'type'        => 'dropdown',
						        'param_name'  => 'order',
						        'heading'     => esc_html__( 'Order', 'wanderland-core' ),
						        'description' => esc_html__('Note: defines only in which order destination and post items will appear, not the list structure/configuration'),
						        'value'       => array_flip( wanderland_mikado_get_query_order_array() ),
						        'save_always' => true
					        ),
					        array(
						        'type'        => 'autocomplete',
						        'param_name'  => 'post_category',
						        'heading'     => esc_html__( 'Posts Category', 'wanderland-core' ),
						        'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wanderland-core' )
					        ),
					        array(
						        'type'        => 'autocomplete',
						        'param_name'  => 'destination_category',
						        'heading'     => esc_html__( 'Destination Category', 'wanderland-core' ),
						        'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wanderland-core' )
					        ),
					        array(
						        'type'       => 'dropdown',
						        'param_name' => 'title_highlight',
						        'heading'    => esc_html__( 'Title Highlight', 'wanderland-core' ),
						        'value'      => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
						        'dependency' => array( 'element' => 'enable_title', 'value' => array( 'yes' ) ),
						        'group'      => esc_html__( 'Content Layout', 'wanderland-core' )
					        ),
				        )
			        )
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'number_of_items'          => '-1',
			'title_highlight'          => 'yes',
			'post_category'            => '',
			'destination_category'     => '',
			'orderby'                  => 'title',
			'order'                    => 'ASC',
			'item_height'              => '',
			'space_between_items'      => 'normal',
		);
		$params = shortcode_atts( $args, $atts );
		
		/***
		 * @params query_results
		 * @params holder_data
		 * @params holder_classes
		 * @params holder_inner_classes
		 */
		$additional_params = array();
		
		$query_array                        = $this->getQueryArray( $params );
		$query_results                      = new \WP_Query( $query_array );
		$posts_query_array                  = $this->getPostsQueryArray( $params );
		$posts_query_results                = new \WP_Query( $posts_query_array );
		
		//create new empty query and populate it with the other two
		//populate post_count count for the loop to work correctly
		$new_query = new \WP_Query();
		$new_query->post_count = $query_results->post_count + $posts_query_results->post_count;
		
		$dest_i = 0;
		$post_i = 0;
		for ($i=0; $i<$new_query->post_count; $i++) {
			if ($i%5==0) {
				$new_query->posts[$i] = $query_results->posts[$dest_i];
				$dest_i++;
			} else {
				$new_query->posts[$i] = $posts_query_results->posts[$post_i];
				$post_i++;
			}
		}
		
		$additional_params['query_results'] = $new_query;
		
		$params['this_object'] = $this;
		$params['article_styles'] = $this->getArticleStyles($params);
		$additional_params['holder_classes']       = $this->getHolderClasses( $params, $args );
		
		$html = wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'blog-list-with-destinations', 'blog-list-with-destinations-holder', '', $params, $additional_params );
		
		return $html;
	}
	
	public function getQueryArray( $params ) {
		if($params['number_of_items'] === '-1') {
			$number_of_destination_items = $params['number_of_items'];
		} else {
			$number_of_destination_items = intdiv(($params['number_of_items'] - 1), 5) + 1;
		}
		$query_array = array(
			'post_status'    => 'publish',
			'post_type'      => 'destination-item',
			'posts_per_page' => $number_of_destination_items,
			'orderby'        => $params['orderby'],
			'order'          => $params['order'],
		);
		
		if ( ! empty( $params['destination_category'] ) ) {
			$query_array['destination-category'] = $params['destination_category'];
		}
		
		return $query_array;
	}
	
	public function getPostsQueryArray( $params ) {
		if($params['number_of_items'] === '-1') {
			$number_of_posts = $params['number_of_items'];
		} else {
			$number_of_destination_items = intdiv(($params['number_of_items'] - 1), 5) + 1;
			$number_of_posts = $params['number_of_items'] - $number_of_destination_items;
		}
		$query_array = array(
			'post_status'    => 'publish',
			'post_type'      => 'post',
			'posts_per_page' => $number_of_posts,
			'orderby'        => $params['orderby'],
			'order'          => $params['order'],
			'post__not_in'   => get_option( 'sticky_posts' )
		);
		
		if ( ! empty( $params['post_category'] ) ) {
			$query_array['category_name'] = $params['post_category'];
		}
		
		return $query_array;
	}
	
	public function getHolderClasses( $params, $args ) {
		$classes = array();
		
		$classes[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : 'mkdf-' . $args['space_between_items'] . '-space';
		
		return implode( ' ', $classes );
	}
	
	private function getArticleStyles($params) {
		$styles = array();
		
		if ( ! empty( $params['item_height'] ) ) {
			$styles[] = 'height: ' . wanderland_mikado_filter_px( $params['item_height'] ) . 'px';
		}
		
		return implode( ';', $styles );
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
	 * Filter blog categories
	 *
	 * @param $query
	 *
	 * @return array
	 */
	public function blogDestinationListCategoryAutocompleteSuggester( $query ) {
		global $wpdb;
		$post_meta_infos       = $wpdb->get_results( $wpdb->prepare( "SELECT a.slug AS slug, a.name AS category_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'category' AND a.name LIKE '%%%s%%'", stripslashes( $query ) ), ARRAY_A );
		
		$results = array();
		if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
			foreach ( $post_meta_infos as $value ) {
				$data          = array();
				$data['value'] = $value['slug'];
				$data['label'] = ( ( strlen( $value['category_title'] ) > 0 ) ? esc_html__( 'Category', 'wanderland-core' ) . ': ' . $value['category_title'] : '' );
				$results[]     = $data;
			}
		}
		
		return $results;
	}
	
	/**
	 * Find blog category by slug
	 * @since 4.4
	 *
	 * @param $query
	 *
	 * @return bool|array
	 */
	public function blogDestinationListCategoryAutocompleteRender( $query ) {
		$query = trim( $query['value'] ); // get value from requested
		if ( ! empty( $query ) ) {
			// get portfolio category
			$category = get_term_by( 'slug', $query, 'category' );
			if ( is_object( $category ) ) {
				
				$category_slug = $category->slug;
				$category_title = $category->name;
				
				$category_title_display = '';
				if ( ! empty( $category_title ) ) {
					$category_title_display = esc_html__( 'Category', 'wanderland-core' ) . ': ' . $category_title;
				}
				
				$data          = array();
				$data['value'] = $category_slug;
				$data['label'] = $category_title_display;
				
				return ! empty( $data ) ? $data : false;
			}
			
			return false;
		}
		
		return false;
	}

}