<div class="mkdf-post-info-author">
	<?php echo wanderland_mikado_icon_collections()->renderIcon( 'icon_pencil', 'font_elegant' ); ?>
    <a itemprop="author" class="mkdf-post-info-author-link" href="<?php echo esc_url(get_author_posts_url( get_the_author_meta( 'ID' ) )); ?>">
    <span class="mkdf-post-info-author-text">
        <?php esc_html_e('by', 'wanderland'); ?>
    </span>
        <?php the_author_meta('display_name'); ?>
    </a>
</div>