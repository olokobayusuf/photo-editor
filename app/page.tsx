"use client"

import clsx from "clsx"
import { Function, type Image } from "fxnjs"
import { EyeIcon, EyeSlashIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useCallback, useEffect, useRef, useState } from "react"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import { loadImageData } from "@/lib/io"
import { FilterPanel, type Filters } from "@/components/filterPanel"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"

const fxn = new Function({ url: "/api" });
const PREDICTOR_TAG = "@yusuf/photokit";

export default function Editor () {
  const [image, setImage] = useState<Image | null>(null);
  const [filters, setFilters] = useState<Filters>({ brightness: 0, contrast: 0 });
  const [showOriginal, setShowOriginal] = useState(false);
  const [predictorLoaded, setPredictorLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Handle uploaded image
  const onDrop = useCallback(async (files: File[]) => {
    if (files.length === 0)
      return;
    const image = await loadImageData(files[0]);
    setImage(image);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg"] },
    maxFiles: 1
  });
  // Preload the predictor when the page opens
  useEffect(() => {
    const preload = fxn.predictions.create({ tag: PREDICTOR_TAG, inputs: { } });
    toast.promise(preload, {
      loading: "Preloading predictor...",
      success: () => {
        setPredictorLoaded(true);
        return "Preloaded predictor."
      },
      error: err => ({
        message: "Failed to preload predictor.",
        description: err.message
      })
    });
  }, []);
  // Apply filters to the current image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image || !predictorLoaded)
      return;
    if (canvas.width != image.width || canvas.height != image.height) {
      canvas.width = image.width;
      canvas.height = image.height;
    }
    const context = canvas.getContext("2d")!;
    const imageData = context.createImageData(image.width, image.height);
    if (showOriginal) {
      imageData.data.set(image.data);
      context.putImageData(imageData, 0, 0);
      return;
    }
    const applyFilter = async () => {
      const prediction = await fxn.predictions.create({
        tag: PREDICTOR_TAG,
        inputs: { image, contrast: filters.contrast / 100 }
      });
      console.log(prediction.latency)
      if (prediction.error) {
        toast.error(prediction.error);
        return;
      }
      const result = prediction.results![0] as Image;
      imageData.data.set(result.data);
      context.putImageData(imageData, 0, 0);
    }; 
    applyFilter();
  }, [image, filters, showOriginal, predictorLoaded]);
  // Render the page
  return (
    <div className="">
      <main className="h-screen text-gray-200 flex flex-col backdrop-blur-lg backdrop-contrast-150 backdrop-brightness-75 bg-black">
        
        {/* Page */}
        <div className="px-8 gap-x-8 py-8 flex-grow grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 overflow-y-auto">

          {/* Image area */}
          <div className="col-span-3 md:row-span-full space-y-2 divide-y divide-gray-600 flex flex-col items-stretch">

            {/* Rounded image frame */}
            <div className="grow rounded-lg overflow-hidden">

              {/* Dropzone */}
              {
                !image &&
                <div
                  {...getRootProps()} 
                  className={clsx(
                    "w-full h-full flex flex-col items-center justify-center p-6",
                    "cursor-pointer bg-gray-700/40 transition-colors hover:bg-gray-700/50",
                  )}
                >
                  <input {...getInputProps()} />
                  <PhotoIcon className="w-16 h-16 text-gray-600 mb-4" />
                  <p className="text-lg font-medium mb-2">
                    Drop an image here.
                  </p>
                  <p className="text-sm text-gray-400">
                    Or click to browse.
                  </p>
                </div>
              }

              {/* Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
              />

            </div>
          </div>

          {/* Controls */}
          <div className="md:row-span-full border-l border-dashed pl-5 pr-3 border-gray-600 space-y-4 overflow-y-auto">
            
            {/* Top menu */}
            <div className="flex flex-row justify-between items-center dark">
              <Toggle
                onPressedChange={setShowOriginal}
                variant="outline"
                aria-label="Show original"
                className="hover:cursor-pointer"
              >
                {showOriginal && <EyeSlashIcon className="w-4 h-4" />}
                {!showOriginal &&<EyeIcon className="w-4 h-4" />}
              </Toggle>
              
              {
                image &&
                <Button
                  variant="outline"
                  onClick={() => setImage(null)}
                  className="hover:cursor-pointer"
                >
                  <XMarkIcon className="text-gray-200 w-4 h-4" />
                  Reset
                </Button>
              }
            </div>

            {/* Filter panel */}
            <FilterPanel
              filters={filters}
              onChangeFilters={setFilters}
            />

          </div>
          
        </div>

      </main>
    </div>
  );
}
