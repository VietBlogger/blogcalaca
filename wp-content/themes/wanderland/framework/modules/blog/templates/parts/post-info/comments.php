<?php if(comments_open()) { ?>
	<div class="mkdf-post-info-comments-holder">
		<a itemprop="url" class="mkdf-post-info-comments" href="<?php comments_link(); ?>">
			<?php comments_number('0 ' . esc_html__('Comments','wanderland'), '1 '.esc_html__('Comment','wanderland'), '% '.esc_html__('Comments','wanderland') ); ?>
		</a>
	</div>
<?php } ?>