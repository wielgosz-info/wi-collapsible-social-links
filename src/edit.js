import {
	BlockControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { getBlockDefaultClassName } from '@wordpress/blocks';
import {
	MenuGroup,
	MenuItem,
	ToolbarDropdownMenu,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { check } from '@wordpress/icons';
import classnames from 'classnames';
import { useEffect } from '@wordpress/element';

import icons from './icons';

import './editor.scss';

function OptionsDropdown({
	name,
	text,
	label,
	options,
	attributes,
	setAttributes,
}) {
	return (
		<ToolbarDropdownMenu
			label={label}
			text={text}
			icon={null}
			popoverProps={{
				position: 'bottom right',
			}}
		>
			{({ onClose }) => (
				<MenuGroup>
					{options.map((entry) => {
						const isSelected = attributes[name] === entry.value;
						return (
							<MenuItem
								icon={isSelected && check}
								isSelected={isSelected}
								key={entry.value}
								onClick={() => {
									setAttributes({
										[name]: entry.value,
									});
								}}
								onClose={onClose}
								role="menuitemradio"
							>
								{entry.name}
							</MenuItem>
						);
					})}
				</MenuGroup>
			)}
		</ToolbarDropdownMenu>
	);
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function edit({ name, attributes, setAttributes, clientId }) {
	const defaultClassName = getBlockDefaultClassName(name);
	const blockProps = useBlockProps({
		className: classnames(attributes.horizontalBreakpoint, attributes.size),
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
						size: attributes.size,
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
	// match ones from Social Links block
	const sizeOptions = [
		{
			name: __('Small', 'wi-collapsible-social-links'),
			value: 'has-small-icon-size',
		},
		{
			name: __('Normal', 'wi-collapsible-social-links'),
			value: 'has-normal-icon-size',
		},
		{
			name: __('Large', 'wi-collapsible-social-links'),
			value: 'has-large-icon-size',
		},
		{
			name: __('Huge', 'wi-collapsible-social-links'),
			value: 'has-huge-icon-size',
		},
	];
	const horizontalBreakpointOptions = [
		{
			name: __('None', 'wi-collapsible-social-links'),
			value: '',
		},
		{
			name: __('Mobile', 'wi-collapsible-social-links'),
			value: 'is-horizontal-at-mobile',
		},
		{
			name: __('Small', 'wi-collapsible-social-links'),
			value: 'is-horizontal-at-small',
		},
		{
			name: __('Medium', 'wi-collapsible-social-links'),
			value: 'is-horizontal-at-medium',
		},
		{
			name: __('Large', 'wi-collapsible-social-links'),
			value: 'is-horizontal-at-large',
		},
		{
			name: __('Extra Large', 'wi-collapsible-social-links'),
			value: 'is-horizontal-at-xlarge',
		},
		{
			name: __('Wide', 'wi-collapsible-social-links'),
			value: 'is-horizontal-at-wide',
		},
		{
			name: __('Huge', 'wi-collapsible-social-links'),
			value: 'is-horizontal-at-huge',
		},
		{
			name: __('Extra Huge', 'wi-collapsible-social-links'),
			value: 'is-horizontal-at-xhuge',
		},
	];
	const ButtonIcon = icons[attributes.buttonIcon];

	useEffect(() => {
		setAttributes({ clientId });
	}, []);

	return (
		<>
			<BlockControls group="other">
				<OptionsDropdown
					text={__('Size', 'wi-collapsible-social-links')}
					label={__(
						'Toggle button size',
						'wi-collapsible-social-links'
					)}
					name="size"
					options={sizeOptions}
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				<OptionsDropdown
					text={__('Horizontal @', 'wi-collapsible-social-links')}
					label={__(
						'Breakpoint for switching to horizontal popout',
						'wi-collapsible-social-links'
					)}
					name="horizontalBreakpoint"
					options={horizontalBreakpointOptions}
					attributes={attributes}
					setAttributes={setAttributes}
				/>
			</BlockControls>

			<div {...blockProps}>
				<button className={`${defaultClassName}-button`}>
					<ButtonIcon className={`${defaultClassName}-button-icon`} />
					<span
						className={`${defaultClassName}-button-label screen-reader-text`}
					>
						{attributes.buttonLabel}
					</span>
				</button>
				<nav {...innerBlocksProps} />
			</div>
		</>
	);
}
