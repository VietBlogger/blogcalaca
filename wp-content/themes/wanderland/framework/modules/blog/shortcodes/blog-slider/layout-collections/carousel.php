<li class="mkdf-blog-slider-item">
	<div class="mkdf-blog-slider-item-inner">
		<div class="mkdf-item-image">
			<a itemprop="url" href="<?php echo get_permalink(); ?>">
				<?php echo get_the_post_thumbnail(get_the_ID(), $image_size); ?>
			</a>
		</div>
		<div class="mkdf-bli-content">
			<?php wanderland_mikado_get_module_template_part('templates/parts/title', 'blog', '', $params); ?>
			<div class="mkdf-bli-excerpt">
				<?php wanderland_mikado_get_module_template_part( 'templates/parts/excerpt', 'blog', '', $params ); ?>
			</div>
		</div>
	</div>
</li>