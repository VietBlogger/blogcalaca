<div class="mkdf-masonry-gallery-holder mkdf-disable-bottom-space <?php echo esc_attr( $holder_classes ); ?>">
	<div class="mkdf-mg-inner mkdf-outer-space">
		<div class="mkdf-mg-grid-sizer"></div>
		<div class="mkdf-mg-grid-gutter"></div>
		<?php if ( $query_results->have_posts() ) :
			while ( $query_results->have_posts() ) : $query_results->the_post();
				$item_id = get_the_ID();
				
				$type_meta = get_post_meta( $item_id, 'mkdf_masonry_gallery_item_type', true );
				$type      = ! empty( $type_meta ) ? $type_meta : 'standard';
				
				$params['item_id']      = $item_id;
				$params['item_classes'] = $this_object->getItemClasses();
				
				echo wanderland_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'layout-collections/' . $type, '', $params );
			endwhile;
		else:
			echo wanderland_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'posts-not-found' );
		endif;
		
		wp_reset_postdata();
		?>
	</div>
</div>