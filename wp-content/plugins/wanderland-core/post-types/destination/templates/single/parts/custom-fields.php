<?php
$custom_fields = get_post_meta(get_the_ID(), 'mkdf_destination_properties', true);
$custom_fields_title = get_post_meta(get_the_ID(), 'mkdf_destination_properties_title', true);

if(is_array($custom_fields) && count($custom_fields)) : ?>
<div class="mkdf-destination-single-additional-sidebar">
	<h6><?php echo esc_html($custom_fields_title); ?></h6>
    <?php
    foreach($custom_fields as $custom_field) : ?>
        <div class="mkdf-ds-info-item mkdf-ds-custom-field">
	        <?php if(!empty($custom_field['item_url'])) : ?><a itemprop="url" href="<?php echo esc_url($custom_field['item_url']); ?>" class="<?php echo esc_attr__($custom_field['item_url_class']); ?>"><?php endif; ?>
		        <?php if(!empty($custom_field['item_image'])) { ?>
			        <img itemprop="image" class="mkdf-destination-custom-field-image" src="<?php echo esc_url($custom_field['item_image']); ?>" alt="<?php esc_attr_e('Destination Custom Field Image', 'backpacktraveler-core'); ?>" />
		        <?php } ?>
		        <span>
                <?php echo esc_html($custom_field['item_text']); ?>
                </span>
		        <?php if(!empty($custom_field['item_url'])) : ?></a><?php endif; ?>
        </div>
    <?php endforeach; ?>
	</div>
<?php endif; ?>