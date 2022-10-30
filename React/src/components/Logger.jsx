import React from "react";
import { useFormikContext } from "formik";
const Logger = () => {
  const formik = useFormikContext();
  React.useEffect(() => {
    console.log("values", formik.values);
  }, [formik.values]);
  return null;
};
export default Logger;
