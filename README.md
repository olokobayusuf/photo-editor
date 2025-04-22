# Photo Editor

![editor](editing.gif)

This is a sample project that explores powering React apps with Python and WebAssembly. It uses 
[Function](https://docs.fxn.ai/predictors/create) to compile and run an image editing function 
written in Python.

## Setup Instructions
1. Clone the project
2. Install dependencies:
    ```sh
    # Install deps
    $ npm install
    ```
3. Login to [Function](https://www.fxn.ai/settings/developer) and create an access key. Then create a `.env.local` file and 
place your access key:
    ```sh
    # Function
    FXN_ACCESS_KEY="fxn_..."
    ```
4. Start the dev server:
    ```sh
    # Start the dev server
    $ npm run dev
    ```
5. Naviate to [http://localhost:3000](http://localhost:3000) to use the editor!

