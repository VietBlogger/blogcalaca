<div class="mkdf-map-with-destinations-holder">
	<?php if ( $have_items ) { ?>
		<div class="mkdf-mwl-map" <?php wanderland_mikado_inline_style( $map_styles ); ?>>
			<?php echo wanderland_core_get_destination_multiple_map( $maps_args ); ?>
		</div>
	<?php } else { ?>
		<p class="mkdf-mwl-not-found"><?php esc_html_e( 'Destinations are not found.', 'wanderland-core' ); ?></p>
	<?php } ?>
</div>