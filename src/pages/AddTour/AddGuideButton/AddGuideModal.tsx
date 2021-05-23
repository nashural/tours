import { FC, useMemo } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { Formik, FormikProps, Form } from "formik";
import { nanoid } from "nanoid";
import { InlineGuideForm } from "../../../types";
import { useApiClient } from "../../../hooks/useApiClient";
import { Guide } from "../../../api/types";

export const AddGuideModal: FC<{
  open: boolean;
  onAdd: (guide: Guide) => void;
  onClose: () => void;
}> = ({ open, onAdd, onClose }) => {
  const apiClient = useApiClient();
  const formId = useMemo(() => nanoid(), []);

  const initialValues: InlineGuideForm = useMemo(() => {
    return {
      name: ""
    };
  }, []);

  const handleSubmit = (values: InlineGuideForm) => {
    apiClient
      .createGuide(values)
      .then((guide) => {
        onAdd(guide);
      })
      .then(() => {
        onClose();
      });
  };

  return (
    <Modal isOpen={open} toggle={onClose}>
      <ModalHeader toggle={onClose}>Добавить гида</ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleBlur
          }: FormikProps<InlineGuideForm>) => {
            return (
              <Form id={formId}>
                <FormGroup>
                  <Label htmlFor="name">Имя гида</Label>
                  <Input
                    id="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormGroup>
              </Form>
            );
          }}
        </Formik>
      </ModalBody>
      <ModalFooter>
        <Button type="button" form={formId} onClick={onClose}>
          Отмена
        </Button>
        <Button type="submit" form={formId} color="primary">
          Добавить
        </Button>
      </ModalFooter>
    </Modal>
  );
};
