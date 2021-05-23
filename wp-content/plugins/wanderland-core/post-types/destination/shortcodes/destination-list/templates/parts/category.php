<?php if ($enable_category === 'yes') {
	$categories = wp_get_post_terms(get_the_ID(), 'destination-category');

	if(!empty($categories)) { ?>
		<div class="mkdf-dli-category-holder">
			<?php foreach ($categories as $cat) { ?>
				<a itemprop="url" class="mkdf-dli-category" href="<?php echo esc_url(get_term_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
			<?php } ?>
		</div>
	<?php } ?>
<?php } ?>