import * as Yup from "yup";


export const postSchema = Yup.object().shape({
    title: Yup.string().min(2, "please insert at least 2 characters!")
        .max(50, "pleas insert maximum 50 characters!").required("Titel is required"),
        description:Yup.string().required("Required")
})