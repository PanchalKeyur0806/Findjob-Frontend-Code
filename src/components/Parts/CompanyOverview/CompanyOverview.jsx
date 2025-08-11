import React from "react";

const CompanyOverview = () => {
  const companyImg =
    "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?cs=srgb&dl=pexels-pixabay-269077.jpg&fm=jpg";
  //   const peopleImg =
  //     "https://reallygooddesigns.com/wp-content/uploads/2022/01/Group-of-Young-People-Cartoon-Illustration.jpg";

  return (
    <section className="max-w-[1000px] w-[95%] mx-auto mt-5">
      <div className="flex flex-col sm:flex-row gap-10 items-center">
        <div
          id="companyImg"
          className="mt-20 mx-5 relative w-full sm:size-95 rounded-xl overflow-hidden"
        >
          <img
            src={companyImg}
            alt="Company Img"
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div id="companyContent" className="w-full sm:w-1/2">
          <h1 className="text-3xl font-bold mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="text-sm mb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa,
            laboriosam officiis fugit corrupti quaerat, architecto est
            necessitatibus esse itaque non porro autem ex dolor nesciunt nihil
            illo numquam quo earum? Explicabo est vitae temporibus quidem
            perferendis nisi voluptatum optio fugiat?
          </p>

          <div id="companyButtons" className="flex gap-5">
            <button className="bg-purple-800 px-3 py-1 rounded text-white cursor-pointer">
              Search Job
            </button>
            <button className="text-purple-800 underline underline-offset-2 cursor-pointer">
              Learn more
            </button>
          </div>
        </div>
      </div>

      <div className="my-15 mx-5 flex flex-col sm:flex-row gap-20">
        <div>
          <h1 className="text-4xl font-bold text-purple-800">12K+</h1>
          <h3 className="mt-4 text-[18px] font-medium">Clients worlwide</h3>
          <p className="mt-2 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            tenetur numquam praesentium tempore sit veniam.
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-purple-800">20K+</h1>
          <h3 className="mt-4 text-[18px] font-medium">Active Resume</h3>
          <p className="mt-2 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            illo accusantium adipisci similique, fugiat molestiae?
          </p>
        </div>
        <div>
          <h1 className="text-4xl font-bold text-purple-800">18K+</h1>
          <h3 className="mt-4 text-[18px] font-medium">Companies</h3>
          <p className="mt-2 text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos sequi
            laborum vero expedita molestiae fugit.
          </p>
        </div>
      </div>

      <div className="relative bg-black text-white px-3 rounded-xl">
        <div className="w-full sm:w-1/2 p-5 mb-4 ">
          <h1 className="text-4xl font-bold">
            Create A Better Future For Yourself
          </h1>

          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            amet, fugiat a error provident quas temporibus deleniti qui odio
            pariatur!
          </p>

          <button className="mt-7 mb-6 px-3 py-2 rounded bg-purple-800 text-white cursor-pointer">
            Search Job
          </button>
        </div>
      </div>
    </section>
  );
};

export default CompanyOverview;
