"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  NumberTicker,
  TextAnimate,
} from "@/components";
import styles from "./AnalyzeBussinessDataResult.module.scss";
import { useBussinessData } from "@/context";

export const AnalyzeBussinessDataResult = () => {
  const { bussinessData } = useBussinessData();

  return (
    <Card className={styles.card}>
      <CardHeader>
        <CardTitle className={styles.cardTitle}>
          Analyze bussiness data Result
        </CardTitle>
        <CardDescription className={styles.cardDescription}>
          After filling the form you will see the results here
        </CardDescription>
      </CardHeader>
      <CardContent>
        {bussinessData ? (
          <div className="flex flex-col justify-center items-center gap-10">
            <div className="flex gap-5 flex-col">
              <TextAnimate className="text-2xl font-bold">Profit</TextAnimate>
              <NumberTicker
                className="text-primary text-2xl font-bold text-center"
                value={bussinessData.profit}
              />
            </div>
            <div className="flex gap-5 justify-center items-center flex-col">
              {bussinessData.alerts.length != 0 ? (
                <>
                  <h3 className="text-2xl font-bold">Alerts</h3>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    {bussinessData.alerts.map((alert, index) => (
                      <p
                        key={index}
                        className="text-primary text-lg font-bold text-center"
                      >
                        {alert}
                      </p>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xl md:text-2xl font-bold">
                  No alerts for now
                </p>
              )}
            </div>
            <div className="flex flex-col gap-5 justify-center items-center">
              {bussinessData.recommendations.length != 0 ? (
                <>
                  <h3 className="text-2xl font-bold">Recommendations</h3>
                  <div className="flex flex-col gap-2 justify-center items-center">
                    {bussinessData.recommendations.map(
                      (recommendation, index) => (
                        <p
                          key={index}
                          className="text-primary text-lg font-bold text-center"
                        >
                          {recommendation}
                        </p>
                      )
                    )}
                  </div>
                </>
              ) : (
                <p className="text-xl md:text-2xl font-bold">
                  No recommendations for now
                </p>
              )}
            </div>
          </div>
        ) : (
          <h3 className="text-center">
            Please fill out the form first then submit
          </h3>
        )}
      </CardContent>
    </Card>
  );
};
