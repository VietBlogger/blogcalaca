<?php echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-list', 'parts/image', '', $params); ?>

<div class="mkdf-dli-text-holder">
	<div class="mkdf-dli-text-wrapper">
		<div class="mkdf-dli-text">
			<div class="mkdf-dli-text-inner">
				<?php if($title_highlight === 'yes') { ?>
					<?php echo wanderland_core_destination_list_highlighted_word_left_svg(); ?>
					<?php echo wanderland_core_destination_list_highlighted_word_right_svg(); ?>
				<?php } ?>
				<?php echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-list', 'parts/category', '', $params); ?>
				<?php echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-list', 'parts/title', '', $params); ?>
				<?php echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-list', 'parts/excerpt', '', $params); ?>
				<?php echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-list', 'parts/button', '', $params); ?>
			</div>
		</div>
	</div>
</div>