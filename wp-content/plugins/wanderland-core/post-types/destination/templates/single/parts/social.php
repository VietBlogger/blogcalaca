<?php if ( wanderland_mikado_options()->getOptionValue( 'enable_social_share' ) == 'yes' && wanderland_mikado_options()->getOptionValue( 'enable_social_share_on_destination_item' ) == 'yes' ) : ?>
	<div class="mkdf-ps-info-item mkdf-ps-social-share">
		<?php
		/**
		 * Available params type, icon_type and title
		 *
		 * Return social share html
		 */
		echo wanderland_mikado_get_social_share_html( array( 'type'  => 'list', 'title' => esc_attr__( 'Share', 'wanderland-core' ) ) ); ?>
	</div>
<?php endif; ?>