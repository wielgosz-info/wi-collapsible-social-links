import { getBlockDefaultClassName } from '@wordpress/blocks';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

import metadata from './block.json';

export default function save() {
	const defaultClassName = getBlockDefaultClassName(metadata.name);

	return (
		<div {...useBlockProps.save()}>
			<nav
				{...useInnerBlocksProps.save({
					className: `${defaultClassName}-content`,
				})}
			/>
		</div>
	);
}
