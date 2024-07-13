import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import styles from "../../styles/page.module.scss";

const LazyLoadedSVG = dynamic(() => import('../../public/assets/optimized-bvexterior.svg'), { ssr: false });

const LazySVGComponent = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      {inView ? <LazyLoadedSVG /> : <div>Loading...</div>}
    </div>
  );
};

const MilestoneComponent = ({width}) => {
  const [isChrome, setIsChrome] = useState(false);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isChromeBrowser = /Chrome/.test(userAgent) && /Google Inc/.test(navigator.vendor);
    const isSafariBrowser = /Safari/.test(userAgent) && /Apple Computer/.test(navigator.vendor);

    setIsChrome(isChromeBrowser);
    setIsSafari(isSafariBrowser);
  }, []);

  const renderImage = () => {
    if (isChrome) {
      return (
        <Image
          src="/assets/optimized-bvexterior.svg"
          alt="BVExterior site"
          layout="fill"
          objectFit={(width>1480)?'auto':'cover'}
          quality={100}
          style={{padding:"4px"}}
          className={styles.projectImage}
        />
      );
    } else if (isSafari) {
      return <LazySVGComponent />;
    }
    return <LazySVGComponent />;
  };

  return (
    <div>
      {renderImage()}
    </div>
  );
};

export default MilestoneComponent;
