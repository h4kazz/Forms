import { Form, useForm, Watch } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import postData from "../services/post";

function YoutubeForm({ fetchUsers }) {
  const {
    register,
    handleSubmit,
    reset,
    // watch,
    // getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userName: "",
      email: "",
      channel: "",
    },
    mode: "onBlur", // validate on Blur  initially
    reValidateMode: "onChange", // revalidate on every change after blur
  });

  // const { username, email } = watch();

  const submitHandler = async (formData, event) => {
    event.preventDefault();
    await postData(formData);
    fetchUsers();
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <form
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 space-y-6"
        >
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Youtube Form
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Užpildyk laukus ir pateik formą.
            </p>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="username"
              className="text-sm font-medium text-slate-700"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              {...register("username", {
                required: "User name is required",
                maxLength: { value: 10, message: "User name is too long" },
              })}
            />
            <div className="text-sm text-red-600 min-h-5">
              {errors.username?.message}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-slate-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
                validate: {
                  notAdmin: (fieldValue) => {
                    return (
                      fieldValue !== "admin@gmail.com" || "Enter diferent email"
                    );
                  },
                  notBlackListed: (fieldValue) => {
                    return (
                      !fieldValue.endsWith("bademail.com") ||
                      "this email not allowed"
                    );
                  },
                },
              })}
            />
            <div className="text-sm text-red-600 min-h-5">
              {errors.email?.message}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">
              Favorite Channel
              <br />
              <select
                {...register("channel")}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
              >
                <option value="">-- Select a channel --</option>
                <option value="Code with Ania Kubow">
                  Code with Ania Kubow
                </option>
                <option value="Kevin Powell">Kevin Powell</option>
                <option value="Net Ninja">Net Ninja</option>
              </select>
            </label>
            <div className="text-sm text-red-600 min-h-5">
              {errors.channel?.message}
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-700">
              Choose your favorite color:
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  value="red"
                  {...register("color")}
                  className="h-4 w-4 accent-slate-900"
                />
                Red
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  value="green"
                  {...register("color")}
                  className="h-4 w-4 accent-slate-900"
                />
                Green
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="radio"
                  value="blue"
                  {...register("color")}
                  className="h-4 w-4 accent-slate-900"
                />
                Blue
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-sm font-medium text-slate-700">
              Select your hobbies:
            </div>

            <div className="flex flex-col gap-2">
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  value="Reading"
                  {...register("hobbies", {
                    validate: (value) =>
                      value.length > 0 || "Please select at least one",
                  })}
                  className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                />
                Reading
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  value="Traveling"
                  {...register("hobbies")}
                  className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                />
                Traveling
              </label>

              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  value="Cooking"
                  {...register("hobbies")}
                  className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                />
                Cooking
              </label>
            </div>
          </div>

          {/* <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h1 className="text-sm font-semibold text-slate-800">Form Data</h1>
            <div className="mt-2 space-y-1 text-sm text-slate-700">
              {username && <p>User Name {username}</p>}
              {email && <p>Email: {email}</p>}
            </div>
          </div> */}

          {/* <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Password:
                <br />
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  placeholder="Enter password"
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    validate: (value) => {
                      return value === getValues("password") || "Password not match";
                    },
                  })}
                />
              </label>
              <div className="text-sm text-red-600 min-h-[20px]">
                {errors.password?.message}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">
                Reapeat password:
                <br />
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-200"
                  placeholder="Confirm password"
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === getValues("password") || "Password do not match!",
                  })}
                />
              </label>
              <div className="text-sm text-red-600 min-h-[20px]">
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div> */}

          <div className="pt-2">
            <input
              type="submit"
              value="Submit"
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 active:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-slate-300"
            />
          </div>
        </form>
        <DevTool control={control} /> {/* set up the dev tool */}
      </div>
    </div>
  );
}

export default YoutubeForm;
