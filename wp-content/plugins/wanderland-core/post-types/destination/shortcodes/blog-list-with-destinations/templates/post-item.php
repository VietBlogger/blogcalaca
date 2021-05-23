<article class="mkdf-blwd-item mkdf-blwd-item-post mkdf-item-space" <?php echo wanderland_mikado_get_inline_style( $article_styles ); ?>>
	<div class="mkdf-blwd-item-inner">
		<?php if ( has_post_thumbnail() ) {
			$image_src = get_the_post_thumbnail_url( get_the_ID() );
			$image_styles = 'background-image: url(' . esc_url( $image_src ) .')'; ?>
			<div class="mkdf-blwd-image" <?php wanderland_mikado_inline_style($image_styles); ?>></div>
		<?php } ?>
		<div class="mkdf-item-text-wrapper">
			<div class="mkdf-item-text-holder">
				<div class="mkdf-item-text-holder-inner">
					<div class="mkdf-post-info-author">
						<?php echo wanderland_mikado_icon_collections()->renderIcon( 'icon_pencil', 'font_elegant' ); ?>
						<a itemprop="author" class="mkdf-post-info-author-link" href="<?php echo esc_url(get_author_posts_url( get_the_author_meta( 'ID' ) )); ?>">
					    <span class="mkdf-post-info-author-text">
					        <?php esc_html_e('by', 'wanderland'); ?>
					    </span>
						<?php the_author_meta('display_name'); ?>
						</a>
					</div>
					<h5 class="entry-title mkdf-post-title">
						<a itemprop="url" href="<?php the_permalink(); ?>">
							<?php the_title(); ?>
						</a>
					</h5>
				</div>
			</div>
		</div>
		<a itemprop="url" class="mkdf-blwd-link mkdf-block-drag-link" href="<?php echo get_permalink( get_the_ID() ); ?>"></a>
	</div>
</article>