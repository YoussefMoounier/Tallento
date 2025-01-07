import React from "react";

const Sorting = ({ sortType, setSortType, language, dispatch, fetchPosts }) => {
  const handleSortChange = (e) => {
    setSortType(e.target.value);
    dispatch(fetchPosts(1, e.target.value)); // Fetch the first page with the new sort type
  };

  return (
    <div className="flex items-center flex-col mt-4">
      <label htmlFor="sort" className="text-sm text-center">
        {language === "en" ? "Sort Posts: " : "ترتيب المنشورات "}
      </label>

      <select
        className="text-white  bg-secodColor rounded-2xl px-2  py-1 ml-2"
        onChange={handleSortChange}
        value={sortType}
      >
        <option value="latest">
          {language === "en" ? "Latest" : "الاحدث"}
        </option>
        <option value="oldest">
          {language === "en" ? "Oldest" : "الاقدم"}
        </option>
        <option value="most_liked">
          {language === "en" ? "Most Liked" : "الاكثر اعجاب"}
        </option>
      </select>
    </div>
  );
};

export default Sorting;
