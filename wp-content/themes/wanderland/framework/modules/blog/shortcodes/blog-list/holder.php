<div class="mkdf-blog-list-holder mkdf-grid-list <?php echo esc_attr( $holder_classes ); ?>" <?php echo wp_kses( $holder_data, array( 'data' ) ); ?>>
	<div class="mkdf-bl-wrapper mkdf-outer-space">
		<ul class="mkdf-blog-list">
			<?php
			if ( $query_result->have_posts() ):
				while ( $query_result->have_posts() ) : $query_result->the_post();
					wanderland_mikado_get_module_template_part( 'shortcodes/blog-list/layout-collections/post', 'blog', $type, $params );
				endwhile;
			else:
				wanderland_mikado_get_module_template_part( 'templates/parts/no-posts', 'blog', '', $params );
			endif;
			
			wp_reset_postdata();
			?>
		</ul>
	</div>
	<?php wanderland_mikado_get_module_template_part( 'templates/parts/pagination/' . $params['pagination_type'], 'blog', '', $params ); ?>
</div>