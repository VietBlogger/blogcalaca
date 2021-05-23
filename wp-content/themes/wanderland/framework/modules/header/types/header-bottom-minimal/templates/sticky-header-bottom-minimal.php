<?php do_action('wanderland_mikado_action_after_sticky_header'); ?>

<div class="mkdf-sticky-header">
    <?php do_action('wanderland_mikado_action_after_sticky_menu_html_open'); ?>
    <div class="mkdf-sticky-holder">
        <?php if ($sticky_header_in_grid) : ?>
        <div class="mkdf-grid">
            <?php endif; ?>
            <div class=" mkdf-vertical-align-containers">
                <div class="mkdf-position-left"><!--
                 --><div class="mkdf-position-left-inner">
                        <?php if (!$hide_logo) {
                            wanderland_mikado_get_logo('sticky');
                        } ?>
                    </div>
                </div>
                <div class="mkdf-position-right"><!--
                 --><div class="mkdf-position-right-inner">
                        <a href="javascript:void(0)" <?php wanderland_mikado_class_attribute( $fullscreen_menu_icon_class ); ?>>
                            <span class="mkdf-fullscreen-menu-close-icon">
                                <?php echo wanderland_mikado_get_icon_sources_html( 'fullscreen_menu', true ); ?>
                            </span>
                            <span class="mkdf-fullscreen-menu-opener-icon">
                                <?php echo wanderland_mikado_get_icon_sources_html( 'fullscreen_menu' ); ?>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <?php if ($sticky_header_in_grid) : ?>
        </div>
    <?php endif; ?>
    </div>
</div>

<?php do_action('wanderland_mikado_action_after_sticky_header'); ?>
