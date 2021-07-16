import axios from "axios";
import "./inputsearch.css";
import { Formik, Form, useField } from "formik";
import { Button } from "react-bootstrap";
import * as Yup from "yup";
import useHeroContext from "../../context/HeroContext";

const MyTextInput = ({ label, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      <label className="form__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input {...field} {...props} />
    </>
  );
};

const InputSearch = ({ searchResponse, Seterror, dataResponse }) => {
  const { setIsLoading } = useHeroContext();

  return (
    <Formik
      initialValues={{
        hero: "",
      }}
      validationSchema={Yup.object({
        hero: Yup.string()
          .max(15, "Must be 15 characters or less")
          .required("Required"),
      })}
      onSubmit={async (values) => {
        setIsLoading(true);
        try {
          const heroresponse = await axios.get(
            `/4298272713525886/search/${values.hero}`
          );
          searchResponse(heroresponse.data);

          if (
            dataResponse === "" ||
            dataResponse === undefined ||
            !dataResponse
          ) {
            Seterror(true);
          } else {
            Seterror(false);
          }
          setIsLoading(false);
        } catch (error) {
          console.log("error", error.message);
        }
      }}
    >
      <Form className="form__formik">
        <MyTextInput
          className="form__input"
          label="hero"
          name="hero"
          type="text"
          placeholder="Busque su héroe ejem: batman"
        />

        <Button className="form__button" type="submit">
          <span>Submit</span>
        </Button>
      </Form>
    </Formik>
  );
};

export default InputSearch;
