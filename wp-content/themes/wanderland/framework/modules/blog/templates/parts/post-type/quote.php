<?php
$title_tag = isset($quote_tag) ? $quote_tag : 'h5';
$quote_text_meta = get_post_meta(get_the_ID(), "mkdf_post_quote_text_meta", true );

$post_title = !empty($quote_text_meta) ? $quote_text_meta : get_the_title();

$post_author = get_post_meta(get_the_ID(), "mkdf_post_quote_author_meta", true );
?>

<div class="mkdf-post-quote-holder">
    <div class="mkdf-post-quote-holder-inner">
        <<?php echo esc_attr($title_tag);?> itemprop="name" class="mkdf-quote-title mkdf-post-title">
        <?php if(wanderland_mikado_blog_item_has_link()) { ?>
            <a itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
        <?php } ?>
            <?php echo esc_html($post_title); ?>
        <?php if(wanderland_mikado_blog_item_has_link()) { ?>
            </a>
        <?php } ?>
        </<?php echo esc_attr($title_tag);?>>
        <?php if($post_author != '') { ?>
            <span class="mkdf-quote-author">
                <span class="mkdf-author-label">
                <?php echo esc_html($post_author); ?>
                </span>
                <span class="mkdf-st-highlight">
                <?php echo wanderland_section_title_highlighted_word_left_svg() ?>
                <span class="mkdf-active-hover-middle"></span>
                <?php echo wanderland_section_title_highlighted_word_right_svg() ?>
                </span>
            </span>
        <?php } ?>
    </div>
</div>