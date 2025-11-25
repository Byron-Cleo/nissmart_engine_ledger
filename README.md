# Nissmart Transaction Engine

## How to run backend(Shown on the first 3mins in the video walk through)

1. create database called `nissmart_db`, preferabley with phpMyadmin to enable smooth creation fo users with active set to 1 as true
2. on the root directory, install the project packages with `npm install` using node version 20 or higher
3. change directory to backend to create databse tables by running `npx sequelize-cli db:migrate` to run project migrations with sequelize
4. then change back to root directory and run the sever `npm run server`

## How to run frontend

1. on the root directory, change to client directory, then nissmart directory
2. install packages with `npm install` with node version 20 or higher
3. run `npm run dev` to start react with vite front-end

## Any required environment variables

1. . `.env` inluded for the project called `config.env`

## Setup instructions
1. Please refer the above instructions
