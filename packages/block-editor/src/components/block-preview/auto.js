/**
 * WordPress dependencies
 */
import { useResizeObserver, pure } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import BlockList from '../block-list';
import Iframe from '../iframe';
import EditorStyles from '../editor-styles';
import { store } from '../../store';

// This is used to avoid rendering the block list if the sizes change.
let MemoizedBlockList;

function AutoBlockPreview( { viewportWidth, __experimentalPadding } ) {
	const [
		containerResizeListener,
		{ width: containerWidth },
	] = useResizeObserver();
	const [
		contentResizeListener,
		{ height: contentHeight },
	] = useResizeObserver();
	const styles = useSelect( ( select ) => {
		return select( store ).getSettings().styles;
	} );

	// Initialize on render instead of module top level, to avoid circular dependency issues.
	MemoizedBlockList = MemoizedBlockList || pure( BlockList );

	const scale = containerWidth / viewportWidth;

	return (
		<div className="block-editor-block-preview__container">
			{ containerResizeListener }
			<div
				className="block-editor-block-preview__content"
				style={ {
					transform: `scale(${ scale })`,
					height: contentHeight * scale,
				} }
			>
				<Iframe
					head={ <EditorStyles styles={ styles } /> }
					contentRef={ ( { ownerDocument: { documentElement } } ) => {
						documentElement.style.position = 'relative';
						documentElement.style.padding =
							__experimentalPadding + 'px';
					} }
					aria-hidden
					style={ {
						width: viewportWidth,
						height: contentHeight,
						pointerEvents: 'none',
					} }
				>
					{ contentResizeListener }
					<MemoizedBlockList renderAppender={ false } />
				</Iframe>
			</div>
		</div>
	);
}

export default AutoBlockPreview;
