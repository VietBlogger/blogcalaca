<?php
$blog_single_navigation = wanderland_mikado_options()->getOptionValue('blog_single_navigation') === 'no' ? false : true;
$blog_navigation_through_same_category = wanderland_mikado_options()->getOptionValue('blog_navigation_through_same_category') === 'no' ? false : true;
?>
<?php if($blog_single_navigation){ ?>
	<div class="mkdf-blog-single-navigation">
		<div class="mkdf-blog-single-navigation-inner clearfix">
			<?php
				/* Single navigation section - SETTING PARAMS */
                $same_cat_flag = false;
                if($blog_navigation_through_same_category){
                    $same_cat_flag = true;
                }
                $prevPost = get_previous_post($same_cat_flag);
                $nextPost = get_next_post($same_cat_flag);

				$post_navigation = array(
					'prev' => array(
						'mark' => '<span class="mkdf-blog-single-nav-mark ion-ios-arrow-thin-left"></span>',
						'label' => '<span class="mkdf-blog-single-nav-label">'.esc_html__('previous post', 'wanderland').'</span>'
					),
					'next' => array(
						'mark' => '<span class="mkdf-blog-single-nav-mark ion-ios-arrow-thin-right"></span>',
						'label' => '<span class="mkdf-blog-single-nav-label">'.esc_html__('next post', 'wanderland').'</span>'
					)
				);
			
				if($blog_navigation_through_same_category){
					if(get_previous_post(true) !== ""){
						$post_navigation['prev']['post'] = get_previous_post(true);
					}
					if(get_next_post(true) !== ""){
						$post_navigation['next']['post'] = get_next_post(true);
					}
				} else {
					if(get_previous_post() !== ""){
						$post_navigation['prev']['post'] = get_previous_post();
					}
					if(get_next_post() !== ""){
						$post_navigation['next']['post'] = get_next_post();
					}
				}

			if(isset($prevPost) && $prevPost !== '' && $prevPost !== null){
				$image = get_the_post_thumbnail($prevPost->ID, 'wanderland_post_thumb_size');
				$post_navigation['prev']['image'] = '';

				if($image !== ''){
					$post_navigation['prev']['image'] = '<div class="mkdf-blog-single-nav-thumbnail">'.wp_kses_post($image).'</div>';
				}
			}

			if(isset($nextPost) && $nextPost !== '' && $nextPost !== null){
				$image = get_the_post_thumbnail($nextPost->ID, 'wanderland_post_thumb_size');

				$post_navigation['next']['image'] = '';

				if($image !== ''){
					$post_navigation['next']['image'] = '<div class="mkdf-blog-single-nav-thumbnail">'.wp_kses_post($image).'</div>';
				}
			}

				/* Single navigation section - RENDERING */
				foreach (array('prev', 'next') as $nav_type) {
					if (isset($post_navigation[$nav_type]['post'])) { ?>
						<a itemprop="url" class="mkdf-blog-single-<?php echo esc_attr($nav_type); ?>" href="<?php echo get_permalink($post_navigation[$nav_type]['post']->ID); ?>">
							<?php echo wp_kses($post_navigation[$nav_type]['mark'], array('span' => array('class' => true))); ?>
							<?php echo wp_kses($post_navigation[$nav_type]['label'], array('span' => array('class' => true))); ?>
							<?php echo wp_kses_post($post_navigation[$nav_type]['image']) ?>
						</a>
					<?php }
				}
			?>
		</div>
	</div>
<?php } ?>