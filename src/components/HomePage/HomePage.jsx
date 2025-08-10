import React from "react";
import Hero from "../Parts/Hero/Hero";
import RecentJobs from "../Parts/RecentJobs/RecentJobs";
import Category from "../Parts/Category/Category";

const HomePage = () => {
  return (
    <main>
      <Hero />
      <RecentJobs />
      <Category />
    </main>
  );
};

export default HomePage;
