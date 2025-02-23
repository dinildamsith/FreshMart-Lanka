import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import DefaultInputs from "../../components/form/form-elements/DefaultInputs.tsx";
import SelectInputs from "../../components/form/form-elements/SelectInputs.tsx";
import TextAreaInput from "../../components/form/form-elements/TextAreaInput.tsx";
import InputStates from "../../components/form/form-elements/InputStates.tsx";
import InputGroup from "../../components/form/form-elements/InputGroup.tsx";
import FileInputExample from "../../components/form/form-elements/FileInputExample.tsx";
import CheckboxComponents from "../../components/form/form-elements/CheckboxComponents.tsx";
import RadioButtons from "../../components/form/form-elements/RadioButtons.tsx";
import ToggleSwitch from "../../components/form/form-elements/ToggleSwitch.tsx";


import DropzoneComponent from "../../components/form/form-elements/DropZone.tsx";

export default function CustomerForm() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="From Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <



              CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent  title={"d"}/>
        </div>
      </div>
    </div>
  );
}
