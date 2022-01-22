import Modal from "./Modal";
import FormLogin from "./FormLogin";
import ModalHeader from "./ModalHeader";

export default function ModalLogin(props) {
  const { toggleModal } = props;

  return (
    <Modal toggleModal={toggleModal}>
      <ModalHeader title={"Log In"} toggleModal={toggleModal} />
      <FormLogin toggleModal={toggleModal} />
    </Modal>
  );
}
