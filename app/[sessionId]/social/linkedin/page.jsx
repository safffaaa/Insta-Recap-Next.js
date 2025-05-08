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

const LinkedIn = () => {
  const params = useParams();
  const sessionId = params.sessionId;

  // Mock data to maintain existing design
  const mockData = {
    linkedinPosts: [
      {
        content: "I'm excited to share key insights from our recent session on AI and Machine Learning. The discussion highlighted three crucial aspects: 1) The collaborative nature of future AI development 2) The importance of ethical considerations in AI implementation 3) The necessity of continuous learning in this rapidly evolving field. #AI #MachineLearning #Technology #Innovation",
        hashtags: ["AI", "MachineLearning", "Technology", "Innovation", "FutureOfWork"],
      },
      {
        content: "Today's session on digital transformation provided valuable perspectives on data-driven decision making. We explored how organizations can leverage data analytics to drive growth and innovation. Key takeaways include the importance of data quality, the role of AI in analytics, and strategies for successful digital transformation. #DigitalTransformation #DataAnalytics #BusinessStrategy #Innovation",
        hashtags: ["DigitalTransformation", "DataAnalytics", "BusinessStrategy", "Innovation", "Technology"],
      },
      {
        content: "Reflecting on an insightful session about professional development and continuous learning. We discussed strategies for breaking down complex concepts into actionable insights, the importance of staying current with industry trends, and methods for effective knowledge sharing. #ProfessionalDevelopment #Learning #Growth #Success #CareerDevelopment",
        hashtags: ["ProfessionalDevelopment", "Learning", "Growth", "Success", "CareerDevelopment"],
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
            <div className="flex items-center border-0 text-[#5BF5FF] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
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
            <div className="flex items-center justify-between border-0 bg-[#5BF5FF] text-[#222534] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
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
      {mockData.linkedinPosts.map((post, index) => (
        <div key={index} className="bg-[#222534] space-y-6 rounded-lg mb-4">
          <div className="px-4 bg-[#282C3A] text-[#CDD0D5] font-inter text-[14px] rounded-lg">
            <div className="py-4 flex items-center justify-between">
              <div className="flex gap-2">
                <Image src={linkedinblue} alt="" />
                <div className="text-[14px] sm:text-[16px] md:text-[18px]">
                  #Post {index + 1}
                </div>
              </div>
              <div className="text-[#CDD0D5]">
                {post.content.length}/3000
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
              <MenuButton
                img1={share}
                img1Text={"Share"}
                img2={copy}
                img2Text={"Copy"}
                copyText={post.content}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkedIn;
