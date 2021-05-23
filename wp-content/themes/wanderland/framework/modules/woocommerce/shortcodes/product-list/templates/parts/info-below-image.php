<?php
$item_classes           = $this_object->getItemClasses( $params );
$shader_styles          = $this_object->getShaderStyles( $params );
$text_wrapper_styles    = $this_object->getTextWrapperStyles( $params );
$params['title_styles'] = $this_object->getTitleStyles( $params );
$product_hover_image = get_post_meta( get_the_ID(), 'mkdf_hover_product_meta', true );
$product_hover_image_id = wanderland_mikado_get_attachment_id_from_url( $product_hover_image );
$product_hover_image_alt      = ! empty( $product_hover_image_id ) ? get_post_meta( $product_hover_image_id, '_wp_attachment_image_alt', true ) : '';
?>
<div class="mkdf-pli mkdf-item-space <?php echo esc_attr( $item_classes ); ?>">
	<div class="mkdf-pli-inner">
		<div class="mkdf-pli-image">
			<?php wanderland_mikado_get_module_template_part( 'templates/parts/image', 'woocommerce', '', $params ); ?>
            <?php if ( !empty($product_hover_image) ) {
                echo '<img class="mkdf-product-hover-image" alt="'. esc_attr($product_hover_image_alt).'" src="' . $product_hover_image . '" />';
            }?>
		</div>
		<div class="mkdf-pli-text" <?php echo wanderland_mikado_get_inline_style( $shader_styles ); ?>>
			<div class="mkdf-pli-text-outer">
				<div class="mkdf-pli-text-inner">
					<?php wanderland_mikado_get_module_template_part( 'templates/parts/add-to-cart', 'woocommerce', '', $params ); ?>
				</div>
			</div>
		</div>
		<a class="mkdf-pli-link" itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"></a>
	</div>
	<div class="mkdf-pli-text-wrapper" <?php echo wanderland_mikado_get_inline_style( $text_wrapper_styles ); ?>>
		<?php wanderland_mikado_get_module_template_part( 'templates/parts/price', 'woocommerce', '', $params ); ?>

		<?php wanderland_mikado_get_module_template_part( 'templates/parts/title', 'woocommerce', '', $params ); ?>
		
		<?php wanderland_mikado_get_module_template_part( 'templates/parts/category', 'woocommerce', '', $params ); ?>
		
		<?php wanderland_mikado_get_module_template_part( 'templates/parts/excerpt', 'woocommerce', '', $params ); ?>
		
		<?php wanderland_mikado_get_module_template_part( 'templates/parts/rating', 'woocommerce', '', $params ); ?>
	</div>
</div>