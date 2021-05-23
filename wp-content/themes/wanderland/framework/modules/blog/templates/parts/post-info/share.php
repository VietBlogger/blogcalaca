<?php
$share_type = isset( $share_type ) ? $share_type : 'list';
?>
<?php if ( wanderland_mikado_is_plugin_installed( 'core' ) && wanderland_mikado_options()->getOptionValue( 'enable_social_share' ) === 'yes' && wanderland_mikado_options()->getOptionValue( 'enable_social_share_on_post' ) === 'yes' ) { ?>
	<div class="mkdf-blog-share">
		<?php echo wanderland_mikado_get_social_share_html( array( 'type' => $share_type, 'title' => 'Share' ) ); ?>
	</div>
<?php } ?>