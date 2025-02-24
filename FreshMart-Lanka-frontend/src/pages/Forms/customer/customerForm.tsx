import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
// import DefaultInputs from "../../../components/form/form-elements/DefaultInputs.tsx";
// import SelectInputs from "../../../components/form/form-elements/SelectInputs.tsx";
// import TextAreaInput from "../../../components/form/form-elements/TextAreaInput.tsx";
// import InputStates from "../../../components/form/form-elements/InputStates.tsx";
import PageMeta from "../../../components/common/PageMeta.tsx";
import ComponentCard from "../../../components/common/ComponentCard.tsx";
import Label from "../../../components/form/Label.tsx";
import Input from "../../../components/form/input/InputField.tsx";
import Button from "../../../components/ui/button/Button.tsx";
import {EnvelopeIcon, FileIcon, PencilIcon} from "../../../icons";

export default function CustomerForm() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Customers Manage" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/*-----------------------Left Side-----------------------*/}
        <div className="space-y-6">
            <ComponentCard title="Detils">
                <div className="space-y-6">

                    {/*-----------------------Input Fields-----------------------*/}
                    <div>
                        <div>
                            <Label htmlFor="input">Customer Name</Label>
                            <Input type="text" id="input"/>
                        </div>

                        <div>
                            <Label htmlFor="input">Customer Address</Label>
                            <Input type="text" id="input"/>
                        </div>

                        <div>
                            <Label> Customer Email</Label>
                            <div className="relative">
                                <Input
                                    placeholder="info@gmail.com"
                                    type="text"
                                    className="pl-[62px]"
                                />
                                <span
                                    className="absolute left-0 top-1/2 -translate-y-1/2 border-r border-gray-200 px-3.5 py-3 text-gray-500 dark:border-gray-800 dark:text-gray-400">
              <EnvelopeIcon className="size-6"/>
            </span>
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="input">Customer Birthday</Label>
                            <Input type="date" id="input"/>
                        </div>
                    </div>


                    {/*---------------Buttons----------------*/}
                    <div className="flex items-center gap-5">
                        <Button
                            size="sm"
                            variant="primary"
                            startIcon={<FileIcon className="size-5"/>}
                        >
                            Save
                        </Button>
                        <Button
                            size="sm"
                            variant="warning"
                            startIcon={<PencilIcon className="size-5"/>}
                        >
                            Update
                        </Button>
                    </div>

                </div>
            </ComponentCard>
        </div>


          {/*-------------Right Side----------*/}
          <div className="space-y-6">

          </div>
      </div>
    </div>
  );
}
