<li class="mkdf-bl-item mkdf-item-space">
	<div class="mkdf-bli-inner">
		<div class="mkdf-bli-wrapper">
		<?php if ( $post_info_image == 'yes' ) {
			wanderland_mikado_get_module_template_part( 'templates/parts/media', 'blog', '', $params );
			if ( $post_info_category == 'yes' ) {
				wanderland_mikado_get_module_template_part( 'templates/parts/post-info/category', 'blog', '', $params );
			}
		} ?>
		</div>
        <div class="mkdf-bli-content">
            <?php if ($post_info_section == 'yes') { ?>
                <div class="mkdf-bli-info">
	                <?php
		                if ( $post_info_date == 'yes' ) {
			                wanderland_mikado_get_module_template_part( 'templates/parts/post-info/date', 'blog', '', $params );
		                }
		                if ( $post_info_author == 'yes' ) {
			                wanderland_mikado_get_module_template_part( 'templates/parts/post-info/author', 'blog', '', $params );
		                }
		                if ( $post_info_comments == 'yes' ) {
			                wanderland_mikado_get_module_template_part( 'templates/parts/post-info/comments', 'blog', '', $params );
		                }
		                if ( $post_info_like == 'yes' ) {
			                wanderland_mikado_get_module_template_part( 'templates/parts/post-info/like', 'blog', '', $params );
		                }
		                if ( $post_info_share == 'yes' ) {
			                wanderland_mikado_get_module_template_part( 'templates/parts/post-info/share', 'blog', '', $params );
		                }
	                ?>
                </div>
            <?php } ?>
	        <?php wanderland_mikado_get_module_template_part( 'templates/parts/title', 'blog', '', $params ); ?>
	        <div class="mkdf-bli-excerpt">
		        <?php wanderland_mikado_get_module_template_part( 'templates/parts/excerpt', 'blog', '', $params ); ?>
                <?php if($type === 'info-right' || $type === 'info-left'){?>
		            <?php wanderland_mikado_get_module_template_part( 'templates/parts/post-info/read-more', 'blog', '', $params ); ?>
                <?php }?>
	        </div>
        </div>
	</div>
</li>