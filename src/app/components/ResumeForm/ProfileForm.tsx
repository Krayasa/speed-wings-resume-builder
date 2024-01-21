import { BaseForm } from "components/ResumeForm/Form";
import {
  Input,
  InputGroupWrapper,
  Textarea,
} from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";
import { ChangeEvent } from "react";
import Image from "next/image";
import { DeleteIconButton } from "./Form/IconButton";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, url, summary, location, picture } = profile;

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };
  const handleProfilePictureChange = (event: ChangeEvent<HTMLInputElement>) => {
    const type = "picture";
    const file = event.target.files?.[0];
    const reader = new FileReader();
    const field = "picture" as keyof ResumeProfile;

    reader.onload = () => {
      const value = reader.result as string;

      dispatch(changeProfile({ field, value, type }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const removeProfilePicture = () => {
    const type = "removepicture";
    const field = "picture" as keyof ResumeProfile;
    const value = "";
    dispatch(changeProfile({ field, value, type }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Ram Nepal"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="A Right Recruiter can hire a right talent"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="sarojphuyal@gmail.com"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(977) 9851345343"
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/speed-wings-human-resource"
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="Kathmandu, Nepal"
          value={location}
          onChange={handleProfileChange}
        />
        <div className="flex w-[100%] items-end gap-1 lg:w-[46%]">
          <InputGroupWrapper label={"Profile Picture"} className={"col-span-2"}>
            <div className="flex h-[100px] w-[200px] items-center justify-center border">
              <label
                className="flex cursor-pointer flex-col items-center gap-[5px]"
                htmlFor="file-upload"
              >
                <ArrowUpOnSquareIcon
                  className="text-black-700 h-5 w-5"
                  aria-hidden="true"
                />
                <span className="text-[12px]">Add Picture</span>
              </label>
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                name="profile"
                className="hidden"
                onChange={(event) => handleProfilePictureChange(event)}
              />
            </div>
          </InputGroupWrapper>
          {picture !== "" ? (
            <div className={"col-span-2 flex items-center"}>
              <div className="flex h-[100px] w-[200px] items-center justify-end">
                <img
                  src={`${picture}`}
                  alt="Preview"
                  className="rounded-xl"
                  style={{ width: "130px", height: "120px" }}
                />
              </div>
              <DeleteIconButton
                onClick={removeProfilePicture}
                tooltipText="Remove Picture"
              />
            </div>
          ) : null}
        </div>
      </div>
    </BaseForm>
  );
};
