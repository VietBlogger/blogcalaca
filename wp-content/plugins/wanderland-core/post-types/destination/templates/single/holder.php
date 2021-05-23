<div class="mkdf-container">
    <div class="mkdf-container-inner clearfix">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	        <div class="mkdf-ds-image-inner">
		        <?php
		        $media = wanderland_core_get_destination_single_media();
		
		        if(is_array($media) && count($media)) : ?>
			        <?php if(count($media) > 1) { ?>
				        <div class="mkdf-ps-image-inner mkdf-owl-slider mkdf-small-space" data-number-of-items="3" data-slider-margin="15">
			        <?php } ?>
			        <?php foreach($media as $single_media) : ?>
				        <div class="mkdf-ps-image">
					        <?php wanderland_core_get_destination_single_media_html($single_media); ?>
				        </div>
			        <?php endforeach; ?>
			        <?php if(count($media) > 1) { ?>
				        </div>
			        <?php } ?>
		        <?php endif; ?>
	        </div>
	        <div class="mkdf-grid-row">
	            <div class="mkdf-destination-single-holder mkdf-grid-col-9">
	                <?php if(post_password_required()) {
	                    echo get_the_password_form();
	                } else {
	                    do_action('wanderland_mikado_action_destination_page_before_content'); ?>
		                
		                <?php
		                
		                the_content();
		                
	                    do_action('wanderland_mikado_action_destination_page_after_content'); ?>
		
		                <div class="mkdf-destination-single-info-bottom clearfix">
			                <div class="mkdf-destination-single-info-bottom-left">
				                <?php wanderland_core_get_cpt_single_module_template_part('templates/single/parts/categories', 'destination'); ?>
			                </div>
			                <div class="mkdf-destination-single-info-bottom-right">
				                <?php wanderland_core_get_cpt_single_module_template_part('templates/single/parts/social', 'destination'); ?>
			                </div>
		                </div>
		            
		            <?php
		                wanderland_core_get_cpt_single_module_template_part('templates/single/parts/navigation', 'destination');
		                wanderland_core_get_cpt_single_module_template_part( 'templates/single/parts/author-info', 'destination' );
		                wanderland_core_get_cpt_single_module_template_part('templates/single/parts/comments', 'destination');
	                } ?>
	            </div>
		        <div class="mkdf-sidebar-holder mkdf-grid-col-3">
			        <aside class="mkdf-sidebar">
                        <div class="widget mkdf-widget-sticky-sidebar"></div>
		                <div class="mkdf-single-destination-sidebar">
			                <div class="mkdf-ds-sidebar-top">
				                <div class="mkdf-ds-sidebar-img">
					                <?php
					                $featured_image = get_the_post_thumbnail( get_the_ID(), 'full' ); ?>
					                <?php if($featured_image !== '') {
						                echo get_the_post_thumbnail( get_the_ID(), 'full' );
					                } ?>
					                <div class="mkdf-ds-sidebar-title-holder">
						                <div class="mkdf-ds-sidebar-title-holder-inner">
							                <h5 class="mkdf-ds-item-title">
								                <span>
													<span class="mkdf-ds-title-wrap">
														<?php the_title(); ?>
													</span>
									                <span class="mkdf-st-highlight">
													<?php echo wanderland_core_destination_list_highlighted_word_left_svg(); ?>
													<span class="mkdf-active-hover-middle"></span>
													<?php echo wanderland_core_destination_list_highlighted_word_right_svg(); ?>
									                </span>
												</span>
							                </h5>
						                </div>
					                </div>
				                </div>
				                <div class="mkdf-destination-sidebar-button">
					                <?php
					                $url = get_post_meta(get_the_ID(), 'mkdf_destination_sidebar_link', true);
					                $text = get_post_meta(get_the_ID(), 'mkdf_destination_sidebar_link_text', true);
					                ?>
					                <?php
					                if($url !== '') {
						                echo wanderland_mikado_get_button_html(array(
							                                                        'link' => $url,
							                                                        'size' => 'medium',
							                                                        'text' => $text,
							                                                        'type' => 'solid',
							                                                        'enable_svg_icon' => 'yes',
						                                                        ));
					                } ?>
				                </div>
			                </div>
			                <?php //get destination custom fields section
			                wanderland_core_get_cpt_single_module_template_part('templates/single/parts/custom-fields', 'destination');
			                ?>
				        </div>
			        </aside>
		        </div>
	        </div>
        <?php endwhile; endif; ?>
    </div>
</div>