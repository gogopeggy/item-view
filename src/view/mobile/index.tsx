import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';

interface ItemProps {
	name: string;
	category: string;
	price: number;
	inStock: boolean;
}

const Mobile = ({ items }: { items: ItemProps[] }) => {
	const CardTitle = (title: string) => (
		<Grid size={{ md: 6 }}>
			<Typography pr={2} fontWeight={'bold'}>
				{title}
			</Typography>
		</Grid>
	);
	return (
		<Grid container spacing={2} sx={{ mb: 3 }}>
			{items.length > 0 ? (
				items.map((item, index) => (
					<Grid size={6} key={`${item.name}-${index}`}>
						<Card
							sx={{
								height: '100%',
								transition: 'all 0.2s ease-in-out',
								cursor: 'pointer',
								'&:hover': {
									transform: 'translateY(-2px)',
									boxShadow: 4,
								},
							}}
						>
							<CardContent sx={{ p: 2 }}>
								<Grid container sx={{ p: 2 }}>
									{CardTitle('商品名稱:')}
									<Grid size={{ md: 6 }}>
										<Typography
											variant='subtitle2'
											sx={{
												display: '-webkit-box',
												WebkitLineClamp: 2,
												WebkitBoxOrient: 'vertical',
												overflow: 'hidden',
											}}
										>
											{item.name}
										</Typography>
									</Grid>
								</Grid>
								<Grid container sx={{ p: 2 }}>
									{CardTitle('類別:')}
									<Grid size={{ md: 6 }}>{item.category}</Grid>
								</Grid>
								<Grid container sx={{ p: 2 }}>
									{CardTitle('價格:')}
									<Grid size={{ md: 6 }}>
										<Typography
											variant='h6'
											color='primary.main'
											sx={{
												fontWeight: 700,
												mb: 1,
												fontSize: '1rem',
											}}
										>
											NT${item.price.toLocaleString()}
										</Typography>
									</Grid>
								</Grid>
								<Grid container sx={{ p: 2 }}>
									{CardTitle('庫存:')}
									<Grid size={{ md: 6 }}>
										<Box sx={{ display: 'flex', justifyContent: 'center' }}>
											<Chip
												label={item.inStock ? '有庫存' : '缺貨'}
												size='small'
												color={item.inStock ? 'success' : 'error'}
												variant='filled'
												sx={{ mb: 1, fontSize: '0.75rem' }}
											/>
										</Box>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				))
			) : (
				<Typography variant='body2' color='text.secondary'>
					沒有符合條件的商品
				</Typography>
			)}
		</Grid>
	);
};

export default Mobile;
