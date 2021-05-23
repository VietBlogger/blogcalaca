<?php
$link_meta        = get_post_meta( $item_id, 'mkdf_masonry_gallery_item_link', true );
$link_target_meta = get_post_meta( $item_id, 'mkdf_masonry_gallery_item_link_target', true );
$link             = ! empty( $link_meta ) ? $link_meta : '';
$link_target      = ! empty( $link_target_meta ) ? $link_target_meta : '_self';

if ( ! empty( $link ) ) { ?>
	<a itemprop="url" class="mkdf-mg-item-link" href="<?php echo esc_url( $link ); ?>" target="<?php echo esc_attr( $link_target ); ?>"></a>
<?php } ?>