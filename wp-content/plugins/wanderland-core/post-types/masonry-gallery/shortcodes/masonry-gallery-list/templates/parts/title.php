<?php
$title          = get_the_title();
$title_tag_meta = get_post_meta( $item_id, 'mkdf_masonry_gallery_item_title_tag', true );
$title_tag      = ! empty( $title_tag_meta ) ? $title_tag_meta : 'h2';

if ( ! empty( $title ) ) { ?>
	<<?php echo esc_attr( $title_tag ); ?> itemprop="name" class="mkdf-mg-item-title entry-title"><?php echo esc_html( $title ); ?></<?php echo esc_attr( $title_tag ); ?>>
<?php } ?>