<?php

if ( ! function_exists( 'wanderland_mikado_general_options_map' ) ) {
	/**
	 * General options page
	 */
	function wanderland_mikado_general_options_map() {
		
		wanderland_mikado_add_admin_page(
			array(
				'slug'  => '',
				'title' => esc_html__( 'General', 'wanderland' ),
				'icon'  => 'fa fa-institution'
			)
		);
		
		$panel_design_style = wanderland_mikado_add_admin_panel(
			array(
				'page'  => '',
				'name'  => 'panel_design_style',
				'title' => esc_html__( 'Design Style', 'wanderland' )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'google_fonts',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Google Font Family', 'wanderland' ),
				'description'   => esc_html__( 'Choose a default Google font for your site', 'wanderland' ),
				'parent'        => $panel_design_style
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_fonts',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Additional Google Fonts', 'wanderland' ),
				'parent'        => $panel_design_style
			)
		);
		
		$additional_google_fonts_container = wanderland_mikado_add_admin_container(
			array(
				'parent'          => $panel_design_style,
				'name'            => 'additional_google_fonts_container',
				'dependency' => array(
					'show' => array(
						'additional_google_fonts'  => 'yes'
					)
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font1',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'wanderland' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'wanderland' ),
				'parent'        => $additional_google_fonts_container
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font2',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'wanderland' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'wanderland' ),
				'parent'        => $additional_google_fonts_container
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font3',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'wanderland' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'wanderland' ),
				'parent'        => $additional_google_fonts_container
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font4',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'wanderland' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'wanderland' ),
				'parent'        => $additional_google_fonts_container
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'additional_google_font5',
				'type'          => 'font',
				'default_value' => '-1',
				'label'         => esc_html__( 'Font Family', 'wanderland' ),
				'description'   => esc_html__( 'Choose additional Google font for your site', 'wanderland' ),
				'parent'        => $additional_google_fonts_container
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'google_font_weight',
				'type'          => 'checkboxgroup',
				'default_value' => '',
				'label'         => esc_html__( 'Google Fonts Style & Weight', 'wanderland' ),
				'description'   => esc_html__( 'Choose a default Google font weights for your site. Impact on page load time', 'wanderland' ),
				'parent'        => $panel_design_style,
				'options'       => array(
					'100'  => esc_html__( '100 Thin', 'wanderland' ),
					'100i' => esc_html__( '100 Thin Italic', 'wanderland' ),
					'200'  => esc_html__( '200 Extra-Light', 'wanderland' ),
					'200i' => esc_html__( '200 Extra-Light Italic', 'wanderland' ),
					'300'  => esc_html__( '300 Light', 'wanderland' ),
					'300i' => esc_html__( '300 Light Italic', 'wanderland' ),
					'400'  => esc_html__( '400 Regular', 'wanderland' ),
					'400i' => esc_html__( '400 Regular Italic', 'wanderland' ),
					'500'  => esc_html__( '500 Medium', 'wanderland' ),
					'500i' => esc_html__( '500 Medium Italic', 'wanderland' ),
					'600'  => esc_html__( '600 Semi-Bold', 'wanderland' ),
					'600i' => esc_html__( '600 Semi-Bold Italic', 'wanderland' ),
					'700'  => esc_html__( '700 Bold', 'wanderland' ),
					'700i' => esc_html__( '700 Bold Italic', 'wanderland' ),
					'800'  => esc_html__( '800 Extra-Bold', 'wanderland' ),
					'800i' => esc_html__( '800 Extra-Bold Italic', 'wanderland' ),
					'900'  => esc_html__( '900 Ultra-Bold', 'wanderland' ),
					'900i' => esc_html__( '900 Ultra-Bold Italic', 'wanderland' )
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'google_font_subset',
				'type'          => 'checkboxgroup',
				'default_value' => '',
				'label'         => esc_html__( 'Google Fonts Subset', 'wanderland' ),
				'description'   => esc_html__( 'Choose a default Google font subsets for your site', 'wanderland' ),
				'parent'        => $panel_design_style,
				'options'       => array(
					'latin'        => esc_html__( 'Latin', 'wanderland' ),
					'latin-ext'    => esc_html__( 'Latin Extended', 'wanderland' ),
					'cyrillic'     => esc_html__( 'Cyrillic', 'wanderland' ),
					'cyrillic-ext' => esc_html__( 'Cyrillic Extended', 'wanderland' ),
					'greek'        => esc_html__( 'Greek', 'wanderland' ),
					'greek-ext'    => esc_html__( 'Greek Extended', 'wanderland' ),
					'vietnamese'   => esc_html__( 'Vietnamese', 'wanderland' )
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'first_color',
				'type'        => 'color',
				'label'       => esc_html__( 'First Main Color', 'wanderland' ),
				'description' => esc_html__( 'Choose the most dominant theme color. Default color is #00bbb3', 'wanderland' ),
				'parent'      => $panel_design_style
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'page_background_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Page Background Color', 'wanderland' ),
				'description' => esc_html__( 'Choose the background color for page content. Default color is #ffffff', 'wanderland' ),
				'parent'      => $panel_design_style
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'page_background_image',
				'type'        => 'image',
				'label'       => esc_html__( 'Page Background Image', 'wanderland' ),
				'description' => esc_html__( 'Choose the background image for page content', 'wanderland' ),
				'parent'      => $panel_design_style
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'page_background_image_repeat',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Page Background Image Repeat', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will set the background image as a repeating pattern throughout the page, otherwise the image will appear as the cover background image', 'wanderland' ),
				'parent'        => $panel_design_style
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'selection_color',
				'type'        => 'color',
				'label'       => esc_html__( 'Text Selection Color', 'wanderland' ),
				'description' => esc_html__( 'Choose the color users see when selecting text', 'wanderland' ),
				'parent'      => $panel_design_style
			)
		);
		
		/***************** Passepartout Layout - begin **********************/
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'boxed',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Boxed Layout', 'wanderland' ),
				'parent'        => $panel_design_style
			)
		);
		
			$boxed_container = wanderland_mikado_add_admin_container(
				array(
					'parent'          => $panel_design_style,
					'name'            => 'boxed_container',
					'dependency' => array(
						'show' => array(
							'boxed'  => 'yes'
						)
					)
				)
			);
		
				wanderland_mikado_add_admin_field(
					array(
						'name'        => 'page_background_color_in_box',
						'type'        => 'color',
						'label'       => esc_html__( 'Page Background Color', 'wanderland' ),
						'description' => esc_html__( 'Choose the page background color outside box', 'wanderland' ),
						'parent'      => $boxed_container
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'name'        => 'boxed_background_image',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Image', 'wanderland' ),
						'description' => esc_html__( 'Choose an image to be displayed in background', 'wanderland' ),
						'parent'      => $boxed_container
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'name'        => 'boxed_pattern_background_image',
						'type'        => 'image',
						'label'       => esc_html__( 'Background Pattern', 'wanderland' ),
						'description' => esc_html__( 'Choose an image to be used as background pattern', 'wanderland' ),
						'parent'      => $boxed_container
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'name'          => 'boxed_background_image_attachment',
						'type'          => 'select',
						'default_value' => '',
						'label'         => esc_html__( 'Background Image Attachment', 'wanderland' ),
						'description'   => esc_html__( 'Choose background image attachment', 'wanderland' ),
						'parent'        => $boxed_container,
						'options'       => array(
							''       => esc_html__( 'Default', 'wanderland' ),
							'fixed'  => esc_html__( 'Fixed', 'wanderland' ),
							'scroll' => esc_html__( 'Scroll', 'wanderland' )
						)
					)
				);
		
		/***************** Boxed Layout - end **********************/
		
		/***************** Passepartout Layout - begin **********************/
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'paspartu',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Passepartout', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will display passepartout around site content', 'wanderland' ),
				'parent'        => $panel_design_style
			)
		);
		
			$paspartu_container = wanderland_mikado_add_admin_container(
				array(
					'parent'          => $panel_design_style,
					'name'            => 'paspartu_container',
					'dependency' => array(
						'show' => array(
							'paspartu'  => 'yes'
						)
					)
				)
			);
		
				wanderland_mikado_add_admin_field(
					array(
						'name'        => 'paspartu_color',
						'type'        => 'color',
						'label'       => esc_html__( 'Passepartout Color', 'wanderland' ),
						'description' => esc_html__( 'Choose passepartout color, default value is #ffffff', 'wanderland' ),
						'parent'      => $paspartu_container
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'name'        => 'paspartu_width',
						'type'        => 'text',
						'label'       => esc_html__( 'Passepartout Size', 'wanderland' ),
						'description' => esc_html__( 'Enter size amount for passepartout', 'wanderland' ),
						'parent'      => $paspartu_container,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px or %'
						)
					)
				);
		
				wanderland_mikado_add_admin_field(
					array(
						'name'        => 'paspartu_responsive_width',
						'type'        => 'text',
						'label'       => esc_html__( 'Responsive Passepartout Size', 'wanderland' ),
						'description' => esc_html__( 'Enter size amount for passepartout for smaller screens (tablets and mobiles view)', 'wanderland' ),
						'parent'      => $paspartu_container,
						'args'        => array(
							'col_width' => 2,
							'suffix'    => 'px or %'
						)
					)
				);
				
				wanderland_mikado_add_admin_field(
					array(
						'parent'        => $paspartu_container,
						'type'          => 'yesno',
						'default_value' => 'no',
						'name'          => 'disable_top_paspartu',
						'label'         => esc_html__( 'Disable Top Passepartout', 'wanderland' )
					)
				);
		
				wanderland_mikado_add_admin_field(
					array(
						'parent'        => $paspartu_container,
						'type'          => 'yesno',
						'default_value' => 'no',
						'name'          => 'enable_fixed_paspartu',
						'label'         => esc_html__( 'Enable Fixed Passepartout', 'wanderland' ),
						'description' => esc_html__( 'Enabling this option will set fixed passepartout for your screens', 'wanderland' )
					)
				);
		
		/***************** Passepartout Layout - end **********************/
		
		/***************** Content Layout - begin **********************/
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'initial_content_width',
				'type'          => 'select',
				'default_value' => '',
				'label'         => esc_html__( 'Initial Width of Content', 'wanderland' ),
				'description'   => esc_html__( 'Choose the initial width of content which is in grid (Applies to pages set to "Default Template" and rows set to "In Grid")', 'wanderland' ),
				'parent'        => $panel_design_style,
				'options'       => array(
					'mkdf-grid-1100' => esc_html__( '1100px - default', 'wanderland' ),
					'mkdf-grid-1300' => esc_html__( '1300px', 'wanderland' ),
					'mkdf-grid-1200' => esc_html__( '1200px', 'wanderland' ),
					'mkdf-grid-1000' => esc_html__( '1000px', 'wanderland' ),
					'mkdf-grid-800'  => esc_html__( '800px', 'wanderland' )
				)
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'preload_pattern_image',
				'type'          => 'image',
				'label'         => esc_html__( 'Preload Pattern Image', 'wanderland' ),
				'description'   => esc_html__( 'Choose preload pattern image to be displayed until images are loaded', 'wanderland' ),
				'parent'        => $panel_design_style
			)
		);
		
		/***************** Content Layout - end **********************/
		
		$panel_settings = wanderland_mikado_add_admin_panel(
			array(
				'page'  => '',
				'name'  => 'panel_settings',
				'title' => esc_html__( 'Settings', 'wanderland' )
			)
		);
		
		/***************** Smooth Scroll Layout - begin **********************/
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'page_smooth_scroll',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Smooth Scroll', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will perform a smooth scrolling effect on every page (except on Mac and touch devices)', 'wanderland' ),
				'parent'        => $panel_settings
			)
		);
		
		/***************** Smooth Scroll Layout - end **********************/
		
		/***************** Smooth Page Transitions Layout - begin **********************/
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'smooth_page_transitions',
				'type'          => 'yesno',
				'default_value' => 'no',
				'label'         => esc_html__( 'Smooth Page Transitions', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will perform a smooth transition between pages when clicking on links', 'wanderland' ),
				'parent'        => $panel_settings
			)
		);
		
			$page_transitions_container = wanderland_mikado_add_admin_container(
				array(
					'parent'          => $panel_settings,
					'name'            => 'page_transitions_container',
					'dependency' => array(
						'show' => array(
							'smooth_page_transitions'  => 'yes'
						)
					)
				)
			);
		
				wanderland_mikado_add_admin_field(
					array(
						'name'          => 'page_transition_preloader',
						'type'          => 'yesno',
						'default_value' => 'no',
						'label'         => esc_html__( 'Enable Preloading Animation', 'wanderland' ),
						'description'   => esc_html__( 'Enabling this option will display an animated preloader while the page content is loading', 'wanderland' ),
						'parent'        => $page_transitions_container
					)
				);
				
				$page_transition_preloader_container = wanderland_mikado_add_admin_container(
					array(
						'parent'          => $page_transitions_container,
						'name'            => 'page_transition_preloader_container',
						'dependency' => array(
							'show' => array(
								'page_transition_preloader'  => 'yes'
							)
						)
					)
				);
				
					wanderland_mikado_add_admin_field(
						array(
							'name'   => 'smooth_pt_bgnd_color',
							'type'   => 'color',
							'label'  => esc_html__( 'Page Loader Background Color', 'wanderland' ),
							'parent' => $page_transition_preloader_container
						)
					);
					
					$group_pt_spinner_animation = wanderland_mikado_add_admin_group(
						array(
							'name'        => 'group_pt_spinner_animation',
							'title'       => esc_html__( 'Loader Style', 'wanderland' ),
							'description' => esc_html__( 'Define styles for loader spinner animation', 'wanderland' ),
							'parent'      => $page_transition_preloader_container
						)
					);
					
					$row_pt_spinner_animation = wanderland_mikado_add_admin_row(
						array(
							'name'   => 'row_pt_spinner_animation',
							'parent' => $group_pt_spinner_animation
						)
					);
					
					wanderland_mikado_add_admin_field(
						array(
							'type'          => 'selectsimple',
							'name'          => 'smooth_pt_spinner_type',
							'default_value' => '',
							'label'         => esc_html__( 'Spinner Type', 'wanderland' ),
							'parent'        => $row_pt_spinner_animation,
							'options'       => array(
								'wanderland_spinner'    => esc_html__( 'Wanderland Spinner', 'wanderland' ),
								'rotate_circles'        => esc_html__( 'Rotate Circles', 'wanderland' ),
								'pulse'                 => esc_html__( 'Pulse', 'wanderland' ),
								'double_pulse'          => esc_html__( 'Double Pulse', 'wanderland' ),
								'cube'                  => esc_html__( 'Cube', 'wanderland' ),
								'rotating_cubes'        => esc_html__( 'Rotating Cubes', 'wanderland' ),
								'stripes'               => esc_html__( 'Stripes', 'wanderland' ),
								'wave'                  => esc_html__( 'Wave', 'wanderland' ),
								'two_rotating_circles'  => esc_html__( '2 Rotating Circles', 'wanderland' ),
								'five_rotating_circles' => esc_html__( '5 Rotating Circles', 'wanderland' ),
								'atom'                  => esc_html__( 'Atom', 'wanderland' ),
								'clock'                 => esc_html__( 'Clock', 'wanderland' ),
								'mitosis'               => esc_html__( 'Mitosis', 'wanderland' ),
								'lines'                 => esc_html__( 'Lines', 'wanderland' ),
								'fussion'               => esc_html__( 'Fussion', 'wanderland' ),
								'wave_circles'          => esc_html__( 'Wave Circles', 'wanderland' ),
								'pulse_circles'         => esc_html__( 'Pulse Circles', 'wanderland' )
							)
						)
					);
					
					wanderland_mikado_add_admin_field(
						array(
							'type'          => 'colorsimple',
							'name'          => 'smooth_pt_spinner_color',
							'default_value' => '',
							'label'         => esc_html__( 'Spinner Color', 'wanderland' ),
							'parent'        => $row_pt_spinner_animation
						)
					);
					
					wanderland_mikado_add_admin_field(
						array(
							'name'          => 'page_transition_fadeout',
							'type'          => 'yesno',
							'default_value' => 'no',
							'label'         => esc_html__( 'Enable Fade Out Animation', 'wanderland' ),
							'description'   => esc_html__( 'Enabling this option will turn on fade out animation when leaving page', 'wanderland' ),
							'parent'        => $page_transitions_container
						)
					);
		
		/***************** Smooth Page Transitions Layout - end **********************/
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'show_back_button',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Show "Back To Top Button"', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will display a Back to Top button on every page', 'wanderland' ),
				'parent'        => $panel_settings
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'          => 'responsiveness',
				'type'          => 'yesno',
				'default_value' => 'yes',
				'label'         => esc_html__( 'Responsiveness', 'wanderland' ),
				'description'   => esc_html__( 'Enabling this option will make all pages responsive', 'wanderland' ),
				'parent'        => $panel_settings
			)
		);
		
		$panel_custom_code = wanderland_mikado_add_admin_panel(
			array(
				'page'  => '',
				'name'  => 'panel_custom_code',
				'title' => esc_html__( 'Custom Code', 'wanderland' )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'custom_js',
				'type'        => 'textarea',
				'label'       => esc_html__( 'Custom JS', 'wanderland' ),
				'description' => esc_html__( 'Enter your custom Javascript here', 'wanderland' ),
				'parent'      => $panel_custom_code
			)
		);
		
		$panel_google_api = wanderland_mikado_add_admin_panel(
			array(
				'page'  => '',
				'name'  => 'panel_google_api',
				'title' => esc_html__( 'Google API', 'wanderland' )
			)
		);
		
		wanderland_mikado_add_admin_field(
			array(
				'name'        => 'google_maps_api_key',
				'type'        => 'text',
				'label'       => esc_html__( 'Google Maps Api Key', 'wanderland' ),
				'description' => esc_html__( 'Insert your Google Maps API key here. For instructions on how to create a Google Maps API key, please refer to our to our documentation.', 'wanderland' ),
				'parent'      => $panel_google_api
			)
		);
	}
	
	add_action( 'wanderland_mikado_action_options_map', 'wanderland_mikado_general_options_map', wanderland_mikado_set_options_map_position( 'general' ) );
}

if ( ! function_exists( 'wanderland_mikado_page_general_style' ) ) {
	/**
	 * Function that prints page general inline styles
	 */
	function wanderland_mikado_page_general_style( $style ) {
		$current_style = '';
		$page_id       = wanderland_mikado_get_page_id();
		$class_prefix  = wanderland_mikado_get_unique_page_class( $page_id );
		
		$boxed_background_style = array();
		
		$boxed_page_background_color = wanderland_mikado_get_meta_field_intersect( 'page_background_color_in_box', $page_id );
		if ( ! empty( $boxed_page_background_color ) ) {
			$boxed_background_style['background-color'] = $boxed_page_background_color;
		}
		
		$boxed_page_background_image = wanderland_mikado_get_meta_field_intersect( 'boxed_background_image', $page_id );
		if ( ! empty( $boxed_page_background_image ) ) {
			$boxed_background_style['background-image']    = 'url(' . esc_url( $boxed_page_background_image ) . ')';
			$boxed_background_style['background-position'] = 'center 0px';
			$boxed_background_style['background-repeat']   = 'no-repeat';
		}
		
		$boxed_page_background_pattern_image = wanderland_mikado_get_meta_field_intersect( 'boxed_pattern_background_image', $page_id );
		if ( ! empty( $boxed_page_background_pattern_image ) ) {
			$boxed_background_style['background-image']    = 'url(' . esc_url( $boxed_page_background_pattern_image ) . ')';
			$boxed_background_style['background-position'] = '0px 0px';
			$boxed_background_style['background-repeat']   = 'repeat';
		}
		
		$boxed_page_background_attachment = wanderland_mikado_get_meta_field_intersect( 'boxed_background_image_attachment', $page_id );
		if ( ! empty( $boxed_page_background_attachment ) ) {
			$boxed_background_style['background-attachment'] = $boxed_page_background_attachment;
		}
		
		$boxed_background_selector = $class_prefix . '.mkdf-boxed .mkdf-wrapper';
		
		if ( ! empty( $boxed_background_style ) ) {
			$current_style .= wanderland_mikado_dynamic_css( $boxed_background_selector, $boxed_background_style );
		}
		
		$paspartu_style     = array();
		$paspartu_res_style = array();
		$paspartu_res_start = '@media only screen and (max-width: 1024px) {';
		$paspartu_res_end   = '}';
		
		$paspartu_header_selector                = array(
			'.mkdf-paspartu-enabled .mkdf-page-header .mkdf-fixed-wrapper.fixed',
			'.mkdf-paspartu-enabled .mkdf-sticky-header',
			'.mkdf-paspartu-enabled .mkdf-mobile-header.mobile-header-appear .mkdf-mobile-header-inner'
		);
		$paspartu_header_appear_selector         = array(
			'.mkdf-paspartu-enabled.mkdf-fixed-paspartu-enabled .mkdf-page-header .mkdf-fixed-wrapper.fixed',
			'.mkdf-paspartu-enabled.mkdf-fixed-paspartu-enabled .mkdf-sticky-header.header-appear',
			'.mkdf-paspartu-enabled.mkdf-fixed-paspartu-enabled .mkdf-mobile-header.mobile-header-appear .mkdf-mobile-header-inner'
		);
		
		$paspartu_header_style                   = array();
		$paspartu_header_appear_style            = array();
		$paspartu_header_responsive_style        = array();
		$paspartu_header_appear_responsive_style = array();
		
		$paspartu_color = wanderland_mikado_get_meta_field_intersect( 'paspartu_color', $page_id );
		if ( ! empty( $paspartu_color ) ) {
			$paspartu_style['background-color'] = $paspartu_color;
		}
		
		$paspartu_width = wanderland_mikado_get_meta_field_intersect( 'paspartu_width', $page_id );
		if ( $paspartu_width !== '' ) {
			if ( wanderland_mikado_string_ends_with( $paspartu_width, '%' ) || wanderland_mikado_string_ends_with( $paspartu_width, 'px' ) ) {
				$paspartu_style['padding'] = $paspartu_width;
				
				$paspartu_clean_width      = wanderland_mikado_string_ends_with( $paspartu_width, '%' ) ? wanderland_mikado_filter_suffix( $paspartu_width, '%' ) : wanderland_mikado_filter_suffix( $paspartu_width, 'px' );
				$paspartu_clean_width_mark = wanderland_mikado_string_ends_with( $paspartu_width, '%' ) ? '%' : 'px';
				
				$paspartu_header_style['left']              = $paspartu_width;
				$paspartu_header_style['width']             = 'calc(100% - ' . ( 2 * $paspartu_clean_width ) . $paspartu_clean_width_mark . ')';
				$paspartu_header_appear_style['margin-top'] = $paspartu_width;
			} else {
				$paspartu_style['padding'] = $paspartu_width . 'px';
				
				$paspartu_header_style['left']              = $paspartu_width . 'px';
				$paspartu_header_style['width']             = 'calc(100% - ' . ( 2 * $paspartu_width ) . 'px)';
				$paspartu_header_appear_style['margin-top'] = $paspartu_width . 'px';
			}
		}
		
		$paspartu_selector = $class_prefix . '.mkdf-paspartu-enabled .mkdf-wrapper';
		
		if ( ! empty( $paspartu_style ) ) {
			$current_style .= wanderland_mikado_dynamic_css( $paspartu_selector, $paspartu_style );
		}
		
		if ( ! empty( $paspartu_header_style ) ) {
			$current_style .= wanderland_mikado_dynamic_css( $paspartu_header_selector, $paspartu_header_style );
			$current_style .= wanderland_mikado_dynamic_css( $paspartu_header_appear_selector, $paspartu_header_appear_style );
		}
		
		$paspartu_responsive_width = wanderland_mikado_get_meta_field_intersect( 'paspartu_responsive_width', $page_id );
		if ( $paspartu_responsive_width !== '' ) {
			if ( wanderland_mikado_string_ends_with( $paspartu_responsive_width, '%' ) || wanderland_mikado_string_ends_with( $paspartu_responsive_width, 'px' ) ) {
				$paspartu_res_style['padding'] = $paspartu_responsive_width;
				
				$paspartu_clean_width      = wanderland_mikado_string_ends_with( $paspartu_responsive_width, '%' ) ? wanderland_mikado_filter_suffix( $paspartu_responsive_width, '%' ) : wanderland_mikado_filter_suffix( $paspartu_responsive_width, 'px' );
				$paspartu_clean_width_mark = wanderland_mikado_string_ends_with( $paspartu_responsive_width, '%' ) ? '%' : 'px';
				
				$paspartu_header_responsive_style['left']              = $paspartu_responsive_width;
				$paspartu_header_responsive_style['width']             = 'calc(100% - ' . ( 2 * $paspartu_clean_width ) . $paspartu_clean_width_mark . ')';
				$paspartu_header_appear_responsive_style['margin-top'] = $paspartu_responsive_width;
			} else {
				$paspartu_res_style['padding'] = $paspartu_responsive_width . 'px';
				
				$paspartu_header_responsive_style['left']              = $paspartu_responsive_width . 'px';
				$paspartu_header_responsive_style['width']             = 'calc(100% - ' . ( 2 * $paspartu_responsive_width ) . 'px)';
				$paspartu_header_appear_responsive_style['margin-top'] = $paspartu_responsive_width . 'px';
			}
		}
		
		if ( ! empty( $paspartu_res_style ) ) {
			$current_style .= $paspartu_res_start . wanderland_mikado_dynamic_css( $paspartu_selector, $paspartu_res_style ) . $paspartu_res_end;
		}
		
		if ( ! empty( $paspartu_header_responsive_style ) ) {
			$current_style .= $paspartu_res_start . wanderland_mikado_dynamic_css( $paspartu_header_selector, $paspartu_header_responsive_style ) . $paspartu_res_end;
			$current_style .= $paspartu_res_start . wanderland_mikado_dynamic_css( $paspartu_header_appear_selector, $paspartu_header_appear_responsive_style ) . $paspartu_res_end;
		}
		
		$current_style = $current_style . $style;
		
		return $current_style;
	}
	
	add_filter( 'wanderland_mikado_filter_add_page_custom_style', 'wanderland_mikado_page_general_style' );
}