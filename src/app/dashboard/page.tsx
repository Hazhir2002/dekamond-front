"use client";

import Spline from "@splinetool/react-spline";
import {
  AnalyzeBussinessDataForm,
  AnalyzeBussinessDataResult,
  TextAnimate,
} from "@/components";
import { BussinessDataProvider, useUser } from "@/context";

import styles from "./dashboard.module.scss";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <BussinessDataProvider>
      <div className={styles.dashboard}>
        <TextAnimate animate="blurIn" as="h1" className={styles.greeting}>
          {`Welcome to the Dashboard, ${user!.firstName}!`}
        </TextAnimate>
        <div className={styles.robot}>
          <Spline scene="https://prod.spline.design/pUU8-vvHOerByR6Q/scene.splinecode" />
        </div>
        <div className={styles.form}>
          <AnalyzeBussinessDataForm />
        </div>
        <div className={styles.result}>
          <AnalyzeBussinessDataResult />
        </div>
      </div>
    </BussinessDataProvider>
  );
}
