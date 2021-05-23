<div class="mkdf-fullscreen-menu-holder-outer">
	<div class="mkdf-fullscreen-menu-holder">
		<a href="javascript:void(0)" class="mkdf-fullscreen-menu-opener mkdf-fullscreen-menu-opener-predefined">
			<span class="mkdf-fullscreen-menu-close-icon">
				<?php echo wanderland_mikado_get_icon_sources_html( 'fullscreen_menu', true ); ?>
			</span>
		</a>
		<div class="mkdf-fullscreen-menu-holder-inner">
			<?php if ($fullscreen_menu_in_grid) : ?>
				<div class="mkdf-container-inner">
			<?php endif; ?>
			
			<?php if ( wanderland_mikado_is_header_widget_area_active( 'one' ) ) { ?>
				<div class="mkdf-fullscreen-above-menu-widget-holder">
					<?php wanderland_mikado_get_header_widget_area_one(); ?>
				</div>
			<?php } ?>
			
			<?php 
			//Navigation
			wanderland_mikado_get_module_template_part('templates/full-screen-menu-navigation', 'header/types/header-minimal');;

			?>
			
			<?php if ( wanderland_mikado_is_header_widget_area_active( 'two' ) ) { ?>
				<div class="mkdf-fullscreen-below-menu-widget-holder">
					<?php wanderland_mikado_get_header_widget_area_two(); ?>
				</div>
			<?php } ?>
			
			<?php if ($fullscreen_menu_in_grid) : ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>