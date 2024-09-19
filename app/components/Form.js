import React, { useState, useEffect, useRef } from "react"
import {
    motion,
    AnimatePresence,
    useScroll,
    useAnimation,
    inView,
} from "framer-motion"

export default function Popup(props) {

    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        businessName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        businessType: "",
        referral: ""
    })
    const [formError, setFormError] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        businessName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        businessType: "",
        referral: ""
    })
    const [formSubmitted, setFormSubmitted] = useState(false)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
        if (e.target.name === "email") {
            validateEmail(e.target.value);
        }
    }
    const handleSubmit = async (e) => {
        setLoading(true)
        const {
            firstName,
            lastName,
            phoneNumber,
            email,
            businessName,
            address1,
            address2,
            city,
            state,
            zip,
            country,
            businessType,
            referral
        } = formData
        if (!firstName || !lastName || !phoneNumber || !email || !businessName || !businessType || !referral || email === "invalid") {
            setFormError({
                ...formError,
                firstName: !firstName ? "missing" : "",
                lastName: !lastName ? "missing" : "",
                phoneNumber: !phoneNumber ? "missing" : "",
                email: !email || email === "invalid" ? "missing" : "",
                businessName: !businessName ? "missing" : "",
                businessType: !businessType ? "missing" : "",
                referral: !referral ? "missing" : ""
            })
            setLoading(false)
            return
        }
        e.preventDefault()
        const response = await fetch(
            "https://api.blackprint.in/api/sendEmail",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        )
        const result = await response.json()
        if (result) {
            setFormSubmitted(true)
            setLoading(false)
        }
    }
    const [isMobile, setIsMobile] = useState(false)
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(email)) {
          setFormError({ email: "invalid" });
        } else {
          setFormError({ email: "" });
        }
      };
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768) // Set breakpoint at 768px
        }

        window.addEventListener("resize", handleResize)
        handleResize() // Call it initially

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    const responsiveFormContent = {
        ...formContent,
        minWidth: isMobile ? "80vw" : "65vw", // Change width based on the screen size
    }
    return (
        <div style={responsiveFormContent}>
            <div style={formContentWrapper}>
                <div style={formInputContainer}>
                    <motion.div
                        style={{
                            width: "100%",
                            gap: "15px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        animate={{ opacity: formSubmitted ? 0 : 1 }}
                        transition={{
                            duration: 0.2,
                        }}
                    >
                        <div style={formInputRow}>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader,
                                        color:
                                            formError.firstName === "missing"
                                                ? "#FF0000"
                                                : "",
                                    }}
                                >
                                    First Name <span style={{ color: "red", fontWeight: "300" }}>*</span>
                                </p>
                                <input
                                    style={formInputField}
                                    name="firstName"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.firstName}
                                    placeholder={"First Name"}
                                />
                            </div>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader,
                                        color:
                                            formError.lastName === "missing"
                                                ? "#FF0000"
                                                : "",
                                    }}
                                >
                                    Last Name <span style={{ color: "red", fontWeight: "300" }}>*</span>
                                </p>
                                <input
                                    style={formInputField}
                                    name="lastName"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                    placeholder={"Last Name"}
                                />
                            </div>
                        </div>
                        <div style={formInputRow}>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader,
                                        color:
                                            formError.phoneNumber === "missing"
                                                ? "#FF0000"
                                                : "",
                                    }}
                                >
                                    Phone Number <span style={{ color: "red", fontWeight: "300" }}>*</span>
                                </p>
                                <input
                                    style={formInputField}
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    type="tel"
                                    name="phoneNumber"
                                    placeholder={"+1 (123) 456 7890"}
                                />
                            </div>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader,
                                        color:
                                            formError.email === "missing" || formError.email === "invalid"
                                                ? "#FF0000"
                                                : "",
                                    }}
                                >
                                    Email <span style={{ color: "red", fontWeight: "300" }}>*</span>
                                </p>
                                <input
                                    style={formInputField}
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder={"name@email.com"}
                                />
                            </div>
                        </div>
                        <div style={formInputWrapper}>
                            <p
                                style={{
                                    ...formInputFieldHeader,
                                    color:
                                        formError.businessName === "missing"
                                            ? "#FF0000"
                                            : "",
                                }}
                            >
                                Company <span style={{ color: "red", fontWeight: "300" }}>*</span>
                            </p>
                            <input
                                style={formInputField}
                                name="businessName"
                                type="text"
                                onChange={handleChange}
                                value={formData.businessName}
                                placeholder={"Your Business"}
                            />
                        </div>
                        <div style={formInputRow}>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader
                                    }}
                                >
                                    Address Line 1
                                </p>
                                <input
                                    style={formInputField}
                                    name="address1"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.address1}
                                    placeholder={""}
                                />
                            </div>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader
                                    }}
                                >
                                    Address Line 2
                                </p>
                                <input
                                    style={formInputField}
                                    name="address2"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.address2}
                                    placeholder={""}
                                />
                            </div>
                        </div>
                        <div style={formInputRow}>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader
                                    }}
                                >
                                    City
                                </p>
                                <input
                                    style={formInputField}
                                    name="city"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.city}
                                    placeholder={""}
                                />
                            </div>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader
                                    }}
                                >
                                    State/Province
                                </p>
                                <input
                                    style={formInputField}
                                    name="state"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.state}
                                    placeholder={""}
                                />
                            </div>
                        </div>
                        <div style={formInputRow}>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader
                                    }}
                                >
                                    Postal/Zip
                                </p>
                                <input
                                    style={formInputField}
                                    name="zip"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.zip}
                                    placeholder={""}
                                />
                            </div>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader
                                    }}
                                >
                                    Country
                                </p>
                                <select name="country" id="country" style={formInputSelect} value={formData.country} onChange={handleChange}>
                                    <option value="" disabled="disabled">Country</option>
                                    <option value="Afghanistan">Afghanistan</option>
                                    <option value="Aland Islands">Aland Islands</option>
                                    <option value="Albania">Albania</option>
                                    <option value="Algeria">Algeria</option>
                                    <option value="Andorra">Andorra</option>
                                    <option value="Angola">Angola</option>
                                    <option value="Anguilla">Anguilla</option>
                                    <option value="Antigua And Barbuda">Antigua And Barbuda</option>
                                    <option value="Argentina">Argentina</option>
                                    <option value="Armenia">Armenia</option>
                                    <option value="Aruba">Aruba</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Austria">Austria</option>
                                    <option value="Azerbaijan">Azerbaijan</option>
                                    <option value="Bahamas">Bahamas</option>
                                    <option value="Bahrain">Bahrain</option>
                                    <option value="Bangladesh">Bangladesh</option>
                                    <option value="Barbados">Barbados</option>
                                    <option value="Belarus">Belarus</option>
                                    <option value="Belgium">Belgium</option>
                                    <option value="Belize">Belize</option>
                                    <option value="Benin">Benin</option>
                                    <option value="Bermuda">Bermuda</option>
                                    <option value="Bhutan">Bhutan</option>
                                    <option value="Bolivia">Bolivia</option>
                                    <option value="Bosnia And Herzegovina">Bosnia And Herzegovina</option>
                                    <option value="Botswana">Botswana</option>
                                    <option value="Bouvet Island">Bouvet Island</option>
                                    <option value="Brazil">Brazil</option>
                                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                                    <option value="Brunei">Brunei</option>
                                    <option value="Bulgaria">Bulgaria</option>
                                    <option value="Burkina Faso">Burkina Faso</option>
                                    <option value="Burundi">Burundi</option>
                                    <option value="Cambodia">Cambodia</option>
                                    <option value="Republic of Cameroon">Republic of Cameroon</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Cape Verde">Cape Verde</option>
                                    <option value="Caribbean Netherlands">Caribbean Netherlands</option>
                                    <option value="Cayman Islands">Cayman Islands</option>
                                    <option value="Central African Republic">Central African Republic</option>
                                    <option value="Chad">Chad</option>
                                    <option value="Chile">Chile</option>
                                    <option value="China">China</option>
                                    <option value="Christmas Island">Christmas Island</option>
                                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                                    <option value="Colombia">Colombia</option>
                                    <option value="Comoros">Comoros</option>
                                    <option value="Congo">Congo</option>
                                    <option value="Congo, The Democratic Republic Of The">Congo, The Democratic Republic Of The</option>
                                    <option value="Cook Islands">Cook Islands</option>
                                    <option value="Costa Rica">Costa Rica</option>
                                    <option value="Croatia">Croatia</option>
                                    <option value="Cuba">Cuba</option>
                                    <option value="Curaçao">Curaçao</option>
                                    <option value="Cyprus">Cyprus</option>
                                    <option value="Czech Republic">Czech Republic</option>
                                    <option value="Denmark">Denmark</option>
                                    <option value="Djibouti">Djibouti</option>
                                    <option value="Dominica">Dominica</option>
                                    <option value="Dominican Republic">Dominican Republic</option>
                                    <option value="Ecuador">Ecuador</option>
                                    <option value="Egypt">Egypt</option>
                                    <option value="El Salvador">El Salvador</option>
                                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                                    <option value="Eritrea">Eritrea</option>
                                    <option value="Estonia">Estonia</option>
                                    <option value="Eswatini">Eswatini</option>
                                    <option value="Ethiopia">Ethiopia</option>
                                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                                    <option value="Faroe Islands">Faroe Islands</option>
                                    <option value="Fiji">Fiji</option>
                                    <option value="Finland">Finland</option>
                                    <option value="France">France</option>
                                    <option value="French Guiana">French Guiana</option>
                                    <option value="French Polynesia">French Polynesia</option>
                                    <option value="French Southern Territories">French Southern Territories</option>
                                    <option value="Gabon">Gabon</option>
                                    <option value="Gambia">Gambia</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Germany">Germany</option>
                                    <option value="Ghana">Ghana</option>
                                    <option value="Gibraltar">Gibraltar</option>
                                    <option value="Greece">Greece</option>
                                    <option value="Greenland">Greenland</option>
                                    <option value="Grenada">Grenada</option>
                                    <option value="Guadeloupe">Guadeloupe</option>
                                    <option value="Guatemala">Guatemala</option>
                                    <option value="Guernsey">Guernsey</option>
                                    <option value="Guinea">Guinea</option>
                                    <option value="Guinea Bissau">Guinea Bissau</option>
                                    <option value="Guyana">Guyana</option>
                                    <option value="Haiti">Haiti</option>
                                    <option value="Heard Island And Mcdonald Islands">Heard Island And Mcdonald Islands</option>
                                    <option value="Honduras">Honduras</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="Hungary">Hungary</option>
                                    <option value="Iceland">Iceland</option>
                                    <option value="India">India</option>
                                    <option value="Indonesia">Indonesia</option>
                                    <option value="Iran, Islamic Republic Of">Iran, Islamic Republic Of</option>
                                    <option value="Iraq">Iraq</option>
                                    <option value="Ireland">Ireland</option>
                                    <option value="Isle Of Man">Isle Of Man</option>
                                    <option value="Israel">Israel</option>
                                    <option value="Italy">Italy</option>
                                    <option value="Jamaica">Jamaica</option>
                                    <option value="Japan">Japan</option>
                                    <option value="Jersey">Jersey</option>
                                    <option value="Jordan">Jordan</option>
                                    <option value="Kazakhstan">Kazakhstan</option>
                                    <option value="Kenya">Kenya</option>
                                    <option value="Kiribati">Kiribati</option>
                                    <option value="Kosovo">Kosovo</option>
                                    <option value="Kuwait">Kuwait</option>
                                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                                    <option value="Lao People's Democratic Republic">Lao People&apos;s Democratic Republic</option>
                                    <option value="Latvia">Latvia</option>
                                    <option value="Lebanon">Lebanon</option>
                                    <option value="Lesotho">Lesotho</option>
                                    <option value="Liberia">Liberia</option>
                                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                                    <option value="Liechtenstein">Liechtenstein</option>
                                    <option value="Lithuania">Lithuania</option>
                                    <option value="Luxembourg">Luxembourg</option>
                                    <option value="Macao">Macao</option>
                                    <option value="Madagascar">Madagascar</option>
                                    <option value="Malawi">Malawi</option>
                                    <option value="Malaysia">Malaysia</option>
                                    <option value="Maldives">Maldives</option>
                                    <option value="Mali">Mali</option>
                                    <option value="Malta">Malta</option>
                                    <option value="Martinique">Martinique</option>
                                    <option value="Mauritania">Mauritania</option>
                                    <option value="Mauritius">Mauritius</option>
                                    <option value="Mayotte">Mayotte</option>
                                    <option value="Mexico">Mexico</option>
                                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                                    <option value="Monaco">Monaco</option>
                                    <option value="Mongolia">Mongolia</option>
                                    <option value="Montenegro">Montenegro</option>
                                    <option value="Montserrat">Montserrat</option>
                                    <option value="Morocco">Morocco</option>
                                    <option value="Mozambique">Mozambique</option>
                                    <option value="Myanmar">Myanmar</option>
                                    <option value="Namibia">Namibia</option>
                                    <option value="Nauru">Nauru</option>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Netherlands">Netherlands</option>
                                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                                    <option value="New Caledonia">New Caledonia</option>
                                    <option value="New Zealand">New Zealand</option>
                                    <option value="Nicaragua">Nicaragua</option>
                                    <option value="Niger">Niger</option>
                                    <option value="Nigeria">Nigeria</option>
                                    <option value="Niue">Niue</option>
                                    <option value="Norfolk Island">Norfolk Island</option>
                                    <option value="Korea, Democratic People's Republic Of">Korea, Democratic People&apos;s Republic Of</option>
                                    <option value="North Macedonia">North Macedonia</option>
                                    <option value="Norway">Norway</option>
                                    <option value="Oman">Oman</option>
                                    <option value="Pakistan">Pakistan</option>
                                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                                    <option value="Panama">Panama</option>
                                    <option value="Papua New Guinea">Papua New Guinea</option>
                                    <option value="Paraguay">Paraguay</option>
                                    <option value="Peru">Peru</option>
                                    <option value="Philippines">Philippines</option>
                                    <option value="Pitcairn">Pitcairn</option>
                                    <option value="Poland">Poland</option>
                                    <option value="Portugal">Portugal</option>
                                    <option value="Qatar">Qatar</option>
                                    <option value="Reunion">Reunion</option>
                                    <option value="Romania">Romania</option>
                                    <option value="Russia">Russia</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="Samoa">Samoa</option>
                                    <option value="San Marino">San Marino</option>
                                    <option value="Sao Tome And Principe">Sao Tome And Principe</option>
                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                    <option value="Senegal">Senegal</option>
                                    <option value="Serbia">Serbia</option>
                                    <option value="Seychelles">Seychelles</option>
                                    <option value="Sierra Leone">Sierra Leone</option>
                                    <option value="Singapore">Singapore</option>
                                    <option value="Sint Maarten">Sint Maarten</option>
                                    <option value="Slovakia">Slovakia</option>
                                    <option value="Slovenia">Slovenia</option>
                                    <option value="Solomon Islands">Solomon Islands</option>
                                    <option value="Somalia">Somalia</option>
                                    <option value="South Africa">South Africa</option>
                                    <option value="South Georgia And The South Sandwich Islands">South Georgia And The South Sandwich Islands</option>
                                    <option value="South Korea">South Korea</option>
                                    <option value="South Sudan">South Sudan</option>
                                    <option value="Spain">Spain</option>
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="Saint Barthélemy">Saint Barthélemy</option>
                                    <option value="Saint Helena">Saint Helena</option>
                                    <option value="Saint Kitts And Nevis">Saint Kitts And Nevis</option>
                                    <option value="Saint Lucia">Saint Lucia</option>
                                    <option value="Saint Martin">Saint Martin</option>
                                    <option value="Saint Pierre And Miquelon">Saint Pierre And Miquelon</option>
                                    <option value="St. Vincent">St. Vincent</option>
                                    <option value="Sudan">Sudan</option>
                                    <option value="Suriname">Suriname</option>
                                    <option value="Svalbard And Jan Mayen">Svalbard And Jan Mayen</option>
                                    <option value="Sweden">Sweden</option>
                                    <option value="Switzerland">Switzerland</option>
                                    <option value="Syria">Syria</option>
                                    <option value="Taiwan">Taiwan</option>
                                    <option value="Tajikistan">Tajikistan</option>
                                    <option value="Tanzania, United Republic Of">Tanzania, United Republic Of</option>
                                    <option value="Thailand">Thailand</option>
                                    <option value="Timor Leste">Timor Leste</option>
                                    <option value="Togo">Togo</option>
                                    <option value="Tokelau">Tokelau</option>
                                    <option value="Tonga">Tonga</option>
                                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                                    <option value="Tunisia">Tunisia</option>
                                    <option value="Turkey">Turkey</option>
                                    <option value="Turkmenistan">Turkmenistan</option>
                                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                                    <option value="Tuvalu">Tuvalu</option>
                                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                                    <option value="Uganda">Uganda</option>
                                    <option value="Ukraine">Ukraine</option>
                                    <option value="United Arab Emirates">United Arab Emirates</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="United States" selected="selected">United States</option>
                                    <option value="Uruguay">Uruguay</option>
                                    <option value="Uzbekistan">Uzbekistan</option>
                                    <option value="Vanuatu">Vanuatu</option>
                                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                                    <option value="Venezuela">Venezuela</option>
                                    <option value="Vietnam">Vietnam</option>
                                    <option value="Wallis And Futuna">Wallis And Futuna</option>
                                    <option value="Western Sahara">Western Sahara</option>
                                    <option value="Yemen">Yemen</option>
                                    <option value="Zambia">Zambia</option>
                                    <option value="Zimbabwe">Zimbabwe</option>
                                </select>
                            </div>
                        </div>
                        <div style={formInputRow}>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader,
                                        color:
                                            formError.businessType === "missing"
                                                ? "#FF0000"
                                                : "",
                                    }}
                                >
                                    Business Type <span style={{ color: "red", fontWeight: "300" }}>*</span>
                                </p>
                                <select name="businessType" id="businessType" style={formInputSelect} value={formData.businessType} onChange={handleChange}>
                                    <option selected="selected" value="" disabled="disabled">Please select</option>
                                    <option value="Wholesaler/Distro">Wholesaler/Distro</option>
                                    <option value="Cash &amp; Carry">Cash &amp; Carry</option>
                                    <option value="Retail Chain">Retail Chain</option>
                                    <option value="Single Store">Single Store</option>
                                    <option value="Online Retailer">Online Retailer</option>
                                </select>
                            </div>
                            <div style={formInputWrapper}>
                                <p
                                    style={{
                                        ...formInputFieldHeader,
                                        color:
                                            formError.referral === "missing"
                                                ? "#FF0000"
                                                : "",
                                    }}
                                >
                                    How did you find out about us? <span style={{ color: "red", fontWeight: "300" }}>*</span>
                                </p>
                                <select name="referral" id="referral" style={formInputSelect} value={formData.referral} onChange={handleChange}>
                                    <option selected="selected" value="" disabled="disabled">Please select</option>
                                    <option value="Online Search">Online Search</option>
                                    <option value="Social Media ">Social Media </option>
                                    <option value="Word of Mouth">Word of Mouth</option>
                                    <option value="Saw it in Another Store">Saw it in Another Store</option>
                                    <option value="Direct Mailer">DIrect Mailer</option>
                                    <option value="Other">Other</option>
                                </select>
                           
                            </div>
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {formSubmitted && (
                            <motion.p
                                style={{
                                    color: "#0a0a0a",
                                    textAlign: "center",
                                    position: "absolute",
                                    fontWeight: "500",
                                    ...formHeaderText,
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.2,
                                    delay: 0.2,
                                }}
                            >
                                Thank you for your submission!
                                <br />
                                We&apos;ll be in touch shortly.
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
                <motion.span
                    animate={{ opacity: formSubmitted ? 0 : 1 }}
                    style={{
                        pointerEvents: formSubmitted ? "none" : "auto",
                        ...formInputButton,
                    }}
                    onClick={(e) => handleSubmit(e)}
                >
                    <p style={buttonFormText}>
                        {loading ? "Please Wait..." : "Apply Today"}
                    </p>
                </motion.span>
            </div>
        </div>
    )
}

// Styles are written in object syntax
// Learn more: https://reactjs.org/docs/dom-elements.html#style

// form styles
const formContent = {
    width: "fit-content",
    // minWidth: "50vw",
    transition: "all .2s linear",
    height: "fit-content",
    borderRadius: "8px",
    paddingTop: "1rem",
    paddingBottom: "3.25rem",
    justifyContent: "center",
    boxShadow: "0px 0px 2px 1px rgba(10,10,10,.15)",
    alignItems: "center",
    display: "flex",
    backgroundColor: "#fefefe",
    marginTop: "3rem",
    marginBottom: "1rem",
    flexDirection: "column",
}

const formContentWrapper = {
    height: "fit-content",
    width: "85%",
    display: "flex",

    flexDirection: "column",
}

const formInputContainer = {
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginTop: "2.25rem",
    marginBottom: "2.5rem",
    alignItems: "center",
    justifyContent: "center",
    color: "#0a0a0a",
    gap: "15px",
}

const formInputRow = {
    display: "flex",
    width: "100%",
    gap: "1rem",
    alignItems: "center",
    justifyContent: "space-between"
}
const formInputWrapper = {
    height: "fit-content",
    width: "100%",
    display: "flex",
    gap: ".5rem",
    marginTop: ".5rem",
    flexDirection: "column",
}
const formInputFieldHeader = {
    fontFamily: "Inter",
    fontSize: "13px",
    color: "#636363",
    fontWeight: "500",
    transition: "all .1s linear",
}

const formInputField = {
    width: "100%",
    height: "2.75rem",
    paddingLeft: "1.25rem",
    border: "1px solid #cfd7e2",
    borderRadius: "5px",
    color: "#000",
    fontFamily: "Inter",
    backgroundColor: "#fff",
}
const formInputSelect = {
    width: "100%",
    paddingLeft:"1rem",
    height: "2.75rem",
    border: "1px solid #cfd7e2",
    borderRadius: "5px",
    color: "#000",
    fontFamily: "Inter",
    backgroundColor: "#fff",
}

const formHeaderText = {
    color: "#0a0a0a",
    fontFamily: "Inter",
    fontSize: "24px",
    fontWeight: "600",
    lineHeight: "146%",
    letterSpacing: "-0.1px",
}

const formInputButton = {
    backgroundColor: "#121316",
    transition: "all .15s linear",
    width: "100%",
    borderRadius: "32px",
    height: "3.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}

const buttonFormText = {
    fontFamily: "Inter",
    color: "#fff",
    letterSpacing: "-.25px",
    fontWeight: "500",
    fontSize: "1rem",
    userSelect: "none",
}
