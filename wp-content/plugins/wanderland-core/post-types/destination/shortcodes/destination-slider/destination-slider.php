<?php

namespace WanderlandCore\CPT\Shortcodes\Destination;

use WanderlandCore\Lib;

class DestinationSlider implements Lib\ShortcodeInterface {
	private $base;
	
	public function __construct() {
		$this->base = 'mkdf_destination_slider';
		
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
		
		//Destination category filter
		add_filter( 'vc_autocomplete_mkdf_destination_slider_category_callback', array( &$this, 'destinationCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination category render
		add_filter( 'vc_autocomplete_mkdf_destination_slider_category_render', array( &$this, 'destinationCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination selected projects filter
		add_filter( 'vc_autocomplete_mkdf_destination_slider_selected_projects_callback', array( &$this, 'destinationIdAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination selected projects render
		add_filter( 'vc_autocomplete_mkdf_destination_slider_selected_projects_render', array( &$this, 'destinationIdAutocompleteRender', ), 10, 1 ); // Render exact destination. Must return an array (label,value)
		
		//Destination tag filter
		add_filter( 'vc_autocomplete_mkdf_destination_slider_tag_callback', array( &$this, 'destinationTagAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array
		
		//Destination tag render
		add_filter( 'vc_autocomplete_mkdf_destination_slider_tag_render', array( &$this, 'destinationTagAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'     => esc_html__( 'Destination Slider', 'wanderland-core' ),
					'base'     => $this->base,
					'category' => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'icon'     => 'icon-wpb-destination-slider extended-custom-icon',
					'params'   => array(
						array(
							'type'        => 'textfield',
							'param_name'  => 'number_of_items',
							'heading'     => esc_html__( 'Number of Destinations Items', 'wanderland-core' ),
							'admin_label' => true,
							'description' => esc_html__( 'Set number of items for your destination slider. Enter -1 to show all', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'number_of_columns',
							'heading'     => esc_html__( 'Number of Columns', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_number_of_columns_array( true ) ),
							'description' => esc_html__( 'Number of destinations that are showing at the same time in slider (on smaller screens is responsive so there will be less items shown). Default value is Four', 'wanderland-core' ),
							'save_always' => true
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
							'description' => esc_html__( 'Set image proportions for your destination slider.', 'wanderland-core' ),
							'save_always' => true
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
							'value'      => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'group'      => esc_html__( 'Content Layout', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'enable_excerpt',
							'heading'    => esc_html__( 'Enable Excerpt', 'wanderland-core' ),
							'value'      => array_flip( wanderland_mikado_get_yes_no_select_array( false ) ),
							'group'      => esc_html__( 'Content Layout', 'wanderland-core' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'excerpt_length',
							'heading'     => esc_html__( 'Excerpt Length', 'wanderland-core' ),
							'description' => esc_html__( 'Number of characters', 'wanderland-core' ),
							'dependency'  => array( 'element' => 'enable_excerpt', 'value' => array( 'yes' ) ),
							'group'       => esc_html__( 'Content Layout', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'enable_button',
							'heading'    => esc_html__( 'Enable Button', 'wanderland-core' ),
							'value'      => array_flip( wanderland_mikado_get_yes_no_select_array( false, false ) ),
							'save_always' => true,
							'group'      => esc_html__( 'Content Layout', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_loop',
							'heading'     => esc_html__( 'Enable Slider Loop', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, false ) ),
							'save_always' => true,
							'group'       => esc_html__( 'Slider Settings', 'wanderland-core' ),
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_autoplay',
							'heading'     => esc_html__( 'Enable Slider Autoplay', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'save_always' => true,
							'group'       => esc_html__( 'Slider Settings', 'wanderland-core' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'slider_speed',
							'heading'     => esc_html__( 'Slide Duration', 'wanderland-core' ),
							'description' => esc_html__( 'Default value is 5000 (ms)', 'wanderland-core' ),
							'group'       => esc_html__( 'Slider Settings', 'wanderland-core' )
						),
						array(
							'type'        => 'textfield',
							'param_name'  => 'slider_speed_animation',
							'heading'     => esc_html__( 'Slide Animation Duration', 'wanderland-core' ),
							'description' => esc_html__( 'Speed of slide animation in milliseconds. Default value is 600.', 'wanderland-core' ),
							'group'       => esc_html__( 'Slider Settings', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_navigation',
							'heading'     => esc_html__( 'Enable Slider Navigation Arrows', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'save_always' => true,
							'group'       => esc_html__( 'Slider Settings', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'navigation_skin',
							'heading'    => esc_html__( 'Navigation Skin', 'wanderland-core' ),
							'value'      => array(
								esc_html__( 'Default', 'wanderland-core' ) => '',
								esc_html__( 'Light', 'wanderland-core' )   => 'light',
								esc_html__( 'Dark', 'wanderland-core' )    => 'dark'
							),
							'dependency' => array( 'element' => 'enable_navigation', 'value' => array( 'yes' ) ),
							'group'      => esc_html__( 'Slider Settings', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'enable_pagination',
							'heading'     => esc_html__( 'Enable Slider Pagination', 'wanderland-core' ),
							'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
							'save_always' => true,
							'group'       => esc_html__( 'Slider Settings', 'wanderland-core' )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'pagination_skin',
							'heading'    => esc_html__( 'Pagination Skin', 'wanderland-core' ),
							'value'      => array(
								esc_html__( 'Default', 'wanderland-core' ) => '',
								esc_html__( 'Light', 'wanderland-core' )   => 'light',
								esc_html__( 'Dark', 'wanderland-core' )    => 'dark'
							),
							'dependency' => array( 'element' => 'enable_pagination', 'value' => array( 'yes' ) ),
							'group'      => esc_html__( 'Slider Settings', 'wanderland-core' )
						),
						array(
							'type'        => 'dropdown',
							'param_name'  => 'pagination_position',
							'heading'     => esc_html__( 'Pagination Position', 'wanderland-core' ),
							'value'       => array(
								esc_html__( 'Below Slider', 'wanderland-core' ) => 'below-slider',
								esc_html__( 'On Slider', 'wanderland-core' )    => 'on-slider'
							),
							'save_always' => true,
							'dependency'  => array( 'element' => 'enable_pagination', 'value' => array( 'yes' ) ),
							'group'       => esc_html__( 'Slider Settings', 'wanderland-core' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'number_of_items'        => '9',
			'number_of_columns'      => 'four',
			'space_between_items'    => 'normal',
			'image_proportions'      => 'full',
			'custom_image_width'     => '',
			'custom_image_height'    => '',
			'category'               => '',
			'selected_projects'      => '',
			'tag'                    => '',
			'orderby'                => 'date',
			'order'                  => 'ASC',
			'enable_title'           => 'yes',
			'title_tag'              => 'h4',
			'title_highlight'        => 'yes',
			'enable_category'        => 'yes',
			'enable_excerpt'         => 'no',
			'excerpt_length'         => '90',
			'enable_button'          => 'no',
			'enable_loop'            => 'no',
			'enable_autoplay'        => 'yes',
			'slider_speed'           => '5000',
			'slider_speed_animation' => '600',
			'enable_navigation'      => 'yes',
			'navigation_skin'        => '',
			'enable_pagination'      => 'yes',
			'pagination_skin'        => '',
			'pagination_position'    => 'below-slider'
		);
		$params = shortcode_atts( $args, $atts );
		
		$params['type']                = 'gallery';
		$params['destination_slider_on'] = 'yes';
		
		$html = '<div class="mkdf-destination-slider-holder">';
			$html .= wanderland_mikado_execute_shortcode( 'mkdf_destination_list', $params );
		$html .= '</div>';
		
		return $html;
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