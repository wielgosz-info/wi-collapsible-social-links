import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';

import icons from './icons';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function edit({ name, attributes }) {
	const defaultClassName = getBlockDefaultClassName(name);
	const blockProps = useBlockProps({
		className: `is-horizontal-at-${attributes.horizontalBreakpoint}`,
	});
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `${defaultClassName}-content`,
		},
		{
			template: [
				[
					'core/social-links',
					{
						size: `has-${attributes.size}-icon-size`,
						style: {
							spacing: {
								margin: {
									top: '0',
									bottom: '0',
									left: '0',
									right: '0',
								},
								blockGap: {
									top: 'var:preset|spacing|20',
									left: 'var:preset|spacing|20',
								},
							},
						},
						layout: { type: 'flex', flexWrap: 'nowrap' },
					},
				],
			],
			templateLock: 'all',
		}
	);
	const ButtonIcon = icons[attributes.buttonIcon];

	return (
		<div {...blockProps}>
			<button
				className={`${defaultClassName}-button has-${attributes.size}-icon-size`}
			>
				<ButtonIcon className={`${defaultClassName}-button-icon`} />
				<span
					className={`${defaultClassName}-button-label screen-reader-text`}
				>
					{attributes.buttonLabel}
				</span>
			</button>
			<nav {...innerBlocksProps} />
		</div>
	);
}
