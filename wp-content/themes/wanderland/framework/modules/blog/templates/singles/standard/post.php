<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="mkdf-post-content">
        <div class="mkdf-post-text">
            <div class="mkdf-post-text-inner">
	            <div class="mkdf-post-info-top">
		            <?php wanderland_mikado_get_module_template_part('templates/parts/post-info/date', 'blog', '', $part_params); ?>
		            <?php
		            $image_meta          = get_post_meta( get_the_ID(), 'mkdf_blog_list_featured_image_meta', true );
		            $has_featured        = ! empty( $image_meta ) || has_post_thumbnail();
		            if ( !$has_featured ) {
			            wanderland_mikado_get_module_template_part('templates/parts/post-info/category-simple', 'blog');
		            } ?>
	            </div>
                <div class="mkdf-post-text-main">
                    <?php wanderland_mikado_get_module_template_part('templates/parts/title', 'blog', '', $part_params); ?>
                    <?php the_content(); ?>
                    <?php do_action('wanderland_mikado_action_single_link_pages'); ?>
                </div>
                <div class="mkdf-post-info-bottom clearfix">
                    <div class="mkdf-post-info-bottom-left">
	                    <?php wanderland_mikado_get_module_template_part('templates/parts/post-info/tags', 'blog', '', $part_params); ?>
                    </div>
                    <div class="mkdf-post-info-bottom-right">
                        <?php wanderland_mikado_get_module_template_part('templates/parts/post-info/share', 'blog', '', $part_params); ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</article>