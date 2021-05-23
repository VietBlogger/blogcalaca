<?php if ( is_array( $post_ratings ) && count( $post_ratings ) ) {
	$average_rating_total = intval( round( wanderland_core_get_total_average_rating( $post_ratings ) ) );
	?>
	<div class="mkdf-reviews-list-info mkdf-reviews-average-count">
		<span class="mkdf-reviews-number">
            <?php echo esc_html( $rating_number ); ?>
        </span>
		<span class="mkdf-reviews-label">
            <?php echo esc_html( $rating_label ); ?>
        </span>
		<span class="mkdf-stars">
		    <span class="mkdf-stars-wrapper-inner">
	            <span class="mkdf-stars-items">
	                <?php for ( $i = 1; $i <= 5; $i ++ ) {
	                	if ( $average_rating_total >= $i ) { ?>
			                <i class="fas fa-star" aria-hidden="true"></i>
		                <?php } else { ?>
			                <i class="far fa-star" aria-hidden="true"></i>
		                <?php }
	                } ?>
	            </span>
	        </span>
		</span>
	</div>
<?php } ?>