import {
  PreviewComponent,
  Preview,
  Source,
  Highlight,
} from "@/components/Base/PreviewComponent";
import Dropzone, { DropzoneElement } from "@/components/Base/Dropzone";
import { useRef, useState } from "react";
import { FormSwitch } from "@/components/Base/Form";

function Main() {
  const dropzoneSingleRef = useRef<DropzoneElement>();
  const dropzoneMultipleRef = useRef<DropzoneElement>();
  const dropzoneValidationRef = useRef<DropzoneElement>();

  // State to track uploaded files for each dropzone
  const [singleFiles, setSingleFiles] = useState<File[]>([]);
  const [multipleFiles, setMultipleFiles] = useState<File[]>([]);
  const [validationFiles, setValidationFiles] = useState<File[]>([]);

  // Handlers for file uploads and errors
  const handleSingleUpload = (files: File[]) => {
    setSingleFiles(files);
    if (files.length > 0) {
      alert("Added file.");
    }
  };

  const handleSingleError = (error: string) => {
    alert(`Error: ${error}`);
  };

  const handleMultipleUpload = (files: File[]) => {
    setMultipleFiles(files);
    if (files.length > 0) {
      alert("Added file.");
    }
  };

  const handleMultipleError = (error: string) => {
    alert("No more files please!");
  };

  const handleValidationUpload = (files: File[]) => {
    setValidationFiles(files);
    if (files.length > 0) {
      alert("Added file.");
    }
  };

  const handleValidationError = (error: string) => {
    alert("No more files please!");
  };

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Dropzone</h2>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: Single File Upload */}
          <PreviewComponent className="intro-y box">
            {({ toggle }) => (
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Single File Upload
                  </h2>
                  <FormSwitch className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <FormSwitch.Label htmlFor="show-example-1">
                      Show example code
                    </FormSwitch.Label>
                    <FormSwitch.Input
                      id="show-example-1"
                      onClick={toggle}
                      className="ml-3 mr-0"
                      type="checkbox"
                    />
                  </FormSwitch>
                </div>
                <div className="p-5">
                  <Preview>
                    <Dropzone
                      getRef={(el) => {
                        dropzoneSingleRef.current = el;
                      }}
                      multiple={false}
                      accept="image/*"
                      maxSize={5}
                      onUpload={handleSingleUpload}
                      onError={handleSingleError}
                      className="mb-4"
                    />
                  </Preview>
                  <Source>
                    <Highlight>
                      {`
                <Dropzone
                  multiple={false}
                  accept="image/*"
                  maxSize={5}
                  onUpload={(files) => console.log('Uploaded:', files)}
                  onError={(error) => console.log('Error:', error)}
                />
                `}
                    </Highlight>
                  </Source>
                </div>
              </>
            )}
          </PreviewComponent>
          {/* END: Single File Upload */}
          {/* BEGIN: Multiple File Upload */}
          <PreviewComponent className="mt-5 intro-y box">
            {({ toggle }) => (
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    Multiple File Upload
                  </h2>
                  <FormSwitch className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <FormSwitch.Label htmlFor="show-example-2">
                      Show example code
                    </FormSwitch.Label>
                    <FormSwitch.Input
                      id="show-example-2"
                      onClick={toggle}
                      className="ml-3 mr-0"
                      type="checkbox"
                    />
                  </FormSwitch>
                </div>
                <div className="p-5">
                  <Preview>
                    <Dropzone
                      getRef={(el) => {
                        dropzoneMultipleRef.current = el;
                      }}
                      multiple={true}
                      accept="*"
                      maxSize={10}
                      onUpload={handleMultipleUpload}
                      onError={handleMultipleError}
                      className="mb-4"
                    />
                  </Preview>
                  <Source>
                    <Highlight>
                      {`
                <Dropzone
                  multiple={true}
                  accept="*"
                  maxSize={10}
                  onUpload={(files) => console.log('Uploaded:', files)}
                  onError={(error) => console.log('Error:', error)}
                />
                `}
                    </Highlight>
                  </Source>
                </div>
              </>
            )}
          </PreviewComponent>
          {/* END: Multiple File Upload */}
        </div>
        <div className="col-span-12 intro-y lg:col-span-6">
          {/* BEGIN: File Type Validation */}
          <PreviewComponent className="intro-y box">
            {({ toggle }) => (
              <>
                <div className="flex flex-col items-center p-5 border-b sm:flex-row border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="mr-auto text-base font-medium">
                    File Type Validation
                  </h2>
                  <FormSwitch className="w-full mt-3 sm:w-auto sm:ml-auto sm:mt-0">
                    <FormSwitch.Label htmlFor="show-example-3">
                      Show example code
                    </FormSwitch.Label>
                    <FormSwitch.Input
                      id="show-example-3"
                      onClick={toggle}
                      className="ml-3 mr-0"
                      type="checkbox"
                    />
                  </FormSwitch>
                </div>
                <div className="p-5">
                  <Preview>
                    <Dropzone
                      getRef={(el) => {
                        dropzoneValidationRef.current = el;
                      }}
                      multiple={true}
                      accept=".pdf,.doc,.docx,.txt"
                      maxSize={2}
                      onUpload={handleValidationUpload}
                      onError={handleValidationError}
                      className="mb-4"
                    />
                    <div className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                      * Only PDF, DOC, DOCX, and TXT files are allowed (max 2MB
                      each)
                    </div>
                  </Preview>
                  <Source>
                    <Highlight>
                      {`
                <Dropzone
                  multiple={true}
                  accept=".pdf,.doc,.docx,.txt"
                  maxSize={2}
                  onUpload={(files) => console.log('Uploaded:', files)}
                  onError={(error) => console.log('Error:', error)}
                />
                `}
                    </Highlight>
                  </Source>
                </div>
              </>
            )}
          </PreviewComponent>
          {/* END: File Type Validation */}
          {/* BEGIN: Upload Status */}
          <div className="mt-5 intro-y box">
            <div className="p-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <h2 className="text-base font-medium">Upload Status</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Single File Upload ({singleFiles.length} file
                  {singleFiles.length !== 1 ? "s" : ""})
                </h3>
                {singleFiles.length > 0 ? (
                  <ul className="text-sm text-slate-600 dark:text-slate-400">
                    {singleFiles.map((file, index) => (
                      <li key={index}>
                        • {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No files uploaded
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Multiple File Upload ({multipleFiles.length} file
                  {multipleFiles.length !== 1 ? "s" : ""})
                </h3>
                {multipleFiles.length > 0 ? (
                  <ul className="text-sm text-slate-600 dark:text-slate-400">
                    {multipleFiles.map((file, index) => (
                      <li key={index}>
                        • {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No files uploaded
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Validation Upload ({validationFiles.length} file
                  {validationFiles.length !== 1 ? "s" : ""})
                </h3>
                {validationFiles.length > 0 ? (
                  <ul className="text-sm text-slate-600 dark:text-slate-400">
                    {validationFiles.map((file, index) => (
                      <li key={index}>
                        • {file.name} ({(file.size / 1024 / 1024).toFixed(2)}{" "}
                        MB)
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No files uploaded
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* END: Upload Status */}
        </div>
      </div>
    </>
  );
}

export default Main;
