<?php

namespace WanderlandCore\CPT\Shortcodes\Destination;

use WanderlandCore\Lib;

class DestinationList implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_destination_list';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
		
		//Destination category filter
		add_filter( 'vc_autocomplete_mkdf_destination_list_category_callback', array( &$this, 'destinationCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination category render
		add_filter( 'vc_autocomplete_mkdf_destination_list_category_render', array( &$this, 'destinationCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination selected projects filter
		add_filter( 'vc_autocomplete_mkdf_destination_list_selected_projects_callback', array( &$this, 'destinationIdAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination selected projects render
		add_filter( 'vc_autocomplete_mkdf_destination_list_selected_projects_render', array( &$this, 'destinationIdAutocompleteRender', ), 10, 1 ); // Render exact destination. Must return an array (label,value)
		
		//Destination tag filter
		add_filter( 'vc_autocomplete_mkdf_destination_list_tag_callback', array( &$this, 'destinationTagAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination tag render
		add_filter( 'vc_autocomplete_mkdf_destination_list_tag_render', array( &$this, 'destinationTagAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map( array(
					'name'     => esc_html__( 'Destination List', 'wanderland-core' ),
					'base'     => $this->getBase(),
					'category' => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'     => 'icon-wpb-destination extended-custom-icon',
					'params'   => array(
						array(
							'type'        => 'dropdown',
							'param_name'  => 'number_of_columns',
							'heading'     => esc_html__( 'Number of Columns', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_number_of_columns_array( true ) ),
							'description' => esc_html__( 'Default value is Three', 'wanderland-core' ),
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'space_between_items',
							'heading'     => esc_html__( 'Space Between Items', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_space_between_items_array() ),
							'save_always' => true
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'number_of_items',
							'heading'     => esc_html__( 'Number of Destinations Per Page', 'wanderland-core' ),
							'description' => esc_html__( 'Set number of items for your destination list. Enter -1 to show all.', 'wanderland-core' ),
							'value'       => '-1'
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'image_proportions',
							'heading'     => esc_html__( 'Image Proportions', 'wanderland-core' ),
							'value'       => array(
								esc_html__( 'Original', 'wanderland-core' )  => 'full',
								esc_html__( 'Square', 'wanderland-core' )    => 'square',
								esc_html__( 'Landscape', 'wanderland-core' ) => 'landscape',
								esc_html__( 'Portrait', 'wanderland-core' )  => 'portrait',
								esc_html__( 'Medium', 'wanderland-core' )    => 'medium',
								esc_html__( 'Large', 'wanderland-core' )     => 'large',
								esc_html__( 'Custom', 'wanderland-core' )    => 'custom'
							),
							'description' => esc_html__( 'Set image proportions for your destination list.', 'wanderland-core' ),
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_image_width',
							'heading'     => esc_html__( 'Custom Image Width', 'wanderland-core' ),
							'description' => esc_html__( 'Enter image width in px', 'wanderland-core' ),
							'dependency'  => array( 'element' => 'image_proportions', 'value' => 'custom' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'custom_image_height',
							'heading'     => esc_html__( 'Custom Image Height', 'wanderland-core' ),
							'description' => esc_html__( 'Enter image height in px', 'wanderland-core' ),
							'dependency'  => array( 'element' => 'image_proportions', 'value' => 'custom' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_image_shadow',
							'heading'     => esc_html__( 'Enable Image Shadow', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false ) ),
							'save_always' => true
						),
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'category',
							'heading'     => esc_html__( 'One-Category Destination List', 'wanderland-core' ),
							'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wanderland-core' )
						),
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'selected_projects',
							'heading'     => esc_html__( 'Show Only Projects with Listed IDs', 'wanderland-core' ),
							'settings'    => array(
								'multiple'      => true,
								'sortable'      => true,
								'unique_values' => true
							),
							'description' => esc_html__( 'Delimit ID numbers by comma (leave empty for all)', 'wanderland-core' )
						),
						array(
							'type'        => 'autocomplete',
							'param_name'  => 'tag',
							'heading'     => esc_html__( 'One-Tag Destination List', 'wanderland-core' ),
							'description' => esc_html__( 'Enter one tag slug (leave empty for showing all tags)', 'wanderland-core' )
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
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'enable_title',
							'heading'    => esc_html__( 'Enable Title', 'wanderland-core' ),
							'value'      => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'group'      => esc_html__( 'Content Layout', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'title_tag',
							'heading'    => esc_html__( 'Title Tag', 'wanderland-core' ),
							'value'      => array_flip( wanderland_mikado_get_title_tag( true ) ),
							'dependency' => array( 'element' => 'enable_title', 'value' => array( 'yes' ) ),
							'group'      => esc_html__( 'Content Layout', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'title_highlight',
							'heading'    => esc_html__( 'Title Highlight', 'wanderland-core' ),
							'value'      => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'dependency' => array( 'element' => 'enable_title', 'value' => array( 'yes' ) ),
							'group'      => esc_html__( 'Content Layout', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'enable_category',
							'heading'    => esc_html__( 'Enable Category', 'wanderland-core' ),
							'value'      => array_flip( wanderland_mikado_get_yes_no_select_array( false, false ) ),
							'group'      => esc_html__( 'Content Layout', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'pagination_type',
							'heading'    => esc_html__( 'Pagination Type', 'wanderland-core' ),
							'value'      => array(
								esc_html__( 'None', 'wanderland-core' )            => 'no-pagination',
								esc_html__( 'Standard', 'wanderland-core' )        => 'standard',
								esc_html__( 'Load More', 'wanderland-core' )       => 'load-more',
								esc_html__( 'Infinite Scroll', 'wanderland-core' ) => 'infinite-scroll'
							),
							'group'      => esc_html__( 'Additional Features', 'wanderland-core' )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'load_more_top_margin',
							'heading'    => esc_html__( 'Load More Top Margin (px or %)', 'wanderland-core' ),
							'dependency' => array( 'element' => 'pagination_type', 'value' => array( 'load-more' ) ),
							'group'      => esc_html__( 'Additional Features', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_article_animation',
							'heading'     => esc_html__( 'Enable Article Animation', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false ) ),
							'description' => esc_html__( 'Enabling this option you will enable appears animation for your destination list items', 'wanderland-core' ),
							'group'       => esc_html__( 'Additional Features', 'wanderland-core' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'number_of_columns'        => 'three',
			'space_between_items'      => 'normal',
			'number_of_items'          => '-1',
			'image_proportions'        => 'full',
			'custom_image_width'       => '',
			'custom_image_height'      => '',
			'enable_image_shadow'      => 'no',
			'category'                 => '',
			'selected_projects'        => '',
			'tag'                      => '',
			'orderby'                  => 'date',
			'order'                    => 'ASC',
			'enable_title'             => 'yes',
			'title_tag'                => 'h3',
			'title_highlight'          => 'yes',
			'enable_category'          => 'no',
			'enable_excerpt'           => 'no',
			'excerpt_length'           => '90',
			'pagination_type'          => 'no-pagination',
			'load_more_top_margin'     => '',
			'enable_article_animation' => 'no',
			'destination_slider_on'      => 'no',
			'enable_loop'              => 'yes',
			'enable_autoplay'          => 'yes',
			'slider_speed'             => '5000',
			'slider_speed_animation'   => '600',
			'enable_navigation'        => 'yes',
			'navigation_skin'          => '',
			'enable_pagination'        => 'yes',
			'pagination_skin'          => '',
			'pagination_position'      => '',
			'enable_button'            => 'no'
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
		$additional_params['query_results'] = $query_results;
		
		$additional_params['holder_data']          = wanderland_mikado_get_holder_data_for_cpt( $params, $additional_params );
		$additional_params['holder_classes']       = $this->getHolderClasses( $params, $args );
		$additional_params['holder_inner_classes'] = $this->getHolderInnerClasses( $params );
		
		$params['this_object'] = $this;
		
		$html = wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-list', 'destination-holder', '', $params, $additional_params );
		
		return $html;
	}
	
	public function getQueryArray( $params ) {
		$query_array = array(
			'post_status'    => 'publish',
			'post_type'      => 'destination-item',
			'posts_per_page' => $params['number_of_items'],
			'orderby'        => $params['orderby'],
			'order'          => $params['order']
		);
		
		if ( ! empty( $params['category'] ) ) {
			$query_array['destination-category'] = $params['category'];
		}
		
		$project_ids = null;
		if ( ! empty( $params['selected_projects'] ) ) {
			$project_ids             = explode( ',', $params['selected_projects'] );
            $query_array['orderby'] = 'post__in';
			$query_array['post__in'] = $project_ids;
		}
		
		if ( ! empty( $params['tag'] ) ) {
			$query_array['destination-tag'] = $params['tag'];
		}
		
		if ( ! empty( $params['next_page'] ) ) {
			$query_array['paged'] = $params['next_page'];
		} else {
			$query_array['paged'] = 1;
		}
		
		return $query_array;
	}
	
	public function getHolderClasses( $params, $args ) {
		$classes = array();
		
		$classes[] = ! empty( $params['number_of_columns'] ) ? 'mkdf-' . $params['number_of_columns'] . '-columns' : 'mkdf-' . $args['number_of_columns'] . '-columns';
		$classes[] = ! empty( $params['space_between_items'] ) ? 'mkdf-' . $params['space_between_items'] . '-space' : 'mkdf-' . $args['space_between_items'] . '-space';
		$classes[] = ! in_array( $params['pagination_type'], array( 'standard-shortcodes', 'load-more' ) ) ? 'mkdf-disable-bottom-space' : '';
		$classes[] = $params['enable_image_shadow'] === 'yes' ? 'mkdf-dl-has-shadow' : '';
		$classes[] = ! empty( $params['pagination_type'] ) ? 'mkdf-dl-pag-' . $params['pagination_type'] : '';
		$classes[] = $params['enable_article_animation'] === 'yes' ? 'mkdf-dl-has-animation' : '';
		$classes[] = ! empty( $params['navigation_skin'] ) ? 'mkdf-nav-' . $params['navigation_skin'] . '-skin' : '';
		$classes[] = ! empty( $params['pagination_skin'] ) ? 'mkdf-pag-' . $params['pagination_skin'] . '-skin' : '';
		$classes[] = ! empty( $params['pagination_position'] ) ? 'mkdf-pag-' . $params['pagination_position'] : '';
		
		return implode( ' ', $classes );
	}
	
	public function getHolderInnerClasses( $params ) {
		$classes = array();
		
		$classes[] = $params['destination_slider_on'] === 'yes' ? 'mkdf-owl-slider mkdf-list-is-slider' : '';
		
		return implode( ' ', $classes );
	}
	
	public function getImageSize( $params ) {
		$thumb_size = 'full';
		
		if ( ! empty( $params['image_proportions'] ) ) {
			$image_size = $params['image_proportions'];
			
			switch ( $image_size ) {
				case 'landscape':
					$thumb_size = 'wanderland_mikado_image_landscape';
					break;
				case 'portrait':
					$thumb_size = 'wanderland_mikado_image_portrait';
					break;
				case 'square':
					$thumb_size = 'wanderland_mikado_image_square';
					break;
				case 'medium':
					$thumb_size = 'medium';
					break;
				case 'large':
					$thumb_size = 'large';
					break;
				case 'full':
					$thumb_size = 'full';
					break;
				case 'custom':
					$thumb_size = 'custom';
					break;
			}
		}
		
		return $thumb_size;
	}
	
	public function getLoadMoreStyles( $params ) {
		$styles = array();
		
		if ( ! empty( $params['load_more_top_margin'] ) ) {
			$margin = $params['load_more_top_margin'];
			
			if ( wanderland_mikado_string_ends_with( $margin, '%' ) || wanderland_mikado_string_ends_with( $margin, 'px' ) ) {
				$styles[] = 'margin-top: ' . $margin;
			} else {
				$styles[] = 'margin-top: ' . wanderland_mikado_filter_px( $margin ) . 'px';
			}
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
	 * Filter destinations by ID or Title
	 *
	 * @param $query
	 *
	 * @return array
	 */
	public function destinationIdAutocompleteSuggester( $query ) {
		global $wpdb;
		$destination_id    = (int) $query;
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