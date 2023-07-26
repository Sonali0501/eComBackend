# E-Commerce Application Backend

Application Schema

```
Product ( name, description, price, created_at, updated_at )
Variant ( name, sku, stock_count, additional_cost, product_id, created_at, updated_at )
```

This application contains below APIS

```
1. GET /api/v1/product?search=<>
    - gets list of products and their respective variants
    - allows filtering using search query parameter

2. POST /api/v1/product
    - adds new product and it's variants

3. PUT /api/v1/product
    - updates existing product and it's variants
    - allows addition of new variants of existing products

4. DELETE /api/v1/product?id=<>
    - deletes product with the given id
    - also deletes all the variants of the product
```

## Local project setup

### Database Setup

1. install and configure MySQL server
2. create a database

```
create database ecom;
```

### Environment Variables

create `.env` file in the root directory with the below content

```
NODE_ENV=development
PORT=4000
DATABASE_URL_SQL=mysql://<user>:<password>@127.0.0.1:3306/ecom
API_KEY=apikey
```

### Installing dependencies

```
npm install
```

### Starting server

```
npm run dev
```
