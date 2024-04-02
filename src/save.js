import { getBlockDefaultClassName } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icons from './icons';

export default function save({ attributes }) {
	const defaultClassName = getBlockDefaultClassName(metadata.name);
	const ButtonIcon = icons[attributes.buttonIcon];

	return (
		<div {...useBlockProps.save({
			className: `is-horizontal-at-${attributes.horizontalBreakpoint}`,
		})}>
			<button className={`${defaultClassName}-button has-${attributes.size}-icon-size`}>
				<ButtonIcon className={`${defaultClassName}-button-icon`} />
				<span className={`${defaultClassName}-button-label screen-reader-text`}>{attributes.buttonLabel || __('Social Links', 'wi-collapsible-social-links')}</span>
			</button>
			<nav
				{...useInnerBlocksProps.save({
					className: `${defaultClassName}-content`,
				})}
			/>
		</div>
	);
}
