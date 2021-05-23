<?php if ($enable_button === 'yes') { ?>
	<div class="mkdf-dli-btn-holder">
	<?php echo wanderland_mikado_get_button_html(array(
		                                       'link' => get_the_permalink(),
		                                       'size' => 'medium',
		                                       'text' => esc_html__('Read More', 'wanderland-core'),
		                                       'type' => 'simple',
		                                       'enable_svg_icon' => 'yes',
	                                       ));
	?>
	</div>
<?php } ?>