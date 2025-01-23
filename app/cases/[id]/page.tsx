"use client";

import { useParams } from "next/navigation";
import CaseDetailView from "@/components/CaseDetailView";
import { useState, useEffect } from "react";
import { fetchCaseById } from "@/lib/api/cases";

interface CaseDetails {
  caseId: string;
  title: string;
  clientName: string;
  contactInfo: {
    address: string;
    email: string;
    phone: string;
  };
  caseType: string;
  description: string;
  assignedLawyer: string;
  assignedJudge: string;
  section: string;
  courtAddress: string;
  caseFileDate: string;
  notes: { content: string; date: string }[];
  documents: { name: string; url: string }[];
}

export default function CaseDetailPage() {
  const params = useParams();
  const [caseDetails, setCaseDetails] = useState<CaseDetails | null>(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      if (!params?.id || typeof params.id !== "string") {
        console.error("Invalid or missing case ID");
        return;
      }

      try {
        const data = await fetchCaseById(params.id);
        setCaseDetails(data);
      } catch (error) {
        console.error("Error fetching case details:", error);
      }
    };

    fetchCaseDetails();
  }, [params?.id]);

  if (!caseDetails) return <p>Loading...</p>;

  return <CaseDetailView caseId={params.id as string} />;
}
