<form action="<?php echo esc_url( home_url( '/' ) ); ?>" class="mkdf-on-side-search-form" method="get">
    <div class="mkdf-form-holder">
        <div class="mkdf-form-holder-inner">
            <div class="mkdf-field-holder">
                <input type="text" placeholder="<?php esc_attr_e( 'Search', 'wanderland' ); ?>" name="s" class="mkdf-search-field" autocomplete="off" required/>
            </div>
            <button class="mkdf-onside-btn" type="submit">
                <span class="mkdf-onside-btn-icon"></span>
            </button>
        </div>
    </div>
</form>