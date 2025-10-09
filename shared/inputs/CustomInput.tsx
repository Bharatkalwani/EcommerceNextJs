import { styled, TextField, TextFieldProps } from '@mui/material'

type FieldTypes = "text" | "email" | "password" | "textArea";

type CustomTextFieldProps =  TextFieldProps & {
  fieldType?: FieldTypes;
  rows?: number;
}


const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  '& .MuiInputLabel-root': {
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.secondary,
  },
  '& .MuiInputBase-root': {
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    backgroundColor: '#fff',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
    },
  },
}))

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  fieldType = "text",
  rows = 3,
  ...rest
}) => {
  // For text area
  if (fieldType === "textArea") {
    return <StyledTextField {...rest} multiline rows={rows} />;
  }

  // For email, password, and text
  return <StyledTextField {...rest} type={fieldType} />;
};

export default CustomTextField
