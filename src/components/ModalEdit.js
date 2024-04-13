import { Button, Modal } from "semantic-ui-react";
import EntryForm from "./EntryForm";
import { useDispatch } from 'react-redux'
import { closeEditModal } from "../actions/modals.actions";

function ModalEdit({
    isOpen,
    setIsOpen,
    value,
    setValue,
    description,
    setDescription,
    isExpense,
    setIsExpense,
}) {
    const dispatch = useDispatch()
    return (
        <Modal open={isOpen}>
            <Modal.Header>Edit entry</Modal.Header>
            <Modal.Content>
            <EntryForm
                description={description}
                setDescription={setDescription}
                value={value}
                setValue={setValue}
                isExpense={isExpense}
                setIsExpense={setIsExpense}
            />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => dispatch(closeEditModal())}>Close</Button>
                <Button onClick={() => dispatch(closeEditModal())} primary>Ok</Button>
            </Modal.Actions>
        </Modal>
    );
}

export default ModalEdit;
