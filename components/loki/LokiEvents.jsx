import React from "react";
import Loki from "react-loki";
import "./Loki.css";
import Step1Component from "./Step1Component";
import Step2Component from "./Step2Component";
import Step3Component from "./Step3Component";

function LokiEvents(props) {
  console.log("Loki Events", props);

  const { eventData, setEvent, onSubmit } = props;

  const onFinalStep = (values) => {
    onSubmit(values);
  };

  const onNavigate = (values) => {
    setEvent((prevState) => {
      const newValues = { ...prevState, ...values };
      return newValues;
    });
  };

  const complexSteps = [
    {
      label: "Step 1",
      // icon: <AnyComponentYouWant />, //optional
      component: <Step1Component eventData={eventData} />,
    },
    {
      label: "Step 2",
      // icon: <AnyComponentYouWant />, //optional
      component: <Step2Component eventData={eventData} />,
    },
    {
      label: "Step 3",
      // icon: <AnyComponentYouWant />, //optional
      component: <Step3Component eventData={eventData} />,
    },
  ];

  // sending setter function here as props from Events (wrapped setter function);

  return (
    <div className="Demo">
      <Loki
        steps={complexSteps}
        onNext={onNavigate}
        onBack={onNavigate}
        onFinish={onFinalStep} // this will be onSubmit function being passed in
        noActions
      />
    </div>
  );
}

export default LokiEvents;
