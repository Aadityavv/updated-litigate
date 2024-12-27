"use client";

import { useParams } from "next/navigation";
import CaseDetailView from "@/components/CaseDetailView";
import { useState, useEffect } from "react";

export default function CaseDetailPage() {
    const params = useParams();
    const [caseDetails, setCaseDetails] = useState(null);

    useEffect(() => {
        const fetchCaseDetails = async () => {
            const response = await fetch(`/api/cases/${params?.id}`);
            const data = await response.json();
            setCaseDetails(data);
        };
        fetchCaseDetails();
    }, [params?.id]);

    if (!caseDetails) return <p>Loading...</p>;

    return <CaseDetailView caseDetails={caseDetails} />;
}
