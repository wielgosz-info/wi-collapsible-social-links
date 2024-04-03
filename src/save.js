import { getBlockDefaultClassName } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

import metadata from './block.json';
import icons from './icons';

export default function save({ attributes }) {
	const defaultClassName = getBlockDefaultClassName(metadata.name);
	const ButtonIcon = icons[attributes.buttonIcon];
	const key = attributes.anchor || attributes.clientId;

	return (
		<div
			{...useBlockProps.save({
				className: classnames(attributes.horizontalBreakpoint, attributes.size),
			})}
			data-wp-interactive="WICollapsibleSocialLinks"
			data-wp-context='{ "isOpen": false }'
		>
			<button
				className={`${defaultClassName}-button`}
				data-wp-on--click="actions.toggle"
				data-wp-bind--aria-expanded="context.isOpen"
				aria-controls={`${key}-content`}
			>
				<ButtonIcon className={`${defaultClassName}-button-icon`} />
				<span className={`${defaultClassName}-button-label screen-reader-text`}>{attributes.buttonLabel || __('Social Links', 'wi-collapsible-social-links')}</span>
			</button>
			<nav
				{...useInnerBlocksProps.save({
					className: `${defaultClassName}-content`,
				})}
				id={`${key}-content`}
				data-wp-bind--hidden="!context.isOpen"
			/>
		</div>
	);
}
