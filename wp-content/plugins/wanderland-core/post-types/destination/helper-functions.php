<?php

if ( ! function_exists( 'wanderland_core_destination_meta_box_functions' ) ) {
	function wanderland_core_destination_meta_box_functions( $post_types ) {
		$post_types[] = 'destination-item';
		
		return $post_types;
	}
	
	add_filter( 'wanderland_mikado_filter_meta_box_post_types_save', 'wanderland_core_destination_meta_box_functions' );
	add_filter( 'wanderland_mikado_filter_meta_box_post_types_remove', 'wanderland_core_destination_meta_box_functions' );
}

if ( ! function_exists( 'wanderland_core_destination_scope_meta_box_functions' ) ) {
	function wanderland_core_destination_scope_meta_box_functions( $post_types ) {
		$post_types[] = 'destination-item';
		
		return $post_types;
	}
	
	add_filter( 'wanderland_mikado_filter_set_scope_for_meta_boxes', 'wanderland_core_destination_scope_meta_box_functions' );
}

if ( ! function_exists( 'wanderland_core_destination_add_social_share_option' ) ) {
	function wanderland_core_destination_add_social_share_option( $container ) {
		wanderland_mikado_add_admin_field(
			array(
				'type'          => 'yesno',
				'name'          => 'enable_social_share_on_destination_item',
				'default_value' => 'no',
				'label'         => esc_html__( 'Destination Item', 'wanderland-core' ),
				'description'   => esc_html__( 'Show Social Share for Destination Items', 'wanderland-core' ),
				'parent'        => $container
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_post_types_social_share', 'wanderland_core_destination_add_social_share_option', 10, 1 );
}

if ( ! function_exists( 'wanderland_core_register_destination_cpt' ) ) {
	function wanderland_core_register_destination_cpt( $cpt_class_name ) {
		$cpt_class = array(
			'WanderlandCore\CPT\Destination\DestinationRegister'
		);
		
		$cpt_class_name = array_merge( $cpt_class_name, $cpt_class );
		
		return $cpt_class_name;
	}
	
	add_filter( 'wanderland_core_filter_register_custom_post_types', 'wanderland_core_register_destination_cpt' );
}

if ( ! function_exists( 'wanderland_core_get_archive_destination_list' ) ) {
	function wanderland_core_get_archive_destination_list( $wanderland_taxonomy_slug = '', $wanderland_taxonomy_name = '' ) {
		
		$number_of_items        = 12;
		$number_of_items_option = wanderland_mikado_options()->getOptionValue( 'destination_archive_number_of_items' );
		if ( ! empty( $number_of_items_option ) ) {
			$number_of_items = $number_of_items_option;
		}
		
		$number_of_columns        = 'four';
		$number_of_columns_option = wanderland_mikado_options()->getOptionValue( 'destination_archive_number_of_columns' );
		if ( ! empty( $number_of_columns_option ) ) {
			$number_of_columns = $number_of_columns_option;
		}
		
		$space_between_items        = 'normal';
		$space_between_items_option = wanderland_mikado_options()->getOptionValue( 'destination_archive_space_between_items' );
		if ( ! empty( $space_between_items_option ) ) {
			$space_between_items = $space_between_items_option;
		}
		
		$image_size        = 'landscape';
		$image_size_option = wanderland_mikado_options()->getOptionValue( 'destination_archive_image_size' );
		if ( ! empty( $image_size_option ) ) {
			$image_size = $image_size_option;
		}
		
		$category = $wanderland_taxonomy_name === 'destination-category' && ! empty( $wanderland_taxonomy_slug ) ? $wanderland_taxonomy_slug : '';
		$tag      = $wanderland_taxonomy_name === 'destination-tag' && ! empty( $wanderland_taxonomy_slug ) ? $wanderland_taxonomy_slug : '';
		
		$params = array(
			'number_of_items'     => $number_of_items,
			'number_of_columns'   => $number_of_columns,
			'space_between_items' => $space_between_items,
			'image_proportions'   => $image_size,
			'category'            => $category,
			'tag'                 => $tag,
			'pagination_type'     => 'load-more'
		);
		
		$html = wanderland_mikado_execute_shortcode( 'mkdf_destination_list', $params );

		echo wanderland_mikado_get_module_part($html);
	}
}

// Load destination shortcodes
if ( ! function_exists( 'wanderland_core_include_destination_shortcodes_files' ) ) {
	/**
	 * Loades all shortcodes by going through all folders that are placed directly in shortcodes folder
	 */
	function wanderland_core_include_destination_shortcodes_files() {
		foreach ( glob( WANDERLAND_CORE_CPT_PATH . '/destination/shortcodes/*/load.php' ) as $shortcode_load ) {
			include_once $shortcode_load;
		}
	}
	
	add_action( 'wanderland_core_action_include_shortcodes_file', 'wanderland_core_include_destination_shortcodes_files' );
}

if ( ! function_exists( 'wanderland_core_set_destination_single_info_follow_body_class' ) ) {
	/**
	 * Function that adds follow destination info class to body if sticky sidebar is enabled on destination single layouts
	 *
	 * @param $classes array of body classes
	 *
	 * @return array with follow destination info class body class added
	 */
	function wanderland_core_set_destination_single_info_follow_body_class( $classes ) {
		if ( is_singular( 'destination-item' ) && wanderland_mikado_options()->getOptionValue( 'destination_single_sticky_sidebar' ) == 'yes' ) {
			$classes[] = 'mkdf-follow-destination-info';
		}
		
		return $classes;
	}
	
	add_filter( 'body_class', 'wanderland_core_set_destination_single_info_follow_body_class' );
}

if ( ! function_exists( 'wanderland_core_single_destination_title_display' ) ) {
	/**
	 * Function that checks option for single destination title and overrides it with filter
	 */
	function wanderland_core_single_destination_title_display( $show_title_area ) {
		if ( is_singular( 'destination-item' ) ) {
			//Override displaying title based on destination option
			$show_title_area_meta = wanderland_mikado_get_meta_field_intersect( 'show_title_area_destination_single' );
			
			if ( ! empty( $show_title_area_meta ) ) {
				$show_title_area = $show_title_area_meta == 'yes';
			}
		}
		
		return $show_title_area;
	}
	
	add_filter( 'wanderland_mikado_filter_show_title_area', 'wanderland_core_single_destination_title_display' );
}

if ( ! function_exists( 'wanderland_core_set_breadcrumbs_output_for_destination' ) ) {
	function wanderland_core_set_breadcrumbs_output_for_destination( $childContent, $delimiter, $before, $after ) {
		
		if ( is_tax( 'destination-category' ) || is_tax( 'destination-tag' ) ) {
			$childContent = '';
			
			$wanderland_taxonomy_id        = get_queried_object_id();
			$wanderland_taxonomy_type      = is_tax( 'destination-tag' ) ? 'destination-tag' : 'destination-category';
			$wanderland_taxonomy           = ! empty( $wanderland_taxonomy_id ) ? get_term_by( 'id', $wanderland_taxonomy_id, $wanderland_taxonomy_type ) : '';
			$wanderland_taxonomy_parent_id = isset( $wanderland_taxonomy->parent ) && $wanderland_taxonomy->parent !== 0 ? $wanderland_taxonomy->parent : '';
			$wanderland_taxonomy_parent    = $wanderland_taxonomy_parent_id !== '' ? get_term_by( 'id', $wanderland_taxonomy_parent_id, $wanderland_taxonomy_type ) : '';
		
			if ( ! empty( $wanderland_taxonomy_parent ) ) {
				$childContent .= '<a itemprop="url" href="' . get_term_link( $wanderland_taxonomy_parent->term_id ) . '">' . $wanderland_taxonomy_parent->name . '</a>' . $delimiter;
			}
			
			if ( ! empty( $wanderland_taxonomy ) ) {
				$childContent .= $before . esc_attr( $wanderland_taxonomy->name ) . $after;
			}
			
		} elseif ( is_singular( 'destination-item' ) ) {
			$destination_categories = wp_get_post_terms( wanderland_mikado_get_page_id(), 'destination-category' );
			$childContent         = '';
			
			if ( ! empty( $destination_categories ) && count( $destination_categories ) ) {
				foreach ( $destination_categories as $cat ) {
					$childContent .= '<a itemprop="url" href="' . get_term_link( $cat->term_id ) . '">' . $cat->name . '</a>' . $delimiter;
				}
			}
			
			$childContent .= $before . get_the_title() . $after;
		}
		
		return $childContent;
	}
	
	add_filter( 'wanderland_mikado_filter_breadcrumbs_title_child_output', 'wanderland_core_set_breadcrumbs_output_for_destination', 10, 4 );
}

if ( ! function_exists( 'wanderland_core_set_single_destination_comments_enabled' ) ) {
	function wanderland_core_set_single_destination_comments_enabled( $comments ) {
		if ( is_singular( 'destination-item' ) && wanderland_mikado_options()->getOptionValue( 'destination_single_comments' ) == 'yes' ) {
			$comments = true;
		}
		
		return $comments;
	}
	
	add_filter( 'wanderland_mikado_filter_post_type_comments', 'wanderland_core_set_single_destination_comments_enabled', 10, 1 );
}

if ( ! function_exists( 'wanderland_core_get_single_destination' ) ) {
	function wanderland_core_get_single_destination() {
		
		wanderland_core_get_cpt_single_module_template_part( 'templates/single/holder', 'destination' );
	}
}

if ( ! function_exists( 'wanderland_core_set_single_destination_style' ) ) {
	/**
	 * Function that return padding for content
	 */
	function wanderland_core_set_single_destination_style( $style ) {
		$page_id      = wanderland_mikado_get_page_id();
		$class_prefix = wanderland_mikado_get_unique_page_class( $page_id );
		
		$current_styles = '';
		$current_style  = array();
		
		$current_selector = array(
			$class_prefix . ' .mkdf-destination-single-holder .mkdf-ps-info-holder'
		);
		
		$info_padding_top = get_post_meta( $page_id, 'destination_info_top_padding', true );
		
		if ( ! empty( $info_padding_top ) ) {
			$current_style['margin-top'] = wanderland_mikado_filter_px( $info_padding_top ) . 'px';
			
			$current_styles .= wanderland_mikado_dynamic_css( $current_selector, $current_style );
		}
		
		$current_style = $current_styles . $style;
		
		return $current_style;
	}
	
	add_filter( 'wanderland_mikado_filter_add_page_custom_style', 'wanderland_core_set_single_destination_style' );
}

if ( ! function_exists( 'wanderland_core_get_destination_single_media' ) ) {
	/*
     * @param boolean $masonry - set it manually when calling function from port single masonry templates,
     *                           used to crop images only for port single masonry layouts
     */
	function wanderland_core_get_destination_single_media($masonry = false) {
		$image_ids       = get_post_meta( get_the_ID(), 'mkdf-destination-image-gallery', true );
		$single_upload   = get_post_meta( get_the_ID(), 'mkdf_destination_single_upload', true );
		$destination_media = array();
		
		if ( $image_ids !== '' ) {
			$image_ids = explode( ',', $image_ids );
			
			foreach ( $image_ids as $image_id ) {
				$media                   = array();
				$media['title']          = get_the_title( $image_id );
				$media['type']           = 'image';
				$media['description']    = get_post_meta( $image_id, '_wp_attachment_image_alt', true );
				$media['image_src']      = wp_get_attachment_image_src( $image_id, 'full' );
				$media['holder_classes'] = '';
				
				$image_size = get_post_meta( $image_id, 'destination_single_masonry_image_size', true );
				
				$destination_media[] = $media;
			}
		}
		
		if ( is_array( $single_upload ) && count( $single_upload ) ) {
			foreach ( $single_upload as $item ) {
				$media = array();
				
				if ( $item['file_type'] == 'video' ) {
					$media['type']        = $item['video_type'];
					$media['description'] = 'video';
					$media['video_url']   = wanderland_core_get_destination_video_url( $item );
					
					if ( $item['video_type'] == 'self' ) {
						$media['video_cover'] = ! empty( $item['video_cover_image'] ) ? $item['video_cover_image'] : '';
					}
					
					if ( $item['video_type'] !== 'self' ) {
						$media['video_id'] = $item['video_id'];
					}
				} elseif ( $item['file_type'] == 'image' ) {
					$media['type']      = 'image';
					$media['image_src'] = $item['single_image'];
				}

				//fallback if description is not set for media
				$media['title'] = get_the_title();
				$media['holder_classes'] = '';
				
				$destination_media[] = $media;
			}
		}
		
		return $destination_media;
	}
}

if ( ! function_exists( 'wanderland_core_get_destination_video_url' ) ) {
	function wanderland_core_get_destination_video_url( $video ) {
		switch ( $video['video_type'] ) {
			case 'youtube':
				return 'https://youtube.com/watch?v=' . $video['video_id'];
				break;
			case 'vimeo';
				return 'https://vimeo.com/' . $video['video_id'];
				break;
			case 'self':
				$return_array = array();
				
				if ( ! empty( $video['video_mp4'] ) ) {
					$return_array['mp4'] = $video['video_mp4'];
				}
				
				return $return_array;
				
				break;
		}
	}
}

if ( ! function_exists( 'wanderland_core_get_destination_single_media_html' ) ) {
	function wanderland_core_get_destination_single_media_html( $media ) {
		$params = array();
		
		if ( $media['type'] == 'image' ) {
			$params['lightbox'] = wanderland_mikado_options()->getOptionValue( 'destination_single_lightbox_images' ) == 'yes';
			
			$media['image_url'] = is_array( $media['image_src'] ) ? $media['image_src'][0] : $media['image_src'];
			if ( empty( $media['description'] ) ) {
				$media['description'] = $media['title'];
			}
		}
		
		if ( in_array( $media['type'], array( 'youtube', 'vimeo' ) ) ) {
			$params['lightbox'] = wanderland_mikado_options()->getOptionValue( 'destination_single_lightbox_videos' ) == 'yes';
			
			if ( $params['lightbox'] ) {
				switch ( $media['type'] ) {
					case 'vimeo':
						$url      = 'https://vimeo.com/api/v2/video/' . $media['video_id'] . '.php';
						$request  = wp_remote_get($url);
						$response = unserialize( wp_remote_retrieve_body( $request ) );
						
						$params['video_title']    = $response[0]['title'];
						$params['lightbox_thumb'] = $response[0]['thumbnail_large'];
						break;
					case 'youtube':
						$params['video_title'] = $media['title'];
						
						$params['lightbox_thumb'] = 'https://img.youtube.com/vi/' . trim( $media['video_id'] ) . '/sddefault.jpg';
						break;
				}
			}
		}
		
		$params['media'] = $media;
		
		wanderland_core_get_cpt_single_module_template_part( 'templates/single/media/' . $media['type'], 'destination', '', $params );
	}
}

if ( ! function_exists( 'wanderland_core_get_destination_single_related_posts' ) ) {
	/**
	 * Function for returning destination single related posts
	 *
	 * @param $post_id
	 *
	 * @return WP_Query
	 */
	function wanderland_core_get_destination_single_related_posts( $post_id ) {
		//Get tags
		$tags = wp_get_object_terms( $post_id, 'destination-tag' );
		
		//Get categories
		$categories = wp_get_object_terms( $post_id, 'destination-category' );
		
		$tag_ids = array();
		if ( $tags ) {
			foreach ( $tags as $tag ) {
				$tag_ids[] = $tag->term_id;
			}
		}
		
		$category_ids = array();
		if ( $categories ) {
			foreach ( $categories as $category ) {
				$category_ids[] = $category->term_id;
			}
		}
		
		$hasRelatedByTag = false;
		
		if ( $tag_ids ) {
			$related_by_tag = wanderland_core_get_destination_single_related_posts_by_param( $post_id, $tag_ids, 'destination-tag' );
			
			if ( ! empty( $related_by_tag->posts ) ) {
				$hasRelatedByTag = true;
				
				return $related_by_tag;
			}
		}
		
		if ( $categories && ! $hasRelatedByTag ) {
			$related_by_category = wanderland_core_get_destination_single_related_posts_by_param( $post_id, $category_ids, 'destination-category' );
			
			if ( ! empty( $related_by_category->posts ) ) {
				return $related_by_category;
			}
		}
	}
}

if ( ! function_exists( 'wanderland_core_get_destination_single_related_posts_by_param' ) ) {
	/**
	 * @param $post_id - Post ID
	 * @param $term_ids - Category or Tag IDs
	 * @param $taxonomy
	 *
	 * @return WP_Query
	 */
	function wanderland_core_get_destination_single_related_posts_by_param( $post_id, $term_ids, $taxonomy ) {
		$args = array(
			'post_status'    => 'publish',
			'post__not_in'   => array( $post_id ),
			'order'          => 'DESC',
			'orderby'        => 'date',
			'posts_per_page' => '4',
			'tax_query'      => array(
				array(
					'taxonomy' => $taxonomy,
					'field'    => 'term_id',
					'terms'    => $term_ids,
				),
			)
		);
		
		$related_by_taxonomy = new WP_Query( $args );
		
		return $related_by_taxonomy;
	}
}

if ( ! function_exists( 'wanderland_core_add_destination_to_search_types' ) ) {
	function wanderland_core_add_destination_to_search_types( $post_types ) {
		
		$post_types['destination-item'] = esc_html__( 'Destination', 'wanderland-core' );
		
		return $post_types;
	}
	
	add_filter( 'wanderland_mikado_filter_search_post_type_widget_params_post_type', 'wanderland_core_add_destination_to_search_types' );
}

/**
 * Loads more function for destination.
 */
if ( ! function_exists( 'wanderland_core_destination_ajax_load_more' ) ) {
	function wanderland_core_destination_ajax_load_more() {
		$shortcode_params = array();

		if ( ! empty( $_POST ) ) {
			foreach ( $_POST as $key => $value ) {
				if ( $key !== '' ) {
					$addUnderscoreBeforeCapitalLetter = preg_replace( '/([A-Z])/', '_$1', $key );
					$setAllLettersToLowercase         = strtolower( $addUnderscoreBeforeCapitalLetter );

					$shortcode_params[ $setAllLettersToLowercase ] = $value;
				}
			}
		}

		$port_list = new \WanderlandCore\CPT\Shortcodes\Destination\DestinationList();

		$query_array                     = $port_list->getQueryArray( $shortcode_params );
		$query_results                   = new \WP_Query( $query_array );
		$shortcode_params['this_object'] = $port_list;

		$html = '';
		if ( $query_results->have_posts() ):
			while ( $query_results->have_posts() ) : $query_results->the_post();
				$html .= wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-list', 'destination-item', $shortcode_params['item_type'], $shortcode_params );
			endwhile;
		else:
			$html .= wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-list', 'parts/posts-not-found', '', $shortcode_params );
		endif;

		wp_reset_postdata();

		$return_obj = array(
			'html' => $html,
		);

		echo json_encode( $return_obj );
		exit;
	}
}

add_action( 'wp_ajax_nopriv_wanderland_core_destination_ajax_load_more', 'wanderland_core_destination_ajax_load_more' );
add_action( 'wp_ajax_wanderland_core_destination_ajax_load_more', 'wanderland_core_destination_ajax_load_more' );

if (!function_exists('wanderland_core_admin_filter_taxonomies')) {
    /*
     * add taxonomy filters in admin destination list
     */
    function wanderland_core_admin_filter_taxonomies() {
        global $typenow;

        // an array of all the taxonomies to display
        $taxonomies = array('destination-category', 'destination-tag');

        // use the custom post type here
        if ($typenow === 'destination-item') {
            foreach ($taxonomies as $taxonomy) {
                $taxonomy_obj = get_taxonomy($taxonomy);
                wp_dropdown_categories(array(
                    'show_option_all' => sprintf(__('All %s', 'wanderland-core'), $taxonomy_obj->label),
                    'orderby' => 'name',
                    'order' => 'ASC',
                    'hide_empty' => true,
                    'hide_if_empty' => true,
                    'selected' => filter_input(INPUT_GET, $taxonomy_obj->query_var, FILTER_SANITIZE_STRING),
                    'hierarchical' => true,
                    'name' => $taxonomy_obj->query_var,
                    'taxonomy' => $taxonomy_obj->name,
                    'value_field' => 'slug',
                ));
            }
        }
    }

    add_action('restrict_manage_posts', 'wanderland_core_admin_filter_taxonomies');
}