<article class="mkdf-dcl-item mkdf-item-space">
	<div class="mkdf-dcl-item-inner">
		<?php echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-category-list', 'parts/image', '', $params); ?>
		
		<div class="mkdf-dcli-text-holder">
			<div class="mkdf-dcli-text-wrapper">
				<div class="mkdf-dcli-text">
					<?php echo wanderland_core_get_cpt_shortcode_module_template_part('destination', 'destination-category-list', 'parts/title', '', $params); ?>
				</div>
			</div>
		</div>
		
		<a itemprop="url" class="mkdf-dcl-link" href="<?php echo get_the_permalink(); ?>"></a>
	</div>
</article>