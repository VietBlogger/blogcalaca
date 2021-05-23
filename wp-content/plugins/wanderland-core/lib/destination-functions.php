<?php

if(!function_exists('mkdf_destination_get_destination_query_results')){
    /**
     * Generates query results based on params
     * $attributes can contain:
     *      $destination_type_id - destination type taxonomy term id
     *      $post_number - number of post per page. $post number can be set in Theme Options(Destinations Section), then in wp_job_manager options and also in native WordPress Options
     *      $category_array - array of destination category slugs. We need to have array because we have cases where need to get destination from multiple categoriess
     *      $meta_query_flag - boolean value to enable meta query flag
     *      $checkbox_meta_params - custom destination meta fields(checkboxes) should be placed here.Note that this array will be filtered just if $meta_query_flag is true
     *      $default_meta_params - custom destination meta fields(without checkboxes) should be placed here.Note that this array will be filtered just if $meta_query_flag is true
     *      $next_page - next_page param is used for paginations
     *      $user_id - get users destinationss
     *      $post_status - array or string of defined post statuses
     *      $keyword - filter destinations by keyword
     *      $post_in - array of destination ids to get
     *      $post_not_in - array of destination ids to exclude
     *      $tag - filter destinations by tag
     *      $location - filter destinations by location
     *
     * @param $attributes
     *
     * @return WP_Query object
     */
    function mkdf_destination_get_destination_query_results($attributes = array(), $return_type = 'query'){

        $type = '';
        $tag = '';
        $location = '';
        $category_array = array();
        $tax_array = array();
        $user_id = '';
        $keyword = '';
        $post_number = '-1';
        $post_status = 'publish';
        $post_in = array();
        $post_not_in = array();
        $meta_query_flag = false;
        $checkbox_meta_params = array();
        $default_meta_params = array();
        $next_page = '';
        $location_object = array();
        $sort_param = '';

        extract($attributes);
        $query_object = new WanderlandCore\Lib\DestinationQuery($type, $post_number, $category_array, $meta_query_flag ,$checkbox_meta_params, $default_meta_params, $next_page, $user_id, $post_status, $keyword, $post_in, $post_not_in, $tag, $location, $tax_array, $location_object, $sort_param);

        if($return_type === 'query'){
            return $query_object->getQueryResults();
        }
        if($return_type === 'array'){
            return $query_object->getQueryResultsArray();
        }

    }

}

if(!function_exists('mkdf_destination_check_distance')){

    /**
     * Generates the string for the Haversine function. We assume that the `zipcode`, `latitude`,
     * and `longitude` columns are named accordingly. We are also not doing much error-checking
     * here; this is a simple text cruncher to make things prettier.
     * We may also be integrating some extra SQL in, passed in via the $extra parameter
     *
     * @param   string      $table      The table to search in
     * @param   float       $lat        The latitude part of the reference coordinates
     * @param   float       $lng        The longitude part of the reference coordinates
     * @param   int         $radius     The radius to search within
     * @param   string      $extra      Some extra SQL for the city/state part of the search
     *
     * @return  string      Returns an SQL query as a string
     *
     **/

    function mkdf_destination_check_distance( $lat, $long, $radius, $posts = array()){

        $destinations_array = $posts;

        $current_lat = $current_long = $miles = '' ;
        $return_array = array();
        if(count($destinations_array)){
            foreach($destinations_array as $destination_key => $destination_title){

                $current_lat = get_post_meta($destination_key, 'geolocation_lat', true);
                $current_long = get_post_meta($destination_key, 'geolocation_long', true);

                if($current_lat !== '' && $current_long !== ''){

                    $theta = $long - $current_long;
                    $dist = sin(deg2rad($lat)) * sin(deg2rad($current_lat)) +  cos(deg2rad($lat)) * cos(deg2rad($current_lat)) * cos(deg2rad($theta));
                    $dist = acos($dist);
                    $dist = rad2deg($dist);
                    $miles = $dist * 60 * 1.1515;
                    $km = 1.609344*$miles;

                    if($km <= $radius){
                        $return_array['show_items'][] = $destination_key;
                    }else{
                        $return_array['hide_items'][] = $destination_key;
                    }
                }else{
                    $return_array['hide_items'][]  = $destination_key;
                }

            }
        }

        return $return_array;
    }

}

if(!function_exists('mkdf_destination_check_destination_location')){

    function mkdf_destination_check_destination_location($id, $location_array){

        $current_lat = get_post_meta($id, 'geolocation_lat', true);
        $current_long = get_post_meta($id, 'geolocation_long', true);
        $show_item = false;

        $lat = $location_array['lat'];
        $long = $location_array['long'];
        $distance = $location_array['distance'];

        if($current_lat !== '' && $current_long !== ''){

            $theta = $long - $current_long;
            $dist = sin(deg2rad($lat)) * sin(deg2rad($current_lat)) +  cos(deg2rad($lat)) * cos(deg2rad($current_lat)) * cos(deg2rad($theta));
            $dist = acos($dist);
            $dist = rad2deg($dist);
            $miles = $dist * 60 * 1.1515;

            if($miles <= $distance){
                $show_item = true;
            }

        }

        return $show_item;

    }

}