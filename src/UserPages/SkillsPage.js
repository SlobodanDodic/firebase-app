import React, { useEffect, useState } from "react";
import TopbarPage from "../Components/TopbarPage";
import { storage } from "../firebase";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);

  const ref = storage.collection("skills");

  useEffect(() => {
    ref.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setSkills(items);
    });
  });

  return (
    <>
      <TopbarPage />
      <div className="skills">
        <h1>Skills from Firestorage</h1>

        <hr />

        {skills.map((skill) => (
          <div key={skill.id}>
            <h2>{skill.title}</h2>
            <div>{skill.content}</div>
          </div>
        ))}
      </div>
    </>
  );
}
