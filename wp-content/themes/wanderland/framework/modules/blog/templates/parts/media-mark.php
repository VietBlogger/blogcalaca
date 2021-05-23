<?php
$post_format = isset( $post_format ) ? $post_format : '';

switch ( $post_format ) {
	case 'standard':
		echo wanderland_mikado_icon_collections()->renderIcon( 'icon_image', 'font_elegant', array( 'icon_attributes' => array( 'class' => 'mkdf-post-image-icon' ) ) );
		break;
	case 'gallery':
		echo wanderland_mikado_icon_collections()->renderIcon( 'icon_images', 'font_elegant', array( 'icon_attributes' => array( 'class' => 'mkdf-post-image-icon' ) ) );
		break;
	case 'video':
		echo wanderland_mikado_icon_collections()->renderIcon( 'arrow_triangle-right_alt2', 'font_elegant', array( 'icon_attributes' => array( 'class' => 'mkdf-post-image-icon' ) ) );
		break;
	case 'audio':
		echo wanderland_mikado_icon_collections()->renderIcon( 'icon_music', 'font_elegant', array( 'icon_attributes' => array( 'class' => 'mkdf-post-image-icon' ) ) );
		break;
	case 'link':
		echo wanderland_mikado_icon_collections()->renderIcon( 'fa-link', 'font_awesome', array( 'icon_attributes' => array( 'class' => 'mkdf-post-image-icon' ) ) );
		break;
	case 'quote':
		echo wanderland_mikado_icon_collections()->renderIcon( 'fa-quote-right', 'font_awesome', array( 'icon_attributes' => array( 'class' => 'mkdf-post-image-icon' ) ) );
		break;
}