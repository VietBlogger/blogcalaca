<div class="mkdf-reviews-list-info mkdf-reviews-per-mark">
	<?php foreach ( $post_ratings as $rating ) { ?>
		<?php
		$average_rating     = wanderland_core_post_average_rating( $rating );
		$rating_count       = $rating['count'];
		$rating_count_label = $rating_count === 1 ? esc_html__( 'Rating', 'wanderland-core' ) : esc_html__( 'Ratings', 'wanderland-core' );
		$rating_marks       = $rating['marks'];
		?>
		<div class="mkdf-grid-row">
			<div class="mkdf-grid-col-4">
				<div class="mkdf-reviews-number-wrapper">
					<span class="mkdf-reviews-number"><?php echo esc_html( $average_rating ); ?></span>
					<span class="mkdf-stars-wrapper">
                        <span class="mkdf-stars">
                            <?php
                            for ( $i = 1; $i <= $average_rating; $i ++ ) { ?>
	                            <i class="fa fa-star" aria-hidden="true"></i>
                            <?php } ?>
                        </span>
                        <span class="mkdf-reviews-count">
                            <?php echo esc_html__( 'Rated', 'wanderland-core' ) . ' ' . $average_rating . ' ' . esc_html__( 'out of', 'wanderland-core' ) . ' ' . $rating_count . ' ' . $rating_count_label; ?>
                        </span>
                    </span>
				</div>
			</div>
			<div class="mkdf-grid-col-8">
				<div class="mkdf-rating-percentage-wrapper">
					<?php
					foreach ( $rating_marks as $item => $value ) {
						$percentage = $rating_count == 0 ? 0 : round( ( $value / $rating_count ) * 100 );
						echo do_shortcode( '[mkdf_progress_bar percent="' . esc_attr( $percentage ) . '" title="' . esc_attr( $item ) . esc_html__( ' stars', 'wanderland-core' ) . '"]' );
					}
					?>
				</div>
			</div>
		</div>
	<?php } ?>
</div>
