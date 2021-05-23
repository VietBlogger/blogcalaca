<article id="post-<?php the_ID(); ?>" <?php post_class($post_classes); ?>>
    <div class="mkdf-post-content">
        <div class="mkdf-post-mark">
            <span class="mkdf-quote-mark">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" viewBox="0 0 66 66" style="enable-background:new 0 0 66 66;" xml:space="preserve"><path class="st0" d="M23.5,0.5H10.3c-5.4,0-9.8,4.4-9.8,9.7v26c0,5.4,4.4,9.7,9.8,9.7h7.9c0.9,0,1.7,0.8,1.6,1.7 c-0.5,7.2-3.8,12.2-6.4,15c-1,1.1-0.2,2.7,1.2,2.7h8.1c0.5,0,1-0.2,1.3-0.6c1.5-1.9,5.8-8.4,5.8-19.1v-39C29.7,3.2,27,0.5,23.5,0.5 L23.5,0.5z M59.2,0.5H46c-5.4,0-9.8,4.4-9.8,9.7v26c0,5.4,4.4,9.7,9.8,9.7h7.9c0.9,0,1.7,0.8,1.6,1.7c-0.5,7.2-3.8,12.2-6.4,15 c-1,1.1-0.2,2.7,1.2,2.7h8.1c0.5,0,1-0.2,1.3-0.6c1.5-1.9,5.8-8.4,5.8-19.1v-39C65.5,3.2,62.8,0.5,59.2,0.5z"/></svg>
            </span>
        </div>
        <div class="mkdf-post-text">
            <div class="mkdf-post-text-inner">
                <div class="mkdf-post-text-main">
                    <?php wanderland_mikado_get_module_template_part('templates/parts/post-type/quote', 'blog', '', $part_params); ?>
                </div>
            </div>
        </div>
    </div>
</article>