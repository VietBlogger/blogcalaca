<button type="submit" <?php wanderland_mikado_inline_style($button_styles); ?> <?php wanderland_mikado_class_attribute($button_classes); ?> <?php echo wanderland_mikado_get_inline_attrs($button_data); ?> <?php echo wanderland_mikado_get_inline_attrs($button_custom_attrs); ?>>
    <span class="mkdf-btn-text"><?php echo esc_html($text); ?></span>
	<?php if($enable_svg_icon === 'yes') { ?>
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 17 17" style="enable-background:new 0 0 17 17;" xml:space="preserve"><g><path d="M15,1.9"/><line x1="1.7" y1="15.3" x2="15" y2="1.9"/><line x1="16" y1="1.9" x2="15" y2="1.9"/><line x1="15" y1="1.9" x2="1" y2="1.9"/><path d="M15,1.9"/><line x1="15" y1="16" x2="15" y2="1.9"/></g></svg>
		<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 17 17" style="enable-background:new 0 0 17 17;" xml:space="preserve"><g><path d="M15,1.9"/><line x1="1.7" y1="15.3" x2="15" y2="1.9"/><line  x1="16" y1="1.9" x2="15" y2="1.9"/><line x1="15" y1="1.9" x2="1" y2="1.9"/><path d="M15,1.9"/><line x1="15" y1="16" x2="15" y2="1.9"/></g></svg>
	<?php } else { ?>
	<?php echo wanderland_mikado_icon_collections()->renderIcon($icon, $icon_pack); ?>
	<?php echo wanderland_mikado_icon_collections()->renderIcon($icon, $icon_pack); ?>
	<?php } ?>
</button>