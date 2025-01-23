"use client";

import React, { useState } from "react";
import Styles from "./styles.module.css";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const handleSignOut = async () => {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
  };

  const getCount = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("counts").select().eq("id", 1);
    if (data && data[0]) {
      setCount(data[0].count);
    }
    if (error) {
      console.error("error", error);
    } else {
      console.log(data);
    }
  };

  const getCount2 = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase.from("counts").select().eq("id", 2);
    if (data && data[0]) {
      setCount2(data[0].count);
    }
    if (error) {
      console.error("error", error);
    } else {
      console.log(data);
    }
  };

  const getCounts = async () => {
    getCount();
    getCount2();
  };

  const settingCount = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("counts")
      .upsert([{ id: 1, count: count }]);
    if (error) {
      console.error("error", error);
    } else {
      console.log(data);
    }
  };

  const settingCount2 = async () => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("counts")
      .upsert([{ id: 2, count: count2 }]);
    if (error) {
      console.error("error", error.message);
    } else {
      console.log(data);
    }
  };

  function incrementCount() {
    setCount(count + 1);
    settingCount();
  }
  function incrementCount2() {
    setCount2(count2 + 1);
    settingCount2();
  }

  return (
    <>
      <div className={Styles.header}>HVOR MANGE SLURKER?</div>
      <div className={Styles.counter}>
        <p>Torbjørn Egner count: {count}</p>
        <button className={Styles.button} onClick={incrementCount}>
          Slurk!
        </button>
      </div>
      <div className={Styles.counter}>
        <p>Anne Cath. Vestly count: {count2}</p>
        <button className={Styles.button} onClick={incrementCount2}>
          Slurk!
        </button>
      </div>
      <div className={Styles.counter}>
        <p>Totalt antall slurker count: {count + count2}</p>
        <button className={Styles.button} onClick={getCounts}>
          HENT SCORE
        </button>
        <button className={Styles.button} onClick={handleSignOut}>
          LOGG UT
        </button>
      </div>
    </>
  );
}
