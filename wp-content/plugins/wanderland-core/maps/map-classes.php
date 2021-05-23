<?php
namespace WanderlandCore\Maps;

class MapGlobalVars{

	private $id;
	private $type;
	private $query;
	private $init_multiple_map;
	private $multiple_vars;

	public function __construct($type, $id = '', $query = '' ,$init_multiple_map = false) {

		$this->type = $type;
		$this->id = $id;
		$this->query = $query;
		$this->init_multiple_map = $init_multiple_map;
		$this->multiple_vars['addresses'] = array();

		if($this->type === 'single'){
			add_action('wp_enqueue_scripts', array($this, 'generateSingleGlobalVar'), 20);
		}
		if($this->type === 'multiple'){
			$this->setMultipleVars();

			if($this->init_multiple_map){
				add_action('wp_footer', array($this, 'setMultipleGlobalVars'));
			}
		}
	}

	public function generateSingleGlobalVar(){

		$single_map_variables = array();

		if($this->id !== ''){
			$single_map_variables['currentDestination'] = $this->generateDestinationMapParams($this->id);
		}

		$single_map_variables = apply_filters('wanderland_mikado_filter_js_single_map_variables', $single_map_variables);

		wp_localize_script('wanderland-mikado-modules', 'mkdfSingleMapVars', array(
			'single' => $single_map_variables
		));

	}

	public function setMultipleGlobalVars(){

		$multiple_map_variables = $this->getMultipleVars();

		wp_localize_script('wanderland-mikado-modules', 'mkdfMultipleMapVars', array(
			'multiple' => $multiple_map_variables
		));

	}

	public function setMultipleVars(){

		if($this->query !== ''){
			if($this->query->have_posts()){
				while($this->query->have_posts()){
					$this->query->the_post();
					$this->multiple_vars['addresses'][] = $this->generateDestinationMapParams(get_the_ID());
				}
			}
		}

	}

	public function getMultipleVars(){
		return $this->multiple_vars;
	}

	private function generateDestinationMapParams($destination_item_id){

		$destination_map_params = array();

		//get destination image
		$image_id = get_post_thumbnail_id( $destination_item_id );
		$image = wp_get_attachment_image_src( $image_id , 'square' );
		$image[5] = '';
		if(isset($image[0]) && $image[0] !== ''){
			$image[5] = wanderland_mikado_get_inline_style('background-image: url('.$image[0].')');
		}

		$marker_pin = '';

		//get address params
		$address_array = wanderland_core_get_address_params($destination_item_id);

		//Get item location
		if($address_array['address'] === '' && $address_array['address_lat'] === '' && $address_array['address_long'] === ''){
			$destination_map_params['location'] = null;
		}else{
			$destination_map_params['location'] = array(
				'address' => $address_array['address'],
				'latitude' => $address_array['address_lat'],
				'longitude' => $address_array['address_long']
			);
		}


		$destination_map_params['title'] = get_the_title($destination_item_id);
		$destination_map_params['categories'] = wp_get_post_terms($destination_item_id, 'destination-category');
		$destination_map_params['excerpt'] = get_the_excerpt($destination_item_id);

		$destination_map_params['markerPin'] = $marker_pin;
		$destination_map_params['featuredImage'] = $image;
		$destination_map_params['itemUrl'] = get_the_permalink($destination_item_id);

		return $destination_map_params;

	}

}