import React, { useState } from "react";

import { preview } from "../assets";
import { getRandomPrompt } from "../utils";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { CornerDownLeft } from "lucide-react";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  // Used while making contact with API
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert("Please enter a prompt!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt and generate an image");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
    console.log(form.prompt);
  };

  return (
    <section className="max-w-7xl mx-auto items-center justify-center flex flex-col">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[52px] text-center">
          Create imaginative and visually stunning images generated by DALL-E AI
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-16 max-w-7xl flex justify-center items-center flex-col"
      >
        <div className="flex flex-col gap-5 w-[600px]">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <div className="flex mb-6 items-center relative">
            <div className="flex-1 relative">
              <FormField
                labelName="Prompt"
                type="text"
                name="prompt"
                placeholder="A comic book cover of a superhero wearing headphones"
                value={form.prompt}
                handleChange={handleChange}
                isSurpriseMe
                handleSurpriseMe={handleSurpriseMe}
                className="block grow h-full"
              />
              <input
                aria-hidden
                type="text"
                name="token"
                className="hidden"
                readOnly
              />
              <button
                type="button"
                onClick={generateImage}
                className="absolute mt-1 top-2/3 right-1 transform -translate-x-4/5 -translate-y-2/4 text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-9 h-9 aspect-square flex items-center justify-center ring-0 outline-0"
              >
                {<CornerDownLeft size={19} className="-ml-px" />}
              </button>
            </div>
            {/* This button is aligned side by side to the FormField input */}
            {/* <button
              type="button"
              onClick={generateImage}
              className="self-end text-white bg-black font-medium rounded-xl text-sm w-full sm:w-auto px-5 py-3.5 text-center"
            >
              {generatingImg ? "Generating..." : "Generate"}
            </button> */}
          </div>

          {!generatingImg && (
            <div className="flex justify-center items-center relative text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-94 p-3 h-114 flex justify-center items-center">
              {form.photo && (
                <img
                  src={form.photo}
                  alt={form.prompt}
                  className="w-full h-full object-contain rounded-xl"
                />
              )}
            </div>
          )}

          {generatingImg && (
            <div className="flex flex-col items-center">
              <div className="relative text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 w-94 p-3 h-114 flex justify-center items-center  rounded-lg">
                <Loader />
              </div>
            </div>
          )}
        </div>

        {form.photo && (
          <div className="mt-10 flex">
            <button
              type="submit"
              className="mt-3 text-white bg-[#111113] font-medium rounded-xl text-sm w-full sm:w-auto px-6 py-3.5 text-center"
            >
              {loading ? "Sharing..." : "Share with community"}
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default CreatePost;
