'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import formatSummaryContent from "../../../Markdown";
import {
  copy,
  share,
  overviewBlack,
  overviewList,
  summaryBlue,
} from "../../assets";
import Link from "next/link";
import { useParams } from "next/navigation";

import Menu from "../../../components/menu/Menu";
import MenuButton from "../../../components/share-copy-download-button/MenuButton";
import {
  selectCurrentAudio,
  setCurrentAudio,
  setCurrentSession,
} from "../../../store/sessionsSlice";
import Image from "next/image";
import FunctionButton from '../../../components/fuctionButton';

const Overview = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const sessionId = params.sessionId;
  const currentAudio = useSelector(selectCurrentAudio);
  const [copyMessage, setCopyMessage] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Mock data for demonstration
    const mockData = {
      summaries: {
        shortSummary: "This is a sample short summary of the session.",
        highlights: "• First highlight point\n• Second highlight point\n• Third highlight point",
        oneLineDescription: "A brief description of the session"
      },
      keyTakeaways: [
        { explanation: "Key takeaway 1" },
        { explanation: "Key takeaway 2" },
        { explanation: "Key takeaway 3" }
      ],
      session: {
        id: sessionId,
        title: "Sample Session",
        speakers: [
          {
            name: "John Doe",
            designation: "Speaker",
            company: "Company Inc",
            photo: null
          }
        ],
        day: {
          createdAt: new Date().toISOString()
        },
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 3600000).toISOString()
      }
    };

    dispatch(setCurrentAudio(mockData));
    dispatch(setCurrentSession(mockData.session));
  }, [sessionId, dispatch]);

  if (!currentAudio) {
    return (
      <div className="bg-[#10131A] text-white p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl font-bold mb-4">Session Not Found</h2>
        <p className="text-gray-400 mb-4">
          The requested session could not be found.
        </p>
        <Link href="/session" className="text-[#5BF5FF] hover:underline">
          Return to Sessions
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#10131A] text-white p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="">
        <Menu  />
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-1">
            <Image
              src={overviewList}
              alt="overviewList"
              className="w-5 h-5 sm:w-8 sm:h-8"
            />
            <h2 className="font-inter font-medium text-[14px] sm:text-[16px] md:text-[18px] text-[#FFFFFF]">
              Overview
            </h2>
          </div>
          <div className="flex py-1  rounded-[8px] px-1  justify-center items-center w-44 bg-[#282C3A]">
            <Link href={`/${sessionId}/overview`}>
              <div className="flex p items-center justify-between border-0 bg-[#5BF5FF] text-[#222534] px-2  py-1 sm:py-2 rounded-lg">
                <Image
                  src={overviewBlack}
                  alt="Overview"
                  className="w-[13.5px] h-[15px] mr-2"
                />
                <button className="text-[13px] pr-1 ">Overview</button>
              </div>
            </Link>
            <Link href={`/${sessionId}/summary`}>
              <div className="flex items-center border-0 text-[#5BF5FF] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                <Image
                  src={summaryBlue}
                  alt="Summary"
                  className="w-[13.5px] h-[15px] mr-2"
                />
                <button className="text-[13px] ">Summary</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-[rgb(40,44,58)] p-4 rounded-lg">
        <p className="text-[14px] font-[400] leading-[18px] text-[#CDD0D5]">
          {formatSummaryContent(currentAudio.summaries.shortSummary)}
        </p>
        <div className="bg-[#222534] text-[#CDD0D5] p-4 mt-8 rounded-lg">
          <h3 className="text-[14px] sm:text-[16px] font-medium">
            Session Highlights
          </h3>
          <ul className="list-disc text-[14px] font-[400] leading-[24px] px-4 py-1 space-y-2">
            {currentAudio.summaries.highlights.split('\n').map((point, index) => (
              <li key={index} className="text-[#CDD0D5]">
                {point.replace('•', '').trim()}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-4">
            <FunctionButton
              icon={share}
              iconClassName="w-[18px]"
              onClick={async () => {
                const text = currentAudio.keyTakeaways
                  .map((takeaway) => takeaway.explanation)
                  .join("\n\n");
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: "Session Highlights",
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
              icon={isCopied ? null : copy}
              iconClassName="w-[18px]"
              onClick={async () => {
                const text = currentAudio.keyTakeaways
                  .map((takeaway) => takeaway.explanation)
                  .join("\n\n");
                await navigator.clipboard.writeText(text);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 2000);
              }}
              className="border py-1 px-2 flex justify-center text-[12px] items-center text-[#5BF5FF] border-[#5BF5FF] rounded-[6px]"
              buttonName={isCopied ? "Copied!" : "Copy"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
