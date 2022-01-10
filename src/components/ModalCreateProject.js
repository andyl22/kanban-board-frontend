import Modal from "./Modal";
import FormCreateComponent from "./FormCreateComponent";
import ModalHeader from "./ModalHeader";

export default function ModalLogin(props) {
  const { toggleModal } = props;

  return (
    <Modal>
      <ModalHeader title={"Create A New Project"} toggleModal={toggleModal} />
      <FormCreateComponent toggleModal={toggleModal} />
    </Modal>
  );
}
