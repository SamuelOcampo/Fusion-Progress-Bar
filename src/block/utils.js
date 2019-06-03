/* eslint-disable */

export default {

	/**
	 * The FusionBuilder::attributes() function from PHP, translated to JS.
	 *
	 * @since 2.0.0
	 * @param {Object|string} attributes - The attributes.
	 * @returns {string} Ready to use in templates/HTML.
	 */
	fusionGetAttributes: function( attributes ) {
		var out = '';
		if ( 'string' === typeof attributes ) {
			return 'class="' + attributes + '"';
		}
		_.each( attributes, function( value, name ) {
			if ( 'undefined' !== typeof value ) {
				value = value.toString();

				if ( 'valueless_attribute' === value ) {
					out += ' ' + name;
				} else if ( 0 < value.length ) {
					value = value.replace( /\s\s+/g, ' ' );
					out += ' ' + name + '="' + value + '"';
				}
			}
		} );
		return out;
	},

	/**
	 * Remove empty values from params so when merging with defaults, the defaults are used.
	 *
	 * @since 2.0.0
	 * @param {Object} params - The parameters.
	 * @returns {Object}
	 */
	fusionCleanParameters: function( params ) {
		Object.keys( params ).forEach( function( key ) {
			if ( params[ key ] && 'object' === typeof params[ key ] ) {
				_.fusionCleanParameters( params[ key ] );
			} else if ( null === params[ key ] || '' === params[ key ] ) {
				delete params[ key ];
			}
		} );
		return params;
	},

	/**
	 * Copy of our fusion_builder_visibility_atts() function in PHP.
	 *
	 * @since 2.0.0
	 * @param {string}        selection - The selection.
	 * @param {Object|string} attr - The attributes.
	 * @returns {Object} The attributes modified to accomodate visibility options from the selection parameter.
	 */
	fusionVisibilityAtts: function( selection, attr ) {

		var allVisibilityValues = [
				'small-visibility',
				'medium-visibility',
				'large-visibility'
			],
			visibilityValues = allVisibilityValues,
			visibilityOptions;

		// If empty, show all.
		if ( '' === selection ) {
			selection = visibilityValues;
		}

		// If no is used, change that to all options selected, as fallback.
		if ( 'no' === selection ) {
			selection = visibilityValues;
		}

		// If yes is used, use all selections with mobile visibility removed.
		if ( 'yes' === selection ) {
			visibilityValues = visibilityValues.filter( function( e ) {
				return 'small-visibility' !== e;
			} );
			selection = visibilityValues;
		}

		// Make sure the selection is an array.
		if ( 'string' === typeof selection ) {
			selection = selection.split( ',' );
			_.each( selection, function( value, key ) {
				selection[ key ] = value.replace( new RegExp( ' ', 'g' ), '' );
			} );
		}

		visibilityOptions = allVisibilityValues;
		_.each( visibilityOptions, function( visibilityOption ) {
			if ( selection && -1 === selection.indexOf( visibilityOption ) ) {
				if ( 'object' === typeof attr ) {
					attr.class += ' fusion-no-' + visibilityOption;
				} else {
					attr += ' fusion-no-' + visibilityOption;
				}
			}
		} );

		return attr;
	},

	/**
	 * The FusionBuilder::animations() function from PHP, translated to JS.
	 *
	 * @param {Object}       args - The arguments.
	 * @param {string}       args.type - The animation type.
	 * @param {string}       args.direction - The animation direction.
	 * @param {string|float} args.speed - The animation speed, in seconds.
	 * @param {string}       args.offset - The animation offset.
	 * @returns {Object} Animation attributes.
	 */
	fusionGetAnimations: function( args ) {
		var animationAttributes = {},
			directionSuffix,
			offset;

		args = _.defaults( args, {
			type: '',
			direction: 'left',
			speed: '0.1',
			offset: 'bottom-in-view'
		} );

		if ( args.type ) {

			animationAttributes.animation_class = 'fusion-animated';

			if ( 'static' === args.direction ) {
				args.direction = '';
			}
			if ( 'bounce' !== args.type && 'flash' !== args.type && 'shake' !== args.type && 'rubberBand' !== args.type ) {
				directionSuffix = 'In' + args.direction.charAt( 0 ).toUpperCase() + args.direction.slice( 1 );
				args.type += directionSuffix;
			}

			animationAttributes['data-animationType'] = args.type;

			if ( args.speed ) {
				animationAttributes['data-animationDuration'] = args.speed;
			}
		}

		if ( args.offset ) {
			offset = args.offset;
			if ( 'top-into-view' === args.offset ) {
				offset = '100%';
			} else if ( 'top-mid-of-view' === args.offset ) {
				offset = '50%';
			}
			animationAttributes['data-animationOffset'] = offset;
		}

		return animationAttributes;

	},

	/**
	 * The FusionBuilder::font_awesome_name_handler() function from PHP, translated to JS.
	 *
	 * @since 2.0.0
	 * @param {string} icon - The icon we want.
	 * @returns {string}
	 */
	fusionFontAwesome: function( icon ) {
		var oldIcons = {
				'arrow': 'angle-right',
				'asterik': 'asterisk',
				'cross': 'times',
				'ban-circle': 'ban',
				'bar-chart': 'bar-chart-o',
				'beaker': 'flask',
				'bell': 'bell-o',
				'bell-alt': 'bell',
				'bitbucket-sign': 'bitbucket-square',
				'bookmark-empty': 'bookmark-o',
				'building': 'building-o',
				'calendar-empty': 'calendar-o',
				'check-empty': 'square-o',
				'check-minus': 'minus-square-o',
				'check-sign': 'check-square',
				'check': 'check-square-o',
				'chevron-sign-down': 'chevron-circle-down',
				'chevron-sign-left': 'chevron-circle-left',
				'chevron-sign-right': 'chevron-circle-right',
				'chevron-sign-up': 'chevron-circle-up',
				'circle-arrow-down': 'arrow-circle-down',
				'circle-arrow-left': 'arrow-circle-left',
				'circle-arrow-right': 'arrow-circle-right',
				'circle-arrow-up': 'arrow-circle-up',
				'circle-blank': 'circle-o',
				'cny': 'rub',
				'collapse-alt': 'minus-square-o',
				'collapse-top': 'caret-square-o-up',
				'collapse': 'caret-square-o-down',
				'comment-alt': 'comment-o',
				'comments-alt': 'comments-o',
				'copy': 'files-o',
				'cut': 'scissors',
				'dashboard': 'tachometer',
				'double-angle-down': 'angle-double-down',
				'double-angle-left': 'angle-double-left',
				'double-angle-right': 'angle-double-right',
				'double-angle-up': 'angle-double-up',
				'download': 'arrow-circle-o-down',
				'download-alt': 'download',
				'edit-sign': 'pencil-square',
				'edit': 'pencil-square-o',
				'ellipsis-horizontal': 'ellipsis-h',
				'ellipsis-vertical': 'ellipsis-v',
				'envelope-alt': 'envelope-o',
				'exclamation-sign': 'exclamation-circle',
				'expand-alt': 'plus-square-o',
				'expand': 'caret-square-o-right',
				'external-link-sign': 'external-link-square',
				'eye-close': 'eye-slash',
				'eye-open': 'eye',
				'facebook-sign': 'facebook-square',
				'facetime-video': 'video-camera',
				'file-alt': 'file-o',
				'file-text-alt': 'file-text-o',
				'flag-alt': 'flag-o',
				'folder-close-alt': 'folder-o',
				'folder-close': 'folder',
				'folder-open-alt': 'folder-open-o',
				'food': 'cutlery',
				'frown': 'frown-o',
				'fullscreen': 'arrows-alt',
				'github-sign': 'github-square',
				'google-plus-sign': 'google-plus-square',
				'group': 'users',
				'h-sign': 'h-square',
				'hand-down': 'hand-o-down',
				'hand-left': 'hand-o-left',
				'hand-right': 'hand-o-right',
				'hand-up': 'hand-o-up',
				'hdd': 'hdd-o',
				'heart-empty': 'heart-o',
				'hospital': 'hospital-o',
				'indent-left': 'outdent',
				'indent-right': 'indent',
				'info-sign': 'info-circle',
				'keyboard': 'keyboard-o',
				'legal': 'gavel',
				'lemon': 'lemon-o',
				'lightbulb': 'lightbulb-o',
				'linkedin-sign': 'linkedin-square',
				'meh': 'meh-o',
				'microphone-off': 'microphone-slash',
				'minus-sign-alt': 'minus-square',
				'minus-sign': 'minus-circle',
				'mobile-phone': 'mobile',
				'moon': 'moon-o',
				'move': 'arrows',
				'off': 'power-off',
				'ok-circle': 'check-circle-o',
				'ok-sign': 'check-circle',
				'ok': 'check',
				'paper-clip': 'paperclip',
				'paste': 'clipboard',
				'phone-sign': 'phone-square',
				'picture': 'picture-o',
				'pinterest-sign': 'pinterest-square',
				'play-circle': 'play-circle-o',
				'play-sign': 'play-circle',
				'plus-sign-alt': 'plus-square',
				'plus-sign': 'plus-circle',
				'pushpin': 'thumb-tack',
				'question-sign': 'question-circle',
				'remove-circle': 'times-circle-o',
				'remove-sign': 'times-circle',
				'remove': 'times',
				'reorder': 'bars',
				'resize-full': 'expand',
				'resize-horizontal': 'arrows-h',
				'resize-small': 'compress',
				'resize-vertical': 'arrows-v',
				'rss-sign': 'rss-square',
				'save': 'floppy-o',
				'screenshot': 'crosshairs',
				'share-alt': 'share',
				'share-sign': 'share-square',
				'share': 'share-square-o',
				'sign-blank': 'square',
				'signin': 'sign-in',
				'signout': 'sign-out',
				'smile': 'smile-o',
				'sort-by-alphabet-alt': 'sort-alpha-desc',
				'sort-by-alphabet': 'sort-alpha-asc',
				'sort-by-attributes-alt': 'sort-amount-desc',
				'sort-by-attributes': 'sort-amount-asc',
				'sort-by-order-alt': 'sort-numeric-desc',
				'sort-by-order': 'sort-numeric-asc',
				'sort-down': 'sort-asc',
				'sort-up': 'sort-desc',
				'stackexchange': 'stack-overflow',
				'star-empty': 'star-o',
				'star-half-empty': 'star-half-o',
				'sun': 'sun-o',
				'thumbs-down-alt': 'thumbs-o-down',
				'thumbs-up-alt': 'thumbs-o-up',
				'time': 'clock-o',
				'trash': 'trash-o',
				'tumblr-sign': 'tumblr-square',
				'twitter-sign': 'twitter-square',
				'unlink': 'chain-broken',
				'upload': 'arrow-circle-o-up',
				'upload-alt': 'upload',
				'warning-sign': 'exclamation-triangle',
				'xing-sign': 'xing-square',
				'youtube-sign': 'youtube-square',
				'zoom-in': 'search-plus',
				'zoom-out': 'search-minus'
			},
			faIcon = icon;

		if ( '' !== icon ) {
			if ( 'icon-' === icon.substr( 0, 5 ) || 'fa-' !== icon.substr( 0, 3 ) ) {
				icon = icon.replace( 'icon-', 'fa-' );

				if ( 'undefined' !== typeof oldIcons[ icon.replace( 'fa-', '' ) ] ) {
					faIcon = 'fa-' + oldIcons[ icon.replace( 'fa-', '' ) ];
				} else if ( 'fa-' !== icon.substr( 0, 3 ) ) {
					faIcon = 'fa-' + icon;
				}
			} else if ( 'fa-' !== icon.substr( 0, 3 ) ) {
				faIcon = 'fa-' + icon;
			}

			if ( -1 === icon.trim().indexOf( ' ' ) ) {
				faIcon = 'fa ' + icon;
			}
		}

		return faIcon;
	},

	/**
	 * The FusionBuilder::validate_shortcode_attr_value() function from PHP, translated to JS.
	 *
	 * @since 2.0.0
	 * @param {string} value - The value.
	 * @param {string} acceptedUnit - The unit we're accepting.
	 * @param {bool}   bcSupport - Should we add backwards-compatibility support?
	 * @returns {string}
	 */
	fusionValidateAttrValue: function( value, acceptedUnit, bcSupport ) {
		var validatedValue = '',
			numericValue,
			unit;

		bcSupport = 'undefined' !== typeof bcSupport ? bcSupport : true;
		value = String( value );
		if ( '' !== value ) {
			value        = value.trim();
			numericValue = parseFloat( value );
			unit         = value.replace( numericValue, '' );

			if ( 'undefined' === typeof acceptedUnit || '' === acceptedUnit ) {
				validatedValue = numericValue;

			} else {

				if ( '' === unit ) {

					// Add unit if it's required.
					validatedValue = numericValue + acceptedUnit;
				} else if ( bcSupport || unit === acceptedUnit ) {

					// If unit was found use original value. BC support.
					validatedValue = value;
				} else {
					validatedValue = false;
				}
			}
		}

		return validatedValue;
	},

	/**
	 * Clone of fusion_builder_get_video_provider.
	 *
	 * @since 2.0.0
	 * @param {string} videoString - The URL of the video.
	 * @returns {Object}
	 */
	fusionGetVideoProvider: function( videoString ) {

		var videoId,
			match;

		videoString = videoString.trim();

		// Check for YouTube.
		videoId = false;

		if ( match = videoString.match( /youtube\.com\/watch\?v=([^\&\?\/]+)/ ) ) { // eslint-disable-line no-cond-assign
			if ( 'undefined' !== typeof match[1] ) {
				videoId =  match[1];
			}
		} else if ( match = videoString.match( /youtube\.com\/embed\/([^\&\?\/]+)/ ) ) { // eslint-disable-line no-cond-assign
			if ( 'undefined' !== typeof match[1] ) {
				videoId =  match[1];
			}
		} else if ( match = videoString.match( /youtube\.com\/v\/([^\&\?\/]+)/ ) ) { // eslint-disable-line no-cond-assign
			if ( 'undefined' !== typeof match[1] ) {
				videoId =  match[1];
			}
		} else if ( match = videoString.match( /youtu\.be\/([^\&\?\/]+)/ ) ) { // eslint-disable-line no-cond-assign
			if ( 'undefined' !== typeof match[1] ) {
				videoId =  match[1];
			}
		}

		if ( false !== videoId ) {
			return {
				type: 'youtube',
				id: videoId
			};
		}

		// Check for Vimeo.
		if ( match = videoString.match( /vimeo\.com\/(\w*\/)*(\d+)/ ) ) { // eslint-disable-line no-cond-assign
			if ( 1 < match.length ) {
				return {
					type: 'vimeo',
					id: match[ match.length - 1 ]
				};
			}
		}
		if ( match = videoString.match( /^\d+$/ ) ) { // eslint-disable-line no-cond-assign
			if ( 'undefined' !== typeof match[0] ) {
				return {
					type: 'vimeo',
					id: match[0]
				};
			}
		}

		return {
			type: 'youtube',
			id: videoString
		};
	},

	/**
	 * JS clone of fusion_builder_check_value.
	 * If value is not in pixels or percent, appends 'px'.
	 *
	 * @since 2.0.0
	 * @param {string} value - The value.
	 * @returns {string}
	 */
	fusionCheckValue: function( value ) {
		if ( -1 === value.indexOf( '%' ) && -1 === value.indexOf( 'px' ) ) {
			value = value + 'px';
		}
		return value;
	},

	/**
	 * JS clone of get_value_with_unit.
	 *
	 * @param {string|int|float} value - The value.
	 * @param {string}           unit - The unit.
	 * @param {string}           unitHandling - Can be 'add'(default) or 'force_replace'.
	 * @returns {string}
	 */
	fusionGetValueWithUnit: function( value, unit, unitHandling ) {

		var rawValues,
			rawValue,
			values;

		unit         = 'undefined' !== typeof unit ? unit : 'px';
		unitHandling = 'undefined' !== typeof unitHandling ? unitHandling : 'add';

		rawValues = [];

		// Trim the value.
		value = value.trim();
		if ( -1 !== jQuery.inArray( value, [ 'auto', 'inherit', 'initial' ] ) ) {
			return value;
		}

		// Return empty if there are no numbers in the value.
		// Prevents some CSS errors.
		if ( isNaN( parseFloat( value ) ) ) {
			return;
		}

		// Explode if has multiple values.
		values = value.split( ' ' );
		if ( 1 < values.length ) {
			_.each( values, function( value ) {
				rawValue = parseFloat( value );

				// Only == here deliberately.
				if ( value == rawValue ) {
					value = rawValue + unit;
				} else if ( 'force_replace' === unitHandling ) {
					value = rawValue + unit;
				}
				rawValues.push( value );
			} );

			return rawValues.join( ' ' );

		}
		rawValue = parseFloat( value );

		// Only == here deliberately.
		if ( value == rawValue ) {
			return rawValue + unit;
		}
		if ( 'force_replace' === unitHandling ) {
			return rawValue + unit;
		}

		return value;
	},

	/**
	 * Returns a single side dimension.
	 *
	 * Copy of the PHP fusion_builder_single_dimension function.
	 *
	 * @param {Object} dimensions - The dimensions object{top:'',buttom:'',left:'',right:''}.
	 * @param {string} direction - Which one do we want? left/right/top/bottom.
	 * @returns {string}
	 */
	fusionSingleDimension: function( dimensions, direction ) {
		dimensions = dimensions.split( ' ' );
		if ( 4 === dimensions.length ) {
			if ( 'top' === direction ) {
				return dimensions[0];
			} else if ( 'right' === direction ) {
				return dimensions[1];
			} else if ( 'bottom' === direction ) {
				return dimensions[2];
			} else if ( 'left' === direction ) {
				return dimensions[3];
			}
		} else if ( 3 === dimensions.length ) {
			if ( 'top' === direction ) {
				return dimensions[0];
			} else if ( 'right' === direction || 'left' === direction ) {
				return dimensions[1];
			} else if ( 'bottom' === direction ) {
				return dimensions[2];
			}
		} else if ( 2 === dimensions.length ) {
			if ( 'top' === direction || 'bottom' === direction ) {
				return dimensions[0];
			} else if ( 'right' === direction || 'left' === direction ) {
				return dimensions[1];
			}
		}
		return direction[0];
	},

	/**
	 * Get the attributes for masonry.
	 *
	 * @since 2.0.0
	 * @param {Object}       data - The data.
	 * @param {string|float} data.blog_grid_column_spacing - Column spacing in pixels.
	 * @param {string}       data.element_orientation_class - The orientation class (fusion-element-portrain, fusion-element-landscape etc).
	 * @param {string}       data.timeline_color - The timeline color.
	 * @param {string}       data.masonry_attribute_style - Masonry styles.
	 * @returns {Object}
	 */
	fusionGetMasonryAttribute: function( data ) {
		var masonryColumnOffset,
			masonryColumnSpacing,
			masonryAttributes = {};

		masonryColumnOffset = ' - ' + ( parseFloat( data.blog_grid_column_spacing ) / 2 ) + 'px';
		if ( 'string' === typeof data.element_orientation_class && -1 !== data.element_orientation_class.indexOf( 'fusion-element-portrait' ) ) {
			masonryColumnOffset = '';
		}

		masonryColumnSpacing = ( parseFloat( data.blog_grid_column_spacing ) ) + 'px';

		// Calculate the correct size of the image wrapper container, based on orientation and column spacing.
		if ( 'transparent' !== data.timeline_color && 0 !== jQuery.Color( data.timeline_color ).alpha() ) {

			masonryColumnOffset = ' - ' + ( parseFloat( data.blog_grid_column_spacing ) / 2 ) + 'px';
			if ( 'string' === typeof data.element_orientation_class && -1 !== data.element_orientation_class.indexOf( 'fusion-element-portrait' ) ) {
				masonryColumnOffset = ' + 4px';
			}

			masonryColumnSpacing = ( parseFloat( data.blog_grid_column_spacing ) - 2 ) + 'px';
			if ( 'string' === typeof data.element_orientation_class && -1 !== data.element_orientation_class.indexOf( 'fusion-element-landscape' ) ) {
				masonryColumnSpacing = ( parseFloat( data.blog_grid_column_spacing ) - 6 ) + 'px';
			}
		}

		// Calculate the correct size of the image wrapper container, based on orientation and column spacing.
		masonryAttributes.class = 'fusion-masonry-element-container';
		masonryAttributes.style = data.masonry_attribute_style + 'padding-top:calc((100% + ' + masonryColumnSpacing + ') * ' + data.element_base_padding + masonryColumnOffset + ');';

		return masonryAttributes;
	},

	/**
	 * Combination of first featured image and rollover.
	 *
	 * @since 2.0.0
	 * @param {Object}      data - The data.
	 * @param {string}      data.layout - The layout.
	 * @param {string}      data.masonry_data - The masonry data.
	 * @param {string|bool} data.enable_rollover - Should we enable the rollover?
	 * @param {string}      data.display_rollover - Should we display the rollover? (yes|no|force_yes).
	 * @param {Object}      data.featured_images - The featured images.
	 * @param {string}      data.image_rollover_icons - no|zoom|link|linkzoom.
	 * @param {string}      data.post_type - The post-type.
	 * @param {string|int}  data.post_id - The post-ID.
	 * @param {string}      data.icon_permalink - URL.
	 * @param {string}      data.link_target - Leave empty or use target="_blank".
	 * @param {string}      data.icon_permalink_title - The icon permalink title.
	 * @param {string}      data.full_image - URL.
	 * @param {string}      data.data_rel - Used in data-rel="".
	 * @param {string}      data.data_title - Used in data-title="".
	 * @param {string}      data.data_caption - Used in data-caption="".
	 * @param {string}      data.lightbox_content - The contents of the lightbox.
	 * @param {string|bool} data.display_post_title - Should we display the post-title?
	 * @param {string}      data.permalink - URL.
	 * @param {string}      data.title - The title.
	 * @param {string|bool} data.display_post_categories - Should we display the post categories?
	 * @param {string}      data.terms - The post category terms (HTML).
	 * @param {bool}        data.display_woo_rating - SHould we display Woo rating?
	 * @param {string}      data.rating - The rating (HTML).
	 * @param {bool}        data.display_woo_price - Should we display Woo Prices?
	 * @param {string}      data.price - The price (HTML).
	 * @param {bool}        data.display_woo_buttons - Should we display the Woo buttons?
	 * @param {string}      data.buttons - The buttons (HTML).
	 * @returns {string}
	 */
	fusionFeaturedImage: function( data ) {
		var featuredImageTemplate = FusionPageBuilder.template( jQuery( '#tmpl-featured-image' ).html() ),
			attributes = {};

		if ( 'object' !== typeof data || 'undefined' === typeof data.featured_images ) {
			return '';
		}
		attributes.data = data;
		return featuredImageTemplate( attributes );
	},

	/**
	 * Get element orientation class based on image dimensions and ratio and widthDouble params.
	 *
	 * @since 2.0.0
	 * @param {Object} attachment - Image object.
	 * @param {int} attachment.imageWidth - Image width.
	 * @param {int} attachment.imageHeight - Image height.
	 * @param {float} ratio - Height / Width ratio. Portrait images have larger height / width ratio.
	 * @param {int} widthDouble - Wider images are considered as 2x2.
	 * @returns {float}
	 */
	fusionGetElementOrientationClass: function( attachment, ratio, widthDouble ) {
			var elementClass = 'fusion-element-grid',
				fallbackRatio = 0.8,
				lowerLimit,
				upperLimit;

			if ( 'undefined' !== typeof attachment.imageWidth && 'undefined' !== typeof attachment.imageHeight ) {

				// Fallback to legacy calcs of Avada 5.4.2 or earlier.
				if ( '1.0' === ratio ) {
					lowerLimit = ( fallbackRatio / 2 ) + ( fallbackRatio / 4 );
					upperLimit = ( fallbackRatio * 2 ) - ( fallbackRatio / 2 );

					if ( lowerLimit > attachment.imageHeight / attachment.imageWidth ) {

						// Landscape image.
						elementClass = 'fusion-element-landscape';
					} else if ( upperLimit < attachment.imageHeight / attachment.imageWidth ) {

						// Portrait image.
						elementClass = 'fusion-element-portrait';
					} else if ( attachment.imageWidth > widthDouble ) {

						// 2x2 image.
						elementClass = 'fusion-element-landscape fusion-element-portrait';
					}
				} else {
					if ( ratio < attachment.imageWidth / attachment.imageHeight ) {

						// Landscape image.
						elementClass = 'fusion-element-landscape';

					} else if ( ratio < attachment.imageHeight / attachment.imageWidth ) {

						// Portrait image.
						elementClass = 'fusion-element-portrait';
					} else if ( attachment.imageWidth > widthDouble ) {

						// 2x2 image.
						elementClass = 'fusion-element-landscape fusion-element-portrait';
					}
				}
			}

			return elementClass;
		},

		/**
		 * Get base element padding based on orientation CSS class.
		 *
		 * @since 2.0.0
		 * @param {string} elementOrientationClass - CSS class
		 * @returns {float}
		 */
		fusionGetElementBasePadding: function( elementOrientationClass ) {
			var fusionElementGridPadding = 0.8,
				masonryElementPadding = {
				'fusion-element-grid': fusionElementGridPadding,
				'fusion-element-landscape': fusionElementGridPadding / 2,
				'fusion-element-portrait': fusionElementGridPadding * 2
			};

			if ( 'undefined' !== typeof masonryElementPadding[ elementOrientationClass ] ) {
				fusionElementGridPadding = masonryElementPadding[ elementOrientationClass ];
			}

			return fusionElementGridPadding;
		},

	/**
	 * JS copy of fusion_builder_render_post_metadata.
	 *
	 * @since 2.0.0
	 * @param {string}      layout - The layout.
	 * @param {Object}      settings - The settings.
	 * @param {bool|string} settings.post_meta - Should we display the post-meta?
	 * @param {bool|string} settings.post_meta_author - Should we display the author?
	 * @param {bool|string} settings.post_meta_date - Should we display the date?
	 * @param {bool|string} settings.post_meta_cats - Should we display the categories?
	 * @param {bool|string} settings.post_meta_tags - Should we display the tags?
	 * @param {bool|string} settings.post_meta_comments - Should we display comments?
	 * @param {bool|string} settings.disable_date_rich_snippet_pages - Should we disable the date rich snippet?
	 * @param {Object}      data - The data.
	 * @param {string}      data.post_meta - yes|no.
	 * @param {string}      data.author_post_link - The link to the post-author (HTML, not just URL).
	 * @param {string}      data.formatted_date - Formatted date (HTML).
	 * @param {string}      data.categories - The categories (HTML).
	 * @param {string}      data.tags - The Tags (HTML)
	 * @param {string}      data.comments - The comments (HTML)
	 * @param {string}      data.disable_date_rich_snippet_pages - Disable date rich snippets?
	 * @returns {string}
	 */
	fusionRenderPostMetadata: function( layout, settings, data ) {

		var metadata = '',
			author   = '',
			date     = '',
			output   = '',
			dateMarkup;

		// Check if meta data is enabled.
		if ( 'undefined' === typeof data ) {
			return;
		}

		if ( ( settings.post_meta && 'no' !== data.post_meta ) || ( ! settings.post_meta && 'yes' === data.post_meta ) ) {

			// For alternate, grid and timeline layouts return empty single-line-meta if all meta data for that position is disabled.
			if ( -1 !== jQuery.inArray( layout, [ 'alternate', 'grid_timeline' ] ) && ! settings.post_meta_author && ! settings.post_meta_date && ! settings.post_meta_cats && ! settings.post_meta_tags && ! settings.post_meta_comments ) {
				return '';
			}

			// Render author meta data.
			if ( settings.post_meta_author ) {

				// Check if rich snippets are enabled.
				if ( ! settings.disable_date_rich_snippet_pages ) {
					metadata += 'By <span>' + data.author_post_link + '</span>';
				} else {
					metadata += 'By <span class="vcard"><span class="fn">' + data.author_post_link + '</span></span>';
				}
				metadata += '<span class="fusion-inline-sep">|</span>';
			}

			// Render the updated meta data or at least the rich snippet if enabled.
			if ( settings.post_meta_date ) {
				metadata  += _.fusionRenderRichSnippets( data, false, false, true );
				dateMarkup = '<span>' + data.formatted_date + '</span><span class="fusion-inline-sep">|</span>';
				metadata  += dateMarkup;
			}

			// Render rest of meta data.
			// Render categories.
			if ( settings.post_meta_cats ) {

				if ( data.categories ) {
					metadata += ( settings.post_meta_tags ) ? 'Categories: ' + data.categories : data.categories;
					metadata += '<span class="fusion-inline-sep">|</span>';
				}
			}

			// Render tags.
			if ( settings.post_meta_tags ) {

				if ( data.tags ) {
					metadata += '<span class="meta-tags">' + 'Tags: ' + data.tags + '</span><span class="fusion-inline-sep">|</span>';
				}
			}

			// Render comments.
			if ( settings.post_meta_comments && 'grid_timeline' !== layout ) {
				metadata += '<span class="fusion-comments">' + data.comments + '</span>';
			}

			// Render the HTML wrappers for the different layouts.
			if ( metadata ) {
				metadata = author + date + metadata;

				if ( 'single' === layout ) {
					output += '<div class="fusion-meta-info"><div class="fusion-meta-info-wrapper">' + metadata + '</div></div>';
				} else if ( -1 !== jQuery.inArray( layout, [ 'alternate', 'grid_timeline' ] ) ) {
					output += '<p class="fusion-single-line-meta">' + metadata + '</p>';
				} else if ( 'recent_posts' === layout ) {
					output += metadata;
				} else {
					output += '<div class="fusion-alignleft">' + metadata + '</div>';
				}
			} else {
				output += author + date;
			}
		} else {

			// Render author and updated rich snippets for grid and timeline layouts.
			if ( data.disable_date_rich_snippet_pages ) {
				output += _.fusionRenderRichSnippets( data, false );
			}
		}

		return output;
	},

	/**
	 * JS Copy of fusion_builder_render_rich_snippets_for_pages.
	 *
	 * @since 2.0.0
	 * @param {Object}  data - The data.
	 * @param {bool}    data.disable_date_rich_snippet_pages Should we display the rich snippets?
	 * @param {string}  data.title - The title.
	 * @param {string}  data.the_author_posts_link The link to the author (HTML, not just the URL).
	 * @param {string}  data.get_the_modified_time - The modified timestamp.
	 * @param {bool}    titleTag - Do we want the entry-title tag?
	 * @param {bool}    authorTag - Do we want the author tag?
	 * @param {bool}    updatedTag - Do we want the updated time tag?
	 * @returns {string}
	 */
	fusionRenderRichSnippets: function( data, titleTag, authorTag, updatedTag ) {
		var output = '';

		titleTag   = 'undefined' !== typeof titleTag ? titleTag : true;
		authorTag  = 'undefined' !== typeof authorTag ? authorTag : true;
		updatedTag = 'undefined' !== typeof updatedTag ? updatedTag : true;

		if ( 'undefined' === typeof data ) {
			return;
		}
		if ( data.disable_date_rich_snippet_pages ) {
			output = '';
		}
		return output;
	},

	/**
	 * JS copy of new-slideshow-blog-shortcode.
	 *
	 * @since 2.0.0
	 * @param {Object} data - The data.
	 * @param {string} data.layout - The layout.
	 * @param {string} data.featured_image_width - The featured image width.
	 * @param {string} data.id - The ID.
	 * @param {string} data.featured_image_height - The featured image height.
	 * @param {string} data.thumbnail - The thumbnail.
	 * @param {string} data.video - The video
	 * @param {Object} data.image_data - The image data.
	 * @param {Object} data.multiple_featured - Multiple featured images data.
	 * @param {string} data.permalink - The permalink (URL).
	 * @param {string} data.title - The title.
	 * @param {string} data.image_size - The image size.
	 * @returns {string}
	 */
	fusionGetBlogSlideshow: function( data ) {
		var slideshowTemplate = FusionPageBuilder.template( jQuery( '#tmpl-new-slideshow-blog-shortcode' ).html() ),
			attributes        = {};

		if ( 'object' !== typeof data ) {
			return '';
		}
		attributes.data = data;
		return slideshowTemplate( attributes );
	},

	/**
	 * Ability to change length of content and display correct contents.
	 *
	 * @since 2.0.0
	 * @param {Object}  data - The data.
	 * @param {string}  data.read_more - The read more text.
	 * @param {string}  data.full_content - The full content.
	 * @param {string}  data.excerpt - The excerpt.
	 * @param {string}  data.excerpt_stripped - Stripped excerpt.
	 * @param {string}  data.excerpt_base - Defaults to 'Characters'.
	 * @param {string}  excerpt - Do we want excerpt (yes/no)?
	 * @param {integer} excerptLength - How long?
	 * @param {boolean} stripHtml - Should we strip HTML?
	 * @returns {string}
	 */
	fusionGetFixedContent: function( data, excerpt, excerptLength, stripHtml ) {
		var content,
			readMore = false,
			readMoreContent = '';

		excerpt        = 'undefined' !== typeof excerpt ? excerpt : 'no';
		excerptLength  = 'undefined' !== typeof excerptLength ? excerptLength : 55;
		stripHtml      = 'undefined' !== typeof stripHtml ? stripHtml : false;
		stripHtml      = ( 'yes' === stripHtml || stripHtml || '1' == stripHtml );
		data.read_more = 'null' == data.read_more ? data.read_more : '';

		// Return full contents.
		if ( 'no' === excerpt ) {
			return data.full_content;
		}

		// Set correct stripped data.
		content = ( stripHtml ) ? data.excerpt_stripped : data.excerpt;

		// It has a read more, remove it.
		content = content
			.replace( /\[/g, '&#91;' )
			.replace( /\]/g, '&#93;' )
			.replace( /\.\.\./g, '&#8230;' );

		readMoreContent = data.read_more
			.replace( /\[/g, '&#91;' )
			.replace( /\]/g, '&#93;' )
			.replace( /\.\.\./g, '&#8230;' )
			.trim();

		if ( -1 !== content.indexOf( readMoreContent ) ) {
			readMore = true;
			content  = content.replace( readMoreContent, '' );
		}

		if ( 'Characters' === data.excerpt_base ) {
			if ( excerptLength < content.length ) {
				content = content.substring( 0, excerptLength );
			}
		} else {
			content = content.split( ' ' ).splice( 0, excerptLength ).join( ' ' );
		}

		// If read more, add it back.
		if ( readMore ) {
			content += readMoreContent;
		}

		return _.fusionFixHtml( content );
	},

	/**
	 * Helper method used in getFixedContent.
	 *
	 * @since 2.0.0
	 * @param {string} html - The html string.
	 * @returns {string}
	 */
	fusionFixHtml: function( html ) {
		var div = document.createElement( 'div' );
		div.innerHTML = html;
		return ( div.innerHTML );
	},

	/**
	 * Capitalize the 1st letter.
	 *
	 * @since 2.0.0
	 * @param {string} string - The string we want to modify.
	 * @returns {string}
	 */
	fusionUcFirst: function( string ) {
		return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
	},

	/**
	 * JS port of PHP's rawurlencode function.
	 *
	 * @since 2.0.0
	 * @param {string} string - The URL.
	 * @returns {string}
	 */
	fusionRawUrlEncode: function( string ) {
		string = ( string + '' );

		return encodeURIComponent( string )
			.replace( /!/g, '%21' )
			.replace( /'/g, '%27' )
			.replace( /\(/g, '%28' )
			.replace( /\)/g, '%29' )
			.replace( /\*/g, '%2A' );
	},

	/**
	 * Auto calculate accent color.
	 * copy of fusion_auto_calculate_accent_color from PHP.
	 *
	 * @since 2.0.0
	 * @param {string} color - The color.
	 * @returns {string}
	 */
	fusionAutoCalculateAccentColor: function( color ) {
		var colorObj  = jQuery.Color( color ),
			lightness = parseInt( colorObj.lightness() * 100, 10 );

		if ( 0 < lightness ) { // Not black.
			if ( 50 <= lightness ) {
				return colorObj.lightness( lightness / 200 ).toRgbaString();
			}
			return colorObj.lightness( lightness / 50 ).toRgbaString();
		}
		return colorObj.lightness( 70 ).toRgbaString();
	},

	/**
	 * JS copy of fusion_builder_build_social_links.
	 *
	 * @since 2.0.0
	 * @param {array|Object} socialNetworks - The social networks array.
	 * @param {string}       functionName - Callable function-name.
	 * @param {Object}       params - The parameters.
	 * @param {integer}      i - Not used?
	 * @returns {string}
	 */
	fusionBuildSocialLinks: function( socialNetworks, functionName, params, i ) {

		var useBrandColors    = false,
			icons             = '',
			shortcodeDefaults = {},
			boxColors,
			iconColors,
			numOfIconColors,
			numOfBoxColors,
			socialNetworksCount,
			k = 0;

		socialNetworks = ! _.isUndefined( socialNetworks ) ? socialNetworks : '';
		i              = ! _.isUndefined( i ) ? i : 0;

		if ( ! _.isUndefined( params.social_icon_boxed ) ) {
			params.icons_boxed = params.social_icon_boxed;
		}

		if ( '' != socialNetworks && jQuery.isArray( socialNetworks ) ) {

			// Add compatibility for different key names in shortcodes.
			_.each( params, function( value, key ) {
				key = ( 'social_icon_boxed'        === key ) ? 'icons_boxed' : key;
				key = ( 'social_icon_colors'       === key ) ? 'icon_colors' : key;
				key = ( 'social_icon_boxed_colors' === key ) ? 'box_colors'  : key;
				key = ( 'social_icon_color_type'   === key ) ? 'color_type'  : key;

				shortcodeDefaults[ key ] = value;
			} );

			// Check for icon color type.
			if ( 'brand' === shortcodeDefaults.color_type ) {
				useBrandColors = true;

				boxColors = _.fusionSocialIcons( true, true );

				// Backwards compatibility for old social network names.
				boxColors.googleplus = {
					label: 'Google+',
					color: '#dc4e41'
				};
				boxColors.mail = {
					label: 'Email Address',
					color: '#000000'
				};
				iconColors = {};

			} else {

				// Custom social icon colors.
				iconColors = ( 'undefined' !== typeof shortcodeDefaults.icon_colors ) ? shortcodeDefaults.icon_colors.split( '|' ) : '';
				boxColors  = ( 'undefined' !== typeof shortcodeDefaults.box_colors ) ? shortcodeDefaults.box_colors.split( '|' ) : '';

				numOfIconColors = iconColors.length;
				numOfBoxColors  = boxColors.length;

				socialNetworksCount = socialNetworks.length;

				for ( k = 0; k < socialNetworksCount; k++ ) {
					if ( 1 === numOfIconColors ) {
						iconColors[ k ] = iconColors[0];
					}
					if ( 1 === numOfBoxColors ) {
						boxColors[ k ] = boxColors[0];
					}
				}
			}

			// Process social networks.
			_.each( socialNetworks, function( value ) {

				_.each( value, function( link, network ) {
					var iconOptions;

					if ( 'custom' === network && link ) {

						_.each( link, function( url, customKey ) {
							var customIconBoxColor = '',
								socialMediaIcons,
								width,
								height;

							if ( 'yes' === params.icons_boxed ) {

								customIconBoxColor = i < boxColors.length ? boxColors[ i ] : '';
								if ( true === useBrandColors ) {
									customIconBoxColor = ( boxColors[ network ].color ) ? boxColors[ network ].color : '';
								}
							}

							socialMediaIcons = params.social_media_icons;

							if ( ! _.isObject( socialMediaIcons ) ) {
								socialMediaIcons = {};
							}
							if ( _.isUndefined( socialMediaIcons.custom_title ) ) {
								socialMediaIcons.custom_title = {};
							}
							if ( _.isUndefined( socialMediaIcons.custom_source ) ) {
								socialMediaIcons.custom_source = {};
							}
							if ( _.isUndefined( socialMediaIcons.custom_title[ customKey ] ) ) {
								socialMediaIcons.custom_title[ customKey ] = '';
							}
							if ( _.isUndefined( socialMediaIcons.custom_source[ customKey ] ) ) {
								socialMediaIcons.custom_source[ customKey ] = '';
							}

							iconOptions = {
								social_network: socialMediaIcons.custom_title[ customKey ],
								social_link: url,
								icon_color: i < iconColors.length ? iconColors[ i ] : '',
								box_color: customIconBoxColor
							};
							if ( _.isFunction( functionName ) ) {
								iconOptions = functionName( iconOptions, params );
							}
							icons += '<a ' + _.fusionGetAttributes( iconOptions ) + '>';
							icons += '<img';

							if ( ! _.isUndefined( socialMediaIcons.custom_source[ customKey ].url ) ) {
								icons += ' src="' + socialMediaIcons.custom_source[ customKey ].url + '"';
							}
							if ( ! _.isUndefined( socialMediaIcons.custom_title[ customKey ] ) && '' != socialMediaIcons.custom_title[ customKey ] ) {
								icons += ' alt="' + socialMediaIcons.custom_title[ customKey ] + '"';
							}
							if ( ! _.isUndefined( socialMediaIcons.custom_source[ customKey ].width ) && socialMediaIcons.custom_source[ customKey ].width ) {
								width = parseInt( socialMediaIcons.custom_source[ customKey ].width, 10 );
								icons += ' width="' + width + '"';
							}
							if ( 'undefined' !== socialMediaIcons.custom_source[ customKey ].height && socialMediaIcons.custom_source[ customKey ].height ) {
								height = parseInt( socialMediaIcons.custom_source[ customKey ].height, 10 );
								icons += ' height="' + height + '"';
							}
							icons += ' /></a>';
						} );
					} else {
						if ( true == useBrandColors ) {
							iconOptions = {
								social_network: network,
								social_link: link,
								icon_color: ( 'yes' === params.icons_boxed ) ? '#ffffff' : boxColors[ network ].color,
								box_color: ( 'yes' === params.icons_boxed ) ? boxColors[ network ].color : ''
							};

						} else {
							iconOptions = {
								social_network: network,
								social_link: link,
								icon_color: i < iconColors.length ? iconColors[ i ] : '',
								box_color: i < boxColors.length ? boxColors[ i ] : ''
							};
						}
						if ( _.isFunction( functionName ) ) {
							iconOptions = functionName( iconOptions, params );
						}
						icons += '<a ' + _.fusionGetAttributes( iconOptions ) + '></a>';
					}
					i++;
				} );
			} );
		}
		return icons;
	},

	/**
	 * JS copy of Fusion_Data::fusion_social_icons
	 *
	 * @since 2.0.0
	 * @param {boolean} custom - Do we want the custom network?
	 * @param {boolean} colors - Do we want the colors?
	 * @returns {Object}
	 */
	fusionSocialIcons: function( custom, colors ) {

		var networks,
			simpleNetworks;

		custom = ! _.isUndefined( custom ) ? custom : true;
		colors = ! _.isUndefined( colors ) ? colors : false;

		networks = {
			blogger: {
				label: 'Blogger',
				color: '#f57d00'
			},
			deviantart: {
				label: 'Deviantart',
				color: '#4dc47d'
			},
			digg: {
				label: 'Digg',
				color: '#000000'
			},
			dribbble: {
				label: 'Dribbble',
				color: '#ea4c89'
			},
			dropbox: {
				label: 'Dropbox',
				color: '#007ee5'
			},
			facebook: {
				label: 'Facebook',
				color: '#3b5998'
			},
			flickr: {
				label: 'Flickr',
				color: '#0063dc'
			},
			forrst: {
				label: 'Forrst',
				color: '#5b9a68'
			},
			gplus: {
				label: 'Google+',
				color: '#dc4e41'
			},
			instagram: {
				label: 'Instagram',
				color: '#3f729b'
			},
			linkedin: {
				label: 'LinkedIn',
				color: '#0077b5'
			},
			myspace: {
				label: 'Myspace',
				color: '#000000'
			},
			paypal: {
				label: 'Paypal',
				color: '#003087'
			},
			pinterest: {
				label: 'Pinterest',
				color: '#bd081c'
			},
			reddit: {
				label: 'Reddit',
				color: '#ff4500'
			},
			rss: {
				label: 'RSS',
				color: '#f26522'
			},
			skype: {
				label: 'Skype',
				color: '#00aff0'
			},
			soundcloud: {
				label: 'Soundcloud',
				color: '#ff8800'
			},
			spotify: {
				label: 'Spotify',
				color: '#2ebd59'
			},
			tumblr: {
				label: 'Tumblr',
				color: '#35465c'
			},
			twitter: {
				label: 'Twitter',
				color: '#55acee'
			},
			vimeo: {
				label: 'Vimeo',
				color: '#1ab7ea'
			},
			vk: {
				label: 'VK',
				color: '#45668e'
			},
			whatsapp: {
				label: 'WhatsApp',
				color: '#77e878'
			},
			xing: {
				label: 'Xing',
				color: '#026466'
			},
			yahoo: {
				label: 'Yahoo',
				color: '#410093'
			},
			yelp: {
				label: 'Yelp',
				color: '#af0606'
			},
			youtube: {
				label: 'Youtube',
				color: '#cd201f'
			},
			email: {
				label: 'Email Address',
				color: '#000000'
			}
		};

		// Add a "custom" entry.
		if ( custom ) {
			networks.custom = {
				label: 'Custom',
				color: ''
			};
		}

		if ( ! colors ) {
			simpleNetworks = {};
			_.each( networks, function( networkArgs ) {
				simpleNetworks.network_id = networkArgs.label;
			} );
			networks = simpleNetworks;
		}

		return networks;

	},

	/**
	 * JS copy of fusion_builder_sort_social_networks.
	 *
	 * @param {Object} socialNetworksOriginal - The original object.
	 * @param {Object} params - Any parameters we want to pass.
	 * @returns {Object}
	 */
	fusionSortSocialNetworks: function( socialNetworksOriginal, params ) {

		var socialNetworks = [],
			iconOrder      = '',
			newNetwork,
			newCustom;

		// Get social networks order from theme options.
		if ( params.social_media_icons_icon && jQuery.isArray( params.social_media_icons_icon ) ) {
			iconOrder = params.social_media_icons_icon.join( '|' );
		}

		if ( ! jQuery.isArray( iconOrder ) ) {
			iconOrder = iconOrder.split( '|' );
		}

		if ( jQuery.isArray( iconOrder ) ) {

			// First put the icons that exist in the theme options,
			// and order them using tha same order as in theme options.
			_.each( socialNetworksOriginal, function( value, key ) {
				var newKey;

				// Backwards compatibility for old social network names.
				newKey = ( 'google' === key ) ? 'googleplus' : key;
				newKey = ( 'gplus'  === key ) ? 'googleplus' : key;
				newKey = ( 'email'  === key ) ? 'mail'       : key;

				// Check if social network from TO exists in shortcode.
				if ( ! _.isUndefined( socialNetworksOriginal[ key ] ) ) {
					newNetwork          = {};
					if ( 'custom' === key ) {
						if ( socialNetworksOriginal[ value ] ) {
							newNetwork[ key ]  = socialNetworksOriginal[ value ][ key ];
							newCustom          = {};
							newCustom[ value ] = newNetwork;
							socialNetworks.push( newCustom );
						}
					} else {
						newNetwork[ newKey ] = socialNetworksOriginal[ key ];
						socialNetworks.push( newNetwork );
						delete socialNetworksOriginal[ key ];
					}
				}
			} );

			// Put any remaining icons after the ones from the theme options.
			_.each( socialNetworksOriginal, function( networkurl, name ) {
				if ( 'custom' !== name ) {
					newNetwork         = {};
					newNetwork[ name ] = networkurl;
					socialNetworks.push( newNetwork );
				}
			} );
		} else {
			console.warn( 'OUT' );
		}

		return socialNetworks;
	},

	/**
	 * JS copy of fusion_builder_get_social_networks.
	 * Gets the social networks.
	 *
	 * @since 2.0.0
	 * @param {Object} params - The parameters.
	 * @returns {Object}
	 */
	fusionGetSocialNetworks: function( params ) {

		var socialLinksArray = {},
			socialLinks      = {
				facebook: 'facebook',
				twitter: 'twitter',
				instagram: 'instagram',
				linkedin: 'linkedin',
				dribbble: 'dribbble',
				rss: 'rss',
				youtube: 'youtube',
				pinterest: 'pinterest',
				flickr: 'flickr',
				vimeo: 'vimeo',
				tumblr: 'tumblr',
				googleplus: 'googleplus',
				google: 'googleplus',
				digg: 'digg',
				blogger: 'blogger',
				skype: 'skype',
				myspace: 'myspace',
				deviantart: 'deviantart',
				yahoo: 'yahoo',
				reddit: 'reddit',
				forrst: 'forrst',
				paypal: 'paypal',
				dropbox: 'dropbox',
				soundcloud: 'soundcloud',
				vk: 'vk',
				whatsapp: 'whatsapp',
				xing: 'xing',
				yelp: 'yelp',
				spotify: 'spotify',
				email: 'email'
			};

		_.each( socialLinks, function( val, key ) {
			if ( 'undefined' !== typeof params[ key ] && '' !== params[ key ] ) {
				socialLinksArray[ val ] = params[ key ];
			}
		} );

		if ( params.show_custom && 'yes' === params.show_custom ) {
			socialLinksArray.custom = {};
			if ( jQuery.isArray( params.social_media_icons_icon ) ) {
				_.each( params.social_media_icons_icon, function( icon, key ) {
					if ( 'custom' === icon && jQuery.isArray( params.social_media_icons_url ) && ! _.isUndefined( params.social_media_icons_url[ key ] ) && '' !== params.social_media_icons_url[ key ] ) {

						// Check if there is a default set for this, if so use that rather than TO link.
						if ( params[ 'custom_' + key ] && '' !== params[ 'custom_' + key ] ) {
							socialLinksArray.custom[ key ] = params[ 'custom_' + key ];
						} else {
							socialLinksArray.custom[ key ] = params.social_media_icons_url[ key ];
						}
					}
				} );
			}
		}
		return socialLinksArray;
	},

	// WIP: If padding (combined all 4) is not set in params, then use individual variables.
	fusionGetPadding: function( values ) {
		values.padding_top    = 'undefined' !== typeof values.padding_top ? _.fusionGetValueWithUnit( values.padding_top ) : '0px';
		values.padding_right  = 'undefined' !== typeof values.padding_right ? _.fusionGetValueWithUnit( values.padding_right ) : '0px';
		values.padding_bottom = 'undefined' !== typeof values.padding_bottom ? _.fusionGetValueWithUnit( values.padding_bottom ) : '0px';
		values.padding_left   = 'undefined' !== typeof values.padding_left ? _.fusionGetValueWithUnit( values.padding_left ) : '0px';
		values.padding = values.padding_top + ' ' + values.padding_right + ' ' + values.padding_bottom + ' ' + values.padding_left;

		return values;
	},

	fusionGetMargin: function( values ) {
		if ( '' !== values.margin_bottom ) {
			values.margin_bottom = _.fusionGetValueWithUnit( values.margin_bottom );
		}
		if ( '' !== values.margin_top ) {
			values.margin_top = _.fusionGetValueWithUnit( values.margin_top );
		}

		return values;
	},

	fusionAnimations: function( values, attributes ) {
		var animations = false;

		if ( 'undefined' !== typeof values.animation_type && '' !== values.animation_type ) {
			animations = _.fusionGetAnimations( {
				type: values.animation_type,
				direction: values.animation_direction,
				speed: values.animation_speed,
				offset: values.animation_offset
			} );

			attributes = jQuery.extend( attributes, animations );

			// Class to mark as editor.
			if ( 'undefined' !== typeof attributes.class ) {
				attributes.class += ' ' + attributes.animation_class;
			} else {
				attributes.class = attributes.animation_class;
			}

			delete attributes.animation_class;
		}

		return attributes;
	},

	fusionPagination: function( maxPages, currentPage, range, pagination, globalPagination, globalStartEndRange ) {
		var paginationCode = '',
			i,
			globalStartRange,
			globalEndRange,
			start,
			end;

		globalStartEndRange = ( 'undefined' !== typeof globalStartEndRange ) ? parseInt( globalStartEndRange ) : 2;
		currentPage         = ( 'undefined' !== typeof currentPage ) ? parseInt( currentPage ) : 1;
		range               = parseInt( range );
		maxPages            = parseInt( maxPages );

		globalStartRange = globalEndRange = globalStartEndRange;

		if ( 1 !== maxPages ) {

			if ( ( 'pagination' !== pagination && 'Pagination' !== globalPagination ) ) {
				paginationCode += '<div class="fusion-infinite-scroll-trigger"></div>';
				paginationCode += '<div class="pagination infinite-scroll clearfix">';
			} else {
				paginationCode += '<div class="pagination clearfix">';
			}

			start = currentPage - range;
			end   = currentPage + range;
			if ( 0 >= start ) {
				start = ( 0 < currentPage - 1 ) ? currentPage - 1 : 1;
			}

			if ( maxPages < end ) {
				end = maxPages;
			}

			if ( 'pagination' === pagination ) {
				if ( 1 < currentPage ) {
					paginationCode += '<a class="pagination-prev" href="#"><span class="page-prev"></span><span class="page-text">Previous</span></a>';

					if ( 0 < globalStartRange ) {
						if ( globalStartRange >= start ) {
							globalStartRange = start - 1;
						}

						for ( i = 1; i <= globalStartRange; i++ ) {
							paginationCode += '<a href="#" class="inactive">' + i + '</a>';
						}

						if ( 0 < globalStartRange && globalStartRange < start - 1 ) {
							paginationCode += '<span class="pagination-dots paginations-dots-start">&middot;&middot;&middot;</span>';
						}
					}
				}

				for ( i = start; i <= end; i++ ) {
					if ( currentPage == i ) {
						paginationCode += '<span class="current">' + i + '</span>';
					} else {
						paginationCode += '<a href="#" class="inactive">' + i + '</a>';
					}
				}

				if ( currentPage < maxPages ) {

					if ( 0 < globalEndRange ) {

						if ( maxPages - globalEndRange <= end ) {
							globalEndRange = maxPages - end;
						}

						globalEndRange--;

						if ( end + 1 < maxPages - globalEndRange ) {
							paginationCode += '<span class="pagination-dots paginations-dots-end">&middot;&middot;&middot;</span>';
						}

						for ( i = maxPages - globalEndRange; i <= maxPages; i++ ) {
							paginationCode += '<a href="#" class="inactive">' + i + '</a>';
						}
					}

					paginationCode += '<a class="pagination-next" href="#"><span class="page-text">Next</span><span class="page-next"></span></a>';
				}
			}

			paginationCode += '</div>';
			paginationCode += '<div class="fusion-clearfix"></div>';
		}

		return paginationCode;
	},

	fusionInlineEditor: function( args, attributes ) {
		var defaults = {
				cid: false,
				param: 'element_content',
				encoding: false,
				'disable-return': false,
				'disable-extra-spaces': false
			},
			config = _.extend( defaults, args );

		// If cid is not a number then this is a nested render and do not use live editor.
		if ( 'number' !== typeof config.cid ) {
			return attributes;
		}

		// Class to mark as editor.
		if ( 'undefined' !== typeof attributes.class ) {
			attributes.class += ' ' + 'fusion-live-editable';
		} else {
			attributes.class = 'fusion-live-editable';
		}

		if ( config['disable-return'] ) {
			attributes['data-disable-return'] = 'true';
		}

		if ( config['disable-extra-spaces'] ) {
			attributes['data-disable-extra-spaces'] = 'true';
		}

		if ( config.encoding ) {
			attributes.encoding = 'true';
		}

		attributes['data-param'] = config.param;

		return attributes;
	},

	/**
	 * JS copy of fusion_section_deprecated_args.
	 * Maps the dprecated container args.
	 *
	 * @since 2.0.0
	 * @param {Object} args - The parameters.
	 * @returns {Object}
	 */
	fusionContainerMapDeprecatedArgs: function( args ) {
		var paramMapping = {
			'backgroundposition': 'background_position',
			'backgroundattachment': 'background_parallax',
			'background_attachment': 'background_parallax',
			'bordersize': 'border_size',
			'bordercolor': 'border_color',
			'borderstyle': 'border_style',
			'paddingtop': 'padding_top',
			'paddingbottom': 'padding_bottom',
			'paddingleft': 'padding_left',
			'paddingright': 'padding_right',
			'backgroundcolor': 'background_color',
			'backgroundimage': 'background_image',
			'backgroundrepeat': 'background_repeat',
			'paddingBottom': 'padding_bottom',
			'paddingTop': 'padding_top'
		};

		if ( ( 'undefined' !== typeof args.backgroundattachment  && 'scroll' === args.backgroundattachment ) || ( 'undefined' !== typeof args.background_attachment && 'scroll' === args.background_attachment ) ) {
			args.backgroundattachment = args.background_attachment = 'none';
		}

		_.each( paramMapping, function( newName, oldName ) {
			if ( 'undefined' === typeof args[ newName ] && 'undefined' !== typeof args[ oldName ] ) {
				args[ newName ] = args[ oldName ];
				delete args[ oldName ];
			}
		} );

		return args;
	}
}