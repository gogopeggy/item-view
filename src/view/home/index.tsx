import { useState, useMemo, useEffect } from 'react';
import {
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
	Grid,
	FormControlLabel,
	Checkbox,
	TablePagination,
	Chip,
	IconButton,
	Collapse,
	Card,
	CardContent,
	Typography,
} from '@mui/material';
import { FilterList, Clear, ExpandMore, ExpandLess } from '@mui/icons-material';
import Mobile from '../mobile';
import DeskTop from '../desktop';

interface ItemProps {
	name: string;
	category: string;
	price: number;
	inStock: boolean;
}

const Item = ({ items }: { items: ItemProps[] }) => {
	const [searchName, setSearchName] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('');
	const [minPrice, setMinPrice] = useState('');
	const [maxPrice, setMaxPrice] = useState('');
	const [showInStockOnly, setShowInStockOnly] = useState(false);
	const [showFilters, setShowFilters] = useState(false);
	const [width, setWidth] = useState<number>(window.innerWidth);
	const isMobile = width <= 768;

	const [sortBy, setSortBy] = useState<
		'name' | 'category' | 'price' | 'inStock'
	>('name');
	const [sortOrder, setSortOrder] = useState('asc');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const categories = useMemo(() => {
		return [...new Set(items.map((item) => item.category))];
	}, [items]);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	const filteredAndSortedItems = useMemo(() => {
		items.sort(
			(a, b) => Number(a.name.split(' ')[1]) - Number(b.name.split(' ')[1])
		);

		let filtered = items.filter((item) => {
			// Name search filter
			if (
				searchName &&
				!item.name.toLowerCase().includes(searchName.toLowerCase())
			) {
				return false;
			}

			// Category filter
			if (selectedCategory && item.category !== selectedCategory) {
				return false;
			}

			// Price range filter
			if (minPrice && item.price < parseFloat(minPrice)) {
				return false;
			}
			if (maxPrice && item.price > parseFloat(maxPrice)) {
				return false;
			}

			// In stock filter
			if (showInStockOnly && !item.inStock) {
				return false;
			}

			return true;
		});

		//Sort logic
		if (sortBy) {
			filtered.sort((a, b) => {
				let aValue: string | number | boolean = a[sortBy];
				let bValue: string | number | boolean = b[sortBy];
				if (sortBy === 'name') {
					if (sortOrder === 'asc') {
						return Number(a.name.split(' ')[1]) - Number(b.name.split(' ')[1]);
					} else {
						return Number(b.name.split(' ')[1]) - Number(a.name.split(' ')[1]);
					}
				}
				if (sortOrder === 'asc') {
					return aValue > bValue ? 1 : -1;
				} else {
					return aValue < bValue ? 1 : -1;
				}
			});
		}

		return filtered;
	}, [
		items,
		searchName,
		selectedCategory,
		minPrice,
		maxPrice,
		showInStockOnly,
		sortBy,
		sortOrder,
	]);

	const paginatedItems = useMemo(() => {
		const startIndex = page * rowsPerPage;
		return filteredAndSortedItems.slice(startIndex, startIndex + rowsPerPage);
	}, [filteredAndSortedItems, page, rowsPerPage]);

	const clearFilters = () => {
		setSearchName('');
		setSelectedCategory('');
		setMinPrice('');
		setMaxPrice('');
		setShowInStockOnly(false);
		setSortBy('name');
		setSortOrder('asc');
		setPage(0);
	};

	// Count active filters
	const activeFiltersCount = [
		searchName,
		selectedCategory,
		minPrice,
		maxPrice,
		showInStockOnly,
	].filter(Boolean).length;

	// const CardTitle = (title: string) => (
	// 	<Grid size={{ md: 6 }}>
	// 		<Typography pr={2} fontWeight={'bold'}>
	// 			{title}
	// 		</Typography>
	// 	</Grid>
	// );

	return (
		<Box sx={{ width: '100%' }}>
			<Card sx={{ mb: 2 }}>
				<CardContent>
					<Grid container spacing={2} alignItems='center'>
						<Grid size={{ xs: 12, md: 6 }}>
							<TextField
								fullWidth
								placeholder='搜尋商品名稱...'
								value={searchName}
								onChange={(e) => setSearchName(e.target.value)}
							/>
						</Grid>
						<Grid size={{ xs: 12, md: 6 }}>
							<Box
								display='flex'
								alignItems='center'
								justifyContent='flex-end'
								gap={1}
							>
								{activeFiltersCount > 0 && (
									<Chip
										label={`${activeFiltersCount} 個篩選條件`}
										size='small'
										color='primary'
										variant='outlined'
									/>
								)}
								<IconButton onClick={clearFilters} title='清除所有篩選'>
									<Clear />
								</IconButton>
								<IconButton
									onClick={() => setShowFilters(!showFilters)}
									title='顯示/隱藏篩選器'
								>
									<FilterList />
									{showFilters ? <ExpandLess /> : <ExpandMore />}
								</IconButton>
							</Box>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			{/* Filters Panel */}
			<Collapse in={showFilters}>
				<Card sx={{ mb: 2 }}>
					<CardContent>
						<Typography variant='h6' gutterBottom>
							篩選條件
						</Typography>
						<Grid container spacing={2}>
							<Grid size={{ xs: 12, md: 3 }}>
								<FormControl fullWidth>
									<InputLabel>類別</InputLabel>
									<Select
										value={selectedCategory}
										label='類別'
										onChange={(e) => setSelectedCategory(e.target.value)}
									>
										<MenuItem value=''>全部類別</MenuItem>
										{categories.map((category) => (
											<MenuItem key={category} value={category}>
												{category}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid size={{ xs: 6, md: 2 }}>
								<TextField
									fullWidth
									label='最低價格'
									type='number'
									value={minPrice}
									onChange={(e) => setMinPrice(e.target.value)}
									slotProps={{
										input: {
											// Props for the Input component itself
										},
										htmlInput: {
											min: 0, // applies directly to the underlying <input>
										},
									}}
								/>
							</Grid>
							<Grid size={{ xs: 6, md: 2 }}>
								<TextField
									fullWidth
									label='最高價格'
									type='number'
									value={maxPrice}
									onChange={(e) => setMaxPrice(e.target.value)}
									slotProps={{
										input: {
											// Props for the Input component itself
										},
										htmlInput: {
											min: 0, // applies directly to the underlying <input>
										},
									}}
								/>
							</Grid>
							<Grid size={{ xs: 12, md: 3 }}>
								<FormControlLabel
									control={
										<Checkbox
											checked={showInStockOnly}
											onChange={(e) => setShowInStockOnly(e.target.checked)}
										/>
									}
									label='僅顯示有庫存商品'
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Collapse>
			{/* Results Summary */}
			<Box sx={{ mb: 2 }}>
				<Typography variant='body2' color='text.secondary'>
					顯示 {filteredAndSortedItems.length} 個結果中的第{' '}
					{page * rowsPerPage + 1}-
					{Math.min((page + 1) * rowsPerPage, filteredAndSortedItems.length)} 個
				</Typography>
			</Box>
			Table
			{isMobile ? (
				<Mobile items={paginatedItems} />
			) : (
				<DeskTop
					sortBy={sortBy}
					setSortOrder={setSortOrder}
					setSortBy={setSortBy}
					sortOrder={sortOrder}
					paginatedItems={paginatedItems}
				/>
			)}
			{filteredAndSortedItems.length > 0 && (
				<TablePagination
					component='div'
					count={filteredAndSortedItems.length}
					page={page}
					onPageChange={(event, newPage) => setPage(newPage)}
					rowsPerPage={rowsPerPage}
					onRowsPerPageChange={(event) => {
						setRowsPerPage(parseInt(event.target.value, 10));
						setPage(0);
					}}
					rowsPerPageOptions={[5, 10, 25, 50]}
					labelRowsPerPage='每頁顯示'
					labelDisplayedRows={({ from, to, count }) =>
						`第 ${from}-${to} 個，共 ${count} 個`
					}
				/>
			)}
		</Box>
	);
};

export default Item;
