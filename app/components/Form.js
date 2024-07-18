import React, {useState, useEffect, useRef, useCallback} from 'react'
import styles from "../../styles/page.module.scss";
import {motion, AnimatePresence, useAnimation} from 'framer-motion'
export default function Form({width}) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        businessName: '',
        phoneNumber: '',
        email: '',
    });
    const [formError, setFormError] = useState({
        fullName: '',
        businessName: '',
        phoneNumber: '',
        email: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false)
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        setLoading(true)
        const { fullName, businessName, phoneNumber, email } = formData;
        if (!fullName || !businessName || !phoneNumber || !email) {
        setFormError({
            ...formError,
            fullName:(!fullName)?"missing":"",
            businessName:(!businessName)?"missing":"",
            phoneNumber:(!phoneNumber)?"missing":"",
            email:(!email)?"missing":""
        });
        return;
        } 
        e.preventDefault();
        const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result) {
        setFormSubmitted(true)
        setLoading(false)
        }
    };
    return (
        <div className={styles.formContent}>

        <div className={styles.formContentWrapper}>
        <div className={styles.formHeaderContainer}>
            <p className={styles.formHeaderText}>
            Get Started Today
            </p>
            <p className={styles.formSubtext}>
            Allow your company to grow by saving you time on all things marketing - we’ll save you time so you can focus on your business.
            </p>
        </div>
        <div className={styles.formInputContainer}>
            <motion.div style={{width:"100%", gap:"15px", display:"flex", flexDirection:"column"}}
            animate={{opacity:(formSubmitted)?0:1}}
            transition={{
            duration:.2
            }}>
            <div className={styles.formInputWrapper}>
                <p className={styles.formInputFieldHeader} style={{color:(formError.fullname==="missing")?"#FF0000":""}}>
                Full Name
                </p>
                <input className={styles.formInputField}
                name="fullName"
                type="text"
                onChange={handleChange}
                value={formData.fullName}
                placeholder={'Full Name'}>
                </input>
            </div>
            <div className={styles.formInputWrapper}>
                <p className={styles.formInputFieldHeader} style={{color:(formError.businessName==="missing")?"#FF0000":""}}>
                Business Name
                </p>
                <input className={styles.formInputField}
                name="businessName"
                type="text"
                onChange={handleChange}
                value={formData.businessName}
                placeholder={'Business Name'}>
                </input>
            </div>
            <div className={styles.formInputWrapper}>
                <p className={styles.formInputFieldHeader} style={{color:(formError.phoneNumber==="missing")?"#FF0000":""}}>
                Phone Number
                </p>
                <input className={styles.formInputField}
                value={formData.phoneNumber}
                onChange={handleChange}
                type="tel"
                name="phoneNumber"
                placeholder={'+1 (123) 456 7890'}>
                </input>
            </div>
            <div className={styles.formInputWrapper}>
                <p className={styles.formInputFieldHeader} style={{color:(formError.email==="missing")?"#FF0000":""}}>
                Email
                </p>
                <input className={styles.formInputField}
                name="email"
                type="email"
                onChange={handleChange}
                value={formData.email}
                placeholder={'name@email.com'}>
                </input>
            </div>
            </motion.div>
            {
            <AnimatePresence>
            {(formSubmitted)&&
            <motion.p className={styles.formHeaderText} 
            style={{color:"#666", textAlign:"center",position:"absolute", fontSize:"var(--text-larger)", fontWeight:"500"}}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{
                duration:.2,
                delay:.2
            }}>
                Thank you for{width <=390 && <br/>} your submission!
            </motion.p>}
            </AnimatePresence>
            }
        </div>
        <motion.span 
        animate={{opacity:(formSubmitted)?0:1}}
        style={{pointerEvents:(formSubmitted)?"none":"auto"}}
        className={styles.formInputButton} onClick={(e)=>handleSubmit(e)}>
            <p className={styles.buttonFormText}>
            {(loading)?'Please Wait...':'Apply Today'}
            </p>
        </motion.span>
        </div>
    </div>
    )
}
