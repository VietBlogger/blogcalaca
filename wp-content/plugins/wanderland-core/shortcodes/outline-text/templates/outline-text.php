<div class="mkdf-outline-text-holder <?php echo esc_attr( $holder_classes ); ?>">
	<<?php echo esc_attr( $text_tag ); ?> class="mkdf-outline-text" <?php wanderland_mikado_inline_style( $text_styles ); ?> <?php echo wanderland_mikado_get_inline_attrs( $text_data ); ?> >
		<?php echo wp_kses_post( $text ); ?>
	</<?php echo esc_attr( $text_tag ); ?>>
</div>