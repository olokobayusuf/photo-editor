import type { Image } from "fxnjs"

export function loadImageData (file: File): Promise<Image> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target?.result)
        return reject(new Error("Failed to load image"));
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext("2d")!;
        context.drawImage(img, 0, 0);
        const imageData = context.getImageData(0, 0, img.width, img.height);

        console.log(imageData.data.slice(0, 8))


        resolve({
          data: imageData.data,
          width: imageData.width,
          height: imageData.height,
          channels: 4
        });
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target.result as string;
    };
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}