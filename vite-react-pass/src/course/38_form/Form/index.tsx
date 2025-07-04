import InnerForm from "./Form";
import FormItem from "../FormItem";
type InnerFormType = typeof InnerForm;
interface FormInterface extends InnerFormType {
  Item: typeof FormItem;
}

const Form = InnerForm as FormInterface;
Form.Item = FormItem;
export default Form;
