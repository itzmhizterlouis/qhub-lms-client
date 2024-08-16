"use client";
import CourseSlug from "@/components/Dashboard/Courses/CourseSlug";
import React, { useState } from "react";
import courseimage from "@/public/courseimagebig.png";
import Image from "next/image";
import CourseContentMenu from "@/components/Dashboard/Courses/CourseContentMenu";
const CourseContent = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const [active, setActive] = useState("overview");
  const slug = params.slug.replace(/-/g, " ");
  return (
    <div className="overflow-y-auto max-h-[650px]">
      <CourseSlug slug={slug} />

      <div className="p-7 grid grid-cols-12 gap-6 ">
        <div className="col-span-9">
          <Image
            src={courseimage}
            alt="course image"
            width={800}
            className="rounded-sm"
          />
          <CourseContentMenu active={active} setActive={setActive} />
          <div className="mt-6">
            <h2 className="font-bold">Course description</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              ullam impedit nemo nisi necessitatibus laborum explicabo ratione
              exercitationem magnam quis.
            </p>
            <h2 className="font-bold mt-6">What you will learn from this course</h2>
            <ul>
              <li>Learn how to build a website</li>
              <li>Learn how to build a website</li>
              <li>Learn how to build a website</li>
              <li>Learn how to build a website</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
