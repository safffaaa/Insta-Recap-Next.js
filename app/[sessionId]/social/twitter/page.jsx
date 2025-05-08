'use client';

import React from "react";
import Menu from "../../../../components/menu/Menu";
import {
  copy,
  linkedinblue,
  share,
  socialcontent,
  twitter,
  twitterblack,
} from "../../../../app/assets";
import MenuButton from "../../../../components/share-copy-download-button/MenuButton";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import formatSummaryContent from "../../../../Markdown";
import FunctionButton from '../../../../components/fuctionButton';

const Twitter = () => {
  const params = useParams();
  const sessionId = params.sessionId;

  // Mock data to maintain existing design
  const mockData = {
    twitterPosts: [
      {
        content: "Just wrapped up an amazing session on AI and Machine Learning! Key takeaways: 1) The future of AI is collaborative 2) Ethics in AI is crucial 3) Continuous learning is essential #AI #MachineLearning #Tech",
        hashtags: ["AI", "MachineLearning", "Tech", "FutureOfWork"],
      },
      {
        content: "Excited to share insights from today's session on digital transformation! The role of data in decision-making has never been more important. #DigitalTransformation #DataAnalytics #Business",
        hashtags: ["DigitalTransformation", "DataAnalytics", "Business", "Innovation"],
      },
      {
        content: "Breaking down complex concepts into actionable insights - that's what today's session was all about! #Learning #ProfessionalDevelopment #Growth",
        hashtags: ["Learning", "ProfessionalDevelopment", "Growth", "Success"],
      }
    ]
  };

  return (
    <div className="bg-[#10131A] font-inter text-white p-4 sm:p-6 lg:p-8">
      <Menu />

      {/* header section */}
      <div className="flex items-center justify-between gap-3 pb-6">
        <div className="flex items-center gap-2">
          <Image
            src={socialcontent}
            alt="Social Content"
            className="w-5 h-5 sm:w-8 sm:h-8"
          />
          <h2 className="font-inter font-medium text-[14px] sm:text-[16px] md:text-[18px] text-[#FFFFFF]">
            Social Content
          </h2>
        </div>
        <div className="flex bg-[#222534] py-1 px-1 rounded-[8px] justify-center items-center">
          {/* Twitter Link */}
          <Link href={`/${sessionId}/social/twitter`}>
            <div className="flex items-center justify-between border-0 bg-[#5BF5FF] text-[#222534] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
              <Image
                src={twitterblack}
                alt="Twitter"
                className="w-[13.5px] h-[15px] mr-2"
              />
              <button className="text-[12px] sm:text-[14px]">Twitter</button>
            </div>
          </Link>
          {/* LinkedIn Link */}
          <Link href={`/${sessionId}/social/linkedin`}>
            <div className="flex items-center border-0 text-[#5BF5FF] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
              <Image
                src={linkedinblue}
                alt="LinkedIn"
                className="w-[13.5px] h-[15px] mr-2"
              />
              <button className="text-[12px] sm:text-[14px]">LinkedIn</button>
            </div>
          </Link>
        </div>
      </div>

      {/* Content Section */}
      {mockData.twitterPosts.map((post, index) => (
        <div key={index} className="bg-[#222534] space-y-6 rounded-lg mb-4">
          <div className="px-4 bg-[#282C3A] text-[#CDD0D5] font-inter text-[14px] rounded-lg">
            <div className="py-4 flex items-center justify-between">
              <div className="flex gap-2">
                <Image src={twitter} alt="" />
                <div className="text-[14px] sm:text-[16px] md:text-[18px]">
                  #Post {index + 1}
                </div>
              </div>
              <div className="text-[#CDD0D5]">
                {post.content.length}/280
              </div>
            </div>

            <div className="bg-[#222534] px-4 rounded-lg py-2">
              <div className="text-[14px] font-[400] leading-[18px] text-[#CDD0D5] mb-4">
                {formatSummaryContent(post.content)}
              </div>

              {post.hashtags && (
                <div className="text-sm sm:text-base lg:text-lg text-[#CDD0D5] mb-4">
                  {post.hashtags.map((hashtag, index) => (
                    <span key={index} className="text-[#5BF5FF]">
                      {`#${hashtag} `}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="pb-4">
              <div className="mt-4 flex gap-4">
                <FunctionButton
                  icon={share}
                  iconClassName="w-[18px]"
                  onClick={async () => {
                    const text = post.content;
                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: "Social Post",
                          text,
                        });
                      } catch (err) {
                        await navigator.clipboard.writeText(text);
                      }
                    } else {
                      await navigator.clipboard.writeText(text);
                    }
                  }}
                  className="border py-1 px-2 text-[#5BF5FF] text-[12px] border-[#5BF5FF] rounded-[6px]"
                  buttonName="Share"
                />
                <FunctionButton
                  icon={copy}
                  iconClassName="w-[18px]"
                  onClick={async () => {
                    const text = post.content;
                    await navigator.clipboard.writeText(text);
                  }}
                  className="border py-1 px-2 flex justify-center text-[12px] items-center text-[#5BF5FF] border-[#5BF5FF] rounded-[6px]"
                  buttonName="Copy"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Twitter;
