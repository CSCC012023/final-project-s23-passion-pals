import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../../images/success.png";
import styles from "./styles.module.css";

const EmailVerify = () => {
  const [validUrl, setValidUrl] = useState();
  const param = useParams();

  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {

        const response = await axios.get(`/${param.id}/verify/${param.token}`);
        console.log(response.data);
        setValidUrl(true);
      } catch (error) {
        console.log(error.message);
        setValidUrl(false);
      }
    };
    verifyEmailUrl();
  }, [param]);

  return (
    <React.Fragment>
      {validUrl ? (
         <div className={styles.container}>
         <img src={success} alt="success_img" className={styles.success_img} />
         <h1>Thank you</h1>
         <p>Your email has been successfully verified </p>
         <Link to="/signup">
           <button className={styles.green_btn}>Continue</button>
         </Link>
       </div>
      ) : (
        <div className={styles.container}><h1>404 Not Found</h1></div>
        
      )}
    </React.Fragment>
  );
};

export default EmailVerify;
