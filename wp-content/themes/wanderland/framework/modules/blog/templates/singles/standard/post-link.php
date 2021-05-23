<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="mkdf-post-content">
        <div class="mkdf-post-mark">
            <span class="mkdf-link-mark">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" viewBox="0 0 95 76.8" style="enable-background:new 0 0 95 76.8;" xml:space="preserve"><g>	<path class="st0" d="M57.3,18.8c2.1,1.6,3.9,3.7,5.3,6.1l4,6.9l-10.3,6l-4-6.9c-1.2-2-2.8-3.3-4.8-3.8c-2-0.5-4.1-0.2-6.1,1l-24,14 c-2,1.2-3.3,2.8-3.8,4.8c-0.5,2-0.2,4.1,1,6.1l4,6.9c1.2,2,2.8,3.3,4.8,3.8s4.1,0.2,6.1-1l3.4-2c1.6,1.8,3.5,3.1,5.6,4.2 c2.1,1,3.9,1.6,5.3,1.8l1.9,0.3l-10.3,6c-4.7,2.8-9.7,3.4-15,2c-5.3-1.4-9.4-4.4-12.1-9.2l-4-6.9c-2.8-4.7-3.4-9.7-2-15 c1.4-5.3,4.4-9.4,9.2-12.1l24-14c3.4-2,7.2-2.9,11.2-2.7C50.8,15.3,54.3,16.5,57.3,18.8z M59.5,3.8c4.7-2.8,9.7-3.4,15-2 c5.3,1.4,9.4,4.4,12.1,9.2l4,6.9c2.8,4.7,3.4,9.7,2,15c-1.4,5.3-4.4,9.4-9.2,12.1l-24,14c-7.3,4.3-14.5,3.9-21.6-1.1 c-2.4-1.8-4.3-3.8-5.5-6l-4-6.9l10.3-6l4,6.9c1.2,2,2.8,3.3,4.8,3.8c2,0.5,4.1,0.2,6.1-1l24-14c2-1.2,3.3-2.8,3.8-4.8 c0.5-2,0.2-4.1-1-6.1l-4-6.9c-1.2-2-2.8-3.3-4.8-3.8c-2-0.5-4.1-0.2-6.1,1l-3.4,2c-1.6-1.7-3.5-3.1-5.6-4.2c-2.1-1-3.9-1.6-5.3-1.8 l-1.9-0.3L59.5,3.8z"/></g></svg>
            </span>
        </div>
        <div class="mkdf-post-text">
            <div class="mkdf-post-text-inner">
                <div class="mkdf-post-text-main">
                    <?php wanderland_mikado_get_module_template_part('templates/parts/post-type/link', 'blog', '', $part_params); ?>
                </div>
            </div>
        </div>
    </div>
    <div class="mkdf-post-additional-content">
        <?php the_content(); ?>
    </div>
    <div class="mkdf-post-info-bottom">
        <div class="mkdf-post-info-bottom-left">
		    <?php wanderland_mikado_get_module_template_part('templates/parts/post-info/tags', 'blog', '', $part_params); ?>
        </div>
        <div class="mkdf-post-info-bottom-right">
            <?php wanderland_mikado_get_module_template_part('templates/parts/post-info/share', 'blog', '', $part_params); ?>
        </div>
    </div>
</article>