import { useCallback, useEffect, useState } from "react";
import Milk from "../components/Milk";
import styles from "./index.module.css";

interface milkProp {
  id: number;
  image: 1 | 2 | 3;
}

export default function Home() {
  const [milks, setMilks] = useState<milkProp[]>([
    { id: 1, image: 1 },
    { id: 2, image: 2 },
  ]);

  const removeChild = useCallback((id: number) => {
    setMilks((o) => o.filter((el) => el.id !== id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // @ts-ignore
      let randomImage: 1 | 2 | 3 = 1 + Math.floor(Math.random() / 0.3333);
      setMilks((o) => [...o, { id: Math.random(), image: randomImage }]);
    }, 2 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.scrollBox}></div>
      <div className={styles.section1}>
        <div className={styles.main}>
          <div className={styles.left}>
            <span>soy</span>
          </div>
          <div className={styles.right}>
            <span>usz</span>
          </div>
        </div>
        <div>
          {milks.map((milk) => (
            <Milk
              key={milk.id}
              image={milk.image}
              onRest={() => removeChild(milk.id)}
            />
          ))}
        </div>
      </div>
      <div className={styles.section2}>ee</div>
    </div>
  );
}
