<?php

/**
 * Plugin Name: Advanced Rich Text Tools for Gutenberg
 * Plugin URI: https://wordpress.org/plugins/advanced-rich-text-tools/
 * Description: Adds additional tools for rich text fields such as superscript and subscript.
 * Version: 1.2.0
 * Author: Ella Van Durpe
 */

add_action( 'enqueue_block_editor_assets', function() {
	wp_enqueue_script(
		'advanced-rich-text-tools',
		plugins_url( 'dist/index.js', __FILE__ ),
		array(
			'wp-element',
			'wp-rich-text',
			'wp-format-library',
			'wp-i18n',
			'wp-editor',
			'wp-compose',
			'wp-components',
		),
		filemtime( dirname( __FILE__ ) . '/dist/index.js' ),
		true
	);
	wp_enqueue_style(
		'advanced-rich-text-tools',
		plugins_url( 'index.css', __FILE__ ),
		array(),
		filemtime( dirname( __FILE__ ) . '/index.css' )
	);
} );
