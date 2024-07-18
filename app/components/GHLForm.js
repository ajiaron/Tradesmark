import React, {useState, useEffect, useRef, useCallback} from 'react'
import styles from "../../styles/page.module.scss";
import {motion, AnimatePresence, useAnimation} from 'framer-motion'
export default function Form({width}) {
    const formRef = useRef(null)
    const [formWidth, setFormWidth] = useState(0)
    const [loading, setLoading] = useState(false)
    useEffect(()=> {
        if (width < 769) {
            setFormWidth((width*.9))
        } else if (width < 1025) {
            setFormWidth((width*.8))
        } else {
            setFormWidth((width*.5486))
        }
    }, [width])
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://link.msgsndr.com/js/form_embed.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }, []);

    
    return (
        <div className={styles.formContent}>
          
            <iframe
                src="https://api.leadconnectorhq.com/widget/form/UmTXeJchXL4EbbZit6wm"
                style={{width:`${formWidth*.7336}px`,height:"100%",border:"none",borderRadius:"3px"}}
                id="inline-UmTXeJchXL4EbbZit6wm" 
                data-layout="{'id':'INLINE'}"
                data-trigger-type="alwaysShow"
                data-trigger-value=""
                data-activation-type="alwaysActivated"
                data-activation-value=""
                data-deactivation-type="neverDeactivate"
                data-deactivation-value=""
                data-form-name="Form 1"
                data-height="758"
                data-layout-iframe-id="inline-UmTXeJchXL4EbbZit6wm"
                data-form-id="UmTXeJchXL4EbbZit6wm"
                title="Form 1"
                className={styles.formContentWrapperv2}
            >
            </iframe>
          
        </div>
    )
}
