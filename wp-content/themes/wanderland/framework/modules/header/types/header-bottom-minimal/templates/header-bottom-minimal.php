<?php do_action('wanderland_mikado_action_before_page_header'); ?>

<header class="mkdf-page-header">
	<?php do_action('wanderland_mikado_action_after_page_header_html_open'); ?>
	
	<?php if($show_fixed_wrapper) : ?>
		<div class="mkdf-fixed-wrapper">
	<?php endif; ?>
			
	<div class="mkdf-menu-area">
		<?php do_action('wanderland_mikado_action_after_header_menu_area_html_open'); ?>
		
		<?php if($menu_area_in_grid) : ?>
			<div class="mkdf-grid">
		<?php endif; ?>
				
			<div class="mkdf-vertical-align-containers">
				<div class="mkdf-position-left"><!--
				 --><div class="mkdf-position-left-inner">
						<?php wanderland_mikado_get_header_bottom_minimal_widget_menu_area(); ?>
					</div>
				</div>
				<div class="mkdf-position-center"><!--
					 --><div class="mkdf-position-center-inner">
						<?php if(!$hide_logo) {
							wanderland_mikado_get_logo();
						} ?>
					</div>
				</div>
				<div class="mkdf-position-right"><!--
				 --><div class="mkdf-position-right-inner">
						<a href="javascript:void(0)" <?php wanderland_mikado_class_attribute( $fullscreen_menu_icon_class ); ?>>
							<span class="mkdf-fullscreen-menu-icon-text"><?php esc_html_e( 'Menu', 'wanderland' ); ?></span>
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
				
		<?php if($menu_area_in_grid) : ?>
			</div>
		<?php endif; ?>
	</div>
			
	<?php if($show_fixed_wrapper) { ?>
		</div>
	<?php } ?>
	
	<?php if($show_sticky) {
		wanderland_mikado_get_sticky_header('bottom-minimal', 'header/types/header-bottom-minimal');
	} ?>
	
	<?php do_action('wanderland_mikado_action_before_page_header_html_close'); ?>
</header>