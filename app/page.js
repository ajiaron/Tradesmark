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
import { FaArrowRight } from "react-icons/fa6";
import Hero from '../public/assets/hero.png'
import Bv from '../public/assets/bv3.png'
import Bvexterior from '../public/assets/bvexterior3.png'
import Steelnet from '../public/assets/steelnet3.png'
import Lightning from '../public/assets/lightning2.svg'
import Star from '../public/assets/star2.svg'
import Person from '../public/assets/person2.svg'
import { FaGoogle } from "react-icons/fa";
import { IoMailOpen } from "react-icons/io5";
import { TbHeartHandshake } from "react-icons/tb";
import { FaGear } from "react-icons/fa6";
import { FaPaintBrush } from "react-icons/fa";
import { FaRegWindowRestore } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaWrench } from "react-icons/fa";
import Form from "./components/Form"
import GHLForm from "./components/GHLForm"
import Head from 'next/head';


export default function Home() {
  const googletag = process.env.NEXT_PUBLIC_GOOGLE_TAG
  const scrollRef = useRef(null);
  const [scrollY, setScrollY] = useState(0)
  const [expandNavigation, setExpandNavigation] = useState(false)

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [carouselTop, setCarouselTop] = useState(0);
  const [animation, setAnimation] = useState(false);
  const navbarRef = useRef(null);
  const titleRef = useRef(null);
  const navpaneRef = useRef(null);
  const contentRef = useRef(null);
  const carouselRef = useRef(null);
    
  const scrollToId = (id) => {
    setExpandNavigation(false)
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      const rect = carouselRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      setCarouselTop(rect.top + scrollTop);
    }
  }, [windowSize, scrollY]);

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

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        setScrollY(scrollRef.current.scrollTop)
      }
    };
    const div = scrollRef.current;
    div.addEventListener('scroll', handleScroll);
    return () => div.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const navpane = navpaneRef.current;
    const main = scrollRef.current;
    const content = contentRef.current;
    const initialTop = 2.3 * 16;
    const shrinkTop = 0;
    const handleScroll = () => {
      if (main.scrollTop > initialTop) {
        if (expandNavigation) {
          navpane.style.top = `${64+shrinkTop}px`;
        }
      } else {
        if (expandNavigation) {
          navpane.style.top = `${64+initialTop - main.scrollTop}px`;
        }
      }
    };
    if (expandNavigation) {
      main.style.overflowY = 'hidden'
      content.style.overflowY = 'hidden'
      document.body.style.overflow = 'hidden';
      if (main.scrollTop > initialTop) {
        navpane.style.top = `${64+shrinkTop}px`;
      } else {
        navpane.style.top = `${64+initialTop - main.scrollTop}px`;
      }
    } else {
      document.body.style.overflowY = 'auto';
      main.style.overflowY = 'auto'
      content.style.overflowY = 'auto'
    }
    main.addEventListener('scroll', handleScroll);
    return () => {
      main.removeEventListener('scroll', handleScroll);
    };
  }, [windowSize.width, expandNavigation]);


  useEffect(() => {
    const canvasContainer = document.getElementById('canvasContainer');

    // Function to determine which image to load based on screen width
    const getBackgroundImage = () => {
      const width = window.innerWidth;
      if (width >= 1281) {
        return '/assets/canvas2.svg';
      } else if (width >= 1025) {
        return '/assets/canvasalt.svg';
      } else if (width >= 769) {
        return '/assets/canvasalt4.svg';
      } else if (width >= 678) {
        return '/assets/canvasalt5.svg'
      } else if (width >= 481) {
        return '/assets/canvasalt6.svg'
      } else if (width >= 391) {
        return '/assets/canvasalt7.svg'
      } else {
        return '/assets/canvasalt6.svg'
      }
    };

    const loadImage = (imageUrl) => {
      const bgImg = new window.Image();
      bgImg.src = imageUrl;

      bgImg.onload = () => {
        canvasContainer.style.backgroundImage = `url(${bgImg.src})`;
        setAnimation(true);
      };
    };

    // Initial load
    loadImage(getBackgroundImage());

    // Observer to detect when the element is in view
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observer.disconnect(); // Disconnect observer once element is in view
        }
      });
    });

    observer.observe(canvasContainer);

    // Event listener to handle window resize
    const handleResize = () => {
      setAnimation(false);
      loadImage(getBackgroundImage());
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the observer and event listener
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
        <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googletag}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              console.log('Google Analytics script loaded');
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); 
              gtag('config', ${googletag});
            `
          }}
        />
      </Head>
    <main className={styles.main} ref={scrollRef}> 

      <div className={[styles.canvasContainer, `${animation ? styles.animateCanvas : ''}`].join(' ')} id={'canvasContainer'}
      style={{backgroundSize:(windowSize.width<=1440)?"":`${(1538 / 1440)*100}% auto`}}>

        <div className={styles.contentContainer} ref={contentRef} id={"home"}>
            <div ref={navbarRef} className={styles.navbarContainer}>
              <div className={styles.navbarWrapper}>        
                <span className={styles.navbarTitleContainer} >
                  <Logo/>
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
                  <span className={styles.navbarSubtext} onClick={()=>scrollToId('services')}>
                    Services
                  </span>
                  <span className={styles.navbarSubtext} onClick={()=>scrollToId('pricing')}>
                    Pricing
                  </span>
                  <a className={styles.navbarSubtext} onClick={()=>scrollToId('why')}>
                    Why TradesMark
                  </a>
                  <a className={styles.navbarSubtext} onClick={()=>scrollToId('faqs')}>
                    FAQ&apos;s
                  </a>
              
                </span>
                <a className={styles.navbarSubtext} href="tel:+6505252567" style={{alignSelf:"center"}}>
                  Call Us @{" +1 (650) 525-2567"}
                </a>
                </>
                }
              </div>
            </div>
            {(windowSize.width <= 1024)&&
              <AnimatePresence>
                {(expandNavigation)&&              
                <motion.div className={styles.navigationPane}
                  onClick={()=>setExpandNavigation(!expandNavigation)}
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
                    <span style={{color:"#000"}}
                    className={styles.navbarSubtext} onClick={()=>scrollToId('home')}>
                      Home
                    </span>
                    <span style={{color:"#000"}}
                    className={styles.navbarSubtext} onClick={()=>scrollToId('services')}>
                      Services
                    </span>
                    <span style={{color:"#000"}}
                    className={styles.navbarSubtext} onClick={()=>scrollToId('pricing')}>
                      Pricing
                    </span>
                    <span style={{color:"#000"}}
                    className={styles.navbarSubtext} onClick={()=>scrollToId('why')}>
                      Why TradesMark
                    </span>
                    <span style={{color:"#000"}}
                    className={styles.navbarSubtext} onClick={()=>scrollToId('faqs')}>
                      FAQ&apos;s
                    </span>
                    <a style={{color:"#000"}} href="mailto:blackprint.unlimited@gmail.com"
                    className={styles.navbarSubtext} onClick={()=> setExpandNavigation(false)}>
                      Contact Us
                    </a>
                  </div>
                </motion.div>
                }
              </AnimatePresence>
              }
          
            <section className={styles.heroSectionContainer} id={'home'}>
              <div className={[`${styles.heroTextContainer} ${animation ? styles.animateIn : ''}`]}>
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
                  <span className={styles.heroContactButton} onClick={()=>scrollToId("form")}>
                    <p className={styles.buttonText}>
                      Get Started
                    </p>
                  </span>
                  <a className={styles.heroResumeButton} href="https://api.leadconnectorhq.com/widget/booking/PsvzfzYIlN2Zzs2opOzu">
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
            <section className={styles.adSection}>
              <div className={styles.adItemContainer}>
                <div className={styles.adItem}>
                  <div className={styles.adHeaderIcon}>
                    <FaGoogle className={styles.adIcon}/>
                  </div>
                  <p className={styles.adHeader}>
                    +$1M
                  </p>
                  <p className={styles.adTitle}>
                    Managed in Google Ad spend.
                  </p>
                </div>
                <div className={styles.adItem}>
                  <div className={styles.adHeaderIcon}>
                    <FaMoneyBillWave className={styles.adIcon}/>
                  </div>
                  <p className={styles.adHeader}>
                    3-10x
                  </p>
                  <p className={styles.adTitle}>
                  Our average return on ad spend.
                  </p>
                </div>
                <div className={styles.adItem}>
                  <div className={styles.adHeaderIcon}>
                    <FaWrench className={styles.adIcon}/>
                  </div>
                  <p className={styles.adHeader}>
                    10+ 
                  </p>
                  <p className={styles.adTitle}>
          
                  Years of industry {'&'} service.
                  </p>
                </div>
              </div>
            </section>
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
              <div className={styles.frameworksCanvas}>
              </div>
              <div className={styles.frameworksContentContainer}>
                <div className={styles.frameworksContentWrapper}>
                  <div className={styles.frameworksImageWrapper}>
                    <Lightning/>
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
                    <Star/>
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
                    <Person/>
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
                <div className={styles.projectsHeaderContainer} id={'projects'} ref={scrollRef}>
                  <p className={styles.projectsHeaderText}>
                    Focus more on your business, let us take care of the rest
                  </p>
                  <p className={styles.headerSubtext} style={{width:"92.5%", fontFamily:"DM Sans"}}>
                    We’ll save you time - don’t worry about the hassle of marketing and branding  
                  </p>
                  <a className={styles.projectsButtonContainer} href='https://api.leadconnectorhq.com/widget/booking/PsvzfzYIlN2Zzs2opOzu'>
                    <p className={styles.buttonText}>
                      Learn More
                    </p>
                  </a>
                </div>
                <div className={styles.projectsContentContainer} >
                  <motion.div 
                  style={{
                    x:(windowSize.width>480)?((carouselTop-180)/5):((carouselTop-180)/4)
                  }}
                  className={styles.projectsContentWrapper} ref={carouselRef}>
                    <span className={styles.projectsContentImage}>
                      <div className={styles.projectsContentImageInner}>
                        <Image src={Bv} alt={"bvexterior flyer"} objectFit={'cover'} fill style={{padding:"4px"}} quality={100} className={styles.projectImage}/>
                        {/*<BVFlyerComponent width={windowSize.width}/>*/}
                      </div>
                    </span>
                    <span className={styles.projectsContentImage}>
                      <div className={styles.projectsContentImageInner}>
                        {<Image src={Bvexterior} alt={"bvexterior site"} objectFit={'cover'} fill style={{padding:"4px"}} quality={100} className={styles.projectImage}/>}
                        {/*<BVExteriorComponent width={windowSize.width}/>*/}
                      </div>
                    </span>
                    <span className={styles.projectsContentImage}>
                      <div className={styles.projectsContentImageInner}>
                        {<Image src={Steelnet} alt={"steelnet flyer"} objectFit={'cover'} fill  style={{padding:"4px"}} className={styles.projectImage}/>}
                        {/*<SteelnetComponent width={windowSize.width}/>*/}
                      </div>
                    </span>
                  </motion.div>
                </div>
            </section>
            <section className={styles.servicesSection} id={"services"}>
              <div className={styles.servicesHeaderContainer}>
                <p className={[styles.servicesHeaderText, styles.titleTextAlt].join(' ')}>
                  Our Services
                </p>
                <p className={styles.headerSubtext} style={{textTransform:"none"}}>
                  Experienced professionals you can trust.
                </p>
              </div>
              <div className={styles.servicesContainer}>
                {(windowSize.width > 768 && windowSize.width <= 1280)?
                  <>
                <div className={styles.servicesRow}>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <IoMailOpen className={styles.servicesIconImageMail}/>
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
                      <TbHeartHandshake className={styles.servicesIconImageAlt}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Reputation Management</p>
                      <p className={styles.servicesSubtext}>By proactively addressing feedback and enhancing online credibility, your business will strengthen customer trust, attract more clients, and improve overall brand perception.</p>
                    </div>
                  </div>
                </div>
                <div className={styles.servicesRow}>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <FaGoogle className={styles.servicesIconImage}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Google Ads</p>
                      <p className={styles.servicesSubtext}>Our PPC Google advertising offers contractors immediate visibility on search engines, ensuring targeted exposure to potential clients actively searching for your services.</p>
                    </div>
                  </div>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <FaGear className={styles.servicesIconImage} style={{transform:"translateX(-1px)"}}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Search Engine Optimization</p>
                      <p className={styles.servicesSubtext}>Taking your custom website to the next level. Ranking your website above your competitors across all search engines, bringing in more projects.</p>
                    </div>
                  </div>
                </div>
                <div className={styles.servicesRow}>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <FaRegWindowRestore className={styles.servicesIconImage}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Website Design Development</p>
                      <p className={styles.servicesSubtext}>Our professionally designed websites enhances visibility, attracts new clients, and boosts customer trust, ultimately driving rapid business growth for all contractors.</p>
                    </div>
                  </div>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <FaPaintBrush className={styles.servicesIconImage}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Graphic Design Content</p>
                      <p className={styles.servicesSubtext}>Our in-house graphic designs are ready to service your vision, ranging from flyers, social media posts, to logo revisions and branding packages.</p>
                    </div>
                  </div>
                </div>
                </>
                :<>
                <div className={styles.servicesRow}>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <IoMailOpen className={styles.servicesIconImageMail}/>
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
                    <TbHeartHandshake className={styles.servicesIconImageAlt} style={{transform:"translateX(-1px)"}}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Reputation Management</p>
                      <p className={styles.servicesSubtext}>By proactively addressing feedback and enhancing online credibility, your business will strengthen customer trust, attract more clients, and improve overall brand perception.</p>
                    </div>
                  </div>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <FaGoogle className={styles.servicesIconImage} style={{transform:"translateX(-2px)"}}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Google Ads</p>
                      <p className={styles.servicesSubtext}>Our PPC Google advertising offers contractors immediate visibility on search engines, ensuring targeted exposure to potential clients actively searching for your services.</p>
                    </div>
                  </div>
                </div>
                <div className={styles.servicesRow}>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <FaGear className={styles.servicesIconImage}  style={{transform:"translateX(-2px)"}}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Search Engine Optimization</p>
                      <p className={styles.servicesSubtext}>Taking your custom website to the next level. Ranking your website above your competitors across all search engines, bringing in more projects.</p>
                    </div>
                  </div>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <FaRegWindowRestore className={styles.servicesIconImage}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Website Design Development</p>
                      <p className={styles.servicesSubtext}>Our professionally designed websites enhances visibility, attracts new clients, and boosts customer trust, ultimately driving rapid business growth for all contractors.</p>
                    </div>
                  </div>
                  <div className={styles.servicesItem}>
                    <div className={styles.servicesIcon}>
                      <FaPaintBrush className={styles.servicesIconImage}/>
                    </div>
                    <div className={styles.servicesTextContainer}>
                      <p className={styles.servicesTitle}>Graphic Design Content</p>
                      <p className={styles.servicesSubtext}>Our in-house graphic designs are ready to service your vision, ranging from flyers, social media posts, to logo revisions and branding packages.</p>
                    </div>
                  </div>
                </div>
                </>
                }

              </div>
              
            </section>
            <section className={styles.pricingSection} id={"pricing"}>
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
                      Join <br/>TradesMark.
                  </p>
                  <div style={{display:"flex", flexDirection:"column", gap:"1.25rem", paddingTop:".875rem"}} className={styles.pricingLeftTabContainer}>
                    <div className={styles.pricingLeftTab}>
                      <div className={styles.pricingLeftTabTextWrapper}>
                        <p className={styles.pricingContentSubtitle} style={{fontSize:"15px"}}>
                          Book a 15-min appointment
                        </p>
                        <p className={styles.pricingContentText} style={{fontWeight:"300"}}>
                          Learn more about how TradesMark works.
                        </p>
                      </div>
                    </div>
                    <div className={styles.pricingLeftTab}>
                      <div className={styles.pricingLeftTabTextWrapper}>
                        <p className={styles.pricingContentSubtitle} style={{fontSize:"15px"}}>
                          Contact Us for Custom Pricing
                        </p>
                        <p className={styles.pricingContentText} style={{fontWeight:"300"}}>
                          Get information how we can help you find a price that works for you.
                        </p>
                      </div>
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

                  <a className={styles.pricingButton} href='https://api.leadconnectorhq.com/widget/booking/PsvzfzYIlN2Zzs2opOzu'>
                    <div className={styles.pricingButtonInner}>
                      <p className={styles.buttonText} style={{color:"#000", fontSize:"1.075rem"}}>
                        Book a Demo
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </section>
            
            <section className={styles.whySection} id={"why"}>
              <div className={styles.servicesHeaderContainer}>
                <p className={[styles.servicesHeaderText, styles.titleTextAlt].join(' ')}>
                  Why TradesMark?
                </p>
              </div>
              <div className={styles.whyContentContainer}>
                <div className={(windowSize.width<=1280)?styles.servicesRow:styles.whyRow}>
                  <div className={styles.whyItem}>
                    <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                      <p className={styles.whyTitle}>
                        <span><Triangle style={{transform:"translateY(2.25px)"}} className={styles.triangle}/></span>Catered to your needs
                      </p>
                      <p className={styles.whyContext}>
                        Unlike other marketing companies that have all these services with one price, we let you customize, pick and choose, and build a program that YOU need.
                      </p>
                    </div>
                  </div>
                  <div className={styles.whyItem}>
                    <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                      <p className={styles.whyTitle}>
                      <span><Triangle className={styles.triangle} style={{transform:"translateY(2.25px)"}}/></span>We care about your growth
                      </p>
                      <p className={styles.whyContext}>
                        We like our partners to not only be limited, but winning. In each city we have <span style={{fontWeight:"650", color:"#000"}}>limited spots</span> for each trade to eliminate competition overload when it comes to Advertisement.                    </p>
                    </div>
                  </div>
                </div>
                <div className={(windowSize.width <=1280)?styles.servicesRow:styles.whyRow}>
                  <div className={styles.whyItem}>
                    <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                      <p className={styles.whyTitle}>
                      <span><Triangle className={styles.triangle} style={{transform:"translateY(2.25px)"}}/></span>We Prioritize You
                      </p>
                      <p className={styles.whyContext}>
                        With over half a decade of being in the advertisement space we prioritize taking your business where it&apos;s at, to the level you&apos;ve always dreamed of.                    </p>
                    </div>
                  </div>
                  <div className={styles.whyItem}>
                    <div style={{display:"flex", flexDirection:"column", gap:"1.5rem"}}>
                      <p className={styles.whyTitle}>
                      <span><Triangle className={styles.triangle} style={{transform:"translateY(2.25px)"}}/></span>Partnership Method
                      </p>
                      <p className={styles.whyContext}>
                        With our advertising services, we don&apos;t make money unless you do, and we provide competitive pricing for branding services.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </section>
            <section className={styles.formSection} id={"form"}>
              <div className={styles.servicesHeaderContainer}>
                <p className={[styles.servicesHeaderText, styles.titleTextAlt].join(' ')}>
                  Apply Now
                </p>
              </div>
              {/*<Form width={windowSize.width}/>*/}
              {<GHLForm width={windowSize.width}/>}
            </section>

            <section className={styles.valueSection} >  
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
                    <p className={styles.valueSubtext} style={{fontWeight:"400"}}>
                      We offer comprehensive marketing services including content creation, social media management, website design, and ad campaigns.
                    </p>
                  </div>
                </div>
            </section>

            <section className={styles.faqsSection} id={"faqs"}>
              <div className={styles.faqsHeaderContainer}>
                <span className={styles.scribbleContainer}><Scribble/></span>
                <p className={styles.faqsHeaderText}>
                  Frequently Asked Questions
                </p>
                <p className={styles.headerSubtext} style={{textTransform:"none", paddingTop:".75rem",fontSize:"var(--text-smaller-v3)"}}>
                  Everything you need to know about TradesMark.
                </p>
              </div>
              <div className={styles.faqsContent}>
                <Faqs title={"How fast can TradesMark begin with a client?"}
                info={'If you qualify to work with TradesMark after the consultation, we can start immediately.'}/>
                <Faqs title={"What sets TradesMark apart against competitors?"}
                info={'We provide only what you need. Unlike other marketing companies that charge 1 price for 5 services when you really only need 2 are not the way to go. TradesMark finally brings contractors an actual fully customizable program.'}/>
                <Faqs title={"Does TradesMark offer consultation before purchase?"}
                info={'Yes, Trademark will always provide a consultation before every purchase to ensure qualification before working together to enhance satisfaction and success on both ends.'}/>
                <Faqs title={"How can TradesMark help with my small business?"}
                info={'We want our contractors to focus on what they do best, which is the service they provide. We take on the responsibility of filling all the holes on the backend that is necessary for any business, small or big, to win.'}/>
                <Faqs title={"Is there a trial period?"}
                info={'Yes, depending on your needed services that we provide there is a trial period. Each service is different and differs depending on the package you build.'}/>
                <Faqs title={"Are there any refunds?"}
                info={'Refunds? We dont make money unless you do!'}/>
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
                  <span className={styles.footerContactButton} onClick={()=>scrollToId("form")}>
                    <p className={styles.buttonText}>
                      Let&apos;s Get Started
                    </p>
                  </span>
                
                </div>
              </div>
            </section>

            <div className={styles.footerNavContainer}>
              <div className={styles.navbarWrapper} style={{width:(windowSize.width > 480)?"90%":"85%"}}>        
                <span className={styles.navbarTitleContainer} style={{paddingTop:"1px", alignItems:"center"}} onClick={()=>scrollToId("home")}>
                  <Logo/>
                  <p className={styles.footerTitle}>TradesMark</p>
                </span>

                <span className={[styles.navbarSubtextContainer, styles.footerSubtextContainer].join(' ')}>
                  <span className={styles.navbarSubtext} onClick={()=>scrollToId('home')}>
                    Home
                  </span>
                  <span className={styles.navbarSubtext} onClick={()=>scrollToId('services')}>
                    Services
                  </span>
                  <span className={styles.navbarSubtext} onClick={()=>scrollToId('pricing')}>
                    Pricing
                  </span>
                  <a className={styles.navbarSubtext} onClick={()=>scrollToId('why')}>
                    Why TradesMark
                  </a>
                  <a className={styles.navbarSubtext} onClick={()=>scrollToId('faqs')}>
                    FAQ&apos;s
                  </a>
                </span>
                <a className={styles.navbarSubtext} style={{alignSelf:"center"}} href="mailto:Tradesmarkmarketing@gmail.com">
                  Contact Us
                </a>
              </div>
            </div>
        </div>
      </div>
    </main>
  </>
  );
}


