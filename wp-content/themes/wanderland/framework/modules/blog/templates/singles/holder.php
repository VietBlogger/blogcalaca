<?php
$post_format = wanderland_mikado_return_post_format();
?>
<div class="mkdf-grid-row <?php echo esc_attr( $holder_classes ); ?>">
    <div class="mkdf-post-heading">
		<?php wanderland_mikado_get_module_template_part('templates/parts/media', 'blog', $post_format, ''); ?>
		<?php
		$image_meta          = get_post_meta( get_the_ID(), 'mkdf_blog_list_featured_image_meta', true );
		$has_featured        = ! empty( $image_meta ) || has_post_thumbnail();
		if ( $has_featured ) {
			wanderland_mikado_get_module_template_part('templates/parts/post-info/category', 'blog');
		} ?>
    </div>
	<div <?php echo wanderland_mikado_get_content_sidebar_class(); ?>>
		<div class="mkdf-blog-holder mkdf-blog-single <?php echo esc_attr( $blog_single_classes ); ?>">
			<?php wanderland_mikado_get_blog_single_type( $blog_single_type ); ?>
		</div>
	</div>
	<?php if ( $sidebar_layout !== 'no-sidebar' ) { ?>
		<div <?php echo wanderland_mikado_get_sidebar_holder_class(); ?>>
			<?php get_sidebar(); ?>
		</div>
	<?php } ?>
</div>