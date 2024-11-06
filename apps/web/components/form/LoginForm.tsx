"use client";
import React from "react";
import { Form } from "@repo/ui/component";
import { LoginSchema } from "@/utils/formSchema";
import { GithubLogin, GoolgeLogin } from "../buttons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
//
export const LoginForm = () => {
  const navigate = useRouter();
  return (
    <Form.Root
      schema={LoginSchema}
      className=" w-[400px]  flex flex-col items-center gap-[20px] border-[#dfddd2] border-[1px] rounded-md py-[20px]"
      onSubmit={async (data: { email: string; password: string }) => {
        console.log(data);
        const res = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });
        if (res?.ok) {
          navigate.push("/");
        }
      }}
    >
      <GoolgeLogin
        text="Login with google"
        style={{ width: "90%", height: "50px" }}
      />
      <GithubLogin style={{ width: "90%" }} text="Login with github" />
      <div className="w-[90%] flex items-center gap-[10px]">
        <span className="w-[100%] h-[1px] bg-[#dfddd2]"></span>
        <span className="flex-1 text-[#403F3E] font-[500]">or</span>
        <span className="w-[100%] h-[1px] bg-[#dfddd2]"></span>
      </div>
      <div className="w-[90%] flex flex-col gap-[25px]">
        <Form.Content />
      </div>
      <Form.Submit className=" bottom-[10px] w-[90%] h-[50px] mt-[50px]">
        <div
          style={{
            width: "100%",
            height: "100%",
          }}
          className={
            "flex justify-center items-center bg-[#FF4F01] hover:bg-[#d03f01] text-[18px] font-[500]  text-white  rounded-full  transition-all duration-200 ease-out"
          }
        >
          Login
        </div>
      </Form.Submit>
    </Form.Root>
  );
};
