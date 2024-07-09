import React, {useState, useEffect} from 'react';
import Image from 'next/image';
import styles from '../../styles/page.module.scss';
import Plus from '../../public/assets/plus.svg';
import Minus from '../../public/assets/minus.svg'

import {motion, AnimatePresence, useMotionValueEvent, useAnimation, inView} from 'framer-motion'


const Faqs = ({title, info}) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <span className={styles.faqsContentItem} onClick={()=>setIsActive(!isActive)}>
            <span className={styles.faqsContentItemWrapper}>
                <p className={styles.faqsItemTitle}>
                    {title}
                </p>
                <span>
                    {(!isActive)?
                    <Plus style={{userSelect:"none"}}/>:
                    <Minus style={{userSelect:"none"}}/>
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
                        {info}
                    </p>
                </div>
                
            </motion.div>
            }
        </span>
    );
}

export default Faqs;
