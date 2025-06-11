import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fakerData from "@/utils/faker";
import Lucide from "@/components/Base/Lucide";
import { FormInput, FormLabel, FormTextarea } from "@/components/Base/Form";
import { Menu, Tab } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import Alert from "@/components/Base/Alert";
import LoadingIcon from "@/components/Base/LoadingIcon";
import { useAppSelector } from "@/stores/hooks";
import { selectDarkMode } from "@/stores/darkModeSlice";
import clsx from "clsx";
import _ from "lodash";

function Main() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const isDarkMode = useAppSelector(selectDarkMode);

  return (
    <>
      <div className="flex items-center mt-8 intro-y">
        <h2 className="mr-auto text-lg font-medium">Profile Settings</h2>
      </div>
      <Tab.Group>
        {/* BEGIN: Profile Menu */}
        <div className="col-span-12 lg:col-span-4 2xl:col-span-3 flex lg:block flex-col-reverse">
          <div className="mt-6 lg:mt-0 flex-1 dark:bg-darkmode-600 bg-white px-5 pt-5 pb-6 shadow-xl rounded-md">
            <div className="flex items-center pb-5 mb-5 border-b border-slate-200/60 dark:border-darkmode-400">
              <div className="w-12 h-12 image-fit">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="rounded-full"
                  src={fakerData[0].photos[0]}
                />
              </div>
              <div className="ml-4 mr-auto">
                <div className="font-medium text-base">
                  {fakerData[0].users[0].name}
                </div>
                <div className="text-slate-500">{fakerData[0].jobs[0]}</div>
              </div>
            </div>
            <Tab.List
              variant="boxed-tabs"
              className="border-transparent bg-transparent"
            >
              <Tab className="w-full py-2" as="button">
                <Lucide icon="User" className="w-4 h-4 mr-2" />
                Personal Information
              </Tab>
              <Tab className="w-full py-2" as="button">
                <Lucide icon="Shield" className="w-4 h-4 mr-2" />
                Account Settings
              </Tab>
              <Tab className="w-full py-2" as="button">
                <Lucide icon="Lock" className="w-4 h-4 mr-2" />
                Change Password
              </Tab>
              <Tab className="w-full py-2" as="button">
                <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                User Settings
              </Tab>
            </Tab.List>
          </div>
        </div>
        {/* END: Profile Menu */}
        <Tab.Panels className="col-span-12 lg:col-span-8 2xl:col-span-9">
          {/* BEGIN: Personal Information */}
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">
              {/* BEGIN: Personal Information */}
              <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12">
                    <Alert className="flex items-center mb-6" variant="pending">
                      <Lucide icon="AlertCircle" className="w-6 h-6 mr-2" />
                      Your account details below.
                    </Alert>
                  </div>
                  <div className="col-span-12 xl:col-span-6">
                    <div>
                      <FormLabel htmlFor="update-profile-form-1">
                        Display Name
                      </FormLabel>
                      <FormInput
                        id="update-profile-form-1"
                        type="text"
                        placeholder="Input text"
                        value={fakerData[0].users[0].name}
                        onChange={() => {}}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-span-12 xl:col-span-6">
                    <div>
                      <FormLabel htmlFor="update-profile-form-2">
                        Nearest MRT Station
                      </FormLabel>
                      <FormInput
                        id="update-profile-form-2"
                        type="text"
                        placeholder="Input text"
                        value="Amesbury"
                        onChange={() => {}}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <div>
                      <FormLabel htmlFor="update-profile-form-3">
                        Address
                      </FormLabel>
                      <FormTextarea
                        id="update-profile-form-3"
                        placeholder="Adress"
                        value="10 Anson Road, International Plaza, #10-11, 079903 Singapore, Singapore"
                        onChange={() => {}}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-span-12">
                    <Button variant="primary" type="button" className="w-20">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
              {/* END: Personal Information */}
            </div>
          </Tab.Panel>
          {/* END: Personal Information */}
          {/* BEGIN: Account Settings */}
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                <div>
                  <FormLabel htmlFor="update-profile-form-7">Email</FormLabel>
                  <FormInput
                    id="update-profile-form-7"
                    type="text"
                    placeholder="Input text"
                    value={fakerData[0].users[0].email}
                    onChange={() => {}}
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <FormLabel htmlFor="update-profile-form-8">Name</FormLabel>
                  <FormInput
                    id="update-profile-form-8"
                    type="text"
                    placeholder="Input text"
                    value={fakerData[0].users[0].name}
                    onChange={() => {}}
                    disabled
                  />
                </div>
                <div className="mt-3">
                  <FormLabel htmlFor="update-profile-form-9">
                    Department
                  </FormLabel>
                  <FormInput
                    id="update-profile-form-9"
                    type="text"
                    placeholder="Input text"
                    value={fakerData[0].jobs[0]}
                    onChange={() => {}}
                    disabled
                  />
                </div>
                <Button variant="primary" type="button" className="w-20 mt-3">
                  Save
                </Button>
              </div>
            </div>
          </Tab.Panel>
          {/* END: Account Settings */}
          {/* BEGIN: Change Password */}
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
                <div>
                  <FormLabel htmlFor="change-password-form-1">
                    Old Password
                  </FormLabel>
                  <FormInput
                    id="change-password-form-1"
                    type="password"
                    placeholder="Input text"
                  />
                </div>
                <div className="mt-3">
                  <FormLabel htmlFor="change-password-form-2">
                    New Password
                  </FormLabel>
                  <FormInput
                    id="change-password-form-2"
                    type="password"
                    placeholder="Input text"
                  />
                </div>
                <div className="mt-3">
                  <FormLabel htmlFor="change-password-form-3">
                    Confirm New Password
                  </FormLabel>
                  <FormInput
                    id="change-password-form-3"
                    type="password"
                    placeholder="Input text"
                  />
                </div>
                <Button variant="primary" type="button" className="w-20 mt-3">
                  Change
                </Button>
              </div>
            </div>
          </Tab.Panel>
          {/* END: Change Password */}
          {/* BEGIN: User Settings */}
          <Tab.Panel>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <div className="grid grid-cols-12 gap-6">
                  <div className="col-span-12 md:col-span-6">
                    <div>
                      <FormLabel>Available Authors</FormLabel>
                      <div className="mt-2">
                        {_.take(fakerData, 3).map((faker, fakerKey) => (
                          <div
                            key={fakerKey}
                            className="flex items-center mt-2"
                          >
                            <div className="w-8 h-8 image-fit">
                              <img
                                alt="Midone Tailwind HTML Admin Template"
                                className="rounded-full"
                                src={faker.photos[0]}
                              />
                            </div>
                            <div className="ml-3 mr-auto">
                              <div className="font-medium">
                                {faker.users[0].name}
                              </div>
                              <div className="text-slate-500 text-xs mt-0.5">
                                {faker.jobs[0]}
                              </div>
                            </div>
                            <div className="form-check form-switch">
                              <FormInput
                                className="show-code"
                                type="checkbox"
                                defaultChecked={fakerKey < 2}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div>
                      <FormLabel>Available Tags</FormLabel>
                      <div className="mt-2">
                        {_.take(
                          [
                            "jQuery",
                            "HTML",
                            "CSS",
                            "Laravel",
                            "VueJS",
                            "ReactJS",
                          ],
                          3,
                        ).map((tag, tagKey) => (
                          <div key={tagKey} className="flex items-center mt-2">
                            <div className="bg-slate-100 text-slate-500 rounded px-2 py-1">
                              #{tag}
                            </div>
                            <div className="ml-auto">
                              <div className="form-check form-switch">
                                <FormInput
                                  className="show-code"
                                  type="checkbox"
                                  defaultChecked={tagKey < 2}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="primary" type="button" className="w-20">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </Tab.Panel>
          {/* END: User Settings */}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export default Main;
