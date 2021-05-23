<a class="mkdf-ht-content-item" href="<?php echo esc_url($custom_link); ?>" target="_self">
	<div class="mkdf-hti-content-item-inner <?php echo esc_attr( $holder_classes ); ?>">
		<div class="mkdf-hti-content-item-wrap">
			<?php if ( ! empty( $content_image ) ): ?>
				<div class="mkdf-hti-content-image">
					<?php echo wp_get_attachment_image( $content_image, 'full' ); ?>
				</div>
			<?php endif; ?>
			<div class="mkdf-hti-content-value">
				<h6 class="mkdf-hti-title"><?php echo esc_html($title); ?></h6>
				<p class="mkdf-hti-label-one"><?php echo esc_html($label_one); ?></p>
				<p class="mkdf-hti-label-two"><?php echo esc_html($label_two); ?></p>
			</div>
		</div>
		<div class="mkdf-hti-pin"></div>
	</div>
</a>