import { getBlockDefaultClassName } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

import metadata from './block.json';
import icons from './icons';

export default function save({ attributes }) {
	const defaultClassName = getBlockDefaultClassName(metadata.name);
	const { horizontalBreakpoint, size, buttonLabel, buttonIcon, anchor } =
		attributes;
	const ButtonIconComponent = icons[buttonIcon];

	return (
		<div
			{...useBlockProps.save({
				className: classnames(horizontalBreakpoint, size),
			})}
			data-wp-interactive="WICollapsibleSocialLinks"
			data-wp-context='{ "isOpen": false }'
		>
			<button
				className={`${defaultClassName}__button`}
				data-wp-on--click="actions.toggle"
				data-wp-bind--aria-expanded="context.isOpen"
				aria-controls={`${anchor}-content`}
			>
				<ButtonIconComponent
					className={`${defaultClassName}__button-icon`}
				/>
				<span
					className={`${defaultClassName}__button-label screen-reader-text`}
				>
					{buttonLabel ||
						__('Social Links', 'wi-collapsible-social-links')}
				</span>
			</button>
			<nav
				{...useInnerBlocksProps.save({
					className: `${defaultClassName}__content`,
				})}
				id={`${anchor}-content`}
				data-wp-bind--hidden="!context.isOpen"
			/>
		</div>
	);
}
