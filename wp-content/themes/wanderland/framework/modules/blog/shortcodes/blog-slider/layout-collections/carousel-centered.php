<li class="mkdf-blog-slider-item">
    <div class="mkdf-blog-slider-item-inner">
        <div class="mkdf-item-image">
            <a itemprop="url" href="<?php echo get_permalink(); ?>">
                <?php echo get_the_post_thumbnail(get_the_ID(), $image_size); ?>
            </a>
            <?php if ($post_info_category == 'yes') {
	            wanderland_mikado_get_module_template_part('templates/parts/post-info/category', 'blog', '', $params);
            }?>
        </div>
        <div class="mkdf-item-text-wrapper">
            <div class="mkdf-item-text-holder">
                <a itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"></a>
                <div class="mkdf-item-text-holder-inner">
	                <?php if($post_info_date == 'yes' || $post_info_category == 'yes' || $post_info_author == 'yes' || $post_info_comments == 'yes'){ ?>
		                <div class="mkdf-item-info-section">
			                <?php
			                if ($post_info_date == 'yes') {
				                wanderland_mikado_get_module_template_part('templates/parts/post-info/date', 'blog', '', $params);
			                }
			                if ($post_info_author == 'yes') {
				                wanderland_mikado_get_module_template_part('templates/parts/post-info/author', 'blog', '', $params);
			                }
			                if ($post_info_comments == 'yes') {
				                wanderland_mikado_get_module_template_part('templates/parts/post-info/comments', 'blog', '', $params);
			                }
			                ?>
		                </div>
	                <?php } ?>
	                <?php wanderland_mikado_get_module_template_part('templates/parts/title', 'blog', '', $params); ?>
                </div>
            </div>
        </div>
    </div>
</li>