<span class="mkdf-stars">
    <?php foreach ( $post_ratings as $rating ) { ?>
	    <span class="mkdf-stars-wrapper-inner">
            <span class="mkdf-stars-items">
                <?php
                $review_rating = wanderland_core_post_average_rating( $rating );
                for ( $i = 1; $i <= $review_rating; $i ++ ) { ?>
	                <i class="fa fa-star" aria-hidden="true"></i>
                <?php } ?>
            </span>
		    <?php if ( isset( $rating['label'] ) && ! empty( $rating['label'] ) ) { ?>
			    <span class="mkdf-stars-label">
	                <?php echo esc_html( $rating['label'] ); ?>
	            </span>
		    <?php } ?>
        </span>
    <?php } ?>
</span>
<a itemprop="url" class="mkdf-post-info-comments" href="<?php comments_link(); ?>">
    <span class="mkdf-reviews-number">
        <?php echo esc_html( $rating_number ); ?>
    </span>
	<span class="mkdf-reviews-label">
        <?php echo esc_html( $rating_label ); ?>
    </span>
</a>