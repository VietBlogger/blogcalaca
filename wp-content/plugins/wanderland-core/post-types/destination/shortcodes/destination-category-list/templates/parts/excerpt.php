<?php if ( ! empty( $excerpt ) ) { ?>
	<p itemprop="description" class="mkdf-dcli-excerpt"><?php echo wp_kses_post( $excerpt ); ?></p>
<?php } ?>