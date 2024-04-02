<?php
/**
 * Plugin Name:       WI Collapsible Social Links
 * Description:       Wrapper around social links to make them collapsible.
 * Requires at least: 6.5
 * Requires PHP:      8.2
 * Version:           0.1.0
 * Author:            Urszula Wielgosz
 * License:           MIT
 * Text Domain:       wi-collapsible-social-links
 *
 * @package           WI\CollapsibleSocialLinks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function wi_collapsible_social_links_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'wi_collapsible_social_links_block_init' );
