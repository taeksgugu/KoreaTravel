"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { DurationType, DrivingType, GroupType, KoreanLevel } from "@/lib/data/types";

const QUIZ_STORAGE_KEY = "koreatravel_quiz";
const DETAIL_STORAGE_KEY = "koreatravel_details";

export default function DetailsPage() {
  const router = useRouter();
  const params = useParams<{ locale: string }>();
  const locale = params.locale;
  const [group, setGroup] = useState<GroupType>("FRIENDS");
  const [driving, setDriving] = useState<DrivingType>("NO");
  const [koreanLevel, setKoreanLevel] = useState<KoreanLevel>("NONE");
  const [duration, setDuration] = useState<DurationType>("5_6");
  const [budget, setBudget] = useState("MID_RANGE");

  useEffect(() => {
    const quiz = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!quiz) {
      router.replace(`/${locale}/quiz`);
    }
  }, [locale, router]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    localStorage.setItem(
      DETAIL_STORAGE_KEY,
      JSON.stringify({ group, driving, koreanLevel, duration, budget })
    );

    router.push(`/${locale}/result`);
  };

  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
      <h1 className="mb-6 text-2xl font-semibold text-slate-900">Travel Details</h1>
      <form className="space-y-5" onSubmit={onSubmit}>
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Who are you traveling with?</span>
          <select value={group} onChange={(e) => setGroup(e.target.value as GroupType)} className="w-full rounded-xl border border-slate-300 p-3">
            <option value="FRIENDS">Friends</option>
            <option value="FAMILY">Family</option>
            <option value="SOLO">Solo</option>
            <option value="COUPLE">Couple</option>
            <option value="GROUP">Group Tour</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Will you rent a car?</span>
          <select value={driving} onChange={(e) => setDriving(e.target.value as DrivingType)} className="w-full rounded-xl border border-slate-300 p-3">
            <option value="NO">No</option>
            <option value="YES">Yes</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Korean language level</span>
          <select value={koreanLevel} onChange={(e) => setKoreanLevel(e.target.value as KoreanLevel)} className="w-full rounded-xl border border-slate-300 p-3">
            <option value="NONE">None</option>
            <option value="BASIC">Basic</option>
            <option value="CONVERSATIONAL">Conversational</option>
            <option value="FLUENT">Fluent</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Trip duration</span>
          <select value={duration} onChange={(e) => setDuration(e.target.value as DurationType)} className="w-full rounded-xl border border-slate-300 p-3">
            <option value="3_4">3-4 Days</option>
            <option value="5_6">5-6 Days</option>
            <option value="7_PLUS">7+ Days</option>
          </select>
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Budget style</span>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full rounded-xl border border-slate-300 p-3">
            <option value="BUDGET">Budget</option>
            <option value="MID_RANGE">Mid-range</option>
            <option value="PREMIUM">Premium</option>
          </select>
        </label>

        <div className="pt-2 text-right">
          <button type="submit" className="rounded-full bg-emerald-700 px-5 py-2.5 font-medium text-white hover:bg-emerald-800">
            See My Top 3 Cities
          </button>
        </div>
      </form>
    </section>
  );
}
