<div class="mkdf-price-table mkdf-item-space <?php echo esc_attr($holder_classes); ?>">
	<div class="mkdf-pt-inner" <?php echo wanderland_mikado_get_inline_style($holder_styles); ?>>
		<ul>
			<li class="mkdf-pt-title-holder">
				<span class="mkdf-pt-title" <?php echo wanderland_mikado_get_inline_style($title_styles); ?>><?php echo esc_html($title); ?></span>
			</li>
			<li class="mkdf-pt-prices">
				<sup class="mkdf-pt-value" <?php echo wanderland_mikado_get_inline_style($currency_styles); ?>><?php echo esc_html($currency); ?></sup>
				<span class="mkdf-pt-price" <?php echo wanderland_mikado_get_inline_style($price_styles); ?>><?php echo esc_html($price); ?></span>
				<h6 class="mkdf-pt-mark" <?php echo wanderland_mikado_get_inline_style($price_period_styles); ?>><?php echo esc_html($price_period); ?></h6>
			</li>
			<li class="mkdf-pt-content">
				<?php echo do_shortcode($content); ?>
			</li>
			<?php 
			if(!empty($button_text)) { ?>
				<li class="mkdf-pt-button">
					<?php echo wanderland_mikado_get_button_html(array(
						'link' => $link,
						'target' => $target,
						'text' => $button_text,
						'type' => $button_type,
                        'size' => 'large'
					)); ?>
				</li>				
			<?php } ?>
		</ul>
	</div>
</div>