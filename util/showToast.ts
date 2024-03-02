import Toast from "react-native-toast-message";

type ToastProps = {
  type: "success" | "error" | "info";
  message: string[];
};
export const showToast = ({ type, message }: ToastProps) => {
  Toast.show({
    type: type,
    text1: message[0],
    text2: message[1],
  });
};
