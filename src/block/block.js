/* eslint-disable comma-dangle */
/* eslint-disable computed-property-spacing */
/* eslint-disable template-curly-spacing */
/* eslint-disable space-unary-ops */
/* eslint-disable no-shadow */
/* eslint-disable space-in-parens */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable camelcase */
/* eslint-disable valid-jsdoc */
/**
 * BLOCK: fusion-progress-bar
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import Icon from './Icon';
import ProgressBar from './ProgressBar';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InspectorControls } = wp.editor; // Import InspectorControls from wp.blocks
const { Fragment } = wp.element; // Import Fragment from wp.element
const {
	TextControl,
	PanelBody,
	Button,
	ButtonGroup,
	BaseControl,
	RangeControl,
	ColorPicker,
	PanelRow,
	CheckboxControl,
	ToggleControl
} = wp.components; // Import Fragment from wp.components

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

const attributes = {
	height: {
		type: 'string',
		default: '37px'
	},
	text_position: {
		type: 'string',
		default: 'on_bar'
	},
	show_percentage: {
		type: 'boolean',
		default: true
	},
	unit: {
		type: 'string',
		default: ''
	},
	percentage: {
		type: 'string',
		default: '70'
	},
	filledcolor: {
		type: 'string',
		default: '#a0ce4e'
	},
	filledbordersize: {
		type: 'string',
		default: '0'
	},
	filledbordercolor: {
		type: 'string',
		default: '#ffffff'
	},
	unfilledcolor: {
		type: 'string',
		default: ''
	},
	striped: {
		type: 'boolean',
		default: false
	},
	animated_stripes: {
		type: 'boolean',
		default: false
	},
	element_content: {
		type: 'string',
		default: 'Your Content Goes Here'
	},
	textcolor: {
		type: 'string',
		default: ''
	},
	small_visibility: {
		type: 'boolean',
		default: true
	},
	medium_visibility: {
		type: 'boolean',
		default: true
	},
	large_visibility: {
		type: 'boolean',
		default: true
	}
};

registerBlockType('cgb/block-fusion-progress-bar', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Fusion Progress Bar'), // Block title.
	attributes,
	icon: Icon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [__('fusion-progress-bar')],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function(props) {
		const { setAttributes, className } = props;
		const {
			height,
			text_position,
			show_percentage,
			unit,
			percentage,
			filledcolor,
			filledbordersize,
			filledbordercolor,
			unfilledcolor,
			striped,
			animated_stripes,
			element_content,
			textcolor,
			small_visibility,
			medium_visibility,
			large_visibility
		} = props.attributes;
		function handleColor(name) {
			return ({ source, hex, rgb: { a, b, g, r } }) => {
				let color = hex;
				if (source !== 'hex') {
					color = `rgba(${r}, ${g}, ${b}, ${a})`;
				}
				setAttributes({ [name]: color });
			};
		}
		return (
			<Fragment>
				<div className={className}>
					<ProgressBar {...props.attributes} />
				</div>
				<InspectorControls>
					<PanelBody
						className="panel-body--fusion-progress-bar"
						title={<span>Progress Bar</span>}
					>
						<PanelRow>
							<TextControl
								label={<h3>Progress Bar Height</h3>}
								value={height}
								onChange={height => setAttributes({ height })}
								help="Insert a height for the progress bar. Enter value including any valid CSS unit, ex: 10px."
							/>
						</PanelRow>
						<BaseControl
							label={<h3>Text Position</h3>}
							help={
								'Select the position of the progress bar text. Choose "Default" for theme option selection. Default currently set to On Bar.'
							}
						>
							<ButtonGroup>
								<Button
									isDefault
									isPrimary={text_position === 'on_bar'}
									onClick={() => {
										setAttributes({ text_position: 'on_bar' });
									}}
								>
									On Bar
								</Button>
								<Button
									isDefault
									isPrimary={text_position === 'above_bar'}
									onClick={() => {
										setAttributes({ text_position: 'above_bar' });
									}}
								>
									Above Bar
								</Button>
								<Button
									isDefault
									isPrimary={text_position === 'below_bar'}
									onClick={() => {
										setAttributes({ text_position: 'below_bar' });
									}}
								>
									Below Bar
								</Button>
							</ButtonGroup>
						</BaseControl>
						<ToggleControl
							label={<h3>Display Percentage Value</h3>}
							help="Select if you want the filled area percentage value to be shown."
							checked={show_percentage}
							onChange={() =>
								setAttributes({ show_percentage: !show_percentage })
							}
						/>
						{show_percentage && (
							<TextControl
								label={<h3>Progress Bar Unit</h3>}
								value={unit}
								help="Insert a unit for the progress bar. ex %."
								onChange={unit => setAttributes({ unit })}
							/>
						)}
						<RangeControl
							label={<h3>Filled Area Percentage</h3>}
							help="From 1% to 100%."
							value={percentage}
							min={0}
							max={100}
							onChange={percentage => setAttributes({ percentage })}
						/>
						<BaseControl
							label={<h3>Filled Color</h3>}
							help="Controls the color of the filled in area. Leave empty for default value of #a0ce4e."
						>
							<ColorPicker
								color={filledcolor}
								onChangeComplete={handleColor('filledcolor')}
							/>
						</BaseControl>
						<RangeControl
							label={<h3>Filled Border Size</h3>}
							help="In pixels. Default currently set to 0"
							value={filledbordersize}
							min={0}
							max={100}
							onChange={filledbordersize => setAttributes({ filledbordersize })}
						/>
						{filledbordersize !== 0 && (
							<BaseControl
								label={<h3>Filled Border Color</h3>}
								help="Controls the border color of the filled in area."
							>
								<ColorPicker
									color={filledbordercolor}
									onChangeComplete={handleColor('filledbordercolor')}
								/>
							</BaseControl>
						)}
						<BaseControl
							label={<h3>Unfilled Color</h3>}
							help="Controls the color of the unfilled in area."
						>
							<ColorPicker
								color={unfilledcolor}
								onChangeComplete={handleColor('unfilledcolor')}
							/>
						</BaseControl>
						<ToggleControl
							label={<h3>Striped Filling</h3>}
							help="Choose to get the filled area striped."
							checked={striped}
							onChange={() => setAttributes({ striped: !striped })}
						/>
						{striped && (
							<ToggleControl
								label={<h3>Animated Stripes</h3>}
								help="Choose to get the the stripes animated."
								checked={animated_stripes}
								onChange={() =>
									setAttributes({ animated_stripes: !animated_stripes })
								}
							/>
						)}
						<TextControl
							label={<h3>Progress Bar Text</h3>}
							value={element_content}
							placeholder="Your Content Goes Here"
							help="Text will show up on progress bar."
							onChange={element_content => setAttributes({ element_content })}
						/>
						<BaseControl
							label={<h3>Text Color</h3>}
							help="Controls the text color. Leave empty for default value of #ffffff.˝"
						>
							<ColorPicker
								color={textcolor}
								onChangeComplete={handleColor('textcolor')}
							/>
						</BaseControl>
						<BaseControl
							label={<h3>Element Visibility</h3>}
							help="Choose to show or hide the element on small, medium or large screens. You can choose more than one at a time."
						>
							<CheckboxControl
								label="Small Screen"
								checked={small_visibility}
								onChange={small_visibility => {
									setAttributes({ small_visibility });
								}}
							/>
							<CheckboxControl
								label="Medium Screen"
								checked={medium_visibility}
								onChange={medium_visibility => {
									setAttributes({ medium_visibility });
								}}
							/>
							<CheckboxControl
								label="Large Screen"
								checked={large_visibility}
								onChange={large_visibility => {
									setAttributes({ large_visibility });
								}}
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function(props) {
		return <ProgressBar {...props.attributes} />;
	}
});
