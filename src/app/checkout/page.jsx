"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/helpers/api";
import Image from "next/image";
import Select from "react-select";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { GlobalDataContext } from "@/context/GlobalDataContext";

// Custom styles for react-select
const customSelectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#007bff" : "#ced4da",
    boxShadow: state.isFocused ? "0 0 0 1px #007bff" : "none",
    minHeight: "55px",
    fontSize: "16px",
    padding: "12px 12px",
    paddingRight: "0px",
    cursor: "pointer",
  }),
  menu: (provided) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required").max(50),
  lastName: Yup.string().required("Last Name is required").max(50),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9+\-\s()]{7,20}$/, "Invalid phone number"),
  address1: Yup.string().required("Address Line 1 is required"),
  address2: Yup.string(),
  country: Yup.object().nullable().required("Country is required"),
  city: Yup.object().nullable().required("City is required"),
  state: Yup.object().nullable().required("State is required"),
  pincode: Yup.string().required("Pincode is required"),
});

const page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const router = useRouter();
  const [cart, setCart] = useState(null);
  const [cartTotal, setCartTotal] = useState(null);
  const formikSubmitRef = useRef(null);
  const { user } = useContext(GlobalDataContext);

  useEffect(() => {
    const fetchCountry = async () => {
      const response = await api.get("/countries");
      setCountry(response.data);
      handleCountryChange(response.data[0].id);
    };
    fetchCountry();
  }, []);

  const handleCountryChange = async (option) => {
    const stateResponse = await api.get(`/states/${option}`);
    setState(stateResponse.data);
    handleStateChange(stateResponse.data[0].id);
  };

  const handleStateChange = async (option) => {
    const cityResponse = await api.get(`/cities/${option}`);
    setCity(cityResponse.data);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      setIsLoggedIn(!!token);
      const fetchCart = async () => {
        const response = await api.get("/cart", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });

        setCartLoading(false);
        setCart(response.data.data);
      };
      const fetchCartTotal = async () => {
        const response = await api.get("/cart/total", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log("cart total", response.data);
        setCartTotal(response.data);
      };
      if (token) {
        setCartLoading(true);
        fetchCart();
        fetchCartTotal();
      }
    }
  }, []);

  useEffect(() => {
    if (cart?.length === 0) {
      toast.error("Cart is empty");
      router.push("/cart");
    }
  }, [cart]);

  if (isLoggedIn === null) {
    return (
      <div className="cart-page sec">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center py-5">
              <div
                className="spinner-border text-primary"
                role="status"
                style={{ width: "2rem", height: "2rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Helper to show error message for a field
  const renderError = (name, touched, errors) => {
    if (touched[name] && errors[name]) {
      return <div className="invalid-feedback d-block">{errors[name]}</div>;
    }
    return null;
  };

  return (
    <div className="checkout-page sec">
      <Formik
        initialValues={{
          firstName: user?.firstname || "",
          lastName: user?.lastname || "",
          address1: user?.address || "",
          address2: user?.appartment || "",
          country: user?.country || null,
          city: user?.city || null,
          state: user?.state || null,
          pincode: user?.pincode || "",
          email: user?.email || "",
          phone: user?.phone || "",
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting }) => {
          const payload = {
            firstname: values.firstName,
            lastname: values.lastName,
            address: values.address1,
            appartment: values.address2,
            country: values.country,
            state: values.state,
            city: values.city,
            pincode: values.pincode,
            phone: values.phone,
            email: values.email,
          };

          try {
            const response = await api.post("/checkout", payload, {
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            });
            console.log("response", response);
            if (response?.data?.status === 200) {
              toast.success("Order placed successfully");
              router.push("/order");
            } else {
              toast.error("Something went wrong. Please try again.");
            }
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => {
          // Save the submitForm function to the ref so we can call it from the OrderSummary button
          formikSubmitRef.current = formikProps.submitForm;
          const {
            values,
            setFieldValue,
            isSubmitting,
            touched,
            errors,
            handleBlur,
          } = formikProps;

          return (
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-12">
                  <h2>Checkout</h2>
                  <Form>
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Field
                              type="text"
                              name="firstName"
                              placeholder="First Name"
                              className={`form-control${
                                touched.firstName && errors.firstName
                                  ? " is-invalid"
                                  : ""
                              }`}
                            />
                          </div>
                          {renderError("firstName", touched, errors)}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Field
                              type="text"
                              name="lastName"
                              placeholder="Last Name"
                              className={`form-control${
                                touched.lastName && errors.lastName
                                  ? " is-invalid"
                                  : ""
                              }`}
                            />
                          </div>
                          {renderError("lastName", touched, errors)}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Field
                              type="email"
                              name="email"
                              placeholder="Email"
                              className={`form-control${
                                touched.email && errors.email
                                  ? " is-invalid"
                                  : ""
                              }`}
                            />
                          </div>
                          {renderError("email", touched, errors)}
                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Field
                              type="text"
                              name="phone"
                              placeholder="Phone Number"
                              className={`form-control${
                                touched.phone && errors.phone
                                  ? " is-invalid"
                                  : ""
                              }`}
                            />
                          </div>
                          {renderError("phone", touched, errors)}
                        </div>
                      </div>
                    </div>
                    <div className="sep"></div>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <h3>Shipping Address</h3>
                      </div>
                      <div className="col-lg-12 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Field
                              type="text"
                              name="address1"
                              placeholder="Address Line 1"
                              className={`form-control${
                                touched.address1 && errors.address1
                                  ? " is-invalid"
                                  : ""
                              }`}
                            />
                          </div>
                          {renderError("address1", touched, errors)}
                        </div>
                      </div>
                      <div className="col-lg-12 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Field
                              type="text"
                              name="pincode"
                              placeholder="Pincode"
                              className={`form-control${
                                touched.pincode && errors.pincode
                                  ? " is-invalid"
                                  : ""
                              }`}
                            />
                          </div>
                          {renderError("pincode", touched, errors)}
                        </div>
                      </div>
                      <div className="col-lg-12 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Field
                              type="text"
                              name="address2"
                              placeholder="Address Line 2"
                              className="form-control"
                            />
                          </div>
                          {renderError("address2", touched, errors)}
                        </div>
                      </div>
                      <div className="col-lg-4 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Select
                              name="country"
                              options={
                                country?.map((item) => ({
                                  value: item.id,
                                  label: item.name,
                                })) || []
                              }
                              placeholder="Select Country"
                              classNamePrefix="react-select"
                              styles={customSelectStyles}
                              value={values.country}
                              onChange={(option) => {
                                setFieldValue("country", option);
                                handleCountryChange(option.value);
                              }}
                              onBlur={handleBlur}
                            />
                          </div>
                          {touched.country && errors.country && (
                            <div className="invalid-feedback d-block">
                              {errors.country}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Select
                              name="state"
                              options={
                                state?.map((item) => ({
                                  value: item.id,
                                  label: item.name,
                                })) || []
                              }
                              placeholder="Select State"
                              classNamePrefix="react-select"
                              styles={customSelectStyles}
                              value={values.state}
                              onChange={(option) => {
                                setFieldValue("state", option);
                                handleStateChange(option.value);
                              }}
                              onBlur={handleBlur}
                            />
                          </div>
                          {touched.state && errors.state && (
                            <div className="invalid-feedback d-block">
                              {errors.state}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 col-12">
                        <div className="form-group">
                          <div className="inp-grp">
                            <Select
                              name="city"
                              options={
                                city?.map((item) => ({
                                  value: item.id,
                                  label: item.name,
                                })) || []
                              }
                              placeholder="Select City"
                              classNamePrefix="react-select"
                              styles={customSelectStyles}
                              value={values.city}
                              onChange={(option) =>
                                setFieldValue("city", option)
                              }
                              onBlur={handleBlur}
                            />
                          </div>
                          {touched.city && errors.city && (
                            <div className="invalid-feedback d-block">
                              {errors.city}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* You can add a submit button here if you want to handle the form submission */}
                    {/* <button type="submit" className="main-btn blue mt-3" disabled={isSubmitting}>
                      Place Order
                    </button> */}
                  </Form>
                </div>
                <div className="col-lg-4 col-12">
                  {cartTotal ? (
                    <OrderSummary
                      cart={cart}
                      cartTotal={cartTotal}
                      buttonText={"Place Order"}
                      isLoading={isSubmitting}
                      buttonClick={() => {
                        if (formikSubmitRef.current) {
                          formikSubmitRef.current();
                        }
                      }}
                    />
                  ) : (
                    <div
                      className="text-center py-5"
                      style={{ minHeight: "20vh" }}
                    >
                      <div
                        className="spinner-border text-primary"
                        role="status"
                        style={{ width: "2rem", height: "2rem" }}
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default page;
