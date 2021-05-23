<div class="mkdf-blog-list-with-destinations-holder mkdf-grid-list <?php echo esc_attr($holder_classes); ?>">
	<div class="mkdf-blwd-inner mkdf-outer-space clearfix">
		<?php
		if($query_results->have_posts()):
			$counter = 0;
			while ( $query_results->have_posts() ) : $query_results->the_post();
			if(($query_results->posts[$counter]->post_type) === 'destination-item') {
				echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'blog-list-with-destinations', 'destination-item', '', $params);
			} else {
				echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'blog-list-with-destinations', 'post-item', '', $params);
			}
			$counter++;
			endwhile;
		else:
			echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'blog-list-with-destinations', 'posts-not-found');
		endif;
		
		wp_reset_postdata();
		?>
	</div>
	
</div>