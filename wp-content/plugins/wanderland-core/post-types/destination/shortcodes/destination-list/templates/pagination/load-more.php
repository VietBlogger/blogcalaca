<?php if($query_results->max_num_pages > 1) {
	$holder_styles = $this_object->getLoadMoreStyles($params);
	?>
	<div class="mkdf-dl-loading">
		<div class="mkdf-dl-loading-bounce1"></div>
		<div class="mkdf-dl-loading-bounce2"></div>
		<div class="mkdf-dl-loading-bounce3"></div>
	</div>
	<div class="mkdf-dl-load-more-holder">
		<div class="mkdf-dl-load-more" <?php wanderland_mikado_inline_style($holder_styles); ?>>
			<?php 
				echo wanderland_mikado_get_button_html(array(
					'link' => 'javascript: void(0)',
					'size' => 'large',
					'text' => esc_html__('LOAD MORE', 'wanderland-core')
				));
			?>
		</div>
	</div>
<?php }