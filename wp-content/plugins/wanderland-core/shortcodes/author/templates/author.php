<div class="mkdf-author-holder <?php echo esc_attr($holder_classes); ?>">
	<?php if (!empty($custom_link)) { ?>
    <a itemprop="url" href="<?php echo esc_url($custom_link); ?>" target="<?php echo esc_attr($custom_link_target); ?>">
		<?php } ?>
    <div class="mkdf-author-image">
            <?php if(count($image)) : ?>
                <img src="<?php echo WANDERLAND_CORE_URL_PATH . 'shortcodes/author/assets/img/frame.png' ?>" alt="frame-image"/>
                <?php echo wp_get_attachment_image($image['image_id']); ?>
            <?php endif; ?>
    </div>
    <?php if(!empty($title) || !empty($text)) {?>
        <div class="mkdf-author-text-holder" <?php echo wanderland_mikado_get_inline_style($text_styles); ?>>
            <div class="mkdf-author-text-wrapper">
                <?php if(!empty($text)) { ?>
                    <p class="mkdf-author-text" ><?php echo esc_html($text); ?></p>
                <?php } ?>
                <?php if(!empty($title)) { ?>
                    <<?php echo esc_attr($title_tag); ?> class="mkdf-author-title" ><?php echo esc_html($title); ?></<?php echo esc_attr($title_tag); ?>>
                <?php } ?>
                <span class="mkdf-st-highlight">
                    <?php echo wanderland_section_title_highlighted_word_left_svg() ?>
                    <span class="mkdf-active-hover-middle"></span>
                    <?php echo wanderland_section_title_highlighted_word_right_svg() ?>
                </span>
            </div>
        </div>
    <?php }?>
    <?php if (!empty($custom_link)) { ?>
        </a>
    <?php } ?>
</div>