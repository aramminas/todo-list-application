import Divider from "@mui/material/Divider";
import Loading, { LoadingProps } from "@/components/basic/Loading";
import AlertBlock, { AlertBlockProps } from "@/components/basic/AlertBlock";

type AlertLoadingWrapperProps = { loading: boolean } & AlertBlockProps & LoadingProps;

const AlertLoadingWrapper = ({ loading, color, message }: AlertLoadingWrapperProps) => {
  return (
    <>
      {loading && <Loading color={color} />}
      {message && loading && <Divider variant="fullWidth" component="hr" sx={{ marginY: 2 }} />}
      {message && <AlertBlock message={message} />}
    </>
  );
};

export default AlertLoadingWrapper;
