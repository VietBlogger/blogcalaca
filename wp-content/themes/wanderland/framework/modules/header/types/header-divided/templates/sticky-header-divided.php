<?php do_action('wanderland_mikado_action_before_sticky_header'); ?>

    <div class="mkdf-sticky-header">

        <?php do_action('wanderland_mikado_action_after_sticky_menu_html_open'); ?>
        <div class="mkdf-sticky-holder">
            <?php if ($sticky_header_in_grid) : ?>
            <div class="mkdf-grid">
                <?php endif; ?>
                <div class="mkdf-vertical-align-containers">
                    <div class="mkdf-position-left"><!--
                     --><div class="mkdf-position-left-inner">
                            <?php wanderland_mikado_get_sticky_divided_left_main_menu('mkdf-sticky-nav'); ?>
                        </div>
                    </div>
                    <div class="mkdf-position-center"><!--
                     --><div class="mkdf-position-center-inner">
                            <?php if (!$hide_logo) {
                                wanderland_mikado_get_logo('sticky');
                            } ?>
                        </div>
                    </div>
                    <div class="mkdf-position-right"><!--
                     --><div class="mkdf-position-right-inner">
                            <?php wanderland_mikado_get_sticky_divided_right_main_menu('mkdf-sticky-nav'); ?>
                        </div>
                    </div>
                </div>
                <?php if ($sticky_header_in_grid) : ?>
            </div>
        <?php endif; ?>
        </div>
    </div>

<?php do_action('wanderland_mikado_action_after_sticky_header'); ?>