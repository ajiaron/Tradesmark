'use client';
import Image from "next/image";
import React, {useState, useEffect, useRef, useCallback} from 'react'
import styles from "../styles/page.module.scss";
import {motion, AnimatePresence, useAnimation} from 'framer-motion'
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import Triangle from '../public/assets/triangle.svg'
import Scribble from '../public/assets/scribble.svg'
import Logo from '../public/assets/logo.svg'
import Faqs from "./components/Faqs";


export default function Home() {
  const [calenderActive, setCalenderActive] = useState(false)
  const [expandNavigation, setExpandNavigation] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [animation, setAnimation] = useState(false);
  const navbarRef = useRef(null);
  const mainRef = useRef(null);
  const titleRef = useRef(null);
  const navpaneRef = useRef(null);
  const contentRef = useRef(null);
  // #7A68FF
  const stokeColor = '#7A68FF';
  const scrollToId = (id, close) => {
    if (close) {
      setExpandNavigation(false)
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    setAnimation(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <main className={styles.main} ref={mainRef}>
      <div className={styles.contentContainer} ref={contentRef}>
          <div ref={navbarRef} className={styles.navbarContainer}>
            <div className={styles.navbarWrapper}>        
              <span className={styles.navbarTitleContainer} >
                <Image src={Logo} alt={"logo"} objectFit={'cover'}/>
                <a ref={titleRef} className={styles.navbarTitle} href="#home">TradesMark</a>
              </span>
              {(windowSize.width <= 1024)?
              <span onClick={()=>setExpandNavigation(!expandNavigation)}
              style={{ pointerEvents:"auto",height:"21.2px",alignSelf:"center",display:"inline-block", padding:0, margin:0, maxHeight:"fit-content"}}>
                {(!expandNavigation)?
                <FaBars color={"#2E2C2C"} className={styles.navIcon}/>:
                <FaTimes color={"#2E2C2C"} className={styles.navIcon}/>
                }
              </span>:
              <>
              <span className={styles.navbarSubtextContainer}>
                <span className={styles.navbarSubtext} onClick={()=>scrollToId('home')}>
                  Home
                </span>
                <span className={styles.navbarSubtext} onClick={()=>scrollToId('home')}>
                  Services
                </span>
                <span className={styles.navbarSubtext} onClick={()=>scrollToId('projects')}>
                  Pricing
                </span>
                <a className={styles.navbarSubtext} href="https://github.com/ajiaron">
                  Why TradesMark
                </a>
                <a className={styles.navbarSubtext} href="mailto:aaronjiang3942@gmail.com">
                  FAQ&apos;s
                </a>
             
              </span>
               <a className={styles.navbarSubtext} href="mailto:aaronjiang3942@gmail.com" style={{alignSelf:"center"}}>
                 Contact Us
               </a>
               </>
              }
            </div>
          </div>
          {(windowSize.width <= 1024)&&
            <AnimatePresence>
              {(expandNavigation)&&              
              <motion.div className={styles.navigationPane}
                initial={{ x: "100%", opacity:0 }}
                animate={{ x:"0%", opacity: 1}}
                exit= {{ x:"100%", 
                transition: { 
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                } 
              }}
                transition={{
                type: "spring",
                stiffness: 200,
                damping: 30,
              }}
              ref={navpaneRef}>
                <div className={styles.navigationPaneContent}>
                  <span className={styles.navbarSubtext} onClick={()=>scrollToId('home', true)}>
                    Home
                  </span>
                  <span className={styles.navbarSubtext} onClick={()=>scrollToId('projects', true)}>
                    Recent Projects
                  </span>
                  <a className={styles.navbarSubtext} href="https://github.com/ajiaron" onClick={()=> setExpandNavigation(false)}>
                    Github
                  </a>
                  <a className={styles.navbarSubtext} href="mailto:aaronjiang3942@gmail.com" onClick={()=> setExpandNavigation(false)}>
                    Contact
                  </a>
                </div>
              </motion.div>
              }
            </AnimatePresence>
            }
       
          <section className={styles.heroSectionContainer} id={'home'}>
            <div className={styles.heroTextContainer}>
              <div style={{display:"inline"}}>
                <p className={styles.heroHeaderText}>
                  The One-Stop Marketing Agency For All Things Trade
                </p>
              </div>
              <div className={styles.heroSubtextContainer}>
                <span style={{display:"inline"}}>
                  <p className={styles.heroSubtext}>
                  Work with Experienced Professionals that know how your business works - Obtain the marketing you need for leads to further expand your business.  
                  </p>
                </span>
              </div>
              <div className={styles.heroButtonContainer}>
                <a className={styles.heroContactButton} href="mailto:aaronjiang3942@gmail.com">
                  <p className={styles.buttonText}>
                    Get Started
                  </p>
                </a>
                <a className={styles.heroResumeButton} href="https://aaronresume.s3.us-west-1.amazonaws.com/Aaron_Jiang_Resume_June_2024.pdf">
                  <div className={styles.heroResumeButtonInner}>
                  <p className={styles.buttonText} style={{color:"#000"}}>
                    Learn More
                  </p>
                  </div>
                </a>
              </div>
            

            </div>

          </section>
          
      
          <section className={styles.frameworksSection}>
          <div className={styles.aboutSection}>
            <div className={styles.aboutContainer}>
              {(windowSize.width > 768) ?
              <>
              <div className={styles.aboutContextContainer}>
                <p className={styles.aboutHeader}>
                  About TradesMark
                </p>
                <p className={styles.aboutSubtext}>
                TradesMark is a full service marketing agency that focuses on scaling blue collar companies.<br/><br/>
                With web development, reputation management, all realms of marketing and paid advertisement, we have the responsibility of fully managing the aspect of the business that not all business owners are prepared for and/or knowledgeable on.
                </p>
              </div>
            </>:
              <>
                <p className={styles.aboutHeader}>
                  About TradesMark
                </p>
                <div className={styles.aboutContextContainer}>
                  <p className={styles.aboutSubtext}>
                  TradesMark is a full service marketing agency that focuses on scaling blue collar companies.<br/><br/>
                With web development, reputation management, all realms of marketing and paid advertisement, we have the responsibility of fully managing the aspect of the business that not all business owners are prepared for and/or knowledgeable on.
                  </p>
                </div>
              </>
              }
            </div>

          </div>
            <div className={styles.frameworksHeaderContainer}>
              <p className={[styles.toolsHeaderText, styles.titleTextAlt].join(' ')}>
                Our Mission
              </p>
           
            </div>
            <div className={styles.frameworksContentContainer}>
              <div className={styles.frameworksContentWrapper}>
                <div className={styles.frameworksImageWrapper}>
                  <div className={styles.frameworksImage}>
                
                  </div>
                </div>
                <p className={styles.frameworksHeader}>
                  Partnering For Growth
                </p>
                <p className={styles.frameworksSubtext}>
                We collaborate closely with blue-collar businesses, driving growth and amplifying your impact through effective marketing campaigns and initiatives.
                </p>
              </div>
              <div className={styles.frameworksContentWrapper}>
                <div className={styles.frameworksImageWrapper}>
                  <div className={styles.frameworksImage}>
                 
                  </div>
                </div>
                <p className={styles.frameworksHeader}>
                  Elavating Brands
                </p>
                <p className={styles.frameworksSubtext}>
                We empower blue-collar trades by elevating their brands through innovative marketing solutions, aiming to enhance visibility and reputation within their industries.
                </p>
              </div>
              <div className={styles.frameworksContentWrapper}>
                <div className={styles.frameworksImageWrapper}>
                  <div className={styles.frameworksImage}>
                 
                  </div>
                </div>
                <p className={styles.frameworksHeader}>
                 Delivering Impact
                </p>
                <p className={styles.frameworksSubtext}>
                We have a commitment towards driving forward tangible and meaningful results for blue-collar companies, ultimately contributing to your overall success and growth                </p>
              </div>
            </div>
          </section>
          <section className={styles.projectsSection}>
              <div className={styles.projectsHeaderContainer} id={'projects'}>
                <p className={styles.projectsHeaderText}>
                  Focus more on your business, let us take care of the rest
                </p>
                <p className={styles.headerSubtext} style={{width:"92.5%", fontFamily:"DM Sans"}}>
                  We’ll save you time - don’t worry about the hassle of marketing and branding  
                </p>
                <a className={styles.projectsButtonContainer} href="https://github.com/ajiaron">
                  <p className={styles.buttonText}>
                    Learn More
                  </p>
                </a>
              </div>
              <div className={styles.projectsContentContainer}>
                <div className={styles.projectsContentWrapper}>
                  <div className={styles.projectsContentImage}>
                    <div className={styles.projectsContentImageInner}>

                    </div>
                  </div>
                  <div className={styles.projectsContentImage}>
                    <div className={styles.projectsContentImageInner}>

                    </div>
                  </div>
                  <div className={styles.projectsContentImage}>
                    <div className={styles.projectsContentImageInner}>

                    </div>
                  </div>
                </div>
              </div>
          </section>
          <section className={styles.servicesSection}>
            <div className={styles.servicesHeaderContainer}>
              <p className={[styles.servicesHeaderText, styles.titleTextAlt].join(' ')}>
                Our Services
              </p>
              <p className={styles.headerSubtext} style={{textTransform:"none"}}>
                Experienced professionals you can trust.
              </p>
            </div>
            <div className={styles.servicesContainer}>
              <div className={styles.servicesRow}>
                <div className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>

                  </div>
                  <div className={styles.servicesTextContainer}>
                    <p className={styles.servicesTitle}>Email {'&'} SMS Marketing</p>
                    <p className={styles.servicesSubtext}>
                      SMS ensures instant reach and high open rates, while Email Marketing fosters relationships through personalized content, driving brand loyalty and measurable business growth.
                    </p>
                  </div>
                </div>
                <div className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>

                  </div>
                  <div className={styles.servicesTextContainer}>
                    <p className={styles.servicesTitle}>Reputation Management</p>
                    <p className={styles.servicesSubtext}>By proactively addressing feedback and enhancing online credibility, your business will strengthen customer trust, attract more clients, and improve overall brand perception.</p>
                  </div>
                </div>
                <div className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>

                  </div>
                  <div className={styles.servicesTextContainer}>
                    <p className={styles.servicesTitle}>Google Ads</p>
                    <p className={styles.servicesSubtext}>Our PPC Google advertising offers contractors immediate visibility on search engines, ensuring targeted exposure to potential clients actively searching for your services</p>
                  </div>
                </div>
              </div>
              <div className={styles.servicesRow}>
                <div className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>

                  </div>
                  <div className={styles.servicesTextContainer}>
                    <p className={styles.servicesTitle}>Search Engine Optimization</p>
                    <p className={styles.servicesSubtext}>Taking your custom website to the next level. Ranking your website above your competitors across all search engines, bringing in more projects.</p>
                  </div>
                </div>
                <div className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>

                  </div>
                  <div className={styles.servicesTextContainer}>
                    <p className={styles.servicesTitle}>Website Design Development</p>
                    <p className={styles.servicesSubtext}>Our professionally designed websites enhances visibility, attracts new clients, and boosts customer trust, ultimately driving rapid business growth for all contractors</p>
                  </div>
                </div>
                <div className={styles.servicesItem}>
                  <div className={styles.servicesIcon}>

                  </div>
                  <div className={styles.servicesTextContainer}>
                    <p className={styles.servicesTitle}>Graphic Design Content</p>
                    <p className={styles.servicesSubtext}>Our in-house graphic designs are ready to service your vision, ranging from flyers, social media posts, to logo revisions and branding packages.</p>
                  </div>
                </div>
              </div>

            </div>
          </section>
          <section className={styles.pricingSection}>
            <div className={styles.servicesHeaderContainer}>
              <p className={styles.servicesHeaderText}>
                Pricing
              </p>
              <p className={styles.headerSubtext} style={{textTransform:"none"}}>
                Lets get you started.
              </p>
            </div>
            <div className={styles.pricingContentContainer}>
              <div className={styles.pricingContentLeft}>
                <div className={styles.pricingLeftTop}>
                  <div className={styles.pricingLeftTopDot}/>
                  <p className={styles.pricingContentText} style={{fontWeight:"500",color:"#0a0a0a", fontSize:"12px"}}>
                      Available Now
                  </p>
                </div>
                <p className={styles.pricingLeftTitle}>
                    Join TradesMark.
                </p>
                <div style={{display:"flex", flexDirection:"column", gap:"1.25rem", paddingTop:".875rem"}}>
                  <div className={styles.pricingLeftTab}>
                    <p className={styles.pricingContentSubtitle} style={{fontSize:"15px"}}>
                      Book a 15-min appointment
                    </p>
                    <p className={styles.pricingContentText} style={{fontWeight:"300"}}>
                      Learn more about how TradesMark works.
                    </p>
                  </div>
                  <div className={styles.pricingLeftTab}>
                    <p className={styles.pricingContentSubtitle} style={{fontSize:"15px"}}>
                      Contact Us for Custom Pricing
                    </p>
                    <p className={styles.pricingContentText} style={{fontWeight:"300"}}>
                      Get information how we can help you find a price that works for you.
                    </p>
                  </div>
                </div>
          
              </div>
              <div className={styles.pricingContentRight}>
                <div className={styles.pricingContentRightTop}>
                  <p className={styles.pricingRightTitle}>
                    The TradesMark Package
                  </p>
                  <p className={styles.pricingRightSubtext}>
                    Contact For Pricing
                  </p>
                  <p className={styles.pricingContentText} style={{color:"#0a0a0a", paddingTop:".125rem"}}>
                    We tailor your package just for you.
                  </p>
                </div>
                <div className={styles.pricingContentRightBottom}>
                  <div className={styles.pricingContentRightContextContainer}>
                    <p className={styles.pricingContentSubtitle} style={{color:"#0a0a0a"}}>
                      What&apos;s Included?
                    </p>
                    <p className={styles.pricingContentText} style={{color:"#0a0a0a"}}>
                      We package together Email {'&'} SMS Marketing, Reputation Management, Google Ads, Search Engine Optimization, Web Design Development, and Graphic Design Content to create a formula to take your business to the next level.
                    </p>
                  </div>
                  <div className={styles.pricingContentRightContextContainer}>
                    <p className={styles.pricingContentSubtitle} style={{color:"#0a0a0a"}}>
                      Are there any financing options?
                    </p>
                    <p className={styles.pricingContentText} style={{color:"#0a0a0a"}}>
                      We are flexible - book a demo below or contact us at tradesmark@mail.com
                    </p>
                  </div>
                </div>
                <a className={styles.pricingButton} href="https://aaronresume.s3.us-west-1.amazonaws.com/Aaron_Jiang_Resume_June_2024.pdf">
                  <div className={styles.pricingButtonInner}>
                  <p className={styles.buttonText} style={{color:"#000", fontSize:"1.075rem"}}>
                    Book a Demo
                  </p>
                  </div>
                </a>
              </div>
            </div>
          </section>
          
          <section className={styles.whySection}>
            <div className={styles.servicesHeaderContainer}>
              <p className={[styles.servicesHeaderText, styles.titleTextAlt].join(' ')}>
                Why TradesMark?
              </p>
            </div>
            <div className={styles.whyContentContainer}>
              <div className={styles.whyRow}>
                <div className={styles.whyItem}>
                  <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                    <p className={styles.whyTitle}>
                      <span><Image src={Triangle} alt={"arrow"} objectFit={"cover"} style={{transform:"translateY(2.25px)"}}/></span>Catered to your needs
                    </p>
                    <p className={styles.whyContext}>
                      Unlike other marketing companies that have all these services with one price, we let you customize, pick and choose, and build a program that YOU need.
                    </p>
                  </div>
                </div>
                <div className={styles.whyItem}>
                  <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                    <p className={styles.whyTitle}>
                    <span><Image src={Triangle} alt={"arrow"} objectFit={"cover"} style={{transform:"translateY(2.25px)"}}/></span>We care about your growth
                    </p>
                    <p className={styles.whyContext}>
                      We like our partners to not only be limited, but winning. In each city we have <span style={{fontWeight:"650", color:"#000"}}>limited spots</span> for each trade to eliminate competition overload when it comes to Advertisement.                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.whyRow}>
                <div className={styles.whyItem}>
                  <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                    <p className={styles.whyTitle}>
                    <span><Image src={Triangle} alt={"arrow"} objectFit={"cover"} style={{transform:"translateY(2.25px)"}}/></span>We Prioritize You
                    </p>
                    <p className={styles.whyContext}>
                      With over half a decade of being in the advertisement space we prioritize taking your business where it&apos;s at, to the level you&apos;ve always dreamed of.                    </p>
                  </div>
                </div>
                <div className={styles.whyItem}>
                  <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                    <p className={styles.whyTitle}>
                    <span><Image src={Triangle} alt={"arrow"} objectFit={"cover"} style={{transform:"translateY(2.25px)"}}/></span>Partnership Method
                    </p>
                    <p className={styles.whyContext}>
                      With our advertising services, we don&apos;t make money unless you do, and we provide competitive pricing for branding services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.formSection}>
            <div className={styles.servicesHeaderContainer}>
              <p className={[styles.servicesHeaderText, styles.titleTextAlt].join(' ')}>
                Apply Now
              </p>
            </div>
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
                  <p className={styles.formHeaderText} style={{color:"#aaa"}}>
                    Form Integration Here
                  </p>
                </div>
                <span className={styles.formInputButton}>
                  <p className={styles.buttonFormText}>
                  Apply Today
                  </p>
                </span>
              </div>
            </div>
          </section>

          <section className={styles.valueSection}>  
              <div className={styles.valueContent}>
                <div className={styles.valueContentLeft}>
                  <p className={[styles.heroSubtext, styles.subtextAlt].join(' ')}>
                    ONE-STOP SHOP
                  </p>
                  <p className={styles.valueContentHeader}>
                    The Agency for Full Service Marketing, Web Design, and More!
                  </p>
                </div>
                <div className={styles.valueContentRight}>
                  <p className={styles.footerTitle} style={{fontWeight:"400"}}>
                    We offer comprehensive marketing services including content creation, social media management, website design, and ad campaigns.
                  </p>
                </div>
              </div>
          </section>

          <section className={styles.faqsSection}>
            <div className={styles.faqsHeaderContainer}>
              <span className={styles.scribbleContainer}><Image src={Scribble} alt={"scribble"} objectFit={"cover"}/></span>
              <p className={styles.faqsHeaderText}>
                Frequently Asked Questions
              </p>
              <p className={styles.headerSubtext} style={{textTransform:"none", paddingTop:".75rem",fontSize:"var(--text-smaller-v3)"}}>
                Everything you need to know about TradesMark.
              </p>
            </div>
            <div className={styles.faqsContent}>
              <Faqs title={"How fast can TradesMark begin with a client?"}/>
              <Faqs title={"What sets TradesMark apart against competitors?"}/>
              <Faqs title={"Does TradesMark offer consultation before purchase?"}/>
              <Faqs title={"How can TradesMark help with my small business?"}/>
              <Faqs title={"Is there a trial period?"}/>
              <Faqs title={"Are there any refunds?"}/>
            </div>
          </section>

          <section className={styles.footerSection}>
            <div className={styles.footerWrapper}>
              <div className={styles.footerTextContainer}>
                <div style={{width:"100%"}}>
                  <p className={styles.footerHeaderText}>
                    Ready to level up your Business?
                  </p>
                  <p className={[styles.footerHeaderText, styles.footerTextAlt].join(' ')}>
                    Let&apos;s get in touch!
                  </p>
                </div>
              </div>
              <div className={styles.footerButtonContainer}>
                <a className={styles.footerContactButton} href="mailto:aaronjiang3942@gmail.com">
                  <p className={styles.buttonText}>
                    Let&pos;s Get Started
                  </p>
                </a>
              
              </div>
            </div>
          </section>

          <div className={styles.footerNavContainer}>
            <div className={styles.navbarWrapper}>        
              <span className={styles.navbarTitleContainer} style={{paddingTop:"1px"}}>
                <Image src={Logo} alt={"logo"} objectFit={'cover'}/>
                <a className={styles.footerTitle} href="#home">TradesMark</a>
              </span>

              <span className={styles.navbarSubtextContainer}>
                <span className={styles.navbarSubtext} onClick={()=>scrollToId('home')}>
                  Home
                </span>
                <span className={styles.navbarSubtext} onClick={()=>scrollToId('home')}>
                  Services
                </span>
                <span className={styles.navbarSubtext} onClick={()=>scrollToId('projects')}>
                  Pricing
                </span>
                <a className={styles.navbarSubtext} href="https://github.com/ajiaron">
                  Why TradesMark
                </a>
                <a className={styles.navbarSubtext} href="mailto:aaronjiang3942@gmail.com">
                  FAQ&apos;s
                </a>
              </span>
               <a className={styles.navbarSubtext} href="mailto:aaronjiang3942@gmail.com" style={{alignSelf:"center"}}>
                 Contact Us
               </a>
            </div>
          </div>
      </div>
    </main>
  );
}
