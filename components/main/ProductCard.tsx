import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Product {
id:string;
name:string;
price:number;
image:string;
description :string;

}

const ProductCard = ({product}: {product:Product}) => {
 return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               {product.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;