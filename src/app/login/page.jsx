"use client";
import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  createRef,
} from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/helpers/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { GlobalDataContext } from "@/context/GlobalDataContext"; // Make sure this context exists and is set up
import Loader from "@/components/Loader";
import loginImage from "@/images/login.png";

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");

  const router = useRouter();
  const { userLogin } = useContext(GlobalDataContext);

  // Refs for autofocus
  const phoneInputRef = useRef(null);
  // Use createRef to ensure stable refs for each input
  const otpInputRefs = useRef([
    createRef(),
    createRef(),
    createRef(),
    createRef(),
  ]);

  // Autofocus phone input on mount and when showOTP is false
  useEffect(() => {
    if (!showOTP && phoneInputRef.current) {
      phoneInputRef.current.focus();
    }
  }, [showOTP]);

  // Autofocus first OTP input when showOTP becomes true
  useEffect(() => {
    if (showOTP && otpInputRefs.current[0].current) {
      otpInputRefs.current[0].current.focus();
    }
  }, [showOTP]);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
    setError("");
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");
    if (phoneNumber.length >= 10) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("phone", phoneNumber);

        const res = await api.post("/login/phone", formData);

        if (!res.status) {
          throw new Error("Failed to send OTP. Please try again.");
        }

        setShowOTP(true);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  };

  // Enhanced OTP input focus movement
  const handleOtpChange = (index, value) => {
    // Only allow numeric input or empty
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      setOtpError("");
      setOtpSuccess("");

      // If a digit is entered, move to next input
      if (value !== "" && index < 3) {
        // Use setTimeout to ensure focus after state update
        setTimeout(() => {
          if (otpInputRefs.current[index + 1].current) {
            otpInputRefs.current[index + 1].current.focus();
            otpInputRefs.current[index + 1].current.select();
          }
        }, 0);
      }
      // If cleared and not first, move to previous input
      if (value === "" && index > 0) {
        setTimeout(() => {
          if (otpInputRefs.current[index - 1].current) {
            otpInputRefs.current[index - 1].current.focus();
            otpInputRefs.current[index - 1].current.select();
          }
        }, 0);
      }
    }
  };

  // Allow moving focus with arrow keys and backspace
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        e.preventDefault();
        if (otpInputRefs.current[index - 1].current) {
          otpInputRefs.current[index - 1].current.focus();
          otpInputRefs.current[index - 1].current.select();
        }
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      if (otpInputRefs.current[index - 1].current) {
        otpInputRefs.current[index - 1].current.focus();
        otpInputRefs.current[index - 1].current.select();
      }
    } else if (e.key === "ArrowRight" && index < 3) {
      e.preventDefault();
      if (otpInputRefs.current[index + 1].current) {
        otpInputRefs.current[index + 1].current.focus();
        otpInputRefs.current[index + 1].current.select();
      }
    } else if (e.key.match(/^[0-9]$/)) {
      // If user types a digit, replace value and move focus
      e.preventDefault();
      handleOtpChange(index, e.key);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpError("");
    setOtpSuccess("");
    const otpValue = otp.join("");
    if (otpValue.length === 4) {
      setOtpLoading(true);
      try {
        const formData = new FormData();
        formData.append("phone", phoneNumber);
        formData.append("otp", otpValue);

        const res = await api.post("/login/phone/verify", formData);

        if (!res.status) {
          throw new Error(
            res.message || "OTP verification failed. Please try again."
          );
        }

        // Store user data in cookies and context
        if (res.data?.data) {
          // Store token and user info in cookies (expires in 3 days)
          Cookies.set("token", res.data?.data?.token, { expires: 3 });
          Cookies.set(
            "user",
            JSON.stringify({
              name: res.data?.data?.name,
              email: res.data?.data?.email,
              initials: res.data?.data?.initials,
            }),
            { expires: 3 }
          );

          console.log("data user", res);

          userLogin(
            {
              name: res.data?.data?.name,
              email: res.data?.data?.email,
              initials: res.data?.data?.initials,
            },
            res.data?.data?.token
          );
        }

        setOtpSuccess(res.data?.message || "OTP Verified! Redirecting...");

        // Redirect after short delay
        setTimeout(() => {
          const searchParams = new URLSearchParams(window.location.search);
          if (searchParams.get("from")) {
            router.push(`/${searchParams.get("from")}`);
          } else {
            router.push("/profile");
          }
        }, 1200);
      } catch (err) {
        setOtpError(
          err.message || "Something went wrong during OTP verification."
        );
      } finally {
        setOtpLoading(false);
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Implement custom Google login logic here
  };

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // Implement custom Facebook login logic here
  };

  const handleResendOtp = async () => {
    setOtpError("");
    setOtpSuccess("");
    setOtp(["", "", "", ""]);
    setOtpLoading(true);
    try {
      const formData = new FormData();
      formData.append("phone", phoneNumber);

      const res = await api.post("/login/phone", formData);

      if (!res.status) {
        throw new Error("Failed to resend OTP. Please try again.");
      }
      setOtpSuccess("OTP resent successfully!");
      // Focus first OTP input after resend
      setTimeout(() => {
        if (otpInputRefs.current[0].current) {
          otpInputRefs.current[0].current.focus();
          otpInputRefs.current[0].current.select();
        }
      }, 100);
    } catch (err) {
      setOtpError(err.message || "Something went wrong while resending OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="login-container sec">
      <div className="container">
        <div className="login-wrapper">
          <div className="row row-gap-25 align-items-center">
            <div className="col-lg-5 col-12">
              <Image src={loginImage} alt="Login" className="w-100 h-auto" />
            </div>
            <div className="col-lg-7  col-12">
              <div className="row justify-content-center">
                <div className="col-md-12 col-lg-12">
                  <div className="login-card">
                    <h2 className="text-center h5 text-uppercase color-accent mb-2">
                      {showOTP ? "Verify OTP" : "Welcome Back"}
                    </h2>
                    <p className="text-center body-2 mb-4 color-gray">
                      {showOTP
                        ? "Enter the 4-digit code sent to your phone"
                        : "Enter your phone number to continue to your account"}
                    </p>

                    {error && (
                      <div className="alert alert-danger text-center">
                        {error}
                      </div>
                    )}

                    {!showOTP ? (
                      <>
                        <form onSubmit={handleContinue}>
                          <div className="form-group mb-4">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <div className="input-group mt-2">
                              <div className="input-group-prepend mr-2">
                                <span className="input-group-text">+91</span>
                              </div>
                              <input
                                type="tel"
                                className="form-control ml-2"
                                id="phoneNumber"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                maxLength={10}
                                required
                                disabled={loading}
                                ref={phoneInputRef}
                                autoFocus
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="main-btn wide w-100 mb-4"
                            disabled={phoneNumber.length < 10 || loading}
                          >
                            <span>
                              {loading
                                ? "Sending..."
                                : "Send One Time Password "}
                            </span>
                          </button>
                        </form>

                        <div className="social-login">
                          <p
                            className="text-center mb-3"
                            style={{ color: "#888", fontSize: "15px" }}
                          >
                            Or login with
                          </p>
                          <div className="d-flex justify-content-between gap-2">
                            <button
                              onClick={handleGoogleLogin}
                              type="button"
                              className="social-btn flex-grow-1 me-2"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                border: "1px solid #e0e0e0",
                                background: "#fff",
                                borderRadius: "100px",
                                padding: "10px 0",
                                fontWeight: 500,
                                fontSize: "16px",
                                color: "#222",
                                transition: "box-shadow 0.15s",
                                boxShadow: "none",
                                outline: "none",
                                cursor: "pointer",
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 48 48"
                                  fill="none"
                                >
                                  <g>
                                    <path
                                      fill="#4285F4"
                                      d="M43.6 20.5h-1.9V20H24v8h11.3c-1.6 4.3-5.7 7-11.3 7-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6-6C34.5 5.1 29.5 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.2-.1-2.5z"
                                    />
                                    <path
                                      fill="#34A853"
                                      d="M6.3 14.7l6.6 4.8C14.3 16.1 18.7 13 24 13c2.6 0 5 .8 7 2.3l6-6C34.5 5.1 29.5 3 24 3c-7.2 0-13.4 4-16.7 9.7z"
                                    />
                                    <path
                                      fill="#FBBC05"
                                      d="M24 43c5.3 0 10.3-1.8 14.1-5l-6.5-5.3C29.2 34.6 26.7 35.5 24 35.5c-5.6 0-10.3-3.7-12-8.7l-6.6 5.1C7.7 39.1 15.2 43 24 43z"
                                    />
                                    <path
                                      fill="#EA4335"
                                      d="M43.6 20.5h-1.9V20H24v8h11.3c-1.1 3-3.5 5.5-6.3 7.1l6.5 5.3C39.7 38.2 44 33.5 44 24c0-1.3-.1-2.2-.4-3.5z"
                                    />
                                  </g>
                                </svg>
                              </span>
                              <span>Google</span>
                            </button>
                            <button
                              onClick={handleFacebookLogin}
                              type="button"
                              className="social-btn flex-grow-1"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "8px",
                                border: "1px solid #e0e0e0",
                                background: "#fff",
                                borderRadius: "100px",
                                padding: "10px 0",
                                fontWeight: 500,
                                fontSize: "16px",
                                color: "#222",
                                transition: "box-shadow 0.15s",
                                boxShadow: "none",
                                outline: "none",
                                cursor: "pointer",
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <svg
                                  width="20"
                                  height="20"
                                  viewBox="0 0 32 32"
                                  fill="none"
                                >
                                  <path
                                    d="M29 16C29 8.82 23.18 3 16 3S3 8.82 3 16c0 6.47 4.84 11.8 11 12.8V20.5h-3.3V16H14v-2.8c0-3.2 1.92-5 4.87-5 1.41 0 2.88.25 2.88.25v3.17h-1.62c-1.6 0-2.1.99-2.1 2v2.38h3.58l-.57 4.5H18V28.8C24.16 27.8 29 22.47 29 16Z"
                                    fill="#1877F3"
                                  />
                                  <path
                                    d="M20.43 20.5l.57-4.5h-3.58V13.62c0-1.01.5-2 2.1-2h1.62V8.45S18.28 8.2 16.87 8.2c-2.95 0-4.87 1.8-4.87 5V16H7.7v4.5H12v8.3c.65.1 1.32.2 2 .2s1.35-.07 2-.2v-8.3h2.43Z"
                                    fill="#fff"
                                  />
                                </svg>
                              </span>
                              <span>Facebook</span>
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <form onSubmit={handleVerifyOtp}>
                        <p className="text-center mb-4">
                          We've sent a 4-digit OTP to +91{" "}
                          {phoneNumber.length > 4
                            ? "*".repeat(phoneNumber.length - 4) +
                              phoneNumber.slice(-4)
                            : phoneNumber}
                        </p>

                        {otpError && (
                          <div className="alert alert-danger text-center">
                            {otpError}
                          </div>
                        )}
                        {otpSuccess && (
                          <div className="alert alert-success text-center">
                            {otpSuccess}
                          </div>
                        )}

                        <div className="otp-inputs d-flex justify-content-between mb-4">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              type="text"
                              className="form-control text-center"
                              maxLength={1}
                              value={digit}
                              onChange={(e) =>
                                handleOtpChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleOtpKeyDown(e, index)}
                              style={{ width: "60px" }}
                              disabled={otpLoading}
                              ref={otpInputRefs.current[index]}
                              autoFocus={index === 0}
                              inputMode="numeric"
                              pattern="[0-9]*"
                            />
                          ))}
                        </div>

                        <button
                          type="submit"
                          className="main-btn wide w-100 mb-4"
                          disabled={
                            otp.some((digit) => digit === "") || otpLoading
                          }
                        >
                          {otpLoading ? (
                            <Loader color="white" />
                          ) : (
                            <span>Verify OTP</span>
                          )}
                        </button>

                        <div className="text-center">
                          <p>
                            Didn't receive the code?{" "}
                            <button
                              type="button"
                              className="btn btn-link p-0 color-blue"
                              onClick={handleResendOtp}
                              disabled={otpLoading}
                            >
                              {otpLoading ? "Resending..." : "Resend"}
                            </button>
                          </p>
                          <button
                            type="button"
                            className="btn btn-link color-blue"
                            onClick={() => {
                              setShowOTP(false);
                              setOtp(["", "", "", ""]);
                              setOtpError("");
                              setOtpSuccess("");
                              setTimeout(() => {
                                if (phoneInputRef.current) {
                                  phoneInputRef.current.focus();
                                }
                              }, 100);
                            }}
                            disabled={otpLoading}
                          >
                            Change Phone Number
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
