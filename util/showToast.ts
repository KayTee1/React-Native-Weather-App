import Toast from "react-native-toast-message";

type ToastProps = {
  type: "success" | "error" | "info";
  message: string[];
};

// Function to show toast messages
export const showToast = ({ type, message }: ToastProps) => {
  Toast.show({
    type: type,
    text1: message[0],
    text2: message[1],
  });
};
