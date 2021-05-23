<div class="mkdf-team-holder">
	<div class="mkdf-team-inner">
		<?php if ($team_image !== '') { ?>
			<div class="mkdf-team-image">
                <?php echo wp_get_attachment_image($team_image, 'full'); ?>
				<div class="mkdf-team-text-wrapper">
					<div class="mkdf-team-text-outer">
						<div class="mkdf-team-text-inner">
							<div class="mkdf-team-text-background">
								<?php echo wanderland_core_destination_list_highlighted_word_left_svg(); ?>
								<?php echo wanderland_core_destination_list_highlighted_word_right_svg(); ?>
								<?php if ($team_position !== '') { ?>
									<div class="qodef-m-position">
										<?php echo esc_html($team_position); ?>
									</div>
								<?php } ?>
								<?php if ($team_name !== '') { ?>
								<<?php echo esc_attr($team_name_tag); ?> class="mkdf-team-name">
								<span>
										<span class="mkdf-team-title-wrap" <?php echo wanderland_mikado_get_inline_style($team_name_styles); ?>>
											<?php echo esc_html($team_name); ?>
										</span>
									</span>
							</<?php echo esc_attr($team_name_tag); ?>>
							<?php } ?>
							</div>
						</div>
					</div>
				</div>
				<?php if ($team_link !== '') { ?>
					<a class="mkdf-team-link" href="<?php echo esc_url($team_link) ?>" target="<?php echo esc_attr($team_target) ?>" ></a>
				<?php } ?>
			</div>

		<?php } ?>
	</div>
</div>