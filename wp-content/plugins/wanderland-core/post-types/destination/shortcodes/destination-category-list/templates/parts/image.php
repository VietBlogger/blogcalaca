<?php if ( ! empty( $image ) ) { ?>
	<div class="mkdf-dcli-image">
		<?php if ( $image_size !== 'custom' ) {
			echo wp_get_attachment_image( $image, $image_size );
		} elseif ( isset( $custom_image_width ) && ! empty( $custom_image_width ) && isset( $custom_image_height ) && ! empty( $custom_image_height ) ) {
			echo wanderland_mikado_generate_thumbnail( $image, null, intval( $custom_image_width ), intval( $custom_image_height ) );
		} ?>
		<?php if ( ! empty( $hover_image ) ) { ?>
			<?php if ( $image_size !== 'custom' ) {
				echo wp_get_attachment_image( $hover_image, $image_size );
			} elseif ( isset( $custom_image_width ) && ! empty( $custom_image_width ) && isset( $custom_image_height ) && ! empty( $custom_image_height ) ) {
				echo wanderland_mikado_generate_thumbnail( $hover_image, null, intval( $custom_image_width ), intval( $custom_image_height ) );
			} ?>
			<span class="mkdf-dcl-highlight">
					<?php echo wanderland_core_destination_list_highlighted_word_left_svg(); ?>
				<span class="mkdf-active-hover-middle"></span>
				<?php echo wanderland_core_destination_list_highlighted_word_right_svg(); ?>
			</span>
		<?php } ?>
	</div>
<?php } ?>