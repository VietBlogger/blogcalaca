<div class="mkdf-destination-list-holder mkdf-grid-list <?php echo esc_attr($holder_classes); ?>" <?php echo wp_kses($holder_data, array('data')); ?>>
	<div class="mkdf-pl-inner mkdf-outer-space <?php echo esc_attr($holder_inner_classes); ?> clearfix">
		<?php
			if($query_results->have_posts()):
				while ( $query_results->have_posts() ) : $query_results->the_post();
					echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-list', 'destination-item', '', $params);
				endwhile;
			else:
				echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-list', 'parts/posts-not-found');
			endif;
		
			wp_reset_postdata();
		?>
	</div>
	
	<?php echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-list', 'pagination/'.$pagination_type, '', $params, $additional_params); ?>
</div>