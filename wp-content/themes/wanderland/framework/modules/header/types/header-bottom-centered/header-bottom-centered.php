<?php
namespace WanderlandMikadoNamespace\Modules\Header\Types;

use WanderlandMikadoNamespace\Modules\Header\Lib\HeaderType;

/**
 * Class that represents Header Bottom layout and option
 *
 * Class HeaderBottom
 */
class HeaderBottomCentered extends HeaderType {
	protected $heightOfTransparency;
	protected $heightOfCompleteTransparency;
	protected $headerHeight;
	protected $mobileHeaderHeight;
	protected $menuAreaHeight;
	
	/**
	 * Sets slug property which is the same as value of option in DB
	 */
	public function __construct() {
		$this->slug = 'header-bottom-centered';
		
		if ( ! is_admin() ) {
			$this->menuAreaHeight     = wanderland_mikado_set_default_menu_height_for_header_types();
			$this->mobileHeaderHeight = wanderland_mikado_set_default_mobile_menu_height_for_header_types();
			
			add_action( 'wp', array( $this, 'setHeaderHeightProps' ) );
			
			add_filter( 'wanderland_mikado_filter_js_global_variables', array( $this, 'getGlobalJSVariables' ) );
			add_filter( 'wanderland_mikado_filter_per_page_js_vars', array( $this, 'getPerPageJSVariables' ) );
		}
	}
	
	/**
	 * Loads template file for this header type
	 *
	 * @param array $parameters associative array of variables that needs to passed to template
	 */
	public function loadTemplate( $parameters = array() ) {
		
		$parameters = apply_filters( 'wanderland_mikado_filter_header_bottom_centered_parameters', $parameters );
		
		wanderland_mikado_get_module_template_part( 'templates/' . $this->slug, $this->moduleName . '/types/' . $this->slug, '', $parameters );
	}
	
	/**
	 * Sets header height properties after WP object is set up
	 */
	public function setHeaderHeightProps() {
		$this->heightOfTransparency         = $this->calculateHeightOfTransparency();
		$this->heightOfCompleteTransparency = $this->calculateHeightOfCompleteTransparency();
		$this->headerHeight                 = $this->calculateHeaderHeight();
		$this->mobileHeaderHeight           = $this->calculateMobileHeaderHeight();
	}
	
	/**
	 * Returns total height of transparent parts of header
	 *
	 * @return int
	 */
	public function calculateHeightOfTransparency() {
		$transparencyHeight = 0;
		
		return $transparencyHeight;
	}
	
	/**
	 * Returns height of completely transparent header parts
	 *
	 * @return int
	 */
	public function calculateHeightOfCompleteTransparency() {
		$transparencyHeight = 0;
		
		return $transparencyHeight;
	}
	
	/**
	 * Returns total height of header
	 *
	 * @return int|string
	 */
	public function calculateHeaderHeight() {
		$headerHeight = $this->menuAreaHeight;
		
		return $headerHeight;
	}
	
	/**
	 * Returns total height of mobile header
	 *
	 * @return int|string
	 */
	public function calculateMobileHeaderHeight() {
		$mobileHeaderHeight = $this->mobileHeaderHeight;
		
		return $mobileHeaderHeight;
	}
	
	/**
	 * Returns global js variables of header
	 *
	 * @param $globalVariables
	 *
	 * @return int|string
	 */
	public function getGlobalJSVariables( $globalVariables ) {
		$globalVariables['mkdfLogoAreaHeight']     = 0;
		$globalVariables['mkdfMenuAreaHeight']     = $this->headerHeight;
		$globalVariables['mkdfMobileHeaderHeight'] = $this->mobileHeaderHeight;
		
		return $globalVariables;
	}
	
	/**
	 * Returns per page js variables of header
	 *
	 * @param $perPageVars
	 *
	 * @return int|string
	 */
	public function getPerPageJSVariables( $perPageVars ) {
		
		$perPageVars['mkdfHeaderTransparencyHeight'] = $this->headerHeight - ( wanderland_mikado_get_top_bar_height() + $this->heightOfCompleteTransparency );
		$perPageVars['mkdfHeaderVerticalWidth'] = 0;
		
		return $perPageVars;
	}
}