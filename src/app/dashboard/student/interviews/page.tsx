"use client";

import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  UserCheck,
  CheckCircle2,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { formatDateTime } from "@/lib/utils";

export default function StudentInterviewsPage() {
  const { interviews, currentStudent } = usePlacementStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
          Interview Schedules & Assessments
        </h1>
        <p className="text-xs text-muted-sage mt-0.5">
          Active technical rounds, coding simulations, and leadership interviews
        </p>
      </div>

      {interviews.length === 0 ? (
        <div className="p-12 text-center bg-white border border-stone-border rounded-[8px]">
          <Calendar className="w-8 h-8 text-muted-sage mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-primary-ink">No interviews scheduled</h3>
          <p className="text-xs text-muted-sage mt-1">
            When recruiters shortlist you from assessment rounds, interview time-slots will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviews.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-stone-border rounded-[8px] p-5 shadow-2xs space-y-4 hover:border-muted-sage transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-sage">
                    {item.companyName}
                  </span>
                  <h3 className="text-base font-bold text-primary-ink font-sans mt-0.5">
                    {item.roundName}
                  </h3>
                  <p className="text-xs text-ink-muted">{item.jobTitle}</p>
                </div>

                <span className="px-2.5 py-1 text-xs font-semibold rounded-[4px] bg-forest-subtle text-deep-forest border border-forest-border flex items-center gap-1.5">
                  {item.mode === "Virtual" ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                  <span>{item.mode}</span>
                </span>
              </div>

              <div className="p-3 bg-ivory-light border border-stone-border/80 rounded-[6px] space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-ink-muted">
                  <Clock className="w-4 h-4 text-deep-forest shrink-0" />
                  <span className="font-semibold text-primary-ink">{formatDateTime(item.scheduledAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <UserCheck className="w-4 h-4 text-deep-forest shrink-0" />
                  <span>Interviewer: <strong>{item.interviewerName}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-ink-muted">
                  <MapPin className="w-4 h-4 text-deep-forest shrink-0" />
                  <span>Venue: {item.locationOrLink}</span>
                </div>
              </div>

              {item.locationOrLink.startsWith("http") && (
                <div className="pt-2">
                  <a
                    href={item.locationOrLink}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 bg-deep-forest text-warm-ivory text-xs font-semibold rounded-[5px] flex items-center justify-center gap-1.5 hover:bg-forest-hover transition-colors"
                  >
                    <span>Launch Virtual Interview Room</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
