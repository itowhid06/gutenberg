/**
 * External dependencies
 */
import { View, Text, TouchableWithoutFeedback } from 'react-native';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
	useBlockEditContext,
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import EmbedBottomSheet from './embed-bottom-sheet';
import styles from './styles.scss';

const EmbedPlaceholder = ( {
	icon,
	isSelected,
	label,
	onFocus,
	value,
	onSubmit,
	cannotEmbed,
} ) => {
	const { clientId } = useBlockEditContext();
	const { wasBlockJustInserted } = useSelect(
		( select ) => ( {
			wasBlockJustInserted: select(
				blockEditorStore
			).wasBlockJustInserted( clientId, 'inserter_menu' ),
		} ),
		[ clientId ]
	);
	const [ isEmbedSheetVisible, setIsEmbedSheetVisible ] = useState(
		isSelected && wasBlockJustInserted && ! value
	);

	const containerStyle = usePreferredColorSchemeStyle(
		styles.embed__container,
		styles[ 'embed__container--dark' ]
	);
	const labelStyle = usePreferredColorSchemeStyle(
		styles.embed__label,
		styles[ 'embed__label--dark' ]
	);
	const descriptionStyle = usePreferredColorSchemeStyle(
		styles.embed__description,
		styles[ 'embed__description--dark' ]
	);
	const actionStyle = usePreferredColorSchemeStyle(
		styles.embed__action,
		styles[ 'embed__action--dark' ]
	);

	return (
		<>
			<TouchableWithoutFeedback
				accessibilityRole={ 'button' }
				accessibilityHint={ __( 'Double tap to add a link.' ) }
				onPress={ ( event ) => {
					onFocus( event );
					setIsEmbedSheetVisible( true );
				} }
				disabled={ ! isSelected }
			>
				<View style={ containerStyle }>
					<View style={ styles.embed__icon }>{ icon }</View>
					<Text style={ labelStyle }>{ label }</Text>
					{ cannotEmbed ? (
						<>
							<Text style={ descriptionStyle }>
								{ __(
									'Sorry, this content could not be embedded.'
								) }
							</Text>
							<Text style={ actionStyle }>
								{ __( 'EDIT LINK' ) }
							</Text>
						</>
					) : (
						<Text style={ actionStyle }>{ __( 'ADD LINK' ) }</Text>
					) }
				</View>
			</TouchableWithoutFeedback>
			<EmbedBottomSheet
				value={ value }
				isVisible={ isEmbedSheetVisible }
				onClose={ () => setIsEmbedSheetVisible( false ) }
				onSubmit={ onSubmit }
			/>
		</>
	);
};

export default EmbedPlaceholder;
