import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// eslint-disable-next-line react/prop-types
export default function CreateProductForm(setIsOpen) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    quantity: Yup.number()
      .typeError("Quantity must be a number")
      .required("Quantity is required"),
    description: Yup.string().required("Description is required"),
    image: Yup.string()
      .url("Invalid URL format")
      .required("Image URL is required"),
  });

  return (
    <div className="create-form">
      <h2>Tạo mới sản phẩm</h2>
      <Formik
        initialValues={{
          name: "",
          price: "",
          quantity: 0,
          description: "",
          image: "",
        }}
        validationSchema={validationSchema}
        onSubmit={() => {
          setIsOpen(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Tên sản phẩm</label>
              <Field type="text" name="name" />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Giá sản phẩm</label>
              <Field type="number" name="price" step="0.01" />
              <ErrorMessage
                name="price"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Số lượng</label>
              <Field type="number" name="quantity" />
              <ErrorMessage
                name="quantity"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Mô tả</label>
              <Field as="textarea" name="description" rows="4" />
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Ảnh sản phẩm</label>
              <Field type="url" name="image" />
              <ErrorMessage
                name="image"
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