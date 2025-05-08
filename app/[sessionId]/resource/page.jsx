'use client';

import {
    copy,
    filesgreen,
    mentionedblack,
    rescontimg,
    resgreen,
    share,
  } from "../../../app/assets";
  import Menu from "../../../components/menu/Menu";
  import MenuButton from "../../../components/share-copy-download-button/MenuButton";
  import Link from 'next/link';
  import { useParams } from 'next/navigation';
  import formatSummaryContent from "../../../Markdown";
  import Image from 'next/image';
  import FunctionButton from '../../../components/fuctionButton';
  
  const ResourceList = () => {
    const params = useParams();
    const sessionId = params.sessionId;
  
    // Mock data to maintain exact same design
    const mockData = {
      resources: [
        {
          _id: "1",
          category: "Books & Articles",
          items: [
            {
              _id: "1-1",
              title: "The Future of AI",
              description: "A comprehensive guide to understanding artificial intelligence and its impact on various industries. This resource covers key concepts, practical applications, and future trends in AI development."
            },
            {
              _id: "1-2",
              title: "Machine Learning Fundamentals",
              description: "An in-depth exploration of machine learning principles, algorithms, and best practices. Perfect for both beginners and experienced practitioners looking to enhance their knowledge."
            }
          ]
        },
        {
          _id: "2",
          category: "Tools & Software",
          items: [
            {
              _id: "2-1",
              title: "Data Analysis Toolkit",
              description: "A collection of essential tools for data analysis and visualization. Includes software recommendations, tutorials, and best practices for effective data handling."
            },
            {
              _id: "2-2",
              title: "Development Resources",
              description: "Comprehensive set of development tools and resources for building AI applications. Features coding frameworks, libraries, and development environments."
            }
          ]
        }
      ]
    };
  
    return (
      <div className="bg-[#10131A] min-h-screen text-white p-4 sm:p-6 font-inter lg:p-8">
        <Menu />
  
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
          <div className="flex  bg-[#222534] rounded-[8px] py-1 px-1 items-center gap-2">
            {/* Mentioned Link */}
            <Link href={`/${sessionId}/resource`}>
              <div className="flex items-center gap-2 border-0 bg-[#5BF5FF] text-[#222534] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                <Image
                  src={mentionedblack}
                  alt="Mentioned"
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                <button className="text-[12px] sm:text-[14px]">Mentioned</button>
              </div>
            </Link>
            {/* Files Link */}
            <Link href={`/${sessionId}/resource/files`}>
              <div className="flex items-center gap-2 border-0  text-[#5BF5FF] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                <Image
                  src={filesgreen}
                  alt="Files"
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
                <button className="text-[12px] sm:text-[14px]">Files</button>
              </div>
            </Link>
          </div>
        </div>
  
        {mockData.resources.map((resourceCategory) => (
          <div
            key={resourceCategory._id}
            className="px-4 bg-[#282C3A] text-[#CDD0D5] font-inter text-[14px] rounded-lg py- mb-6"
          >
            {/* Header */}
            <div className="flex items-center gap-2 text-cyan-400 py-4">
              <Image
                src={rescontimg}
                className="w-3 h-3 xs:w-5 xs:h-5 sm:w-6 sm:h-6"
                alt={resourceCategory.category}
              />
              <h1 className="font-inter text-white text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-medium">
                {resourceCategory.category}
              </h1>
            </div>
  
            {/* Resource Cards */}
            <div className="py-2">
              {resourceCategory.items.map((item, index) => (
                <div
                  key={item._id}
                  className="bg-gray-800 rounded-lg p-4 xs:p-4 sm:p-5 md:p-6 lg:p-7 mb-4"
                >
                  {/* Resource Title */}
                  <h2 className="text-white  text-[14px] font-[400] font-inter  pb-4">
                    {index + 1}. {item.title}
                  </h2>
  
                  {/* Resource Content */}
                  <p className="text-sm sm:text-base lg:text-lg text-[#CDD0D5] leading-relaxed">
                    {formatSummaryContent(item.description)}
                  </p>
  
                  {/* Action Buttons */}
                  <div className="mt-4 flex gap-4">
                    <FunctionButton
                      icon={share}
                      iconClassName="w-[18px]"
                      onClick={async () => {
                        const text = item.title + ":\n" + item.description;
                        if (navigator.share) {
                          try {
                            await navigator.share({
                              title: "Resource",
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
                        const text = item.title + ":\n" + item.description;
                        await navigator.clipboard.writeText(text);
                      }}
                      className="border py-1 px-2 flex justify-center text-[12px] items-center text-[#5BF5FF] border-[#5BF5FF] rounded-[6px]"
                      buttonName="Copy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default ResourceList;
  