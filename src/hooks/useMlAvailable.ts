"use client";

import { useEffect, useState } from "react";
import { checkMlHealth } from "@/services/MlService";

export const useMlAvailable = () => {
  const [mlAvailable, setMlAvailable] = useState<boolean | null>(null);

  useEffect(() => {
    checkMlHealth().then(setMlAvailable);
  }, []);

  return mlAvailable;
};
