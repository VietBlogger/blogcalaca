<?php
get_header();
wanderland_mikado_get_title();
do_action( 'wanderland_mikado_action_before_main_content' ); ?>
<div class="mkdf-container mkdf-default-page-template">
	<?php do_action( 'wanderland_mikado_action_after_container_open' ); ?>
	<div class="mkdf-container-inner clearfix">
		<?php
			$wanderland_taxonomy_id   = get_queried_object_id();
			$wanderland_taxonomy_type = is_tax( 'destination-tag' ) ? 'destination-tag' : 'destination-category';
			$wanderland_taxonomy      = ! empty( $wanderland_taxonomy_id ) ? get_term_by( 'id', $wanderland_taxonomy_id, $wanderland_taxonomy_type ) : '';
			$wanderland_taxonomy_slug = ! empty( $wanderland_taxonomy ) ? $wanderland_taxonomy->slug : '';
			$wanderland_taxonomy_name = ! empty( $wanderland_taxonomy ) ? $wanderland_taxonomy->taxonomy : '';
			
			wanderland_core_get_archive_destination_list( $wanderland_taxonomy_slug, $wanderland_taxonomy_name );
		?>
	</div>
	<?php do_action( 'wanderland_mikado_action_before_container_close' ); ?>
</div>
<?php get_footer(); ?>
