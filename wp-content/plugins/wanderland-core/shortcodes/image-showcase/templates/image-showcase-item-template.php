<?php $image_styles = 'background-image: url(' . esc_url( $image['url'] ) .')'; ?>
<div class="mkdf-is-item">
	<div class="mkdf-is-image" <?php wanderland_mikado_inline_style($image_styles); ?>>
		<?php echo wp_get_attachment_image($image['image_id'], 'full'); ?>
	</div>
	<div class="mkdf-is-info <?php echo esc_attr( $content_classes ); ?>" <?php wanderland_mikado_inline_style($content_styles); ?>>
		<?php echo do_shortcode( $content ); ?>
	</div>
</div>