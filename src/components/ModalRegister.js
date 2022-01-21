import Modal from "./Modal";
import FormRegister from "./FormRegister";
import ModalHeader from "./ModalHeader";

export default function ModalRegister(props) {
  const { toggleModal } = props;

  return (
    <Modal>
      <ModalHeader title={"Register"} toggleModal={toggleModal} />
      <FormRegister toggleModal={toggleModal} />
    </Modal>
  );
}
