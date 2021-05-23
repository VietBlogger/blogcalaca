<?php
$button_label_meta = get_post_meta( $item_id, 'mkdf_masonry_gallery_button_label', true );
$link_meta         = get_post_meta( $item_id, 'mkdf_masonry_gallery_item_link', true );
$link_target_meta  = get_post_meta( $item_id, 'mkdf_masonry_gallery_item_link_target', true );
$button_label      = ! empty( $button_label_meta ) ? $button_label_meta : '';
$link              = ! empty( $link_meta ) ? $link_meta : '';
$link_target       = ! empty( $link_target_meta ) ? $link_target_meta : '_self';

if ( ! empty( $link ) && ! empty( $button_label ) ) {
	$button_params = array(
		'custom_class' => 'mkdf-mg-item-button',
		'type'         => 'simple',
		'text'         => $button_label,
		'link'         => $link,
		'target'       => $link_target
	);
	
	echo wanderland_mikado_get_button_html( $button_params );
}