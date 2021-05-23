<?php
$text_meta     = get_post_meta( $item_id, 'mkdf_masonry_gallery_item_text', true );
$text_tag_meta = get_post_meta( $item_id, 'mkdf_masonry_gallery_item_text_tag', true );
$text          = ! empty( $text_meta ) ? $text_meta : '';
$text_tag      = ! empty( $text_tag_meta ) ? $text_tag_meta : 'p';

if ( ! empty( $text ) ) { ?>
	<<?php echo esc_attr( $text_tag ); ?> class="mkdf-mg-item-text"><?php echo esc_html( $text ); ?></<?php echo esc_attr( $text_tag ); ?>>
<?php } ?>