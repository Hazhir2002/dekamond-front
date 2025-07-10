import styles from "./auth.module.scss";
import { LoginForm } from "@/components";
import Spline from "@splinetool/react-spline/next";

export default function AuthPage() {
  return (
    <div className={styles.container}>
      <div className={styles.pulse1} />
      <div className={styles.pulse2} />
      <div className={styles.formContainer}>
        <div className={styles.robotContainer}>
          <Spline scene="https://prod.spline.design/Q4EBMAb9inNplFBl/scene.splinecode" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
