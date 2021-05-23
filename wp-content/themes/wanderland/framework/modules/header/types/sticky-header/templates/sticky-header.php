<?php do_action('wanderland_mikado_action_before_sticky_header'); ?>

<div class="mkdf-sticky-header">
    <?php do_action( 'wanderland_mikado_action_after_sticky_menu_html_open' ); ?>
    <div class="mkdf-sticky-holder <?php echo esc_attr($menu_area_class); ?>">
        <?php if($sticky_header_in_grid) : ?>
        <div class="mkdf-grid">
            <?php endif; ?>
            <div class="mkdf-vertical-align-containers">
                <div class="mkdf-position-left"><!--
                 --><div class="mkdf-position-left-inner">
                        <?php if(!$hide_logo) {
                            wanderland_mikado_get_logo('sticky');
                        } ?>
                        <?php if($menu_area_position === 'left') : ?>
                            <?php wanderland_mikado_get_sticky_menu('mkdf-sticky-nav'); ?>
                        <?php endif; ?>
                    </div>
                </div>
                <?php if($menu_area_position === 'center') : ?>
                    <div class="mkdf-position-center"><!--
                     --><div class="mkdf-position-center-inner">
                            <?php wanderland_mikado_get_sticky_menu('mkdf-sticky-nav'); ?>
                        </div>
                    </div>
                <?php endif; ?>
                <div class="mkdf-position-right"><!--
                 --><div class="mkdf-position-right-inner">
                        <?php if($menu_area_position === 'right') : ?>
                            <?php wanderland_mikado_get_sticky_menu('mkdf-sticky-nav'); ?>
                        <?php endif; ?>
                        <?php wanderland_mikado_get_sticky_header_widget_menu_area(); ?>
                    </div>
                </div>
            </div>
            <?php if($sticky_header_in_grid) : ?>
        </div>
        <?php endif; ?>
    </div>
	<?php do_action( 'wanderland_mikado_action_before_sticky_menu_html_close' ); ?>
</div>

<?php do_action('wanderland_mikado_action_after_sticky_header'); ?>