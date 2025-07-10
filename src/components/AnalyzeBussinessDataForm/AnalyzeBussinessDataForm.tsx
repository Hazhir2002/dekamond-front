"use client";

import { motion } from "framer-motion";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
} from "@/components";

import styles from "./AnalyzeBussinessDataForm.module.scss";
import { useState } from "react";
import { useBussinessData } from "@/context";
import React from "react";
import { analyzeBusinessData } from "@/lib";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const INITIALDATA = {
  yesterday_revenue: 0,
  yesterday_cost: 0,
  yesterday_customer: 0,
  today_revenue: 0,
  today_cost: 0,
  today_customer: 0,
};

export const AnalyzeBussinessDataForm = () => {
  const [formData, setFormData] = useState(INITIALDATA);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setBussinessData } = useBussinessData();

  const phoneNumberInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const bussinessData = await analyzeBusinessData(formData);
      console.log("bussinessData: ", bussinessData);
      setBussinessData(bussinessData);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={formVariants}>
      <Card className={styles.card}>
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className={styles.cardTitle}>
              Analyze bussiness data
            </CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className={styles.cardDescription}>
              Please enter your bussiness data so the agent can analyze it
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className={styles.form}
            autoComplete="on"
            aria-label="Login"
            noValidate
          >
            <div className="flex flex-col grid-cols-1 gap-5">
              <h3 className="mb-3 font-bold">Yesterdays data</h3>
              <motion.div
                variants={itemVariants}
                className={styles.phoneNumberContainer}
              >
                <label htmlFor="yesterday_revenue">Revenue</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Input
                    id="yesterday_revenue"
                    name="yesterday_revenue"
                    type="number"
                    placeholder="1000"
                    value={formData.yesterday_revenue}
                    onChange={handleChange}
                    className="w-full pr-10"
                    dir="ltr"
                    required
                    aria-describedby="yesterday_revenue-error"
                    ref={phoneNumberInputRef}
                    tabIndex={1}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={styles.phoneNumberContainer}
              >
                <label htmlFor="yesterday_cost">Cost</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Input
                    id="yesterday_cost"
                    name="yesterday_cost"
                    type="number"
                    placeholder="600"
                    value={formData.yesterday_cost}
                    onChange={handleChange}
                    className="w-full pr-10"
                    dir="ltr"
                    required
                    tabIndex={2}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={styles.phoneNumberContainer}
              >
                <label htmlFor="yesterday_customer">Customer</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Input
                    id="yesterday_customer"
                    name="yesterday_customer"
                    type="number"
                    placeholder="50"
                    value={formData.yesterday_customer}
                    onChange={handleChange}
                    className="w-full pr-10"
                    dir="ltr"
                    required
                    tabIndex={3}
                  />
                </motion.div>
              </motion.div>
            </div>
            <div className="flex flex-col grid-cols-2 gap-5">
              <h3 className="mb-3 font-bold">Todays data</h3>
              <motion.div
                variants={itemVariants}
                className={styles.phoneNumberContainer}
              >
                <label htmlFor="today_revenue">Revenue</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Input
                    id="today_revenue"
                    name="today_revenue"
                    type="number"
                    placeholder="1200"
                    value={formData.today_revenue}
                    onChange={handleChange}
                    className="w-full pr-10"
                    dir="ltr"
                    required
                    tabIndex={4}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={styles.phoneNumberContainer}
              >
                <label htmlFor="today_cost">Cost</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Input
                    id="today_cost"
                    name="today_cost"
                    type="number"
                    placeholder="800"
                    value={formData.today_cost}
                    onChange={handleChange}
                    className="w-full pr-10"
                    dir="ltr"
                    required
                    tabIndex={5}
                  />
                </motion.div>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className={styles.phoneNumberContainer}
              >
                <label htmlFor="today_customer">Customer</label>
                <motion.div
                  whileFocus={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="relative"
                >
                  <Input
                    id="today_customer"
                    name="today_customer"
                    type="number"
                    placeholder="40"
                    value={formData.today_customer}
                    onChange={handleChange}
                    className="w-full pr-10"
                    dir="ltr"
                    required
                    tabIndex={6}
                  />
                </motion.div>
              </motion.div>
            </div>

            {error != "" ? <p className="bg-red-400">{error}</p> : null}

            <motion.div
              variants={itemVariants}
              className="col-span-2 grid-rows-2"
            >
              <Button
                type="submit"
                className={styles.button}
                disabled={isLoading}
                tabIndex={4}
                aria-busy={isLoading}
              >
                {isLoading ? "Analyzing..." : "Submit"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
