<div class="mkdf-image-with-text-holder <?php echo esc_attr($holder_classes); ?>">
    <div class="mkdf-iwt-image">
        <?php if ($image_behavior === 'lightbox') { ?>
            <a itemprop="image" href="<?php echo esc_url($image['url']); ?>" data-rel="prettyPhoto[iwt_pretty_photo]" title="<?php echo esc_attr($image['alt']); ?>">
        <?php } else if ($image_behavior === 'custom-link' && !empty($custom_link)) { ?>
	            <a itemprop="url" href="<?php echo esc_url($custom_link); ?>" target="<?php echo esc_attr($custom_link_target); ?>">
        <?php } ?>
            <?php if(is_array($image_size) && count($image_size)) : ?>
                <?php echo wanderland_mikado_generate_thumbnail($image['image_id'], null, $image_size[0], $image_size[1]); ?>
            <?php else: ?>
                <?php echo wp_get_attachment_image($image['image_id'], $image_size); ?>
            <?php endif; ?>
        <?php if ($image_behavior === 'lightbox' || $image_behavior === 'custom-link') { ?>
            </a>
        <?php } ?>
        <?php if(!empty($badge_image) || (!empty($svg) && $badge_type == 'svg')) { ?>
	        <?php if(!empty($badge_image)) { ?>
				<div class="mkdf-iwt-badge">
					<?php echo wp_get_attachment_image($badge_image, 'full'); ?>
		        </div>
				<?php
	        } else if(!empty($svg) && $badge_type == 'svg'){
		
		        $params['svg'] = urldecode(base64_decode($params['svg']));
		
		        echo wanderland_mikado_get_module_part(  $params['svg'] );
		
	        } ?>
        <?php } ?>
    </div>
    <div class="mkdf-iwt-text-holder">
        <?php if(!empty($title)) { ?>
            <<?php echo esc_attr($title_tag); ?> class="mkdf-iwt-title" <?php echo wanderland_mikado_get_inline_style($title_styles); ?>>
	            <span class="mkdf-iwt-title-wrap">
		            <?php echo esc_html($title); ?>
				    <?php if ($image_behavior === 'custom-link' && empty($text)) { ?>
					    <span class="mkdf-iwt-highlight">
								<?php echo wanderland_core_destination_list_highlighted_word_left_svg(); ?>
						    <span class="mkdf-active-hover-middle"></span>
						    <?php echo wanderland_core_destination_list_highlighted_word_right_svg(); ?>
							</span>
				    <?php } ?>
	            </span>
            </<?php echo esc_attr($title_tag); ?>>
		<?php } ?>
		<?php if(!empty($text)) { ?>
            <p class="mkdf-iwt-text" <?php echo wanderland_mikado_get_inline_style($text_styles); ?>><?php echo esc_html($text); ?></p>
        <?php } ?>
    </div>
</div>