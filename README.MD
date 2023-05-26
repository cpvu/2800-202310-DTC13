 
# Cryptoment AI
CryptomentAI is a web application that uses openAI to generate real time data and sentiments related to a Cryptocurrency coin.

# Names of Contributors
Team DTC-13

### Team Members: 
Ankit
<br>
Bryan Fung
<br>
Calvin Vu
<br>
Michael Yu
<br>

# Technologies

<b>Front-end Client -</b>  ReactJS, NextJs, ChakraUI
<br>
<b>Back-end API -</b>  ExpressJS
<br>
<b>Database -</b> MongoDB


# Installation

Our project is separated into two folders:

1. Client - contains our front-end client
2. Server - contains our backend API client

</br>
To access the folders

```
cd client OR cd server
```
</br>

Install required dependencies
```
npm i
```
</br>

## Start the client or server

Ensure to create an env file containing necessary values as shown in <b>'.env.example'</b> in the root folder

Server env example:
```
![image](https://ibb.co/23LZrZy)
```
Client env example:
```
![image](https://ibb.co/93LxmY1)

```
To run the developmental environment
```
npm run dev
```

To build and run production:
```
npm run build && start
```
</br>


## Hosted Site: 
```
https://2800-202310-dtc-13.vercel.app/
```

# 5. Contents of Folder
Content of the project folder:

```
Client
    - public
        - favicon.ico
        - next.svg
        - thirteen.svg
        - vercel.svg

    - src
        - components
            - coin
                - services
                    - addWatchlistCoin.js       # Add a coin to the watchlist
                    - fetchCoinInformation.js   # Get information about a fetched coin
                    - fetchCoinNews.js          # Get news about a fetched coin
                    - fetchCoinPrices.js        # Get price about a fetched coin
               
                - CoinDescription.js            # Describe the coin
                - CoinNew.js                    # Give news about the coin         
                - CoinPrices.js                 # Show the coin's price
                - TokenPageDivider.js           # Show the tokens


            - common
                - CustomStatLabel.js            # Label the stats
                - Footer.js                     # Make the Footer
                - LogoutButton.js               # Make a logout button
                - Navbar.js                     # Make routes in the navbar


            - forgotpassword
                - ForgotPasswordForm.js         # Make a form for a user who forgets his/her password

            - home
                - HomeHeader.js                 # Make a header for the snake game
                - SnakeMiniGame.js              # Easter egg game

            - layouts
                - Layout.js                     # Make a layout for each page

            - login
                - LoginForm.js                  # Make a login form

            - resetpassword
                - ResetPasswordForm.js          # Send an email for the user to reset a password

            - signup
                - SignUpForm.js                 # Make a signup form for the user

            - watchlist
                - services
                    - fetchWatchlist.js         # Get the watchlist
                - AddWatchlistCoinButton.js     # Set button for the user to add a coin 
            
            - index.js                          # Export the pages required for the client



        - constants                 # Constant folder
            - coins.js              # Exports some main coin types
            - endpoints.js          # Exports the pages that shows password resets, signup, login, questions, and coin descriptions

        - pages                     # Pages folder
            - api/auth              # API authentication folder
                - [...nextauth].js  # Next Auth

            - forgot                # forget password folder
                - password.js       # Gives the user forgot password form if the user forgets his/her password

            - reset/password        # Rest password folder
                - [resetToke].js    # Gives the user reset password form if the user forgets his/her password


            - search                # Search parent route   
                - [...coin].js      # Dynamic route for coins

            - _app.js               # Export app with layouts
            - _document.js          # Set up pages with html, head, body, main, and nextscript
            - faq.js                # Make the FAQ page
            - index.js              # Make the home page
            - login.js              # Make the login form for the user
            - search.js             # Allow users to search tokens and give the latest information with AI
            - settings.js           # Show information for the current user
            - signup.js             # Make the signup form for the user
            - watchlist.js          # Make the watchlist for the user to make records

        - styles                    # styling folder
            - Home.module.css       # styles the main pages
            - globals.css           # styles the global elements

        - validators                # validation folder
            - loginValidator.js     # exports LoginSchema which tells the user if his/her username and password are acceptable when logging up
            - signupValidtor.js     # exports SignupSchema which tells the user if his/her required inputs are filled out and whether if the inputs are acceptable when signing up

    - .eslintrc.json
    - .gitignore                    # gitignore page
    - README.md                     # tells the user how to run on local host
    - jsconfig.json
    - next.config.js
    - package-lock.json
    - package.json
    - vercel.json  



----------------------------------------------

Server
    - dist                         # dist folder
        - main.js                  # main javascript code

    - src                          # src folder
        - controllers              # authentication control folder 
            - authController.js    # handles user signup, login, and signout
            - index.js             # make exports from controllers
            - openController.js    # controller for openAI route logic

        - models                   # authentication setup folder
             - authSchema.js       # sets up userSchema from mongoose and export it

        - routes                   # page route folder
            - api.router.js        # makes the routes from ..controllers/index.js

        - utils/openai             # ai connection folder
            - openai.config.js     # make configuration
            - openai.js            # export the openaiAPI 

        - index.js                 # runs the server
        - server.js                # sets up the server 


    - .gitignore                   # gitignore page
    - Procfile                     # procfile page
    - package.json                 # packages
    - wepback.config.cjs           # wepback config
```

## Features
- Users can search for cryptocurrency coins by name or symbol.
- Real-time market information for each coin is displayed, including price, market cap, volume, and price changes.
- Sentiment analysis data provides insights into the overall sentiment of the cryptocurrency market.
- Users can view detailed information about each coin, including historical price charts and social media sentiment.

# Our Usage of AI

### Application Development
Using OpenAi's chatGPT, it helped us in the development of application, especially in the debugging and deployment phase of our project. It was beneficial for providing suggestions to handle errors. It would not always give the direct answer, but provided information that would potentially lead to the information. 

### Features that Incorporate AI

CryptomentAI mainly utilizes OpenAI's api to create AI generated information. OpenAI's api is heavily incorporated into our search features and FAQ features. 
Using carefully tailored and specific prompts, we were able to retrieve useful payloads for OpenAI's API that could be handled in our application.

### Dataset Usage

We also utilized Numpys, TextBlob, and Pandas to create a sentiment analysis of our Kaggle dataset. 
Using TextBlob, we cleaned and sanitized the dataset of crypto tweets, filtered each coin based on tweets and assigned our coins the corresponding sentiment. 

### Limitations 

We found that the OpenAI can be quite slow and response times can take an extended amount of time to load. This limitation was difficult to overcome, but we tried to optimize the search feature as much as possible to reduce load times.

Working with larger datasets was also difficult due to the amount of time it took to parse the CSV and handle the responses. To overcome this we used a smaller dataset and parsed sections of the CSV as chunks.

## Credits, References & Licenses

**OpenAI API:**
CrypotmentAI utilizes the OpenAI API, which provides advanced language processing capabilities and natural language understanding. More information about the OpenAI API can be found on the official OpenAI website (https://openai.com/).

**Binance API**
CryptomentAI integrates the Binance API, which allows access to real-time cryptocurrency market data and trading functionality. Details about the Binance API can be found on the official Binance website (https://www.binance.com/).

**Kaggle Dataset**
The cryptomentAI application incorporates a dataset obtained from Kaggle, a platform for discovering and sharing datasets.

Our dataset can found here: https://www.kaggle.com/datasets/viknegi/crypto-tweets-dataset

# Known Bugs
- Currently there is a CORS issue related to Vercel and our API on our hosted site that we haven't had time to resolve as of yet. Due to this, our watchlist does not display on hosted, but works locally. This can be easily fixed in the future, but did not have enough time to troubleshoot.

# Contact Information

cryptomentai@yyrmail.com
