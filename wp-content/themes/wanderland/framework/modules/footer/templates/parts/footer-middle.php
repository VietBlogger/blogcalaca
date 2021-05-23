<div class="mkdf-footer-middle-holder">
    <div class="mkdf-footer-middle-inner <?php echo esc_attr($footer_middle_grid_class); ?>">
        <div class="mkdf-grid-row <?php echo esc_attr($footer_middle_classes); ?>">
            <?php for ($i = 0; $i < sizeof($footer_middle_columns); $i++) { ?>
                <div class="mkdf-column-content mkdf-grid-col-<?php echo esc_attr($footer_middle_columns[$i]); ?>">
                    <?php
                    if (is_active_sidebar('footer_middle_column_' . ($i+1))) {
                        dynamic_sidebar('footer_middle_column_' . ($i+1));
                    }
                    ?>
                </div>
            <?php } ?>
        </div>
    </div>
</div>