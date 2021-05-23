<?php
namespace WanderlandCore\CPT\Shortcodes\SocialShare;

use WanderlandCore\Lib;

class SocialShare implements Lib\ShortcodeInterface {
	private $base;
	private $socialNetworks;
	
	function __construct() {
		$this->base           = 'mkdf_social_share';
		$this->socialNetworks = array(
			'facebook',
			'twitter',
			'linkedin',
			'tumblr',
			'pinterest',
			'vk'
		);
		add_action( 'vc_before_init', array( $this, 'vcMap' ) );
	}
	
	public function getBase() {
		return $this->base;
	}
	
	public function getSocialNetworks() {
		return $this->socialNetworks;
	}
	
	public function vcMap() {
		if ( function_exists( 'vc_map' ) ) {
			vc_map(
				array(
					'name'                      => esc_html__( 'Social Share', 'wanderland-core' ),
					'base'                      => $this->getBase(),
					'icon'                      => 'icon-wpb-social-share extended-custom-icon',
					'category'                  => esc_html__( 'by WANDERLAND', 'wanderland-core' ),
					'allowed_container_element' => 'vc_row',
					'params'                    => array(
						array(
							'type'       => 'dropdown',
							'param_name' => 'type',
							'heading'    => esc_html__( 'Type', 'wanderland-core' ),
							'value'      => array(
								esc_html__( 'List', 'wanderland-core' )     => 'list',
								esc_html__( 'Dropdown', 'wanderland-core' ) => 'dropdown',
								esc_html__( 'Text', 'wanderland-core' )     => 'text'
							)
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'dropdown_behavior',
							'heading'    => esc_html__( 'DropDown Hover Behavior', 'wanderland-core' ),
							'value'      => array(
								esc_html__( 'On Bottom Animation', 'wanderland-core' ) => 'bottom',
								esc_html__( 'On Right Animation', 'wanderland-core' )  => 'right',
								esc_html__( 'On Left Animation', 'wanderland-core' )   => 'left'
							),
							'dependency' => array( 'element' => 'type', 'value' => array( 'dropdown' ) )
						),
						array(
							'type'       => 'dropdown',
							'param_name' => 'icon_type',
							'heading'    => esc_html__( 'Icons Type', 'wanderland-core' ),
							'value'      => array(
								esc_html__( 'Font Awesome', 'wanderland-core' ) => 'font-awesome',
								esc_html__( 'Font Elegant', 'wanderland-core' ) => 'font-elegant',
								esc_html__( 'Font Ion', 'wanderland-core' ) => 'font-ion',
							),
							'dependency' => array( 'element' => 'type', 'value' => array( 'list', 'dropdown' ) )
						),
						array(
							'type'       => 'textfield',
							'param_name' => 'title',
							'heading'    => esc_html__( 'Social Share Title', 'wanderland-core' )
						)
					)
				)
			);
		}
	}
	
	public function render( $atts, $content = null ) {
		$args   = array(
			'type'              => 'list',
			'dropdown_behavior' => 'bottom',
			'icon_type'         => 'font-elegant',
			'title'             => ''
		);
		$params = shortcode_atts( $args, $atts );
		
		//Is social share enabled
		$params['enable_social_share'] = wanderland_mikado_options()->getOptionValue( 'enable_social_share' ) === 'yes';
		
		//Is social share enabled for post type
		$post_type         = str_replace( '-', '_', get_post_type() );
		$params['enabled'] = wanderland_mikado_options()->getOptionValue( 'enable_social_share_on_' . $post_type ) === 'yes';
		
		//Social Networks Data
		$params['networks'] = $this->getSocialNetworksParams( $params );
		
		$params['dropdown_class'] = ! empty( $params['dropdown_behavior'] ) ? 'mkdf-' . $params['dropdown_behavior'] : 'mkdf-' . $args['dropdown_behavior'];
		
		$html = '';
		
		if ( $params['enable_social_share'] && $params['enabled'] ) {
			$html = wanderland_core_get_shortcode_module_template_part( 'templates/' . $params['type'], 'social-share', '', $params );
		}
		
		return $html;
	}

    /**
     * Get Social Networks data to display
     * @return array
     */
	private function getSocialNetworksParams( $params ) {
		$networks   = array();
		$icons_type = $params['icon_type'];
		$type       = $params['type'];
		
		foreach ( $this->socialNetworks as $net ) {
			$html = '';
			
			if ( wanderland_mikado_options()->getOptionValue( 'enable_' . $net . '_share' ) == 'yes' ) {
				$image                 = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );
				$params                = array(
					'name' => $net,
					'type' => $type
				);

				$params['link']        = $this->getSocialNetworkShareLink( $net, $image );

				if ($type == 'text') {
					$params['text']    = $this->getSocialNetworkText( $net );
				} else {
					$params['icon']    = $this->getSocialNetworkIcon( $net, $icons_type );
				}

				$params['custom_icon'] = ( wanderland_mikado_options()->getOptionValue( $net . '_icon' ) ) ? wanderland_mikado_options()->getOptionValue( $net . '_icon' ) : '';
				
				$html = wanderland_core_get_shortcode_module_template_part( 'templates/parts/network', 'social-share', '', $params );
			}
			
			$networks[ $net ] = $html;
		}
		
		return $networks;
	}

    /**
     * Get share link for networks
     *
     * @param $net
     * @param $image
     * @return string
     */
    private function getSocialNetworkShareLink($net, $image) {
        switch ($net) {
            case 'facebook':
                if (wp_is_mobile()) {
                    $link = 'window.open(\'https://m.facebook.com/sharer.php?u=' . urlencode(get_permalink()) . '\');';
                } else {
                    $link = 'window.open(\'https://www.facebook.com/sharer.php?u=' . urlencode(get_permalink()) . '\', \'sharer\', \'toolbar=0,status=0,width=620,height=280\');';
                }
                break;
            case 'twitter':
                $count_char = (isset($_SERVER['https'])) ? 23 : 22;
                $twitter_via = (wanderland_mikado_options()->getOptionValue('twitter_via') !== '') ? esc_attr__( ' via ', 'wanderland-core' ) . wanderland_mikado_options()->getOptionValue('twitter_via') . ' ' : '';
                if (wp_is_mobile()) {
	                $link = 'window.open(\'https://twitter.com/share?text=' . urlencode(wanderland_mikado_the_excerpt_max_charlength($count_char) . $twitter_via)  . '&url='. get_permalink() .'\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');';
                } else {
                    $link = 'window.open(\'https://twitter.com/home?status=' . urlencode(wanderland_mikado_the_excerpt_max_charlength($count_char) . $twitter_via) . get_permalink() . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');';
                }
                break;
            case 'linkedin':
                $link = 'popUp=window.open(\'https://linkedin.com/shareArticle?mini=true&amp;url=' . urlencode(get_permalink()) . '&amp;title=' . urlencode(get_the_title()) . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
                break;
            case 'tumblr':
                $link = 'popUp=window.open(\'https://www.tumblr.com/share/link?url=' . urlencode(get_permalink()) . '&amp;name=' . urlencode(get_the_title()) . '&amp;description=' . urlencode(get_the_excerpt()) . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
                break;
            case 'pinterest':
                $link = 'popUp=window.open(\'https://pinterest.com/pin/create/button/?url=' . urlencode(get_permalink()) . '&amp;description=' . wanderland_mikado_addslashes(get_the_title()) . '&amp;media=' . urlencode($image[0]) . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
                break;
            case 'vk':
                $link = 'popUp=window.open(\'https://vkontakte.ru/share.php?url=' . urlencode(get_permalink()) . '&amp;title=' . urlencode(get_the_title()) . '&amp;description=' . urlencode(get_the_excerpt()) . '&amp;image=' . urlencode($image[0]) . '\', \'popupwindow\', \'scrollbars=yes,width=800,height=400\');popUp.focus();return false;';
                break;
            default:
                $link = '';
        }

        return $link;
    }
	
	private function getSocialNetworkIcon( $net, $type ) {
		switch ( $net ) {
			case 'facebook':
				if ( $type == 'font-ion') {
					$icon = 'ion-social-facebook';
				} else {
					$icon = ( $type == 'font-elegant' ) ? 'social_facebook' : 'fab fa-facebook';
				}
				break;
			case 'twitter':
				if ( $type == 'font-ion') {
					$icon = 'ion-social-twitter';
				} else {
					$icon = ( $type == 'font-elegant' ) ? 'social_twitter' : 'fab fa-twitter';
				}
				break;
			case 'linkedin':
				if ( $type == 'font-ion') {
					$icon = 'ion-social-linkedin';
				} else {
					$icon = ( $type == 'font-elegant' ) ? 'social_linkedin' : 'fab fa-linkedin';
				}
				break;
			case 'tumblr':
				if ( $type == 'font-ion') {
					$icon = 'ion-social-tumblr';
				} else {
					$icon = ( $type == 'font-elegant' ) ? 'social_tumblr' : 'fab fa-tumblr';
				}
				break;
			case 'pinterest':
				if ( $type == 'font-ion') {
					$icon = 'ion-social-pinterest';
				} else {
					$icon = ( $type == 'font-elegant' ) ? 'social_pinterest' : 'fab fa-pinterest';
				}
				break;
			case 'vk':
				$icon = 'fab fa-vk';
				break;
			default:
				$icon = '';
		}
		
		return $icon;
	}

	private function getSocialNetworkText( $net ) {
		switch ( $net ) {
			case 'facebook':
				$text = esc_html__( 'fb', 'wanderland-core');
				break;
			case 'twitter':
				$text = esc_html__( 'tw', 'wanderland-core');
				break;
			case 'linkedin':
				$text = esc_html__( 'lnkd', 'wanderland-core');
				break;
			case 'tumblr':
				$text = esc_html__( 'tmb', 'wanderland-core');
				break;
			case 'pinterest':
				$text = esc_html__( 'pin', 'wanderland-core');
				break;
			case 'vk':
				$text = esc_html__( 'vk', 'wanderland-core');
				break;
			default:
				$text = '';
		}
		
		return $text;
	}
}