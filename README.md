
# E-Commerce Database

This is a back-end application for an e-commerce website that allows users to effectively search and update inventory. The application uses Sequelize and Express. It can handle GET, PUT, POST, and DELETE requests.

## Getting Started

1. Clone the repository.
2. Create a .env file with the following contents:

shell DB_NAME='ecommerce_db' 
DB_USER='root' 
DB_PASSWORD=''


3. Run the following commands:

npm i
mysql -u root -p 
source ./db/schema.sql  
node ./seeds/index.js 
npm start


## Testing

The application can currently be tested in Insomnia, but is not yet connected to a front-end.

## Video Demonstration

https://youtu.be/mZQAGersPUQ

## Usage

The application exposes a REST API that can be used to manage inventory. The following are some examples of how to use the API:

- Get all products: `GET /products`
- Get a specific product: `GET /products/:id`
- Create a new product:  POST /products 
    { 
    "name": "Product Name",
     "description": "Product Description",
      "price": 10.00, "quantity": 10 
      }
- Delete a product: `DELETE /products/:id`

## License

This application is licensed under the MIT License.

 