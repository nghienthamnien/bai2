import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// eslint-disable-next-line react/prop-types
export default function CreateUserForm(setIsOpen) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    date: Yup.date().required("Date of birth is required"),
    phone: Yup.string().required("Phone number is required"),
    avatar: Yup.string()
      .url("Invalid URL format")
      .required("Avatar URL is required"),
  });

  return (
    <div className="create-form">
      <h2>Tạo mới người dùng</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          date: "",
          phone: "",
          avatar: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Here you can handle form submission, like sending data to the server
          // For now, just log the form values
          console.log(values);
          setIsOpen(false); // Close the modal after form submission
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Tên người dùng</label>
              <Field type="text" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Ngày sinh</label>
              <Field type="date" name="date" />
              <ErrorMessage
                name="date"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <Field type="tel" name="phone" />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <Field type="url" name="avatar" />
              <ErrorMessage
                name="avatar"
                component="div"
                className="error-message"
              />
            </div>

            <div className="modal-action">
              <button
                className="cancel-btn"
                type="button"
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </button>
              <button
                className="accept-btn"
                type="submit"
                disabled={isSubmitting}
              >
                Tạo mới
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
