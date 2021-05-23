<?php
namespace WanderlandCore\Lib;
class DestinationQuery{

    private $query_results;
    private $query_array;
    private $query_meta_array;
    private $post_number;
    private $destination_type_id;
    private $category_array;
    private $meta_query_flag;
    private $checkbox_meta_params;
    private $default_meta_params;
    private $next_page;
    private $user_id;
    private $post_status;
    private $keyword;
    private $post__in;
    private $post__not_in;
    private $tag;
    private $location;
    private $tax_query;
    private $location_object;
    private $sort_param;

    public function __construct($destination_type_id = '', $post_number = '-1', $category_array = array(), $meta_query_flag = false, $checkbox_meta_params = array(), $default_meta_params = array(), $next_page = '', $user_id = '', $post_status = 'publish', $keyword = '', $post__in = array(), $post__not_in = array(), $tag = '', $location = '', $tax_query = array(), $location_object = array(), $sort_param = '') {

        $this->destination_type_id = $destination_type_id;
        $this->post_number = $post_number;
        $this->category_array = $category_array;
        $this->meta_query_flag = $meta_query_flag;
        $this->checkbox_meta_params = $checkbox_meta_params;
        $this->default_meta_params = $default_meta_params;
        $this->next_page = $next_page;
        $this->user_id = $user_id;
        $this->post_status = $post_status;
        $this->keyword = $keyword;
        $this->post__in = $post__in;
        $this->post__not_in = $post__not_in;
        $this->tag = $tag;
        $this->location = $location;
        $this->tax_query = $tax_query;
        $this->location_object = $location_object;
        $this->sort_param = $sort_param;

        $this->generateQueryArray();
        $this->setQueryResults();

    }

    private function generateQueryArray(){

        $this->query_array = array(
            'post_status'   => $this->post_status,
            'post_type'     => 'destination-item',
            'posts_per_page'=> (int)$this->post_number,
            'suppress_filters' => 0
        );

        if($this->user_id !== ''){
            $this->query_array['author'] = $this->user_id;
        }
        if($this->keyword !== ''){
            $this->query_array['s'] = $this->keyword;
        }

        if(isset($this->destination_type_id) && $this->destination_type_id !== '' && $this->destination_type_id !== 'all'){
            $this->query_array['tax_query'][] = array(
                'taxonomy' => 'destination-item_type',
                'field' => 'term_id',
                'terms' => (int)$this->destination_type_id
            );
        }

        if(isset($this->category_array) && count($this->category_array)){
            $this->query_array['tax_query'][] = array(
                'taxonomy' => 'destination-item-category',
                'field' => 'slug',
                'terms' => $this->category_array
            );
        }

        if($this->tag !== ''){
            $this->query_array['tax_query'][] = array(
                'taxonomy' => 'destination-item-tag',
                'field' => 'term_id',
                'terms' => (int)$this->tag
            );
        }

        if($this->location !== '' && $this->location !== 'all'){
            $this->query_array['tax_query'][] = array(
                'taxonomy' => 'destination-item-region',
                'field' => 'term_id',
                'terms' => (int)$this->location
            );
        }

        if(count($this->tax_query)){
            $this->query_array['tax_query'][] = array(
                'taxonomy' => $this->tax_query['tax_id'],
                'field' => 'slug',
                'terms' => $this->tax_query['tax_slug_array']
            );
        }

        if(count($this->post__in)){
            $this->query_array['post__in'] = $this->post__in;
        }
        if(count($this->post__not_in)){
            $this->query_array['post__not_in'] = $this->post__not_in;
        }

        //order and orderby params
        if($this->sort_param !== ''){

            $sort_array = explode('-', $this->sort_param);

            $order_by = $sort_array[0];
            $order = strtoupper($sort_array[1]);

            if($order !== ''){
                $this->query_array['order'] = $order;
            }
            if($order_by !== ''){
                switch ($order_by){
                    case 'date':
                        $this->query_array['orderby'] = 'date';
                        break;
                    case 'name':
                        $this->query_array['orderby'] = 'title';
                        break;
//                    case 'rating':
//                        $this->query_array['orderby'] = 'meta_value_num date';
//                        $this->query_array['meta_key'] = 'mkdf_post_rating_value';
//                        break;
                }
            }

        }

        if($this->meta_query_flag){

            $meta_query_fields = array(
                'relation' => 'AND'
            );

            if(count($this->checkbox_meta_params)){
                foreach ($this->checkbox_meta_params as $param_key => $param_value){
                    if($param_value === 'true'){
                        $meta_query_fields[] = array(
                            'key' => $param_key,
                            'value' => '1' //amenities has value 1 or 0
                        );
                    }
                }
            }
            if(count($this->default_meta_params)){

                foreach ($this->default_meta_params as $param_key => $param_value){

                    if($param_value !== ''){
                        if($param_key === 'price_max'){
                            $meta_query_fields[] = array(
                                'key' => '_destination_disc_price',
                                'value' => $param_value,
                                'type'    => 'numeric',
                                'compare' => '<='
                            );
                        }elseif($param_key === 'price_min'){
                            array(
                                'key' => '_destination_disc_price',
                                'value' => $param_value,
                                'type'    => 'numeric',
                                'compare' => '=>'
                            );
                        }elseif($param_key === 'price_both_values'){
                            array(
                                'key' => '_destination_disc_price',
                                'value' => array($param_key['min'], $param_key['max']),
                                'type'    => 'numeric',
                                'compare' => 'BETWEEN'
                            );
                        }
                        else{
                            $meta_query_fields[] = array(
                                'key' => $param_key,
                                'value' => $param_value
                            );
                        }
                    }
                }
            }

            $this->query_meta_array[] = $meta_query_fields;
            $this->query_array['meta_query'] = $this->query_meta_array;

        }

        //generate paged param
        if($this->next_page !== ''){
            $this->query_array['paged'] = (int)$this->next_page;
        } else {
            $this->query_array['paged'] = 1;
        }
    }

    private function setQueryResults(){

        if(isset($this->location_object['dist']) && isset($this->location_object['lat']) && isset($this->location_object['long'])){

            //we need to get all destination, not just posts from first pagination page
            $this->query_array['posts_per_page'] = '-1';

            $query = new \WP_Query($this->query_array);

            $lat = $this->location_object['lat'];
            $long = $this->location_object['long'];
            $dist = $this->location_object['dist'];
            $posts = $query->get_posts();
            $post_in = $post_not_in = $posts_to_check = array();

            if($posts && count($posts)){
                foreach($posts as $post){
                    $posts_to_check[$post->ID] = $post->post_title;
                }
            }

            //get hide and show arrays
            $geo_location_answer  = mkdf_destination_check_distance($lat, $long, $dist, $posts_to_check);


            if(isset($geo_location_answer['hide_items'])){

                if(count($geo_location_answer['hide_items'])){
                    $this->query_array['post__not_in'] = $geo_location_answer['hide_items'];
                }

            }

            if(isset($geo_location_answer['show_items'])){

                if(count($geo_location_answer['show_items'])){
                    $this->query_array['post_in'] = $geo_location_answer['show_items'];
                }

            }

            //set post_per_page like it should be
            $this->query_array['posts_per_page'] = $this->post_number;

            //finally get real query results
            $this->query_results = new \WP_Query($this->query_array);

        }else{
            $this->query_results = new \WP_Query($this->query_array);
        }
    }
    public function getQueryResults(){
        return $this->query_results;
    }

    public function getQueryResultsArray(){
        $destination_array = array();

        if($this->query_results->have_posts()){
            while ( $this->query_results->have_posts() ) {
                $this->query_results->the_post();
                $destination_array[get_the_ID()] = get_the_title();
            }
            wp_reset_postdata();
        }

        return $destination_array;

    }


}

class DestinationArticle{

    private static $instance;
    private $post_id;
    private $post_type;

    public function __construct($post_id) {
        $this->post_id = $post_id;
        $this->setPostType();
    }

    /**
     * Returns current instance of class
     * @return DestinationArticle
     */
    public static function getInstance() {
        if(self::$instance == null) {
            return new self;
        }

        return self::$instance;
    }

    /**
     * Make sleep magic method private, so nobody can serialize instance.
     */

    private function __clone() {}

    /**
     * Make sleep magic method private, so nobody can serialize instance.
     */
    private function __sleep() {}

    /**
     * Make wakeup magic method private, so nobody can unserialize instance.
     */
    private function __wakeup() {}

    private function setPostType(){
        $this->post_type = get_post_type($this->post_id);
    }

    private function getPostType(){
        return $this->post_type;
    }

    public function getTaxArray($taxonomy){

        $tax_array = array();
        $taxes = wp_get_object_terms($this->post_id, $taxonomy);

        if(is_array($taxes) && count($taxes)){
            foreach($taxes as $tax){

                $tax_array[]  = array(
                    'id' => $tax->term_id,
                    'name' => $tax->name,
                    'link' => get_term_link($tax->term_id, $taxonomy),
                    'icon_html' => mkdf_destination_get_destination_category_icon_html($tax->term_id)
                );

            }
        }
        return $tax_array;
    }


    public function getPostMeta($post_meta){

        $meta_field_value = get_post_meta($this->post_id, $post_meta, true);
        return $meta_field_value;

    }

    public function getTaxHtml($taxonomy, $custom_css_class = '', $show_title = false){

        $html = '';
        $taxes = $this->getTaxArray($taxonomy);

        if(count($taxes)){
            $html .= '<div class="mkdf-tax-wrapper '.esc_attr($custom_css_class).'">';
            foreach($taxes as $tax){

                $html .= '<a href="'.esc_url($tax['link']).'">';

                if($tax['icon_html'] !== ''){
                    $html .= $tax['icon_html'];
                }

                if($show_title){
                    $html .= '<span class="mkdf-tax-title">';
                    $html .= esc_attr($tax['name']);
                    $html .= '</span>';
                }

                $html .= '</a>';
            }
            $html .= '</div>';
        }
        return $html;
    }

    public function getAddressIconHtml(){

        $params_address = wanderland_core_get_address_params($this->post_id);
        $city  = $this->getPostMeta('geolocation_city');
        $address  = $this->getPostMeta('geolocation_address');

        extract($params_address);
        $html = '';


        if($city !== ''){
            $html .= '<div class="mkdf-ds-adr-city">';
            $html .= '<span class="mkdf-city">'.esc_html($address,$city).'</span>';
            $html .= '</div>';
        }

        return $html;

    }
}

class DestinationTitleGlobalVar{

    private $type;

    public function __construct($type = '') {

        $this->type  = $type;
        $this->generateGlobalVar();

    }

    public function generateGlobalVar(){

        $destination_posts = $params = array();

        if($this->type !== ''){
            $params['type'] = $this->type;
        }

        $query_results = mkdf_destination_get_destination_query_results($params);

        if($query_results->have_posts()){
            while($query_results->have_posts()){
                $query_results->the_post();
                $destination_posts[] = get_the_title();
            }
            wp_reset_postdata();
        }

        $destination_posts = apply_filters('mkdf_destination_filter_js_destination_variables', $destination_posts);

        wp_localize_script('wanderland-mikado-modules', 'mkdfDestinationTitles', array(
            'titles' => $destination_posts
        ));
    }

}