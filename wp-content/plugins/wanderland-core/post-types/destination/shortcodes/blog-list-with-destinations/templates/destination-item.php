<article class="mkdf-blwd-item mkdf-blwd-item-destination mkdf-item-space" <?php echo wanderland_mikado_get_inline_style( $article_styles ); ?>>
	<div class="mkdf-blwd-item-inner">
			<?php if ( has_post_thumbnail() ) {
				$image_src = get_the_post_thumbnail_url( get_the_ID() );
				$image_styles = 'background-image: url(' . esc_url( $image_src ) .')'; ?>
	            <div class="mkdf-blwd-image" <?php wanderland_mikado_inline_style($image_styles); ?>></div>
			<?php } ?>
		<div class="mkdf-blwd-text-holder">
			<div class="mkdf-blwd-text-wrapper">
				<div class="mkdf-blwd-text">
					<div class="mkdf-blwd-text-inner">
						<?php if($title_highlight === 'yes') { ?>
							<?php echo wanderland_core_destination_list_highlighted_word_left_svg(); ?>
							<?php echo wanderland_core_destination_list_highlighted_word_right_svg(); ?>
						<?php } ?>
						<?php
						$categories = wp_get_post_terms(get_the_ID(), 'destination-category');
						
						if(!empty($categories)) { ?>
							<div class="mkdf-blwd-category-holder">
								<?php foreach ($categories as $cat) { ?>
									<a itemprop="url" class="mkdf-blwd-category" href="<?php echo esc_url(get_term_link($cat->term_id)); ?>"><?php echo esc_html($cat->name); ?></a>
								<?php } ?>
							</div>
						<?php } ?>
						<h3 class="mkdf-blwd-title entry-title">
						<span>
							<span class="mkdf-blwd-title-wrap">
								<?php the_title(); ?>
							</span>
						</span>
						</h3>
					</div>
				</div>
			</div>
		</div>
		<a itemprop="url" class="mkdf-blwd-link mkdf-block-drag-link" href="<?php echo get_permalink( get_the_ID() ); ?>"></a>
	</div>
</article>