<?php
namespace WanderlandCore\CPT\Shortcodes\BlogSlider;

use WanderlandCore\Lib;

class BlogSlider implements Lib\ShortcodeInterface {
    private $base;

    function __construct() {
        $this->base = 'mkdf_blog_slider';

        add_action('vc_before_init', array($this,'vcMap'));

        //Category filter
        add_filter( 'vc_autocomplete_mkdf_blog_slider_category_callback', array( &$this, 'blogListCategoryAutocompleteSuggester', ), 10, 1 ); // Get suggestion(find). Must return an array

        //Category render
        add_filter( 'vc_autocomplete_mkdf_blog_slider_category_render', array( &$this, 'blogListCategoryAutocompleteRender', ), 10, 1 ); // Get suggestion(find). Must return an array
    }

    public function getBase() {
        return $this->base;
    }
	
	public function vcMap() {
		vc_map(
			array(
				'name'                      => esc_html__( 'Blog Slider', 'wanderland' ),
				'base'                      => $this->base,
				'icon'                      => 'icon-wpb-blog-slider extended-custom-icon',
				'category'                  => esc_html__( 'by WANDERLAND', 'wanderland' ),
				'allowed_container_element' => 'vc_row',
				'params'                    => array(
					array(
						'type'        => 'dropdown',
						'param_name'  => 'slider_type',
						'heading'     => esc_html__( 'Type', 'wanderland' ),
						'value'       => array(
							esc_html__( 'Slider', 'wanderland' )            => 'slider',
							esc_html__( 'Carousel', 'wanderland' )          => 'carousel',
							esc_html__( 'Carousel Centered', 'wanderland' ) => 'carousel-centered'
						),
						'save_always' => true
					),
					array(
						'type'       => 'textfield',
						'param_name' => 'number_of_posts',
						'heading'    => esc_html__( 'Number of Posts', 'wanderland' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'orderby',
						'heading'     => esc_html__( 'Order By', 'wanderland' ),
						'value'       => array_flip( wanderland_mikado_get_query_order_by_array() ),
						'save_always' => true
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'order',
						'heading'     => esc_html__( 'Order', 'wanderland' ),
						'value'       => array_flip( wanderland_mikado_get_query_order_array() ),
						'save_always' => true
					),
					array(
						'type'        => 'autocomplete',
						'param_name'  => 'category',
						'heading'     => esc_html__( 'Category', 'wanderland' ),
						'description' => esc_html__( 'Enter one category slug (leave empty for showing all categories)', 'wanderland' )
					),
					array(
						'type'       => 'textfield',
						'param_name' => 'number_of_columns',
						'heading'    => esc_html__( 'Number of Columns', 'wanderland' ),
						'dependency'  => array( 'element' => 'slider_type', 'value' => 'slider' )
					),
					array(
						'type'       => 'dropdown',
						'param_name' => 'image_size',
						'heading'    => esc_html__( 'Image Size', 'wanderland' ),
						'value'      => array(
							esc_html__( 'Original', 'wanderland' )  => 'full',
							esc_html__( 'Square', 'wanderland' )    => 'wanderland_mikado_image_square',
							esc_html__( 'Landscape', 'wanderland' ) => 'wanderland_mikado_image_landscape',
							esc_html__( 'Portrait', 'wanderland' )  => 'wanderland_mikado_image_portrait',
							esc_html__( 'Thumbnail', 'wanderland' ) => 'thumbnail',
							esc_html__( 'Medium', 'wanderland' )    => 'medium',
							esc_html__( 'Large', 'wanderland' )     => 'large',
							esc_html__( 'Custom', 'wanderland' )    => 'custom'
						),
						'save_always' => true
					),
					array(
						'type'        => 'textfield',
						'param_name'  => 'custom_image_width',
						'heading'     => esc_html__( 'Custom Image Width', 'wanderland' ),
						'description' => esc_html__( 'Enter image width in px', 'wanderland' ),
						'dependency'  => array( 'element' => 'image_size', 'value' => 'custom' )
					),
					array(
						'type'        => 'textfield',
						'param_name'  => 'custom_image_height',
						'heading'     => esc_html__( 'Custom Image Height', 'wanderland' ),
						'description' => esc_html__( 'Enter image height in px', 'wanderland' ),
						'dependency'  => array( 'element' => 'image_size', 'value' => 'custom' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'title_tag',
						'heading'     => esc_html__( 'Title Tag', 'wanderland' ),
						'value'       => array_flip( wanderland_mikado_get_title_tag( true ) ),
						'group'       => esc_html__( 'Post Info', 'wanderland' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'title_transform',
						'heading'     => esc_html__( 'Title Text Transform', 'wanderland' ),
						'value'       => array_flip( wanderland_mikado_get_text_transform_array( true ) ),
						'group'       => esc_html__( 'Post Info', 'wanderland' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'post_info_author',
						'heading'     => esc_html__( 'Enable Post Info Author', 'wanderland' ),
						'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
						'save_always' => true,
						'group'       => esc_html__( 'Post Info', 'wanderland' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'post_info_date',
						'heading'     => esc_html__( 'Enable Post Info Date', 'wanderland' ),
						'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
						'save_always' => true,
						'group'       => esc_html__( 'Post Info', 'wanderland' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'post_info_category',
						'heading'     => esc_html__( 'Enable Post Info Category', 'wanderland' ),
						'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false, true ) ),
						'save_always' => true,
						'group'       => esc_html__( 'Post Info', 'wanderland' )
					),
					array(
						'type'        => 'dropdown',
						'param_name'  => 'post_info_comments',
						'heading'     => esc_html__( 'Enable Post Info Comments', 'wanderland' ),
						'value'       => array_flip( wanderland_mikado_get_yes_no_select_array( false ) ),
						'save_always' => true,
						'group'       => esc_html__( 'Post Info', 'wanderland' )
					)
				)
			)
		);
	}
	
	public function render( $atts, $content = null ) {
		$default_atts = array(
			'slider_type'         => 'slider',
			'number_of_posts'     => '-1',
			'orderby'             => 'title',
			'order'               => 'ASC',
			'category'            => '',
			'image_size'          => 'full',
			'custom_image_width'  => '',
			'custom_image_height' => '',
			'title_tag'           => 'h5',
			'title_transform'     => '',
			'post_info_author'    => 'no',
			'post_info_date'      => '',
			'post_info_category'  => '',
			'post_info_comments'  => '',
			'number_of_columns'   => '',
		);
		$params       = shortcode_atts( $default_atts, $atts );
		
		$queryArray             = $this->generateBlogQueryArray( $params );
		$query_result           = new \WP_Query( $queryArray );
		$params['query_result'] = $query_result;
		
		$params['slider_type']    = ! empty( $params['slider_type'] ) ? $params['slider_type'] : $default_atts['slider_type'];
		$params['slider_classes'] = $this->getSliderClasses( $params );
		$params['slider_data']    = $this->getSliderData( $params );
		
		ob_start();
		
		wanderland_mikado_get_module_template_part( 'shortcodes/blog-slider/holder', 'blog', '', $params );
		
		$html = ob_get_contents();
		
		ob_end_clean();
		
		return $html;
	}
	
	public function generateBlogQueryArray( $params ) {
		$queryArray = array(
			'post_status'    => 'publish',
			'post_type'      => 'post',
			'orderby'        => $params['orderby'],
			'order'          => $params['order'],
			'posts_per_page' => $params['number_of_posts'],
			'post__not_in'   => get_option( 'sticky_posts' )
		);
		
		if ( ! empty( $params['category'] ) ) {
			$queryArray['category_name'] = $params['category'];
		}
		
		return $queryArray;
	}
	
	public function getSliderClasses( $params ) {
		$holderClasses = array();
		
		$holderClasses[] = 'mkdf-bs-' . $params['slider_type'];
		
		return implode( ' ', $holderClasses );
	}
	
	private function getSliderData( $params ) {
		$type        = $params['slider_type'];
		$slider_data = array();
		
		if($type == 'carousel') {
			$slider_data['data-number-of-items']   = '4';
			$slider_data['data-slider-margin']     = '10';
			$slider_data['data-slider-speed']      = '3000';
			$slider_data['data-slider-padding']    = 'yes';
			$slider_data['data-enable-navigation'] = 'no';
		} else if ($type == 'carousel-centered') {
			$slider_data['data-number-of-items']   = '4';
			$slider_data['data-slider-margin']     = '10';
			$slider_data['data-enable-center']     = 'yes';
			$slider_data['data-enable-navigation'] = 'no';
			$slider_data['data-enable-pagination'] = 'no';
		} else {
			$slider_data['data-number-of-items']   = $params['number_of_columns'];
			$slider_data['data-slider-margin']     = '22';
			$slider_data['data-enable-pagination'] = 'no';
		}
		
		return $slider_data;
	}

    /**
     * Filter categories
     *
     * @param $query
     *
     * @return array
     */
    public function blogListCategoryAutocompleteSuggester( $query ) {
        global $wpdb;
        $post_meta_infos = $wpdb->get_results( $wpdb->prepare( "SELECT a.slug AS slug, a.name AS category_title
					FROM {$wpdb->terms} AS a
					LEFT JOIN ( SELECT term_id, taxonomy  FROM {$wpdb->term_taxonomy} ) AS b ON b.term_id = a.term_id
					WHERE b.taxonomy = 'category' AND a.name LIKE '%%%s%%'", stripslashes( $query ) ), ARRAY_A );

        $results = array();
        if ( is_array( $post_meta_infos ) && ! empty( $post_meta_infos ) ) {
            foreach ( $post_meta_infos as $value ) {
                $data          = array();
                $data['value'] = $value['slug'];
                $data['label'] = ( ( strlen( $value['category_title'] ) > 0 ) ? esc_html__( 'Category', 'wanderland' ) . ': ' . $value['category_title'] : '' );
                $results[]     = $data;
            }
        }

        return $results;
    }

    /**
     * Find categories by slug
     * @since 4.4
     *
     * @param $query
     *
     * @return bool|array
     */
    public function blogListCategoryAutocompleteRender( $query ) {
        $query = trim( $query['value'] ); // get value from requested
        if ( ! empty( $query ) ) {
            // get category
            $category = get_term_by( 'slug', $query, 'category' );
            if ( is_object( $category ) ) {

                $category_slug = $category->slug;
                $category_title = $category->name;

                $category_title_display = '';
                if ( ! empty( $category_title ) ) {
                    $category_title_display = esc_html__( 'Category', 'wanderland' ) . ': ' . $category_title;
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
