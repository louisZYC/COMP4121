# start database
change current working directory to this project and execute the command below
```
docker compose up
```

# start nodejs server
change the current working directory to backend folder, and execute the commands below, the first command  installs packeges and the second command start a web server listening on port 8800
```
npm install
npm start
```
After nodejs server started, you may want to import some products data to the database, you can do so by sending a Post request to http://localhost:8800/products/bulk with json data embeded in the request body, a example of products data shown below
```json
{
  "products": [
    {
      "name": "mini taxi",
      "price": 50,
      "image": "https://cdn.discordapp.com/attachments/896413977121259550/1094802087583416350/image.png",
      "monthlySales": 50,
      "supplier": "gift shop"
    },
    {
      "name": "cup",
      "price": 40,
      "image": "https://cdn.discordapp.com/attachments/896413977121259550/1094802269796573325/image.png",
      "monthlySales": 150,
      "supplier": "gift shop"
    },
    {
      "name": "notebook",
      "price": 20,
      "image": "https://cdn.discordapp.com/attachments/896413977121259550/1094851774575296613/image.png",
      "monthlySales": 250,
      "supplier": "gift shop 2"
    },
    {
      "name": "燈籠🏮",
      "price": 30,
      "image": "https://cdn.discordapp.com/attachments/896413977121259550/1094802541054787584/image.png",
      "monthlySales": 50,
      "supplier": "gift shop"
    }
  ]
}

```

Please adding products data to database, it is neccessary for frontend application working properly

# start frontend application
change the current working directory to backend folder, and execute the commands below, the first command  installs packeges and the second command start a frontend React App listening on port 3000, http://localhost:3000/
```
npm install
npm start
```