# Photo Editor

![editor](editing.gif)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Folokobayusuf%2Fphoto-editor&env=FXN_ACCESS_KEY&envDescription=Create%20a%20Function%20access%20key%20to%20make%20predictions.&envLink=https%3A%2F%2Fwww.fxn.ai%2Fsettings%2Fdeveloper&project-name=photo-editor&repository-name=photo-editor&redirect-url=https%3A%2F%2Fdocs.fxn.ai%2Fintroduction&demo-title=Photo%20Editor&demo-description=Web-based%20photo%20editor%20powered%20by%20Python%20and%20WebAssembly.)

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

## How it Works
The photo editor is a plain Next.js app built with Tailwind CSS and Shadcn UI. With the UI setup, the actual image editing 
is implemented in a Python function in [editor.py](editor.py):
```py
from PIL import Image
from torch import clip
from torchvision.transforms.functional import to_pil_image, to_tensor

def edit_image (
    image: Image.Image,
    *,
    contrast: float=0.,
) -> Image.Image:
    """
    Edit an image.
    """
    image_tensor = to_tensor(image)
    contrast_tensor = (image_tensor - 0.5) * (contrast + 1) + 0.5
    result_tensor = clip(contrast_tensor, 0., 1.)
    result = to_pil_image(result_tensor)
    return result
```

This Python function is then compiled to WebAssembly using [Function](https://docs.fxn.ai/predictors/create):

![compiling the function](compile.gif)

## Useful Links
- [Join Function's Discord community](https://discord.gg/fxn)
- [Check out the Function docs](https://docs.fxn.ai)