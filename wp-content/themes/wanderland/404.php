<?php get_header(); ?>
				<div class="mkdf-page-not-found">
					<?php
					$mkdf_title_image_404 = wanderland_mikado_options()->getOptionValue( '404_page_title_image' );
					$mkdf_title_404       = wanderland_mikado_options()->getOptionValue( '404_title' );
					$mkdf_subtitle_404    = wanderland_mikado_options()->getOptionValue( '404_subtitle' );
					$mkdf_text_404        = wanderland_mikado_options()->getOptionValue( '404_text' );
					$mkdf_button_label    = wanderland_mikado_options()->getOptionValue( '404_back_to_home' );
					$mkdf_button_style    = wanderland_mikado_options()->getOptionValue( '404_button_style' );
					
					if ( ! empty( $mkdf_title_image_404 ) ) { ?>
						<div class="mkdf-404-title-image">
							<img src="<?php echo esc_url( $mkdf_title_image_404 ); ?>" alt="<?php esc_attr_e( '404 Title Image', 'wanderland' ); ?>" />
						</div>
					<?php } ?>
					
					<h1 class="mkdf-404-title">
						<?php if ( ! empty( $mkdf_title_404 ) ) {
							echo esc_html( $mkdf_title_404 );
						} else {
							esc_html_e( '404', 'wanderland' );
						} ?>
					</h1>
					
					<h3 class="mkdf-404-subtitle">
						<?php if ( ! empty( $mkdf_subtitle_404 ) ) {
							echo esc_html( $mkdf_subtitle_404 );
						} else {
							esc_html_e( 'Page not found', 'wanderland' );
						} ?>
					</h3>
					
					<p class="mkdf-404-text">
						<?php if ( ! empty( $mkdf_text_404 ) ) {
							echo esc_html( $mkdf_text_404 );
						} else {
							esc_html_e( 'Oops! The page you are looking for does not exist. It might have been moved or deleted.', 'wanderland' );
						} ?>
					</p>
					
					<?php if (!empty($mkdf_button_label)) {
						$button_params = array(
							'link' => esc_url( home_url( '/' ) ),
							'text' => ! empty( $mkdf_button_label ) ? $mkdf_button_label : esc_html__( 'Back to home', 'wanderland' )
						);

						if ( $mkdf_button_style == 'light-style' ) {
							$button_params['custom_class'] = 'mkdf-btn-light-style';
						}

						echo wanderland_mikado_return_button_html( $button_params );
					} else {?>
                    <form role="search" method="get" class="mkdf-searchform searchform" id="searchform-<?php echo esc_attr(rand(0, 1000)); ?>" action="<?php echo esc_url( home_url( '/' ) ); ?>">
                        <div class="input-holder clearfix">
                            <input type="search" class="search-field" placeholder="<?php esc_attr_e( 'Enter keywords...', 'wanderland' ); ?>" value="" name="s" title="<?php esc_attr_e( 'Enter keywords', 'wanderland' ); ?>"/>
                            <button type="submit" class="mkdf-search-submit mkdf-btn mkdf-btn-medium mkdf-btn-solid mkdf-btn-icon mkdf-btn-svg-icon">
                                <span  class="mkdf-btn-text"><?php echo esc_html__('SEARCH','wanderland')?></span>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 17 17" style="enable-background:new 0 0 17 17;" xml:space="preserve"><g><path d="M15,1.9"/><line x1="1.7" y1="15.3" x2="15" y2="1.9"/><line x1="16" y1="1.9" x2="15" y2="1.9"/><line x1="15" y1="1.9" x2="1" y2="1.9"/><path d="M15,1.9"/><line x1="15" y1="16" x2="15" y2="1.9"/></g></svg>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 17 17" style="enable-background:new 0 0 17 17;" xml:space="preserve"><g><path d="M15,1.9"/><line x1="1.7" y1="15.3" x2="15" y2="1.9"/><line  x1="16" y1="1.9" x2="15" y2="1.9"/><line x1="15" y1="1.9" x2="1" y2="1.9"/><path d="M15,1.9"/><line x1="15" y1="16" x2="15" y2="1.9"/></g></svg>
                            </button>
                        </div>
                    </form>
                    <?php }?>
				</div>
			</div>
		</div>
	</div>
</div>
<?php
/**
 * wanderland_mikado_action_before_closing_body_tag hook
 *
 * @see wanderland_mikado_get_side_area() - hooked with 10
 * @see wanderland_mikado_smooth_page_transitions() - hooked with 10
 */
do_action( 'wanderland_mikado_action_before_closing_body_tag' ); ?>
<?php wp_footer(); ?>
</body>
</html>