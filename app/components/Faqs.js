import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../styles/page.module.scss';
import Plus from '../../public/assets/plus.svg';
import Minus from '../../public/assets/minus.svg'

import {motion, AnimatePresence, useMotionValueEvent, useAnimation, inView} from 'framer-motion'


const Faqs = ({title, text}) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <span className={styles.faqsContentItem} onClick={()=>setIsActive(!isActive)}>
            <span className={styles.faqsContentItemWrapper}>
                <p className={styles.faqsItemTitle}>
                    {title}
                </p>
                <span>
                    {(!isActive)?
                    <Image src={Plus} alt={"dropdown"} objectFit={'cover'} style={{userSelect:"none"}}/>:
                    <Image src={Minus} alt={"dropdown"} objectFit={'cover'} style={{userSelect:"none"}}/>
                    }
                </span>
            </span>
            {
            <motion.div 
                initial={{height:0}}
                transition= {{
                    type: "spring",
                    stiffness:220,
                    damping:30,
                    duration:.05
                }}
                animate={{height:(isActive)?"auto":0}}
                exit={{height:0}}>
                <div style={{paddingBottom:"1.5rem"}}>
                    <p className={styles.faqsSubtext} style={{textAlign:"left"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                    </p>
                </div>
                
            </motion.div>
            }
        </span>
    );
}

export default Faqs;
