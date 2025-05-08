'use client';

import React from "react";
import Menu from "../../../../components/menu/Menu";
import {
  adobepdf,
  download,
  resgreen,
  filesblack,
  mentionedgreen,
} from "../../../../app/assets";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const Files = () => {
  const params = useParams();
  const sessionId = params.sessionId;

  // Mock data to maintain exact same design
  const mockData = {
    segments: [
      {
        duration: 180, // 3 minutes
        s3Url: "https://example.com/audio1.mp3"
      },
      {
        duration: 240, // 4 minutes
        s3Url: "https://example.com/audio2.mp3"
      },
      {
        duration: 300, // 5 minutes
        s3Url: "https://example.com/audio3.mp3"
      }
    ]
  };

  const handleDownload = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename; // Suggests a filename for saving
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#10131A] min-h-screen text-white p-4 sm:p-6 lg:p-8">
      <Menu />

      {/* Content Section */}
      <div className="flex items-center justify-between gap-3 pb-6">
        <div className="flex items-center gap-2">
          <Image
            src={resgreen}
            alt="overviewList"
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
          <h2 className="font-inter font-medium text-[14px] sm:text-[16px] md:text-[18px] text-[#FFFFFF]">
            Resource
          </h2>
        </div>
        <div className="flex  bg-[#222534] py-1 px-1 rounded-[8px]  items-center gap-2">
          {/* Mentioned Link */}
          <Link href={`/${sessionId}/resource`}>
            <div className="flex items-center gap-2 border-0  text-[#5BF5FF] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
              <Image
                src={mentionedgreen}
                alt="Mentioned"
                className="w-4 h-4 sm:w-6 sm:h-6"
              />
              <button className="text-[12px] sm:text-[14px]">Mentioned</button>
            </div>
          </Link>
          {/* Files Link */}
          <Link href={`/${sessionId}/overview/files`}>
            <div className="flex items-center gap-2 border-0 bg-[#5BF5FF] text-[#222534] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
              <Image
                src={filesblack}
                alt="Files"
                className="w-4 h-4 sm:w-6 sm:h-6"
              />
              <button className="text-[12px] sm:text-[14px]">Files</button>
            </div>
          </Link>
        </div>
      </div>

      {/* Resource List */}
      <div className="space-y-4 py-4">
        {mockData.segments.map((segment, index) => (
          <div
            className="bg-[#282C3A] p-4 rounded-lg flex items-center justify-between"
            key={index}
          >
            <div className="flex items-center gap-2">
              <Image
                src={adobepdf}
                alt="Audio File"
                className="w-[34px] h-[34px] sm:w-[40px] sm:h-[40px]"
              />
              <div>
                <h2 className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] font-inter leading-tight">
                  Audio Segment {index + 1}
                </h2>
                <p className="text-[12px] sm:text-[14px] md:text-[16px] text-[#CDD0D5]">
                  Duration: {Math.floor(segment.duration / 60)}:
                  {(segment.duration % 60).toString().padStart(2, "0")}
                </p>
              </div>
            </div>
            <div
              className="w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] border border-[#5BF5FF] rounded-lg flex items-center justify-center"
              onClick={() =>
                handleDownload(segment.s3Url, `AudioSegment_${index + 1}.mp3`)
              }
            >
              <Image
                src={download}
                alt="Download"
                className="w-[16px] h-[16px] sm:w-[20px] sm:h-[20px]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Files;
