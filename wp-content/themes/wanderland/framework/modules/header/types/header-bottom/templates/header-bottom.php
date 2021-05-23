<?php do_action('wanderland_mikado_action_before_page_header'); ?>
<header class="mkdf-page-header">
    <?php do_action('wanderland_mikado_action_after_page_header_html_open'); ?>
    <div class="mkdf-fixed-wrapper">
        <div class="mkdf-menu-area">
            <?php do_action('wanderland_mikado_action_after_header_menu_area_html_open') ?>

            <?php if($menu_area_in_grid) : ?>
                <div class="mkdf-grid">
            <?php endif; ?>

                <div class="mkdf-vertical-align-containers">
                    <div class="mkdf-position-left"><!--
                     --><div class="mkdf-position-left-inner">
		                    <?php if(!$hide_logo) {
			                    wanderland_mikado_get_logo();
		                    } ?>
                        </div>
                    </div>
                    <div class="mkdf-position-right"><!--
                     --><div class="mkdf-position-right-inner">
		                    <?php wanderland_mikado_get_main_menu(); ?>
		                    <?php wanderland_mikado_get_header_widget_area_one(); ?>
                        </div>
                    </div>
                </div>

            <?php if($menu_area_in_grid) : ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
    <?php do_action('wanderland_mikado_action_before_page_header_html_close'); ?>
</header>
<?php do_action('wanderland_mikado_action_after_page_header'); ?>