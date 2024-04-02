import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';

import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function edit({name}) {
	const defaultClassName = getBlockDefaultClassName(name);
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: `${defaultClassName}-content`,
		},
		{
			template: [['core/social-links']],
			templateLock: true,
		}
	);

	return (
		<div {...blockProps}>
			<nav {...innerBlocksProps} />
		</div>
	);
}
