/**
 * WordPress dependencies
 */
import {
	alignCenter,
	alignJustify,
	alignLeft,
	alignRight,
} from '@wordpress/icons';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { Icon, __experimentalSpacer as Spacer } from '../../';
import { SegmentedControl } from '../index';
import { View } from '../../view';

export default {
	component: SegmentedControl,
	title: 'Components/SegmentedControl',
};

const align = [
	{
		label: <Icon icon={ alignLeft } size={ 14 } />,
		value: 'left',
	},
	{
		label: <Icon icon={ alignCenter } size={ 14 } />,
		value: 'center',
	},
	{
		label: <Icon icon={ alignRight } size={ 14 } />,
		value: 'right',
	},
	{
		label: <Icon icon={ alignJustify } size={ 14 } />,
		value: 'justify',
	},
];

export const _default = () => {
	const [ alignState, setAlignState ] = useState( align[ 0 ].value );
	const label = 'Segmented Control';
	const xy = [
		{
			label: 'Horizontal',
			value: 'horizontal',
		},
		{
			label: 'Vertical',
			value: 'vertical',
		},
	];

	const shortLong = [
		{
			label: 'Short',
			value: 'short',
		},
		{
			label: 'Looooooooooooong',
			value: 'long',
		},
	];

	return (
		<View>
			<Spacer>
				<SegmentedControl
					isBlock
					onChange={ setAlignState }
					options={ align }
					value={ alignState }
					label={ label }
				/>
			</Spacer>
			<Spacer>
				<SegmentedControl
					isBlock
					onChange={ setAlignState }
					options={ align }
					value={ alignState }
					label={ label }
				/>
			</Spacer>
			<Spacer>
				<SegmentedControl options={ xy } label={ label } />
			</Spacer>
			<Spacer>
				<SegmentedControl
					isAdaptiveWidth
					options={ shortLong }
					label={ label }
				/>
			</Spacer>
		</View>
	);
};
