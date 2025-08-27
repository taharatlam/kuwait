"use client";
import React, { useState } from "react";
import Link from "next/link";
import api from "@/helpers/api";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialForm = {
  email: "",
  first_name: "",
  phone: "",
  password: "",
  confirm_password: "",
};

const validate = (values) => {
  const errs = {};
  if (!values.first_name.trim()) errs.first_name = "First name is required";
  if (!values.email.trim()) {
    errs.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errs.email = "Invalid email address";
  }
  if (!values.phone.trim()) {
    errs.phone = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(values.phone)) {
    errs.phone = "Enter a valid 10-digit Indian phone number";
  }
  if (!values.password) {
    errs.password = "Password is required";
  } else if (values.password.length < 6) {
    errs.password = "Password must be at least 6 characters";
  }
  if (!values.confirm_password) {
    errs.confirm_password = "Please confirm your password";
  } else if (values.password !== values.confirm_password) {
    errs.confirm_password = "Passwords do not match";
  }
  return errs;
};

const RegisterPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [phoneForOtp, setPhoneForOtp] = useState("");

  // OTP logic
  const handleOtpChange = (index, value) => {
    if (value.match(/^[0-9]$/) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setOtpError("");
      // Auto-focus next input
      if (value !== "" && index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      setOtpError("Please enter the 4-digit OTP");
      return;
    }
    setSubmitting(true);
    setOtpError("");
    try {
      // Send OTP to API for verification
      const res = await api.post("/api/verify-otp", {
        phone: phoneForOtp,
        otp: otpValue,
      });
      if (res.data && res.data.success) {
        setSuccess(true);
        setShowOTP(false);
      } else {
        setOtpError(res.data?.message || "Invalid OTP");
      }
    } catch (err) {
      setOtpError(
        err?.response?.data?.message ||
          "OTP verification failed. Please try again."
      );
    }
    setSubmitting(false);
  };

  const handleResendOtp = async () => {
    setOtp(["", "", "", ""]);
    setOtpError("");
    setSubmitting(true);
    try {
      await api.post("/api/resend-otp", { phone: phoneForOtp });
    } catch (err) {
      setOtpError("Failed to resend OTP. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div
      className="register-container sec py-5"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-5">
            <div className="register-card shadow p-4 bg-white rounded">
              <h2 className="text-center mb-4" style={{ fontWeight: 700 }}>
                {showOTP ? "Verify OTP" : "Create Your Account"}
              </h2>
              {success && (
                <div className="alert alert-success text-center">
                  Registration successful! You can now{" "}
                  <Link href="/login">login</Link>.
                </div>
              )}
              {apiError && (
                <div className="alert alert-danger text-center">{apiError}</div>
              )}
              {!showOTP ? (
                <Formik
                  initialValues={initialForm}
                  validate={validate}
                  onSubmit={async (values, { setSubmitting, setErrors }) => {
                    setApiError("");
                    setSuccess(false);
                    setSubmitting(true);
                    try {
                      const res = await api.post("/signup", {
                        email: values.email,
                        first_name: values.first_name,
                        phone: values.phone,
                        password: values.password,
                        confirm_password: values.confirm_password,
                      });
                      if (res.data && res.data.success) {
                        setShowOTP(true);
                        setPhoneForOtp(values.phone);
                        setSuccess(false);
                      } else {
                        setApiError(res.data?.message || "Registration failed");
                      }
                    } catch (err) {
                      setApiError(
                        err?.response?.data?.message ||
                          "Something went wrong. Please try again."
                      );
                    }
                    setSubmitting(false);
                  }}
                >
                  {({
                    isSubmitting,
                    errors,
                    touched,
                    values,
                    handleChange,
                    handleBlur,
                  }) => (
                    <Form noValidate>
                      <div className="form-group mb-3">
                        <label htmlFor="first_name" className="form-label">
                          First Name
                        </label>
                        <Field
                          type="text"
                          className={`form-control${
                            errors.first_name && touched.first_name
                              ? " is-invalid"
                              : ""
                          }`}
                          id="first_name"
                          name="first_name"
                          placeholder="Enter your first name"
                          autoComplete="given-name"
                        />
                        <ErrorMessage
                          name="first_name"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <Field
                          type="email"
                          className={`form-control${
                            errors.email && touched.email ? " is-invalid" : ""
                          }`}
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone Number
                        </label>
                        <div className="input-group">
                          <span className="input-group-text">+91</span>
                          <Field
                            type="tel"
                            className={`form-control${
                              errors.phone && touched.phone ? " is-invalid" : ""
                            }`}
                            id="phone"
                            name="phone"
                            placeholder="Enter your 10-digit phone number"
                            maxLength={10}
                            autoComplete="tel"
                            onChange={(e) => {
                              // Only allow numbers, max 10 digits
                              const val = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 10);
                              handleChange({
                                target: { name: "phone", value: val },
                              });
                            }}
                            onBlur={handleBlur}
                            value={values.phone}
                          />
                        </div>
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="invalid-feedback d-block"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <Field
                          type="password"
                          className={`form-control${
                            errors.password && touched.password
                              ? " is-invalid"
                              : ""
                          }`}
                          id="password"
                          name="password"
                          placeholder="Enter password"
                          autoComplete="new-password"
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label
                          htmlFor="confirm_password"
                          className="form-label"
                        >
                          Confirm Password
                        </label>
                        <Field
                          type="password"
                          className={`form-control${
                            errors.confirm_password && touched.confirm_password
                              ? " is-invalid"
                              : ""
                          }`}
                          id="confirm_password"
                          name="confirm_password"
                          placeholder="Confirm password"
                          autoComplete="new-password"
                        />
                        <ErrorMessage
                          name="confirm_password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary w-100 mb-3"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registering..." : "Register"}
                      </button>
                    </Form>
                  )}
                </Formik>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <p className="text-center mb-4">
                    We've sent a 4-digit OTP to +91 {phoneForOtp}
                  </p>
                  <div className="otp-inputs d-flex justify-content-between mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        className="form-control text-center"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !digit && index > 0) {
                            document.getElementById(`otp-${index - 1}`).focus();
                          }
                        }}
                        style={{ width: "60px" }}
                      />
                    ))}
                  </div>
                  {otpError && (
                    <div className="alert alert-danger text-center">
                      {otpError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={otp.some((digit) => digit === "") || submitting}
                  >
                    {submitting ? "Verifying..." : "Verify OTP"}
                  </button>
                  <div className="text-center">
                    <p>
                      Didn't receive the code?{" "}
                      <button
                        type="button"
                        className="btn btn-link p-0"
                        onClick={handleResendOtp}
                        disabled={submitting}
                      >
                        Resend
                      </button>
                    </p>
                    <button
                      type="button"
                      className="btn btn-link"
                      onClick={() => setShowOTP(false)}
                      disabled={submitting}
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
  );
};

export default RegisterPage;
