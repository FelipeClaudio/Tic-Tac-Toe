# Tic-Tac-Toe

## Project for studing purporse

### How to use locally
1. Download project from git
2. Use **npm install**
3. Run **npm start**
4. Open browser in http://localhost:9123

### How to use in production environment
1. Run **npm run-script build**
2. Copy contents in "./public" folder

### It is also possible run project from a docker image by executing steps below from root folder:
1. docker build . --rm --pull -t tictactoe:latest
2. docker run --rm -d  -p 9123:80/tcp tictactoe:latest
