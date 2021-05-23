<?php if(wanderland_mikado_options()->getOptionValue('destination_single_enable_categories') === 'yes') : ?>
    <?php
    $categories   = wp_get_post_terms(get_the_ID(), 'destination-category');
    if(is_array($categories) && count($categories)) : ?>
        <div class="mkdf-ds-info-item mkdf-ds-categories">
            <?php foreach($categories as $cat) { ?>
                <a itemprop="url" class="mkdf-ds-info-category" href="<?php echo esc_url(get_term_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
            <?php } ?>
        </div>
    <?php endif; ?>
<?php endif; ?>
