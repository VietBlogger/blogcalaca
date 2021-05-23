<?php
$image_styles = $this_object->getItemImageStyles( $item_id );

if ( has_post_thumbnail() ) { ?>
	<div class="mkdf-mg-item-image" <?php wanderland_mikado_inline_style( $image_styles ); ?>>
		<?php the_post_thumbnail(); ?>
	</div>
<?php } ?>