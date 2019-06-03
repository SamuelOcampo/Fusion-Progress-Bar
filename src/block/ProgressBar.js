/* eslint-disable computed-property-spacing */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-curly-spacing */
/* eslint-disable space-in-parens */
// <#
// var value = '',
// 		text = '',
// 		text_wrapper = '',
// 		bar = '';

// #>
import _ from 'underscore';

function visibilityAtts(selection) {
	const visibilityOptions = [
		{
			key: 'small_visibility',
			value: 'small-visibility'
		},
		{
			key: 'medium_visibility',
			value: 'medium-visibility'
		},
		{
			key: 'large_visibility',
			value: 'large-visibility'
		}
	];
	let className = '';
	let count = 0;

	_.each(visibilityOptions, visibilityOption => {
		if (selection[visibilityOption.key] !== true) {
			className += ' fusion-no-' + visibilityOption.value;
			count++;
		}
	});

	// enable all if all 3 are selected
	if (count === 3) {
		return '';
	}

	return className;
}

function Bar(props) {
	let className = 'fusion-progressbar-bar progress-bar';

	if (props.striped) {
		className += ' progress-striped';
	}

	if (props.animated_stripes) {
		className += ' active';
	}

	const container = {
		className: className,
		style: {
			backgroundColor: props.unfilledcolor,
			height: props.height
		}
	};
	const content = {
		className: 'progress progress-bar-content',
		role: 'progressbar',
		style: {
			width: `${props.percentage}%`,
			backgroundColor: props.filledcolor,
			border:
				('' !== props.filledbordersize &&
					'' !== props.filledbordercolor &&
					`${props.filledbordersize}px solid ${props.filledbordercolor}`) ||
				undefined
		}
	};

	return (
		<div {...container}>
			<div {...content} />
		</div>
	);
}

function TextWrapper(props) {
	const container = {
		class: 'progress-title',
		style: {
			color: props.textcolor
		}
	};
	return (
		<div {...container}>
			<span className="fusion-progressbar-text">{props.element_content}</span>{' '}
			{props.show_percentage && (
				<span className="fusion-progressbar-value">
					{`${props.percentage} ${props.unit}`}
				</span>
			)}
		</div>
	);
}

export default function Progressbar(props) {
	let className = 'fusion-progressbar';

	if ('above_bar' === props.text_position) {
		className += ' fusion-attr-text-above-bar';
	} else if ('below_bar' === props.text_position) {
		className += ' fusion-progressbar-text-below-bar';
	} else {
		className += ' fusion-progressbar-text-on-bar';
	}

	if (props.className) {
		className += ' ' + props.className;
	}

	const container = {
		className: className.concat(visibilityAtts(props))
	};

	if ('above_bar' === props.text_position) {
		return (
			<div {...container}>
				<TextWrapper {...props} />
				<Bar {...props} />
			</div>
		);
	}

	return (
		<div {...container}>
			<Bar {...props} />
			<TextWrapper {...props} />
		</div>
	);
}
