/**
 * @author Vijendra Yadav <Vijendra.Yadav@nrcan-rncan.gc.ca >
 */
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { object, string } from "yup";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const initialValues = {
  uuid: "",
  language: "",
  plugin: "",
};

async function getSchema(uuid, language, pluginType) {
  try {
    return await api.get("/plugins", {
      params: {
        id: uuid,
        language: language,
        pluginType: pluginType,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
const InputForm = () => {
  let navigate = useNavigate();
  return (
    <div className="InputForm">
      <Typography variant="h4">Welcome to NRCan Internal</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={object({
          uuid: string().required("Please enter UUID").uuid("Invalid UUID"),
          language: string().required("Please select Language"),
          plugin: string().required("Please provide desired plugin"),
        })}
        onSubmit={(values, formikHelpers) => {
          const schema = getSchema(values.uuid, values.language, values.plugin);
          schema.then(function (response) {
            navigate("/plugin", {
              state: { data: response.data, desiredPlugin: values.plugin },
            });
            formikHelpers.resetForm();
          });
        }}
      >
        {({ values, setFieldValue, errors, isValid, touched, dirty }) => (
          <Form>
            <Field
              name="uuid"
              type="uuid"
              as={TextField}
              variant="outlined"
              color="primary"
              label="UUID"
              placeholder={"Please ENTER valid UUID value"}
              fullWidth
              error={Boolean(errors.uuid) && Boolean(touched.uuid)}
              helperText={Boolean(touched.uuid) && errors.uuid}
            />

            <Box height={14} />

            <FormControl component="fieldset">
              <FormLabel component="legend">Language</FormLabel>

              <RadioGroup
                row
                aria-label="language"
                name="row-radio-buttons-group"
                value={values.initialValues}
                onChange={(event) => {
                  setFieldValue("language", event.currentTarget.value);
                }}
              >
                <FormControlLabel
                  value="English"
                  control={<Radio />}
                  label="English"
                />
                <FormControlLabel
                  value="French"
                  control={<Radio />}
                  label="French"
                />
              </RadioGroup>
            </FormControl>

            <FormControl component="fieldset">
              <FormLabel component="legend">Available Plugin</FormLabel>
              <RadioGroup
                row
                aria-label="plugin"
                name="row-radio-buttons-group"
                value={values.initialValues}
                onChange={(event) => {
                  setFieldValue("plugin", event.currentTarget.value);
                }}
              >
                <Box height={16} />
                <FormControlLabel
                  value="Range Slider"
                  control={<Radio />}
                  label="Range Slider"
                />
                <FormControlLabel
                  value="Chart"
                  control={<Radio />}
                  label="Chart"
                />
                <FormControlLabel
                  value="Swiper"
                  control={<Radio />}
                  label="Swiper"
                />
                <FormControlLabel
                  value="Draw Toolbar"
                  control={<Radio />}
                  label="Draw Toolbar"
                />
                <FormControlLabel
                  value="Thematic Chart"
                  control={<Radio />}
                  label="Thematic Chart"
                />
              </RadioGroup>
            </FormControl>
            <Box height={14} />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={!isValid || !dirty}
            >
              SUBMIT
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InputForm;
