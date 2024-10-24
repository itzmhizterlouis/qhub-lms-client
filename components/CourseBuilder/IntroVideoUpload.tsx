"use client";
import React, { useState, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import fire from "@/assets/icons/fire.gif";
const IntroVideoUpload = () => {
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [imageDragging, setImageDragging] = useState(false);
  const [dragging, setDragging] = useState(false);
  const videoRef = useRef(null);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.type.startsWith("video")) {
      setVideoFile(URL.createObjectURL(file));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.type.startsWith("image")) {
      setImageFile(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video")) {
      setVideoFile(URL.createObjectURL(file));
    }
  };
  const handleImageDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setImageDragging(true);
  };

  const handleImageDragLeave = () => {
    setImageDragging(false);
  };
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image")) {
      setImageFile(URL.createObjectURL(file));
    }
  };
  return (
    <div className="grid gap-6 mt-4">
      <Label htmlFor="intro-video">Course Intro Video</Label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full rounded-md border-2 ${
          dragging ? "border-blue-500 bg-blue-50" : "border-black"
        } border-dotted h-[300px] flex items-center justify-center`}
      >
        {!videoFile ? (
          <>
            {!dragging ? (
              <div className="flex items-center justify-center w-full h-full flex-col">
                <p className="text-sm">Drag & drop your video here</p>
                <p className="mt-1 text-xs text-gray-500">
                  File format: <b>.mp4</b>
                </p>
                <p className="my-2 text-xs ">Or</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <label htmlFor="video-upload" className="cursor-pointer">
                    Browse File
                  </label>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/mp4"
                    className="hidden"
                    onChange={handleVideoUpload}
                  />
                </Button>
              </div>
            ) : (
              <div className="w-full flex flex-col items-center justify-center">
                <img src={fire.src} alt="Fire" width={100} height={100} />
                <h1 className="mt-2 text-primary text-lg font-medium">
                  Drop it like it&apos;s hot!
                </h1>
              </div>
            )}
          </>
        ) : (
          <video
            ref={videoRef}
            src={videoFile}
            controls
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>

      {videoFile && (
        <>
          <Label htmlFor="image-upload">Upload a Display Image</Label>
          <div
            onDragOver={handleImageDragOver}
            onDragLeave={handleImageDragLeave}
            onDrop={handleImageDrop}
            className={`w-full   ${
              imageDragging ? "border-blue-500 bg-blue-50" : "border-black"
            }  rounded-md border-2 border-black border-dotted h-[300px] flex items-center justify-center`}
          >
            {!imageFile ? (
              <>
                {!imageDragging ? (
                  <div className="flex items-center justify-center w-full h-full flex-col">
                    <p className="text-sm">Drag & drop your image here</p>
                    <p className="mt-1 text-xs text-gray-500">
                      File format: <b>.jpg, .png</b>
                    </p>
                    <p className="my-2 text-xs ">Or</p>
                    <Button className="bg-primary hover:bg-primary/90">
                      <label htmlFor="image-upload" className="cursor-pointer">
                        Browse Image
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full flex flex-col items-center justify-center">
                    <img src={fire.src} alt="Fire" width={100} height={100} />
                    <h1 className="mt-2 text-primary text-lg font-medium">
                      Drop it like it&apos;s hot!
                    </h1>
                  </div>
                )}
              </>
            ) : (
              <img
                src={imageFile}
                alt="Display Image"
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default IntroVideoUpload;
