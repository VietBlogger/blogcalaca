<?php
$custom_icon = $this_object->getItemCustomIcon( $item_id );

if ( ! empty( $custom_icon ) ) { ?>
	<img itemprop="image" class="mkdf-mg-item-icon" src="<?php echo esc_url( $custom_icon['url'] ) ?>" alt="<?php echo esc_attr( $custom_icon['alt'] ); ?>"/>
<?php } ?>