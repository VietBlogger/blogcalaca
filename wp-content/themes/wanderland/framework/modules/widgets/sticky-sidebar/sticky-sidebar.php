<?php

if ( class_exists( 'WanderlandCoreClassWidget' ) ) {
	class WanderlandMikadoClassStickySidebar extends WanderlandCoreClassWidget {
		public function __construct() {
			parent::__construct(
				'mkdf_sticky_sidebar',
				esc_html__( 'Wanderland Sticky Sidebar Widget', 'wanderland' ),
				array( 'description' => esc_html__( 'Use this widget to make the sidebar sticky. Drag it into the sidebar above the widget which you want to be the first element in the sticky sidebar.', 'wanderland' ) )
			);
			
			$this->setParams();
		}
		
		protected function setParams() {
		}
		
		public function widget( $args, $instance ) {
			echo '<div class="widget mkdf-widget-sticky-sidebar"></div>';
		}
	}
}
