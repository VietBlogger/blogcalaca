<?php if($max_num_pages > 1) { ?>
	<div class="mkdf-blog-pag-loading">
		<div class="mkdf-blog-pag-bounce1"></div>
		<div class="mkdf-blog-pag-bounce2"></div>
		<div class="mkdf-blog-pag-bounce3"></div>
	</div>
<?php
	$unique_id = rand( 1000, 9999 );
	wp_nonce_field( 'mkdf_blog_load_more_nonce_' . $unique_id, 'mkdf_blog_load_more_nonce_' . $unique_id );
}