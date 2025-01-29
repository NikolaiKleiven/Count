"use client";

import { BiBeer, BiDrink, BiSolidTrophy } from "react-icons/bi";

import React, { useState } from "react";
import Styles from "./styles.module.css";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { getCount } from "@/utils/supabase/updateCount";

export default function Home() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const [email, setEmail] = useState("");
  const supabase = createClient();
  const bgPosition = 200 - (count + count2);

  const handleSignOut = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    console.log("Data from getSession:", user);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error in handleSignOut:", error.message);
    }
    redirect("/login");
  };

  const handleGetCount = async () => {
    try {
      const data = await getCount();

      if (data && data.length > 0) {
        setCount(data[0]?.count || 0);
        setCount2(data[1]?.count || 0);
      } else {
        console.log("No data found in the counts table");
      }
    } catch (error) {
      console.error("Error in handleGetCount:", error);
    }
  };

  const resetCount = async () => {
    if (
      prompt(
        "Er du sikker på at du vil resette telleren? Skriv 'ja' for å bekrefte."
      ) !== "ja" &&
      email !== "fake@email.com"
    ) {
      return;
    }
    setCount(0);
    setCount2(0);
    const { error } = await supabase
      .from("counts")
      .upsert([
        { id: 1, count: 0 },
        { id: 2, count: 0 },
      ])
      .select();

    if (error) {
      console.error("Error in resetCount:", error.message);
    } else {
      return;
    }
  };

  if (firstRender) {
    handleGetCount();
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error in getUser:", error.message);
      } else {
        setEmail(data.user.email || "");
        console.log(email);
      }
    };
    getUser();
    setFirstRender(false);
  }

  const settingCount = async () => {
    if (email !== "fake@email.com") {
      alert(
        "Å huff'a meg, å huff'a meg! Jeg er så sint som fy! Du er ikke Torbjørn Egner!"
      );
      return;
    }
    setCount(count + 1);
    const { data, error } = await supabase
      .from("counts")
      .update({ count: count + 1 })
      .eq("id", 1);
    if (error) {
      console.error("Error in settingCount:", error.message);
    } else {
      console.log("Data updated in settingCount:", data);
    }
  };

  const settingCount2 = async () => {
    console.log(email);
    if (email !== "tull@gmail.com") {
      alert("Jeg skal knekke deg som Knerten! Du er ikke Anne Cath. Vestly!");
      return;
    }
    setCount2(count2 + 1);
    const { data, error } = await supabase
      .from("counts")
      .update({ count: count2 + 1 })
      .eq("id", 2);
    if (error) {
      console.error("Error in settingCount2:", error.message);
    } else {
      console.log("Data updated in settingCount2:", data);
    }
  };

  return (
    <>
      <div className={Styles.header}>HVOR MANGE SLURKER?</div>
      <BiBeer
        style={{
          justifySelf: "center",
          marginTop: "10px",
          width: "50px",
          height: "50px",
        }}
      />
      <div className={Styles.counter}>
        <p>Torbjørn Egner: {count}</p>
        <button className={Styles.button} onClick={settingCount}>
          Slurk!
        </button>
      </div>
      <BiDrink
        style={{
          justifySelf: "center",
          marginTop: "10px",
          width: "50px",
          height: "50px",
        }}
      />
      <div className={Styles.counter}>
        <p>Anne Cath. Vestly: {count2}</p>
        <button className={Styles.button} onClick={settingCount2}>
          Slurk!
        </button>
      </div>
      <BiSolidTrophy
        style={{
          justifySelf: "center",
          marginTop: "10px",
          width: "50px",
          height: "50px",
        }}
      />
      <div className={Styles.counter}>
        <p>Totalt antall slurker: {count + count2}</p>

        <button className={Styles.button} onClick={handleSignOut}>
          LOGG UT
        </button>
        <button className={Styles.buttonReset} onClick={resetCount}>
          RESET
        </button>
      </div>
      <div
        className={Styles.cup}
        style={{ backgroundPosition: `0 ${bgPosition}px` }}
      ></div>
    </>
  );
}
