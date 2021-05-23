<div class="mkdf-section-title-holder <?php echo esc_attr( $holder_classes ); ?>" <?php echo wanderland_mikado_get_inline_style( $holder_styles ); ?>>
	<div class="mkdf-st-inner">
		<?php if ( ! empty( $tagline ) ) { ?>
            <span class="mkdf-st-tagline"><?php echo esc_html($tagline);?></span>
        <?php }?>
		<?php if ( ! empty( $title ) ) { ?>
			<<?php echo esc_attr( $title_tag ); ?> class="mkdf-st-title" <?php echo wanderland_mikado_get_inline_style( $title_styles ); ?>>
            <?php if( ! empty($title_highlight_words) ) { ?>
                <?php echo wanderland_mikado_get_module_part( $title ); ?>
            <?php } else { ?>
                <?php echo wp_kses( $title, array( 'br' => true, 'span' => array( 'class' => true) ) ); ?>
            <?php } ?>
			</<?php echo esc_attr( $title_tag ); ?>>
		<?php } ?>
		<?php if ( ! empty( $text ) ) { ?>
			<<?php echo esc_attr( $text_tag ); ?> class="mkdf-st-text <?php echo esc_attr( $text_classes ); ?>" <?php echo wanderland_mikado_get_inline_style( $text_styles ); ?>>
            <?php if( ! empty($text_highlight_words) || ! empty($text_bold_words)) { ?>
                <?php echo wanderland_mikado_get_module_part( $text ); ?>
            <?php } else { ?>
	            <?php echo wp_kses( $text, array( 'br' => true ) ); ?>
            <?php } ?>
			</<?php echo esc_attr( $text_tag ); ?>>
		<?php } ?>
		<?php if ( ! empty( $button_parameters ) ) { ?>
			<div class="mkdf-st-button"><?php echo wanderland_mikado_get_button_html( $button_parameters ); ?></div>
		<?php } ?>
	</div>
</div>