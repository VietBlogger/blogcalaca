<div class="mkdf-destination-category-list-holder mkdf-grid-list <?php echo esc_attr( $holder_classes ); ?>">
	<div class="mkdf-dcl-inner mkdf-outer-space clearfix">
		<?php
			if ( ! empty( $query_results ) ) {
				foreach ( $query_results as $query ) {
					$termID            = $query->term_id;
					$params['image']   = get_term_meta( $termID, 'mkdf_destination_category_image_meta', true );
					$params['hover_image']   = get_term_meta( $termID, 'mkdf_destination_category_hover_image_meta', true );
					$params['title']   = $query->name;
					$params['excerpt'] = $query->description;
					$count = $query->count;
					if ($count > 1) {
						$params['count'] = $count.esc_html__(' destinations', 'wanderland-core');
                    } else {
						$params['count'] = $count.esc_html__(' destination', 'wanderland-core');
                    }

					?>
					<article class="mkdf-dcl-item mkdf-item-space">
						<div class="mkdf-dcl-item-inner">
							<?php echo wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-category-list', 'parts/image', '', $params ); ?>
							<div class="mkdf-dcli-text-holder">
								<div class="mkdf-dcli-text-wrapper">
									<div class="mkdf-dcli-text">
										<?php echo wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-category-list', 'parts/count', '', $params ); ?>
										<?php echo wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-category-list', 'parts/title', '', $params ); ?>
										<?php echo wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-category-list', 'parts/excerpt', '', $params ); ?>
									</div>
								</div>
							</div>
							<a itemprop="url" class="mkdf-dcli-link" href="<?php echo get_term_link( $termID ); ?>"></a>
						</div>
					</article>
				<?php }
			} else {
				echo wanderland_core_get_cpt_shortcode_module_template_part( 'destination', 'destination-category-list', 'parts/posts-not-found', '', $params );
			}
		?>
	</div>
</div>