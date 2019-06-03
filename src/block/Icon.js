const Icon = (
	<svg>
		<defs>
			<linearGradient
				id="progressGradient"
				gradientUnits="userSpaceOnUse"
				x1="0%"
				y1="0%"
				x2="100%"
				y2="0%"
			>
				<stop stopColor="#376EA6" offset="0" />
				<stop stopColor="#8233A4" offset="0.5" />
				<stop stopColor="#B34646" offset="1" />
			</linearGradient>

			<filter id="insetShadow" filterunits="userSpaceOnUse">
				<feFlood floodColor="#000" floodOpacity="1" />
				<feComposite in2="SourceGraphic" operator="xor" />
				<feGaussianBlur stdDeviation="3" />
				<feOffset dx="0" dy="0" result="offsetblur" />
				<feFlood floodColor="#aaa" floodOpacity="0.8" />{' '}
				<feComposite in2="offsetblur" operator="atop" />
				<feComposite in2="SourceGraphic" operator="in" />
				<feMerge>
					<feMergeNode in="SourceGraphic" />
					<feMergeNode />
				</feMerge>
			</filter>
		</defs>

		<path
			id="container"
			d="M10,0 L190,0 A1,1 0 1 1 190,20 L10,20 A1,1 0 1 1 10,0 z"
			fill="#fff"
			filter="url(#insetShadow)"
		/>
		<path
			id="bar"
			d="M10,5 L50,5 A1,1 0 1 1 50,15 L10,15 A1,1 0 1 1 10,5 z"
			fill="url(#progressGradient)"
		/>
	</svg>
);

export default Icon;
