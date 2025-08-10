import {
	TableContainer,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableSortLabel,
	Typography,
	TableBody,
	Chip,
	Paper,
} from '@mui/material';

interface ItemProps {
	name: string;
	category: string;
	price: number;
	inStock: boolean;
}

const DeskTop = ({
	sortBy,
	setSortOrder,
	setSortBy,
	sortOrder,
	paginatedItems,
}: {
	sortBy: 'name' | 'category' | 'price' | 'inStock';
	setSortOrder: React.Dispatch<React.SetStateAction<string>>;
	setSortBy: React.Dispatch<
		React.SetStateAction<'name' | 'category' | 'price' | 'inStock'>
	>;
	sortOrder: string;
	paginatedItems: ItemProps[];
}) => {
	const handleSort = (column: 'name' | 'category' | 'price' | 'inStock') => {
		if (sortBy === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortBy(column);
			setSortOrder('asc');
		}
	};

	const TableLabel = (
		key: 'name' | 'category' | 'price' | 'inStock',
		title: string
	) => (
		<TableSortLabel active={sortBy === key} onClick={() => handleSort(key)}>
			{title}
		</TableSortLabel>
	);

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label='產品表格'>
				<TableHead>
					<TableRow>
						<TableCell>{TableLabel('name', '商品名稱')}</TableCell>
						<TableCell align='right'>
							{TableLabel('category', '類別')}
						</TableCell>
						<TableCell align='right'>{TableLabel('price', '價格')}</TableCell>
						<TableCell align='right'>
							{TableLabel('inStock', '有庫存')}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedItems.length > 0 ? (
						paginatedItems.map((item) => (
							<TableRow
								key={item.name}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell component='th' scope='row'>
									{item.name}
								</TableCell>
								<TableCell align='right'>{item.category}</TableCell>
								<TableCell align='right'>
									NT${item.price.toLocaleString()}
								</TableCell>
								<TableCell align='right'>
									<Chip
										label={item.inStock ? '是' : '否'}
										color={item.inStock ? 'success' : 'default'}
										size='small'
									/>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={4} align='center' sx={{ py: 4 }}>
								<Typography variant='body2' color='text.secondary'>
									沒有符合條件的商品
								</Typography>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default DeskTop;
