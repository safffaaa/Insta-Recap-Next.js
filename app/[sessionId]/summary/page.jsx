'use client';

import Menu from "../../../components/menu/Menu";
import {
  copy,
  overviewBlue,
  overviewList,
  share,
  summaryBlack,
} from "../../../app/assets";
import MenuButton from "../../../components/share-copy-download-button/MenuButton";
import Link from "next/link";
import { useParams } from "next/navigation";
import formatSummaryContent from "../../../Markdown";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  selectCurrentAudio,
  setCurrentAudio,
  selectCurrentSession,
  setCurrentSession as setReduxCurrentSession,
  setError,
} from "../../../store/sessionsSlice";
import { useEffect, useState } from "react";
import LoadingState from "../../../components/LoadingState";
import FunctionButton from '../../../components/fuctionButton';
import Image from "next/image";

const Summary = () => {
  const dispatch = useDispatch();
  const currentSession = useSelector(selectCurrentSession);
  const currentAudio = useSelector(selectCurrentAudio);
  const [focus, setFocus] = useState(false);

  const params = useParams();
  const sessionId = params.sessionId;

  if (!currentAudio) {
    return (
      <LoadingState
        title="Loading Summary"
        subtitle="We're finding your session summary"
      />
    );
  }

  const Overunderline = () => {
    setFocus(true);
  };
  return (
    <div className="bg-[#10131A] text-white p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="">
        {/* Header Card */}
        <Menu focus={focus} />

        {/* Section 3: Overview */}
        <div className="flex items-center justify-between pb-6">
          <div className="flex items-center gap-1">
            <Image
              src={overviewList}
              alt="overviewList"
              className="w-5 h-5 sm:w-8 sm:h-8"
            />
            <h2 className="font-inter font-medium text-[14px]  text-[#FFFFFF]">
              Overview
            </h2>
          </div>
          <div className="flex py-1 rounded-[8px] px-1  justify-center bg-[#222534] items-center">
            {/* Overview Link */}
            <Link href={`/${sessionId}/overview`}>
              <div className="flex items-center justify-between border-0 text-[#5BF5FF]  px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                <Image
                  src={overviewBlue}
                  alt="Overview"
                  className="w-[13.5px] h-[15px] mr-2"
                />
                <button className="text-[13px] ">Overview</button>
              </div>
            </Link>
            {/* Summary Link */}
            <Link href={`/${sessionId}/summary`}>
              <div className="flex  items-center border-0 bg-[#5BF5FF] text-[#222534] px-2 sm:px-4 py-1 sm:py-2 rounded-lg">
                <Image  
                  src={summaryBlack}
                  alt="Summary"
                  className="w-[13.5px] h-[15px] mr-2"
                />
                <button
                  onClick={Overunderline}
                  className="text-[13px] "
                >
                  Summary
                </button>
              </div>
            </Link>
          </div>
        </div>

        {/* Section 4: Content */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-[#282C3A] rounded-lg p-4 sm:p-5 md:p-6 lg:p-8">
            {/* Title */}
            <h2 className="text-white font-inter font-[500] mb-4 text-[16px]">
              Session Summary
            </h2>

            {/* Content */}
            <div className=" space-y-4 text-xs xs:text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl">
              <p className="leading-[18px] text-[#CDD0D5] font-inter text-[14px] font-[400]">
              {formatSummaryContent(currentAudio.summaries.detailedSummary)}
              </p>
            </div>
            <div className="mt-4 flex gap-4">
              <FunctionButton
                icon={share}
                iconClassName="w-[18px]"
                onClick={async () => {
                  const text = currentAudio.summaries.detailedSummary;
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: "Session Summary",
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
                  const text = currentAudio.summaries.detailedSummary;
                  await navigator.clipboard.writeText(text);
                }}
                className="border py-1 px-2 flex justify-center text-[12px] items-center text-[#5BF5FF] border-[#5BF5FF] rounded-[6px]"
                buttonName="Copy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
