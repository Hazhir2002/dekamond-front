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
import { useState } from "react";
import React from "react";
import { useUser } from "@/context";
import { login } from "@/lib";
import { useRouter } from "next/navigation";

import styles from "./LoginForm.module.scss";

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
  phoneNumber: "",
};

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState(INITIALDATA);
  const [errors, setErrors] = useState<{
    phoneNumber?: string;
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useUser();
  const router = useRouter();

  const phoneNumberInputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (val.length !== 11) {
        setErrors({
          phoneNumber: "Your phonenumber should be 11 digits",
        });
      } else {
        setErrors({});
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phoneNumber.length !== 11) {
      setErrors({
        phoneNumber: "Your phonenumber should be 11 digits",
      });
      return;
    }
    setIsLoading(true);

    try {
      const user = await login();
      setUser({ firstName: user.results[0].name.first });
      router.push("/dashboard");
    } catch {
      setErrors({ phoneNumber: "Your phonenumber is incorrect" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={formVariants}>
      <Card className={styles.card}>
        <CardHeader>
          <motion.div variants={itemVariants}>
            <CardTitle className={styles.cardTitle}>Login</CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className={styles.cardDescription}>
              Please enter your credintials to access the ai agent
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
            <motion.div
              variants={itemVariants}
              className={styles.phoneNumberContainer}
            >
              <label htmlFor="email">Phone Number</label>
              <motion.div
                whileFocus={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="09933380344"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className={`w-full pr-10 ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                  dir="ltr"
                  required
                  aria-invalid={!!errors.phoneNumber}
                  aria-describedby="phoneNumber-error"
                  ref={phoneNumberInputRef}
                  tabIndex={1}
                />
              </motion.div>
              {errors.phoneNumber && (
                <div id="phoneNumber-error" className={styles.error}>
                  {errors.phoneNumber}
                </div>
              )}
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                type="submit"
                className={styles.button}
                disabled={isLoading}
                tabIndex={4}
                aria-busy={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
