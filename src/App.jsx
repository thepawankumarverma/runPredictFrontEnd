import React, { use, useState } from "react";
import viratKohli from "./assets/viratKohli.png";
import viratKohliStand from "./assets/viratKohliStand.png";
import { FaAngleDown } from "react-icons/fa";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
const App = () => {
  const [inputs, setInputs] = useState({
    balls: null,
    year: null,
    home: null,
    against: null,
    pitch_type: null,
    innings: null,
  });
  const [result, setResult] = useState("_ _");
  const [selected, setSelected] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const predictRuns = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:4000/predict-run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      const data = await response.json();
      console.log("Predicted Runs:", data.result);
      setResult(data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error calling prediction API:", error.message);
      alert("API call failed!");
    }
  };

  const optionsBased = [
    { title: "Year", input: "year", values: [2022, 2023, 2024, 2025, 2026] },
    { title: "Home/Away", input: "home", values: ["Home", "Away"] },
    {
      title: "Against",
      input: "against",
      values: [
        "Australia",
        "West Indies",
        "South Africa",
        "England",
        "New Zealand",
        "Bangladesh",
        "England",
      ],
    },
    {
      title: "Pitch type",
      input: "pitch_type",
      values: ["batter-friendly", "both", "bowler-friendly"],
    },
  ];

  const inputsMap = [
    {
      title: "Balls Faced",
      input: "balls",
      type: "text",
    },
    {
      title: "Innings",
      input: "innings",
      type: "text",
    },
  ];
  const DropDown = ({ list, title }) => {
    return (
      <div
        className=" text-white bg-white/30 z-30  rounded-sm flex flex-col gap-2 absolute pl-10 pr-10"
        style={{ display: selected === title ? "" : "none" }}
      >
        {list.map((item) => (
          <div
            onClick={() => {
              setInputs({ ...inputs, [title]: item });
            }}
          >
            {item}
          </div>
        ))}
      </div>
    );
  };

  const Input = ({ title, input, type }) => {
    return (
      <div className="flex flex-col  gap-0">
        <div className="text-[#00ffff] text-lg">{title}</div>
        <input
          type="number"
          inputMode="numeric"
          class="border-[0.5px] border-[#00fff2] p-1 rounded-sm shadow-[0px_0px_3px_0.1px_#00c8ff] text-white"
          value={inputs[input]}
          placeholder={input.toUpperCase()}
          onChange={(e) => setInputs({ ...inputs, [input]: e.target.value })}
        ></input>
      </div>
    );
  };
  return (
    <motion.div className=" font-display flex justify-center items-center overflow-hidden md:w-[100vw] md:h-fit w-[100vw] h-[100vh]   md:overflow-hidden" initial={{opacity:0}} animate={{backgroundColor:"#010426",opacity:1}} transition={{duration:1}}>
      <div className="flex flex-col gap-3 ">
        <div className="flex flex-row text-[#5bff9700]  gap-10  justify-center ">
          <motion.div
            className="flex flex-col pt-5  w-full  items-stretch  text-right bg-[linear-gradient(to_bottom,_#03fcf4,_#03fc5e)] bg-clip-text"
            initial={{opacity:0}}
            animate={{ x: [-200, 0], opacity: [0,0,0,1] }}
            transition={{ duration: 1,delay:1 }}
          >
            <div
              className="font-bold text-3xl md:text-6xl "
              style={{
                textShadow: "0 0 8px rgba(0,255,255,0.1)",
              }}
            >
              Virat Kohli
            </div>
            <div
              className="font-bold text-3xl md:text-6xl "
              style={{
                textShadow: "0 0 8px rgba(0,255,255,0.1)",
              }}
            >
              Test Run Predict
            </div>
            <div
              className=" font-extralight text-2xl"
              style={{
                textShadow: "0 0 8px rgba(0,255,255,0.1)",
              }}
            >
              POWERED BY AI
            </div>
          </motion.div>
          <div className="relative w-[200px]">
            <motion.div
              className="rounded-full overflow-hidden  shadow-[0px_0_10px_1px] right-0 absolute w-[150px] md:w-[200px] top-10 bg-black z-10 md:translate-x-20"
              initial={{opacity:0}}
              animate={{ x: [200, 0], opacity: [0,0,0,1] }}
              transition={{ duration: 1,delay:1 }}
            >
              <img src={viratKohli}></img>
            </motion.div>
          </div>
        </div>
        <motion.div
          className="p-8 text-[#00ffee] z-0 rounded-2xl flex gap-10 max-w-[95vw]"
          style={{ borderWidth: "0.1px" }}
           initial={{ opacity: 0 }}
                animate={{ x: [150, 0], opacity: [0, 0, 0.2,1] }}
                transition={{ duration: 1,delay:1 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="flex flex-col gap-5 flex-1/2 shrink"
            initial={{opacity:0}}
            animate={{ y: [200, 0], opacity: [0,0,0,1] }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {inputsMap.map((item) => (
              <Input
                type={item.type}
                title={item.title}
                input={item.input}
              ></Input>
            ))}
            {optionsBased.map((item) => (
              <div
                className="relative "
                onClick={(e) => {
                  e.stopPropagation(),
                    setShowOptions(!showOptions),
                    setSelected(item.input);
                }}
              >
                <div> {item.title}</div>
                <div
                  className=" flex items-center justify-between p-2 border-[0.5px] border-[#00fff2] rounded-sm text-gray-500 shadow-[0px_0px_3px_0.1px_#00c8ff]"
                  style={{
                    color: inputs[item.input] !== null ? "white" : "",
                  }}
                >
                  <div className="">
                    {" "}
                    {inputs[item.input] === null
                      ? `Select ${item.title}`
                      : inputs[item.input]}
                  </div>
                  <div>
                    <FaAngleDown></FaAngleDown>
                  </div>
                </div>
                {showOptions && (
                  <DropDown
                    list={item.values}
                    title={item.input}
                    style={{}}
                  ></DropDown>
                )}
              </div>
            ))}
            <motion.div
              onClick={predictRuns}
              className="text-[#41ffff] shadow-[0_0_8px_rgba(3,252,40,0.7),inset_0_0_8px_rgba(3,252,40,0.7)] flex items-center justify-center font-normal border-[0.1px] border-[#0bff68] rounded-lg p-2"
            >
              <div className=" text-2xl font-medium bg-[linear-gradient(to_bottom,_#3ffce6_45%,_#21fc71)] bg-clip-text text-transparent ">
                Predict Runs
              </div>
            </motion.div>
          </motion.div>
          <div className="flex justify-center flex-1/2 ">
            <div className=" font-mono md:text-4xl text-sm md:font-semibold bg-[linear-gradient(to_bottom,_#03fcf4,_#03fc5e)] bg-clip-text text-transparent w-[100%] text-center p-3  h-fit flex flex-col md:gap-10 mt-10">
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ x: [150, 0], opacity: [0, 0, 0.2,1] }}
                transition={{ duration: 1.2,delay:1 }}
                className="font-mono md:text-4xl text-sm md:font-semibold bg-[linear-gradient(to_bottom,_#03fcf4,_#03fc5e)] bg-clip-text text-transparent"
              >
                {" "}
                PREDICTED
              </motion.div>
              <div className="">
                {loading ? (
                  <AnimatePresence>
                    <motion.div
                      className="font-mono text-sm font-medium text-[#00ff1e] opacity-0"
                      initial={{ y: 0, opacity: 0 }}
                      animate={{ y: [0, 18], opacity: [0.2, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      AI predicting score...
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <motion.div
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: [0, 18], opacity: [0,1] }}
                    transition={{ delay: 1.8 }}
                    className=" text-2xl md:text-9xl font-bold text-transparent bg-[linear-gradient(to_bottom,_#03fcf4,_#03fc5e)] bg-clip-text"
                    style={{
                      textShadow: "0 0 8px rgba(0,255,255,0.3)",
                    }}
                  >
                    {result}
                  </motion.div>
                )}
                <motion.div
                  className="fixed  bottom-0 md:translate-x-50 -translate-x-18 w-xs"
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: [0, 18], opacity: [0,1] }}
                  transition={{ delay: 1.8 }}
                >
                  <img src={viratKohliStand}></img>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default App;
