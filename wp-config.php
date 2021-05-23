<?php
/**
 * Cấu hình cơ bản cho WordPress
 *
 * Trong quá trình cài đặt, file "wp-config.php" sẽ được tạo dựa trên nội dung 
 * mẫu của file này. Bạn không bắt buộc phải sử dụng giao diện web để cài đặt, 
 * chỉ cần lưu file này lại với tên "wp-config.php" và điền các thông tin cần thiết.
 *
 * File này chứa các thiết lập sau:
 *
 * * Thiết lập MySQL
 * * Các khóa bí mật
 * * Tiền tố cho các bảng database
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Thiết lập MySQL - Bạn có thể lấy các thông tin này từ host/server ** //
/** Tên database MySQL */
define( 'DB_NAME', 'calaca_calaca' );

/** Username của database */
define( 'DB_USER', 'calaca_calaca' );

/** Mật khẩu của database */
define( 'DB_PASSWORD', '5TnpSB2U' );

/** Hostname của database */
define( 'DB_HOST', 'localhost' );

/** Database charset sử dụng để tạo bảng database. */
define( 'DB_CHARSET', 'utf8mb4' );

/** Kiểu database collate. Đừng thay đổi nếu không hiểu rõ. */
define('DB_COLLATE', '');

/**#@+
 * Khóa xác thực và salt.
 *
 * Thay đổi các giá trị dưới đây thành các khóa không trùng nhau!
 * Bạn có thể tạo ra các khóa này bằng công cụ
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * Bạn có thể thay đổi chúng bất cứ lúc nào để vô hiệu hóa tất cả
 * các cookie hiện có. Điều này sẽ buộc tất cả người dùng phải đăng nhập lại.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '%4L@i=6_u<u.ZPpQx`ZmGSW{hkJ#Q8GV?jsI8l!q7eJ* X^`slS n70ZulV.Y9ST' );
define( 'SECURE_AUTH_KEY',  '[.iE|alBB%<67cFFrD7QTm]nRN0c,L k^tIo/Po)Ps]=l+E@Eaz0q&)07,gm)I6t' );
define( 'LOGGED_IN_KEY',    'St.&GAH$^ZyzBh%B1I.8K^=L<y0uN}dlLyO8]r+zB3CC4E&W.f3ghYD5TFag/a>}' );
define( 'NONCE_KEY',        'oPi_gQ|B>8s#%)XM1ZWh@,>g(]0J)C9<N0j[kN.B7y,^c76^*!mwkY$_GKS`X@>p' );
define( 'AUTH_SALT',        '<!r|1$7X4avC >iJ[*G{Nk`D 9S(5TIRD_ROei|*|]X$6z L<=Eb}erkvIjSRf9u' );
define( 'SECURE_AUTH_SALT', '-0no@GwYA8*+WLN}MMQ!`%{]DffMGgt(+7=,uT52<_Lk3-]Y#iA|d-D*1GRpF}z5' );
define( 'LOGGED_IN_SALT',   'x=4~:+HMSVLV|D],!8dQa/8^PyCjQ$+r@-SnCnO}c@pDlk2%},xjgi WU_Vq?Dt,' );
define( 'NONCE_SALT',       'YRK@P&rAlI?@$3uU_mMWX?a?xlL2w:/>Cect,dk-y5nvHqxlgac]UE[qj?Y<rZXM' );

/**#@-*/

/**
 * Tiền tố cho bảng database.
 *
 * Đặt tiền tố cho bảng giúp bạn có thể cài nhiều site WordPress vào cùng một database.
 * Chỉ sử dụng số, ký tự và dấu gạch dưới!
 */
$table_prefix = 'cl_';

/**
 * Dành cho developer: Chế độ debug.
 *
 * Thay đổi hằng số này thành true sẽ làm hiện lên các thông báo trong quá trình phát triển.
 * Chúng tôi khuyến cáo các developer sử dụng WP_DEBUG trong quá trình phát triển plugin và theme.
 *
 * Để có thông tin về các hằng số khác có thể sử dụng khi debug, hãy xem tại Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Đó là tất cả thiết lập, ngưng sửa từ phần này trở xuống. Chúc bạn viết blog vui vẻ. */

/** Đường dẫn tuyệt đối đến thư mục cài đặt WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Thiết lập biến và include file. */
require_once(ABSPATH . 'wp-settings.php');
