#
#   Function
#   Copyright © 2025 NatML Inc. All Rights Reserved.
#

from fxn import compile, Sandbox
from PIL import Image
from torch import clip
from torchvision.transforms.functional import to_pil_image, to_tensor

@compile(
    tag="@yusuf/photo-editor",
    description="Edit images.",
    sandbox=Sandbox().pip_install("torchvision"),
    targets=["macos", "wasm"]
)
def edit_image (
    image: Image.Image,
    *,
    contrast: float=0.,
) -> Image.Image:
    """
    Perform simple image editing operations on an image.

    Parameters:
        image (PIL.Image): Input image.
        contrast (float): Contrast adjustment. Should be in range [-1, 1].

    Returns:
        PIL.Image: Edited image.
    """
    image_tensor = to_tensor(image)
    result_tensor = clip((image_tensor - 0.5) * (contrast + 1) + 0.5, 0., 1.)
    result = to_pil_image(result_tensor)
    return result

if __name__ == "__main__":
    image = Image.open("image.jpg")
    result = edit_image(image, contrast=0.6)
    result.show()