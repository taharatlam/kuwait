import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Image from "next/image";

const PrTabSec = ({ data }) => {
  const tabDesc =
    Array.isArray(data?.tabDesc) && data.tabDesc.length > 0
      ? data.tabDesc
      : null;

  // Always select the first tab by default, regardless of eventKey
  // For tabDesc, use the first tab's eventKey; otherwise, use "description"
  const getFirstTabKey = () => {
    if (tabDesc) {
      return tabDesc[0]?.heading?.toLowerCase().replace(/\s+/g, "-") || "tab-0";
    }
    return "description";
  };

  const [key, setKey] = useState(getFirstTabKey());

  // If tabDesc changes, reset to first tab
  React.useEffect(() => {
    setKey(getFirstTabKey());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabDesc]);

  if (tabDesc) {
    return (
      <section className="pr-tab-sec sec">
        <Tabs
          id="product-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4 cc-tabs"
        >
          {tabDesc.map((tab, idx) => {
            const eventKey =
              tab.heading?.toLowerCase().replace(/\s+/g, "-") || `tab-${idx}`;
            return (
              <Tab eventKey={eventKey} title={tab.heading} key={eventKey}>
                <div className="row align-items-center row-gap-25">
                  <div className={tab.image ? "col-lg-8 col-12" : "col-12"}>
                    <div
                      dangerouslySetInnerHTML={{ __html: tab.description }}
                    />
                  </div>
                  {tab.image && (
                    <div className="col-lg-4 col-12">
                      <Image
                        src={tab.image}
                        className="w-100 h-auto"
                        width={700}
                        height={700}
                        alt={tab.heading || "Tab image"}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>
              </Tab>
            );
          })}
        </Tabs>
      </section>
    );
  }

  return (
    <section className="pr-tab-sec sec">
      <Tabs
        id="product-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-4 cc-tabs"
      >
        <Tab eventKey="description" title="Description">
          <div className="row align-items-center row-gap-25">
            <div className="col-lg-8 col-12">
              <h3 className="mb-3">Product Description</h3>
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
            </div>
            {data?.DescriptionImage && (
              <div className="col-lg-4 col-12">
                <Image
                  src={data?.DescriptionImage?.url}
                  className="w-100"
                  width={500}
                  height={500}
                  alt={data?.DescriptionImage?.alt_text}
                />
              </div>
            )}
          </div>
        </Tab>
        <Tab eventKey="specifications" title="Specifications">
          <div className="tab-inner">
            <div dangerouslySetInnerHTML={{ __html: data?.attributes }}></div>
          </div>
        </Tab>
        <Tab eventKey="shipping" title="Shipping">
          <div className="tab-inner">
            <h4>Shipping Information</h4>
            <p>
              We offer fast and reliable shipping across all locations. Standard
              delivery takes 3-5 business days. Express shipping options are
              available at checkout.
            </p>
          </div>
        </Tab>
      </Tabs>
    </section>
  );
};

export default PrTabSec;
