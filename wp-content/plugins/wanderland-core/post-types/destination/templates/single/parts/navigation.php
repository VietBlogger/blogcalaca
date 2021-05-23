<?php if(wanderland_mikado_options()->getOptionValue('destination_single_hide_pagination') !== 'yes') : ?>
    <?php
    $nav_same_category = wanderland_mikado_options()->getOptionValue('destination_single_nav_same_category') == 'yes';
	$imgPrev = get_the_post_thumbnail(get_previous_post(),'wanderland_post_thumb_size');
	$imgNext = get_the_post_thumbnail(get_next_post(), 'wanderland_post_thumb_size');
    ?>
    <div class="mkdf-ds-navigation">
        <?php if(get_previous_post() !== '') : ?>
            <div class="mkdf-ds-prev">
                <?php if($nav_same_category) {
	                echo wp_kses_post($imgPrev);
	                previous_post_link('%link','<span class="mkdf-destination-single-nav-mark ion-ios-arrow-thin-left"></span><span class="mkdf-ps-nav-label">'.esc_html__('Previous Destination','wanderland-core').'</span>', true, '', 'destination-category');
                } else {
	                echo wp_kses_post($imgPrev);
	                previous_post_link('%link','<span class="mkdf-destination-single-nav-mark ion-ios-arrow-thin-left"></span><span class="mkdf-ps-nav-label">'.esc_html__('Previous Destination','wanderland-core').'</span>');
                } ?>
            </div>
        <?php endif; ?>

        <?php if(get_next_post() !== '') : ?>
            <div class="mkdf-ds-next">
                <?php if($nav_same_category) {
                	next_post_link('%link', '<span class="mkdf-ps-nav-label">'.esc_html__('Next Destination','wanderland-core').'</span><span class="mkdf-destination-single-nav-mark ion-ios-arrow-thin-right"></span>', true, '', 'destination-category');
					echo wp_kses_post($imgNext);
                } else {
	                next_post_link('%link', '<span class="mkdf-ps-nav-label">'.esc_html__('Next Destination','wanderland-core').'</span><span class="mkdf-destination-single-nav-mark ion-ios-arrow-thin-right"></span>');
	                echo wp_kses_post($imgNext);
                } ?>
            </div>
        <?php endif; ?>
    </div>
<?php endif; ?>