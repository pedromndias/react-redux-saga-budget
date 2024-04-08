import { Form } from "semantic-ui-react";
import ButtonSaveOrCancel from "./ButtonSaveOrCancel";
import EntryForm from "./EntryForm";

function NewEntryForm({
    addEntry,
    value,
    setValue,
    description,
    setDescription,
    isExpense,
    setIsExpense,
}) {
    return (
        <Form unstackable>
            <EntryForm
                description={description}
                setDescription={setDescription}
                value={value}
                setValue={setValue}
                isExpense={isExpense}
                setIsExpense={setIsExpense}
            />

            <ButtonSaveOrCancel
                addEntry={addEntry}
            />
        </Form>
    );
}

export default NewEntryForm;
