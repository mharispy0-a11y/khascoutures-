"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function UTMCapture() {
  const params = useSearchParams();

  useEffect(() => {
    const source = params.get("utm_source");
    const campaign = params.get("utm_campaign");
    if (source) localStorage.setItem("utm_source", source);
    if (campaign) localStorage.setItem("utm_campaign", campaign);
  }, [params]);

  return null;
}
