<article class="mkdf-item-space <?php echo esc_attr( $item_classes ) ?>">
	<div class="mkdf-mg-item-inner">
		<?php echo wanderland_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'parts/image', '', $params ); ?>
		<div class="mkdf-mg-item-content">
			<?php echo wanderland_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'parts/title', '', $params ); ?>
			<?php echo wanderland_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'parts/text', '', $params ); ?>
			<?php echo wanderland_core_get_cpt_shortcode_module_template_part( 'masonry-gallery', 'masonry-gallery-list', 'parts/button', '', $params ); ?>
		</div>
	</div>
</article>
