export type Span = '' | 'big' | 'wide' | 'full' | 'tall';

/**
 * Grid span of tile `i` in a wall of `count` tiles whose first tile is big
 * (2×2), chosen so the wall ends without holes in `columns` columns.
 */
export const wallSpan = (i: number, count: number, columns: 2 | 3): Span => {
	const last = count - 1;
	if (i === 0) return last === 0 ? 'full' : 'big';
	if (columns === 2) return i === last && last % 2 === 1 ? 'wide' : '';
	// Two tiles fit beside the big one, then rows of three.
	if (last === 1) return 'tall';
	if (i < last || i <= 2) return '';
	const leftover = (last - 2) % 3;
	return leftover === 1 ? 'full' : leftover === 2 ? 'wide' : '';
};
