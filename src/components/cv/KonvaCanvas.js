import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import jsPDF from "jspdf";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Image,
  Text,
  Group,
  Line,
} from "react-konva";
import { formAction } from "../../store/formStore";
// import useImage from "use-image";
function KonvaCanvas(props) {
  const formData = useSelector((state) => state.formStore);
  const dispatch = useDispatch();
  let stageRef = useRef();
  let LayerRef = useRef();
  let nameRef = useRef();
  let summaryRef = useRef();
  let infoGroupRef = useRef();
  let addressRef = useRef();
  let phoneRef = useRef();
  let languagesRef = useRef();
  let employmentsRef = useRef();
  var educationsRef = useRef();
  let occupationRef = useRef();
  let empHistoryData = useRef([]);
  let eduHistoryData = useRef([]);
  let languageData = useRef([]);
  let skillData = useRef([]);

  let empHeight = useRef();

  const [image, setImage] = useState(null);
  const [downloadText, setDownloadText] = useState("Download");
  // useeffect function for every rerender, it's for to check page number
  useEffect(() => {
    // console.log("inside useeffect and y is", educationsRef?.y());
    // now check if it has childs
    const children = educationsRef?.getChildren();
    let totalHeight;
    if (children) {
      // console.log("childs are");
      // console.log(children);
      const lastChild = children[children.length - 1];
      // console.log("last child is");
      // console.log(lastChild);
      const lastChildSubChild =
        lastChild.getClassName() === "Group" ? lastChild?.getChildren() : 0;

      if (lastChildSubChild) {
        // console.log("last childs child are");
        // console.log(lastChildSubChild);
        const lastText = lastChildSubChild[lastChildSubChild.length - 1];
        // console.log(lastText);
        // console.log("height of lastchild is " + lastText.height());
        // console.log("y of lastchild is " + lastText.y());
        // console.log("height of eduref is " + educationsRef.height());
        // console.log(
        //   "total height is ",
        //   educationsRef.y() + lastText.y() + lastText.height() + lastChild.y()
        // );
        totalHeight =
          educationsRef.y() + lastText.y() + lastText.height() + lastChild.y();
        // console.log("education ref y is ", educationsRef.y());
        // console.log("last text y ", lastText.y());
        // console.log("last text height is ", lastText.height());
      } else {
        totalHeight = educationsRef.y();
      }
      // console.log("total height is", totalHeight);
      const totalPages = Math.ceil(totalHeight / 640);
      // stageRef.height(educationsRef.y() + lastText.y() + lastText.height());
    }
    if (totalHeight / 640 > 1) {
      if (formData.totalPages !== Math.ceil(totalHeight / 640))
        dispatch(
          formAction.setPage({
            pages: Math.ceil(totalHeight / 640),
          })
        );
    }
  });
  // console.log("redux store is");
  // console.log(formData);
  useEffect(() => {
    if (formData.img) {
      const img = new window.Image();
      img.src = URL.createObjectURL(formData.img);
      img.onload = () => {
        console.log("img loaded");
        setImage(img);
      };
    }
  }, [formData.img]);

  function dateConversion(date1, date2) {
    const convertDate = (date) => {
      if (date === "Present") return date;
      const dateObj = new Date(date);
      const dd = dateObj.getUTCDate().toString().padStart(2, "0");
      const mm = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0");
      const yy = dateObj.getFullYear().toString().substr(-2);
      const yyyy = dateObj.getUTCFullYear();
      // console.log("date is", dd, mm, yy, yyyy);
      const separator = formData.dateseparator == 1 ? "-" : "/";
      if (formData.dateFormat == 1)
        return `${mm}${separator}${dd}${separator}${yy}`;
      if (formData.dateFormat == 2)
        return `${dd}${separator}${mm}${separator}${yy}`;
      if (formData.dateFormat == 3)
        return `${dd}${separator}${mm}${separator}${yyyy}`;
      if (formData.dateFormat == 4)
        return `${mm}${separator}${dd}${separator}${yyyy}`;
    };
    if (date1 && date2) return `${convertDate(date1)} - ${convertDate(date2)}`;
    if (date1) return `${convertDate(date1)} - `;
    if (date2) return `- ${convertDate(date2)}`;
  }
  function returnSkills() {
    return formData.skills.map((skill, index) => {
      if (skill.notNull) {
        // console.log("height employeref is");
        // console.log(employmentsRef.current.height());
        // console.log("y is");
        // console.log(employmentsRef.current.y());
        let yAxis = 190;
        for (let i = 0; i < skillData.current.length; i++) {
          if (i === index) {
            break;
          }
          if (skillData.current[i]) {
            const allArray = skillData.current[i].getChildren(function (node) {
              if (node.x() !== 248) return node;
            });
            // console.log(allArray);
            yAxis += allArray.reduce((height, node) => {
              // console.log(node.height());
              height += node.height();
              return height;
            }, 0);

            // lets check whether yAxis is near to end point
            if (yAxis > 500 && 620 % yAxis <= 30) {
              yAxis += 80;
            }
            // yAxis += empHistoryData.current[i].height();
            // console.log(`y axis for ${i} is ${yAxis}`);
            // console.log(
            //   `height for ${i} is ${empHistoryData.current[i].height()}`
            // );
            // console.log(empHistoryData.current);
          }
        }

        return (
          <Group
            x={30}
            verticalAlign="top"
            y={yAxis + 0}
            ref={(node) => (skillData.current[index] = node)}
          >
            <Text
              text={skill.skill}
              fontSize={7}
              fontStyle="bold"
              fontFamily="Poppins"
            />
            <Text
              x={40}
              text={skill.rating}
              fontSize={7}
              fontFamily="Poppins"
            />
          </Group>
        );
      }
    });
  }
  function returnLanguages() {
    return formData.language.map((lan, index) => {
      if (lan.notNull) {
        // console.log("height employeref is");
        // console.log(employmentsRef.current.height());
        // console.log("y is");
        // console.log(employmentsRef.current.y());
        let yAxis = 190;
        for (let i = 0; i < languageData.current.length; i++) {
          if (i === index) {
            break;
          }
          if (languageData.current[i]) {
            const allArray = languageData.current[i].getChildren(function (
              node
            ) {
              if (node.x() !== 248) return node;
            });
            // console.log(allArray);
            yAxis += allArray.reduce((height, node) => {
              // console.log(node.height());
              height += node.height();
              return height;
            }, 0);
            if (yAxis > 500 && 620 % yAxis <= 30) {
              yAxis += 80;
            }
            // yAxis += empHistoryData.current[i].height();
            // console.log(`y axis for ${i} is ${yAxis}`);
            // console.log(
            //   `height for ${i} is ${empHistoryData.current[i].height()}`
            // );
            // console.log(empHistoryData.current);
          }
        }

        return (
          <Group
            x={30}
            verticalAlign="top"
            y={yAxis + 0}
            ref={(node) => (languageData.current[index] = node)}
            x={30}
          >
            <Text
              text={lan.language}
              fontSize={7}
              fontStyle="bold"
              fontFamily="Poppins"
            />
            <Text x={40} text={lan.level} fontSize={7} fontFamily="Poppins" />
          </Group>
        );
      }
    });
  }
  function returnEducations() {
    // console.log(eduHistoryData);
    // lets get parent and do the things.
    const parentEl =
      eduHistoryData.current.length > 0
        ? eduHistoryData.current[eduHistoryData.current.length - 1].parent
        : 0;
    // console.log(parentEl);
    let totalHeight = 0,
      allCalculation,
      lastText,
      lastChild;
    if (parentEl) {
      const children = parentEl?.getChildren();
      // console.log("yes hve it now");
      if (children) {
        // console.log("childs are");
        // console.log(children);
        lastChild = children[children.length - 1];
        // console.log("last child is");
        // console.log(lastChild);
        const lastChildSubChild =
          lastChild.getClassName() === "Group" ? lastChild?.getChildren() : 0;

        if (lastChildSubChild) {
          // console.log("last childs child are");
          // console.log(lastChildSubChild);
          lastText = lastChildSubChild[lastChildSubChild.length - 1];
          // console.log("height of lastchild is " + lastText.height());
          // console.log("y of lastchild is " + lastText.y());
          // console.log("height of eduref is " + parentEl.height());
          totalHeight =
            parentEl.y() + lastText.y() + lastText.height() + lastChild.y();
          allCalculation = true;
        } else {
          totalHeight = parentEl.y();
          allCalculation = false;
        }
      }
    }
    // console.log("all calculation is", allCalculation);
    // const mainAxis = educationsRef?.y();
    return formData.education.map((edu, index) => {
      if (edu.notNull) {
        // console.log("height employeref is");
        // console.log(employmentsRef.current.height());
        // console.log("y is");
        // console.log(employmentsRef.current.y());
        let yAxis = 38;
        for (let i = 0; i < eduHistoryData.current.length; i++) {
          if (i === index) {
            break;
          }
          if (eduHistoryData.current[i]) {
            const allArray = eduHistoryData.current[i].getChildren(function (
              node
            ) {
              if (node.x() !== 248) return node;
            });
            // console.log(allArray);
            yAxis += allArray.reduce((height, node) => {
              // console.log(node.height());
              height += node.height();
              return height;
            }, 0);
            yAxis += 10;
            // yAxis += empHistoryData.current[i].height();
            // console.log(`y axis for ${i} is ${yAxis}`);
            // console.log(
            //   `height for ${i} is ${empHistoryData.current[i].height()}`
            // );
            // console.log(empHistoryData.current);
          }
        }
        // if (totalHeight !== 0 && allCalculation) {
        //   // console.log("pages are", formData.totalPages);
        //   // console.log("totalHeight are", totalHeight);
        //   // if (
        //   //   totalHeight <= formData.totalPages * 620 &&
        //   //   totalHeight >= formData.totalPages * 620 - 20
        //   // ) {
        //   //   console.log("total height and  y axis is", totalHeight, yAxis);
        //   //   // yAxis += 50;
        //   // totalHeight =
        //   // parentEl.y() + lastText.y() + lastText.height() + lastChild.y();
        //   // }
        //   console.log("total height is", totalHeight);
        //   console.log(
        //     "so calculation is",
        //     parentEl.y() + lastText.y() + lastChild.y()
        //   );
        //   if (totalHeight > 620 && parentEl.y() + lastChild.y() < 620) {
        //     // let's calculate
        //     const addToY = 670 - (parentEl.y() + lastChild.y());
        //     // yAxis = yAxis + addToY + lastChild.y();
        //     console.log("parent y is", parentEl.y());
        //     console.log("last child y is", lastChild.y());
        //     console.log("addto y is", addToY);

        //     console.log("yes do something here now and new y is", yAxis);
        //     console.log("total is ", yAxis + parentEl.y());
        //   }
        // }

        return (
          <Group
            verticalAlign="top"
            y={yAxis}
            ref={(node) => (eduHistoryData.current[index] = node)}
            x={125}
          >
            <Rect height={4} width={300}></Rect>
            <Text // school name and degree
              width={350}
              fontFamily="Poppins"
              text={
                edu.degree || edu.school ? edu.degree + ", " + edu.school : ""
              }
              verticalAlign="top"
              // y={264}
              y={5}
              fontSize={8}
              fontStyle="bold"
            />
            <Text // employment date
              width={300}
              verticalAlign="top"
              fontFamily="Poppins"
              text={dateConversion(edu.started, edu.finished)}
              // y={264}
              y={5}
              x={220}
              fontSize={8}
              fontStyle="bold"
            />
            <Text // Employment Description
              width={320}
              y={20}
              verticalAlign="top"
              fontFamily="Poppins"
              text={edu.courseDescription}
              // y={275}
              // x={125}
              fontSize={8}
            />
          </Group>
        );
      }
    });
  }

  // rendering functions
  function returnEmployments() {
    // console.log("yes hve it now emp");
    // console.log(educationsRef);
    return formData.empHistory.map((emp, index) => {
      if (emp.notNull) {
        // console.log("height employeref is");
        // console.log(employmentsRef.current.height());
        // console.log("y is");
        // console.log(employmentsRef.current.y());
        let yAxis = 38;
        for (let i = 0; i < empHistoryData.current.length; i++) {
          if (i === index) {
            break;
          }
          if (empHistoryData.current[i]) {
            const allArray = empHistoryData.current[i].getChildren(function (
              node
            ) {
              if (node.x() !== 248) return node;
            });
            // console.log(allArray);
            yAxis += allArray.reduce((height, node) => {
              // console.log(node.height());
              height += node.height();
              return height;
            }, 0);
            yAxis += 10;
            // yAxis += empHistoryData.current[i].height();
            // console.log(`y axis for ${i} is ${yAxis}`);
            // console.log(
            //   `height for ${i} is ${empHistoryData.current[i].height()}`
            // );
            // console.log(empHistoryData.current);
          }
        }

        // if (yAxis > 600 && 620 % yAxis <= 20) {
        //   yAxis += 40;
        // }
        return (
          <Group
            verticalAlign="top"
            y={yAxis}
            ref={(node) => (empHistoryData.current[index] = node)}
          >
            <Rect height={4} width={300}></Rect>
            <Text // Employment name and employer
              width={300}
              fontFamily="Poppins"
              text={
                emp.jobTitle || emp.employer
                  ? emp.jobTitle + ", " + emp.employer
                  : ""
              }
              verticalAlign="top"
              // y={264}
              y={5}
              fontSize={8}
              fontStyle="bold"
            />
            <Text // employment date
              width={300}
              verticalAlign="top"
              fontFamily="Poppins"
              text={dateConversion(emp.begin, emp.end)}
              // y={264}
              y={10}
              x={220}
              fontSize={8}
              fontStyle="bold"
            />
            <Text // Employment Description
              width={320}
              y={20}
              verticalAlign="top"
              fontFamily="Poppins"
              text={emp.description}
              // y={275}
              // x={125}
              fontSize={8}
            />
          </Group>
        );
      }
    });
  }
  function downloadPDF() {
    setTimeout(() => {
      setDownloadText("Download");
    }, 3000);
    setDownloadText("Downloading");
    // console.log("height of stage is " + stageRef.height());
    // console.log("height of layer is " + LayerRef.height());
    // let's first get the y value of education history
    // console.log("y of eduref is " + educationsRef.y());
    // now lets take the last child y and height
    const children = educationsRef?.getChildren();
    var dataUrl = stageRef.getStage().toDataURL({ pixelRatio: 4, y: 0 });
    var doc = new jsPDF("p", "mm", "a4");
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    const pdf = new jsPDF();
    pdf.addImage(dataUrl, "JPEG", 0, 10, width, height - 10 * 2);
    if (children) {
      // console.log("childs are");
      // console.log(children);
      const lastChild = children[children.length - 1];
      // console.log("last child is");
      // console.log(lastChild);
      const lastChildSubChild =
        lastChild.getClassName() === "Group" ? lastChild?.getChildren() : 0;
      let totalHeight;
      if (lastChildSubChild) {
        // console.log("last childs child are");
        // console.log(lastChildSubChild);
        const lastText = lastChildSubChild[lastChildSubChild.length - 1];
        // console.log("height of lastchild is " + lastText.height());
        // console.log("y of lastchild is " + lastText.y());
        // console.log("height of eduref is " + educationsRef.height());
        // console.log(
        //   "total height is ",
        //   educationsRef.y() + lastText.y() + lastText.height()
        // );
        totalHeight =
          educationsRef.y() + lastText.y() + lastText.height() + lastChild.y();
      } else {
        totalHeight = educationsRef.y();
      }
      const totalPages = Math.ceil(totalHeight / 640);
      // stageRef.height(educationsRef.y() + lastText.y() + lastText.height());
      let pagesDone = 1;
      while (pagesDone !== totalPages) {
        pdf.addPage();
        const y = 640 * pagesDone;
        dataUrl = stageRef.getStage().toDataURL({ pixelRatio: 4, y: y });
        // stageRef.height(640 + y);
        pdf.addImage(dataUrl, "JPEG", 0, 10, width, height - 10 * 2);
        pagesDone += 1;
      }
    }
    pdf.save("Resume" + ".pdf");
    // stageRef.height(640);
  }

  return (
    <>
      <div id="Resume">
        <div>
          <div style={{ padding: "15px 0" }}>
            <Stage
              width={470}
              height={640}
              ref={(ref) => {
                stageRef = ref;
              }}
            >
              <Layer
                y={props.currentPage > 1 ? -640 * (props.currentPage - 1) : 0}
                x={0}
                ref={(ref) => {
                  LayerRef = ref;
                }}
              >
                {formData.img != null ? (
                  // eslint-disa ble-next-line jsx-a11y/alt-text
                  <Image
                    x={30}
                    y={30}
                    height={85}
                    width={85}
                    image={image}
                  ></Image>
                ) : (
                  <Group x={-20}>
                    <Rect
                      stroke="#080808"
                      height={70}
                      width={70}
                      x={50}
                      y={40}
                      strokeWidth={2}
                    />
                    <Text
                      width={300}
                      height={200}
                      fontFamily="Poppins"
                      fontStyle="bold"
                      text={"photo"}
                      fontSize={9}
                      y={70}
                      x={72}
                    />
                  </Group>
                )}
                {/* First Name And Last Name */}
                <Text
                  width={300}
                  fontFamily="Poppins"
                  fontStyle="bold"
                  text={formData.firstName + " " + formData.lastName}
                  y={50}
                  x={130}
                  fontSize={20}
                  ref={nameRef}
                />
                {/* occupation */}
                <Text
                  width={260}
                  height={200}
                  fontFamily="Poppins"
                  text={formData.occupation}
                  y={
                    nameRef?.current?.getHeight()
                      ? nameRef.current.getHeight() + 60
                      : 80
                  }
                  x={130}
                  fontSize={15}
                  ref={occupationRef}
                />
                {/* Content*/}
                {/* Professional Summary Title  */}
                <Text
                  width={300}
                  height={200}
                  fontFamily="Poppins"
                  fontStyle="bold"
                  text="Professional Summary"
                  y={160}
                  x={125}
                  fontSize={15}
                />
                <Rect height={4} width={320} fill="black" y={185} x={125} />
                {/* Professional Summary Start   */}
                <Text
                  width={320}
                  ref={summaryRef}
                  fontFamily="Poppins"
                  text={formData.professionalSummary}
                  y={200}
                  x={125}
                  lineHeight={1.2}
                  fontSize={7}
                />
                {/* Professional Summary Title  End */}
                <Group ref={infoGroupRef}>
                  {/* Professional Summary  End */}
                  {/* Info Title  */}
                  <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Info"
                    y={160}
                    x={30}
                    fontSize={15}
                  />
                  <Rect height={4} width={30} fill="black" y={185} x={30} />
                  {/* Info Content Start  */}
                  {/* Address */}
                  <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Address"
                    y={200}
                    x={30}
                    fontSize={9}
                  />
                  <Text
                    width={82}
                    ref={addressRef}
                    fontFamily="Poppins"
                    text={
                      formData.address ||
                      formData.city ||
                      formData.postalCode ||
                      formData.country
                        ? `${formData.address} , ${formData.city} - ${formData.postalCode} ${formData.country}`
                        : ""
                    }
                    // text={`${formData.address} , ${formData.city} - ${formData.postalCode} ${formData.country}`}
                    lineHeight={1.2}
                    y={217}
                    x={30}
                    fontSize={7}
                  />
                  {/* Address */}
                  <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Phone"
                    fontSize={9}
                    y={
                      addressRef?.current?.getHeight()
                        ? 224 + addressRef.current.getHeight()
                        : 234
                    }
                    x={30}
                  />
                  {/* Address */}
                  <Text
                    ref={phoneRef}
                    width={82}
                    fontFamily="Poppins"
                    text={formData.phone}
                    lineHeight={1.2}
                    x={30}
                    y={
                      addressRef?.current?.getHeight()
                        ? 240 + addressRef?.current?.getHeight()
                        : 249
                    }
                    fontSize={7}
                  />
                  {/* Email */}
                  <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Email"
                    fontSize={9}
                    y={
                      addressRef?.current?.getHeight()
                        ? 255 + addressRef?.current?.getHeight()
                        : 275
                    }
                    x={30}
                  />
                  <Text
                    width={90}
                    fontFamily="Poppins"
                    text={formData.email}
                    lineHeight={1.2}
                    x={30}
                    y={
                      addressRef?.current?.getHeight()
                        ? 270 + addressRef?.current?.getHeight()
                        : 290
                    }
                    fontSize={7}
                  />
                </Group>
                {/* Languages */}
                <Group
                  ref={languagesRef}
                  y={
                    infoGroupRef?.current?.getHeight()
                      ? infoGroupRef?.current?.getHeight() + 5
                      : 155
                  }
                >
                  <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Languages"
                    y={160}
                    x={30}
                    fontSize={14}
                  />
                  <Rect height={4} width={30} fill="black" y={178} x={30} />
                  {/* Dynamic Languages */}
                  {returnLanguages()}
                </Group>
                {/* Skills */}
                <Group
                  y={(function () {
                    // console.log("so inside");
                    // let's first get the last item of employe ref
                    // console.log("languageref is");
                    // console.log(languagesRef.current);
                    const allGroups = languagesRef.current?.getChildren(
                      function (node) {
                        return node.getClassName() === "Group";
                      }
                    );
                    // console.log(allGroups);
                    const lastGroupIndex = allGroups?.length - 1;
                    // console.log("index is " + lastGroupIndex);
                    if (lastGroupIndex < 0 || isNaN(lastGroupIndex)) return 200;
                    const allChild = allGroups[lastGroupIndex].getChildren(
                      function (node) {
                        return node;
                      }
                    );
                    console.log("all childs are");
                    console.log(allChild);
                    console.log("current y is" + languagesRef.current.y());
                    console.log(
                      "last y inside current y is" +
                        allGroups[lastGroupIndex].y()
                    );
                    let yAxis = 0;
                    yAxis =
                      languagesRef.current.y() +
                      (allGroups[lastGroupIndex].y() -
                        languagesRef.current.y()) +
                      allChild.reduce((height, node, index) => {
                        if (index === 1) return height;
                        // console.log(node.height());
                        height += node.height();
                        return height;
                      }, 0);
                    // console.log("y axis of  group is" + employmentsRef.current.y());
                    // console.log(yAxis);
                    return yAxis + 10;
                  })()}
                >
                  <Text
                    width={300}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Skills"
                    y={160}
                    x={30}
                    fontSize={14}
                  />
                  <Rect height={4} width={30} fill="black" y={180} x={30} />
                  {/* space for skills */}
                  {returnSkills()}
                </Group>
                {/* empolyement history */}
                <Group
                  x={125}
                  width={300}
                  ref={employmentsRef}
                  y={(function () {
                    // console.log(summaryRef?.current?.getHeight());
                    // console.log(summaryRef?.current?.y());
                    let yAxis = summaryRef?.current?.getHeight()
                      ? summaryRef.current.getHeight() +
                        summaryRef.current.y() +
                        15
                      : 229;
                    if (620 % yAxis <= 30 || yAxis % 620 <= 50) {
                      yAxis += 40;
                    }
                    return yAxis;
                  })()}
                >
                  {/* Employment History Title  */}
                  <Text
                    // padding={25}
                    y={10}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Employment History"
                    height={200}
                    // y={
                    //   summaryRef?.current?.getHeight()
                    //     ? summaryRef.current.getHeight() - 10
                    //     : 0
                    // }

                    fontSize={14}
                  />
                  <Rect height={4} y={32} width={320} fill="black" />
                  {/* Professional Summary Title  End */}
                  {/* Employments  Start */}
                  {/* emplyement space */}
                  {returnEmployments()}
                  {/* Employments  End */}
                </Group>
                {/* Education History Start   */}
                <Group
                  ref={(ref) => {
                    educationsRef = ref;
                  }}
                  y={(function () {
                    // console.log("so inside");
                    // let's first get the last item of employe ref
                    const allGroups = employmentsRef.current?.getChildren(
                      function (node) {
                        return node.getClassName() === "Group";
                      }
                    );
                    // console.log(allGroups);
                    const lastGroupIndex = allGroups?.length - 1;
                    // console.log("index is " + lastGroupIndex);
                    if (lastGroupIndex < 0 || isNaN(lastGroupIndex)) return 320;
                    const allChild = allGroups[lastGroupIndex].getChildren(
                      function (node) {
                        return node;
                      }
                    );
                    let yAxis;

                    yAxis =
                      employmentsRef.current.y() +
                      allGroups[lastGroupIndex].y() +
                      allChild.reduce((height, node) => {
                        // console.log(node.height());
                        height += node.height();
                        return height;
                      }, 0);
                    // console.log(
                    //   "y axis of  group is" + employmentsRef.current.y()
                    // );
                    // console.log(yAxis);
                    if (
                      yAxis > 560 &&
                      (620 * formData.totalPages) % yAxis <= 60
                    ) {
                      yAxis = yAxis + 110 - (yAxis % 560);
                    }
                    return yAxis + 5;
                  })()}
                >
                  {/* Education History Title  */}
                  <Text
                    width={300}
                    height={200}
                    fontFamily="Poppins"
                    fontStyle="bold"
                    text="Education History"
                    x={125}
                    y={10}
                    fontSize={14}
                  />
                  <Rect height={4} width={320} fill="black" x={125} y={32} />
                  {/* Education History Title  End */}
                  {/* Educations  Start */}
                  {/* Here Education list goes */}
                  {/* education will be here */}
                  {returnEducations()}
                  {/* Educations  End */}
                </Group>
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
      <div className="cvAction">
        <div>
          <button className="btn-default" style={{ fontSize: "15px" }}>
            Save as draft
          </button>
          <button
            onClick={downloadPDF}
            className="btn-default"
            style={{
              fontSize: "15px",
              opacity: downloadText === "Downloading" ? 0.5 : 1,
            }}
            disabled={downloadText === "Downloading" ? true : false}
          >
            {downloadText}
          </button>
        </div>
      </div>
    </>
  );
}

export default KonvaCanvas;
