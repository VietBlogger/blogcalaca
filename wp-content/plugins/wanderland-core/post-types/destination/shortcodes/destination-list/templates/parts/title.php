<?php if ($enable_title === 'yes') {
	$title_tag = !empty($title_tag) ? $title_tag : 'h4';
	?>
	<<?php echo esc_attr($title_tag); ?> itemprop="name" class="mkdf-dli-title entry-title">
		<span>
			<span class="mkdf-dli-title-wrap">
				<?php the_title(); ?>
			</span>
		</span>
	</<?php echo esc_attr($title_tag); ?>>
<?php } ?>